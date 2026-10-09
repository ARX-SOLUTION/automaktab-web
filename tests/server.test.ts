import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { spawn, type ChildProcess } from "node:child_process";
import { once } from "node:events";
import { createServer, type Server } from "node:http";
import path from "node:path";
import { SUPPORTED_LOCALES, type Locale } from "@/i18n/config";
import { buildLocaleAlternates } from "@/lib/locale-metadata";
import { contentUz } from "@/content/uz";
import { contentRu } from "@/content/ru";
import { contentEn } from "@/content/en";

const PORT = 3847;
const BASE_URL = `http://localhost:${PORT}`;

let server: ChildProcess;
let crmStub: Server | undefined;

// Assumes `next build` already ran (true for the mandated verify chain:
// typecheck && lint && build && test) — this test serves that build, it
// doesn't create one.
beforeAll(async () => {
  try {
    // Routing checks need a predictable missing article, not the live CRM's
    // availability or response time. Own an ephemeral loopback port.
    crmStub = createServer((request, response) => {
      response.setHeader("Content-Type", "application/json");
      if (request.method === "GET" && request.url?.split("?")[0] === "/blog-posts") {
        response.end(JSON.stringify({
          success: true,
          data: { items: [], total: 0, page: 1, limit: 100 },
        }));
        return;
      }
      response.statusCode = 404;
      response.end(JSON.stringify({ success: false, error: { message: "Not found" } }));
    });
    crmStub.listen(0, "127.0.0.1");
    await once(crmStub, "listening");
    const address = crmStub.address();
    if (!address || typeof address === "string") {
      throw new Error("CRM test stub did not bind a TCP port");
    }

    server = spawn(
      path.join(process.cwd(), "node_modules/.bin/next"),
      ["start", "--hostname", "127.0.0.1", "-p", String(PORT)],
      // detached => server.pid is the leader of its own process group, so
      // cleanup can signal next start plus any children it spawns, not just
      // the one pid.
      {
        stdio: "pipe",
        detached: true,
        env: { ...process.env, CRM_API_BASE_URL: `http://127.0.0.1:${address.port}` },
      },
    );

    const pid = server.pid;
    if (!pid) {
      throw new Error("failed to spawn next start: no pid");
    }

    // Reaps the server if this process disappears without running afterAll
    // (SIGKILL, a cancelled CI job, an OOM kill). No in-process handler can
    // run after a SIGKILL of *this* process, so only a separate watching
    // process can still clean up. It's detached too, so a signal aimed at
    // our pid/group doesn't take the watchdog out before it can act.
    const watchdog = spawn(
      "sh",
      [
        "-c",
        `while kill -0 ${process.pid} 2>/dev/null; do sleep 1; done; ` +
          `kill -TERM -${pid} 2>/dev/null; sleep 5; kill -KILL -${pid} 2>/dev/null`,
      ],
      { detached: true, stdio: "ignore" },
    );
    watchdog.unref();

    let stdout = "";
    let stderr = "";
    server.stdout?.on("data", (chunk: Buffer) => {
      stdout += chunk.toString();
    });
    server.stderr?.on("data", (chunk: Buffer) => {
      stderr += chunk.toString();
    });

    // Identity check: wait for the child's own readiness line on the pipe we
    // exclusively own. A process already squatting on PORT can't write to
    // it, so this can only pass against the server we actually spawned.
    const deadline = Date.now() + 30_000;
    while (!stdout.includes("Ready in")) {
      if (server.exitCode !== null || server.signalCode !== null) {
        throw new Error(
          `next start exited early (code ${server.exitCode}, signal ${server.signalCode}) before becoming ready:\n${stderr}`,
        );
      }
      if (Date.now() >= deadline) {
        throw new Error(`server did not signal readiness within 30s:\n${stderr}`);
      }
      await new Promise((resolve) => setTimeout(resolve, 50));
    }

    // Bounded sanity check that it actually accepts connections, now that we
    // know it's our own process reporting ready. Timed so a peer that opens
    // the connection but never responds can't stall past the deadline.
    const res = await fetch(BASE_URL, { signal: AbortSignal.timeout(5_000) });
    if (!res.ok) {
      throw new Error(`server responded with status ${res.status}:\n${stderr}`);
    }
  } catch (error) {
    await stopTestServers();
    throw error;
  }
}, 35_000);

async function stopTestServers() {
  try {
    const pid = server?.pid;
    if (!pid || server.exitCode !== null || server.signalCode !== null) {
      return;
    }
    await new Promise<void>((resolve) => {
      const escalate = setTimeout(() => {
        try {
          process.kill(-pid, "SIGKILL");
        } catch {
          // already gone
        }
      }, 5_000);
      server.once("exit", () => {
        clearTimeout(escalate);
        resolve();
      });
      process.kill(-pid, "SIGTERM");
    });
  } finally {
    const stub = crmStub;
    crmStub = undefined;
    if (stub?.listening) {
      await new Promise<void>((resolve, reject) => {
        stub.close((error) => error ? reject(error) : resolve());
        stub.closeAllConnections();
      });
    }
  }
}

afterAll(stopTestServers);

describe("security headers", () => {
  it("protects public pages with baseline browser-security headers", async () => {
    for (const route of ["/", "/ru"]) {
      const res = await fetch(`${BASE_URL}${route}`);

      expect(res.status).toBe(200);
      expect(res.headers.get("content-security-policy")).toContain(
        "default-src 'self'",
      );
      expect(res.headers.get("x-frame-options")).toBe("DENY");
      expect(res.headers.get("x-content-type-options")).toBe("nosniff");
      expect(res.headers.get("referrer-policy")).toBe(
        "strict-origin-when-cross-origin",
      );
    }
  });

  it("lets the Umami tracker load and deliver events to its collection host", async () => {
    const res = await fetch(`${BASE_URL}/`);
    const directives = Object.fromEntries(
      (res.headers.get("content-security-policy") ?? "")
        .split(";")
        .map((directive) => directive.trim().split(/\s+/))
        .map(([name, ...sources]) => [name, sources]),
    );

    expect(directives["script-src"]).toContain("https://cloud.umami.is");
    // cloud.umami.is/script.js posts pageviews to gateway.umami.is/api/send.
    expect(directives["connect-src"]).toContain("https://gateway.umami.is");
  });
});

// Backstop for exits that skip afterAll (uncaught exception, SIGINT,
// SIGTERM). 'exit' handlers must be synchronous, so this can only send the
// signal, not await it; the watchdog above covers SIGKILL, which no
// handler in this process can ever observe.
process.on("exit", () => {
  const pid = server?.pid;
  if (pid && server.exitCode === null && server.signalCode === null) {
    try {
      process.kill(-pid, "SIGTERM");
    } catch {
      // already gone
    }
  }
});

const LOCALE_ROUTES: Array<{ route: string; locale: Locale }> = [
  { route: "/", locale: "uz" },
  { route: "/ru", locale: "ru" },
  { route: "/en", locale: "en" },
];

type SeoRouteGroup = {
  id: string;
  paths: Record<Locale, string>;
  headings: Record<Locale, string>;
  titleSignals: Record<Locale, string>;
};

const SEO_ROUTE_GROUPS: SeoRouteGroup[] = [
  {
    id: "payments",
    paths: {
      uz: "/features/payments-and-debt",
      ru: "/ru/features/payments-and-debt",
      en: "/en/features/payments-and-debt",
    },
    headings: {
      uz: "Avtomaktab to‘lovlari va qarzdorligini boshqaring.",
      ru: "Управляйте оплатами и задолженностью автошколы.",
      en: "Keep track of payments and student debt.",
    },
    titleSignals: { uz: "to‘lovlari", ru: "Оплаты", en: "payments" },
  },
  {
    id: "schedule",
    paths: {
      uz: "/features/schedules-and-groups",
      ru: "/ru/features/schedules-and-groups",
      en: "/en/features/schedules-and-groups",
    },
    headings: {
      uz: "Dars jadvali va guruhlar bir tizimda.",
      ru: "Расписание и группы в одной системе.",
      en: "Schedule groups and lessons in one place.",
    },
    titleSignals: { uz: "jadvali", ru: "Расписание", en: "schedules" },
  },
  {
    id: "attendance",
    paths: {
      uz: "/features/digital-attendance",
      ru: "/ru/features/digital-attendance",
      en: "/en/features/digital-attendance",
    },
    headings: {
      uz: "Har bir dars davomatini bir joyda yuriting.",
      ru: "Ведите посещаемость каждого занятия в одной системе.",
      en: "Keep attendance for every lesson together.",
    },
    titleSignals: { uz: "davomat", ru: "посещаемость", en: "attendance" },
  },
  {
    id: "branches",
    paths: {
      uz: "/features/branch-management",
      ru: "/ru/features/branch-management",
      en: "/en/features/branch-management",
    },
    headings: {
      uz: "Barcha filiallar holati bir joyda.",
      ru: "Все филиалы на одном экране.",
      en: "Keep every branch in view.",
    },
    titleSignals: { uz: "filiallari", ru: "филиалами", en: "branch" },
  },
  {
    id: "pricing",
    paths: {
      uz: "/pricing",
      ru: "/ru/pricing",
      en: "/en/pricing",
    },
    headings: {
      uz: "Maktabingiz uchun narx va sinov shartlari.",
      ru: "Цена и пробный период для вашей автошколы.",
      en: "Pricing and trial terms for your school.",
    },
    titleSignals: { uz: "Tariflar", ru: "Тарифы", en: "Pricing" },
  },
];

const SEO_ROUTES = SEO_ROUTE_GROUPS.flatMap((group) =>
  (Object.entries(group.paths) as Array<[Locale, string]>).map(
    ([locale, route]) => ({
      ...group,
      locale,
      route,
    }),
  ),
);

const HERO_HEADING: Record<Locale, { prefix: string; accent: string }> = {
  uz: { prefix: "Avtomaktabingiz holati.", accent: "Bir qarashda." },
  ru: { prefix: "Ваша автошкола.", accent: "Всё перед глазами." },
  en: { prefix: "Your driving school.", accent: "At a glance." },
};

const METADATA_LANGUAGE_SIGNAL: Record<
  Locale,
  { title: string; description: string }
> = {
  uz: {
    title: "Avtomaktab CRM",
    description: "qarzdor",
  },
  ru: {
    title: "CRM для автошколы",
    description: "задолженности",
  },
  en: {
    title: "Driving school CRM",
    description: "debt",
  },
};

// Next normalizes metadata URLs against metadataBase, stripping the trailing
// slash on the domain root (https://automaktab.uz/ -> https://automaktab.uz).
// buildLocaleAlternates keeps the slash (its own unit test asserts it); this
// only affects how the value is serialized into HTML, so we normalize both
// sides before comparing.
const normalizeUrl = (u: string) => u.replace(/\/$/, "");

const CAPABILITIES_TITLE: Record<Locale, string> = {
  uz: "Har bir talabaning holati ko‘z oldingizda.",
  ru: "Следите за обучением каждого курсанта.",
  en: "Follow every student’s progress.",
};

const FAQ_TITLE: Record<Locale, string> = {
  uz: "Ko‘p beriladigan savollar.",
  ru: "Частые вопросы.",
  en: "Common questions.",
};

const FAQ_ITEM_COUNT = 7;

const JSON_LD_SCRIPT_RE =
  /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;

describe.each(LOCALE_ROUTES)(
  "GET $route (production server)",
  ({ route, locale }) => {
    it(`serves ${locale} HTML with localized metadata, an icon, hreflang alternates, and canonical`, async () => {
      const res = await fetch(`${BASE_URL}${route}`);
      expect(res.status).toBe(200);

      const html = await res.text();
      expect(html).toContain(`<html lang="${locale}"`);
      const signal = METADATA_LANGUAGE_SIGNAL[locale];
      const title = html.match(/<title>(.*?)<\/title>/)?.[1] ?? "";
      const description = html.match(
        /<meta name="description" content="([^"]*)"\/?>/,
      )?.[1] ?? "";
      expect(title).toContain(signal.title);
      expect(description).toContain(signal.description);
      expect(title.length).toBeLessThanOrEqual(60);
      expect(description.length).toBeLessThanOrEqual(155);
      expect(html).not.toContain('name="keywords"');
      expect(description).not.toMatch(/бесплатно|free for 30 days/);
      expect(html).toContain(
        `property="og:title" content="${title}"`,
      );
      expect(html).toContain(
        `property="og:description" content="${description}"`,
      );
      expect(html).toContain(
        `name="twitter:title" content="${title}"`,
      );
      expect(html).toContain(
        `name="twitter:description" content="${description}"`,
      );
      expect(html).toContain('property="og:image"');
      expect(html).toContain('name="twitter:image"');
      expect(html).toContain('rel="icon" href="/icon.svg?');
      const heading = HERO_HEADING[locale];
      expect(html).toContain(heading.prefix);
      expect(html).toContain(heading.accent);

      // Derived from buildLocaleAlternates rather than hardcoded, so the
      // test tracks the actual metadata contract instead of a copy of it.
      // All three routes are the same locale-neutral page ("/"), just
      // reached via a different locale prefix.
      const alternates = buildLocaleAlternates("/", locale);
      expect(alternates).toBeTruthy();
      expect(html).toContain(
        `rel="canonical" href="${normalizeUrl(alternates!.canonical as string)}"`,
      );

      const languages = alternates!.languages as Record<string, string>;
      for (const loc of [...SUPPORTED_LOCALES, "x-default"]) {
        expect(html).toContain(
          `rel="alternate" hrefLang="${loc}" href="${normalizeUrl(languages[loc])}"`,
        );
      }
    });

    it(`serves ${locale} product proof, CTA, and localized supporting content`, async () => {
      const res = await fetch(`${BASE_URL}${route}`);
      const html = await res.text();
      const content = { uz: contentUz, ru: contentRu, en: contentEn }[locale];
      expect(html).toContain(CAPABILITIES_TITLE[locale]);
      expect(html).toContain(FAQ_TITLE[locale]);
      const imageSources = [...html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)].map((match) => decodeURIComponent(match[1]));
      expect(imageSources.some((src) => /\/images\/(?:demo|product)\//.test(src))).toBe(false);
      expect(html).toContain(content.scenes.sampleLabel);
      expect(html).toContain(content.proof.caption);
      expect(html).toContain(content.scenes.director.revenue);
      expect(html).toContain(content.scenes.director.debt);
      expect(html).toContain(content.scenes.accountant.expenses);
      expect(html).toContain(content.hero.lane1.button);
      expect(html).toContain(content.hero.lane2.button);
      expect(html).toContain("https://app.automaktab.uz/login?demo=1");
      expect(html).not.toContain("AutoDrive");
    });

    it(`serves ${locale} HTML with one coherent Organization, WebSite, SoftwareApplication, and FAQ graph`, async () => {
      const res = await fetch(`${BASE_URL}${route}`);
      const html = await res.text();

      const matches = [...html.matchAll(JSON_LD_SCRIPT_RE)];
      expect(matches).toHaveLength(1);

      const organizationGraph = JSON.parse(matches[0][1]);
      expect(Array.isArray(organizationGraph["@graph"])).toBe(true);
      const organization = organizationGraph["@graph"].find(
        (node: { "@type"?: string }) => node["@type"] === "Organization",
      );
      expect(organization).toBeTruthy();
      expect(organization.name).toBe("automaktab.uz");
      expect(organization.logo).toEqual({
        "@type": "ImageObject",
        url: "https://automaktab.uz/icon.png",
        width: 512,
        height: 512,
      });

      const website = organizationGraph["@graph"].find(
        (entry: { "@type"?: string }) => entry["@type"] === "WebSite",
      );
      expect(website).toBeTruthy();
      expect(website.name).toBe("automaktab.uz");
      expect(website.url).toBe("https://automaktab.uz/");
      expect(website.potentialAction).toBeUndefined();

      const softwareApp = organizationGraph["@graph"]
        .find(
          (entry: { "@type"?: string }) =>
            entry["@type"] === "SoftwareApplication",
        );
      expect(softwareApp).toBeTruthy();
      expect(softwareApp.name).toBe("automaktab.uz");
      expect(softwareApp.offers).toBeUndefined();

      const faqPage = organizationGraph["@graph"].find(
        (entry: { "@type"?: string }) => entry["@type"] === "FAQPage",
      );
      expect(faqPage).toBeTruthy();
      expect(faqPage.mainEntity).toHaveLength(FAQ_ITEM_COUNT);
    });
  },
);

describe("GET /uz (must not exist as a duplicate of the unprefixed root)", () => {
  it("redirects to / — uz's canonical URL is unprefixed", async () => {
    const res = await fetch(`${BASE_URL}/uz`, { redirect: "manual" });
    expect(res.status).toBe(308);
    expect(res.headers.get("location")).toBe("/");
  });

  it("redirects /uz/* to the unprefixed path", async () => {
    const res = await fetch(`${BASE_URL}/uz/opengraph-image`, {
      redirect: "manual",
    });
    expect(res.status).toBe(308);
    expect(res.headers.get("location")).toBe("/opengraph-image");
  });
});

describe("GET /fr (unsupported locale)", () => {
  it("404s instead of rendering", async () => {
    const res = await fetch(`${BASE_URL}/fr`);
    expect(res.status).toBe(404);
  });
});

describe.each([
  "/__route_probe__",
  "/ru/__route_probe__",
  "/en/__route_probe__",
  "/imkoniyatlar/mavjud-emas",
])("GET %s (unmatched route)", (route) => {
  it("keeps the 404 status and renders the branded noindex recovery page", async () => {
    const res = await fetch(`${BASE_URL}${route}`);
    const html = await res.text();

    expect(res.status).toBe(404);
    expect(html).toContain("Sahifa topilmadi");
    expect(html).toContain('name="robots" content="noindex');
    expect(html).toMatch(/href(?:=|\\":\\")\"?\//);
  });
});

describe("localized not-found recovery", () => {
  it("does not send a visitor from a missing blog URL to the invalid /uz duplicate", async () => {
    const res = await fetch(`${BASE_URL}/blog/__route_probe__`);
    const html = await res.text();

    expect(res.status).toBe(404);
    expect(html).toContain("Sahifa topilmadi");
    // A nested notFound() response is streamed as an RSC payload before
    // hydration, while the global 404 is emitted as plain HTML. Accept both
    // serializations but keep the recovery target an actual canonical root.
    const hasCanonicalHomeHref =
      html.includes('href="/"') || html.includes('href\\":\\"/\\"');
    const hasInvalidUzHref =
      html.includes('href="/uz"') || html.includes('href\\":\\"/uz\\"');
    expect(hasCanonicalHomeHref).toBe(true);
    expect(hasInvalidUzHref).toBe(false);
  });
});

describe.each(SEO_ROUTES)(
  "GET $route ($id SEO entry page)",
  ({ locale, route, paths, headings, titleSignals, id }) => {
    it("serves static localized content with canonical, hreflang, and a demo CTA", async () => {
      const res = await fetch(`${BASE_URL}${route}`);
      const html = await res.text();

      expect(res.status).toBe(200);
      expect(html).toContain(`<html lang="${locale}"`);
      expect(html).toContain(headings[locale]);
      expect(html.match(/<title>(.*?)<\/title>/)?.[1]).toContain(
        titleSignals[locale],
      );
      expect(html).toMatch(/<meta name="description" content="[^\"]{1,155}"\/?/);
      expect(html).toContain(
        `rel="canonical" href="https://automaktab.uz${paths[locale]}"`,
      );
      for (const [alternateLocale, alternatePath] of Object.entries(paths)) {
        expect(html).toContain(
          `rel="alternate" hrefLang="${alternateLocale}" href="https://automaktab.uz${alternatePath}"`,
        );
      }
      expect(html).toContain(
        `rel="alternate" hrefLang="x-default" href="https://automaktab.uz${paths.uz}"`,
      );
      expect(html).toContain("https://app.automaktab.uz/login?demo=1");
      if (id === "pricing") {
        expect(html).not.toContain("priceCurrency");
      }
      expect(html).toContain('property="og:image"');
      expect(html).toContain('name="twitter:image"');
      expect(html).not.toContain('name="keywords"');
    });
  },
);

describe("blog and sitemap surfaces", () => {
  it("serves the localized blog index without requiring article data", async () => {
    const res = await fetch(`${BASE_URL}/blog`);
    const html = await res.text();

    expect(res.status).toBe(200);
    expect(html).toContain("Avtomaktab boshqaruvi uchun amaliy maslahatlar.");
    expect(html).toContain('rel="canonical" href="https://automaktab.uz/blog"');
    expect(html).toContain('property="og:image"');
    expect(html).toContain('name="twitter:image"');
  });

  it("shares changelog pages and describes released notes as schema.org text", async () => {
    const res = await fetch(`${BASE_URL}/changelog`);
    const html = await res.text();
    const schema = JSON.parse([...html.matchAll(JSON_LD_SCRIPT_RE)][0][1]);

    expect(res.status).toBe(200);
    expect(html).toContain('property="og:image"');
    expect(html).toContain('name="twitter:image"');
    expect(schema.operatingSystem).toBe("Web");
    expect(schema.releaseNotes.length).toBeGreaterThan(0);
    expect(schema.releaseNotes.every((note: unknown) => typeof note === "string")).toBe(true);
    expect(schema.releaseNotes.join(" ")).not.toContain("v3.0.0");
  });

  it("lists the localized blog indexes in sitemap.xml", async () => {
    const res = await fetch(`${BASE_URL}/sitemap.xml`);
    const xml = await res.text();

    expect(res.status).toBe(200);
    expect(xml).toContain("https://automaktab.uz/blog");
    expect(xml).toContain("https://automaktab.uz/ru/blog");
    expect(xml).toContain("https://automaktab.uz/en/blog");
    for (const group of SEO_ROUTE_GROUPS) {
      for (const path of Object.values(group.paths)) {
        expect(xml).toContain(`https://automaktab.uz${path}`);
      }
    }
  });

  it("publishes a valid Uzbek RSS feed even when no articles are available", async () => {
    const res = await fetch(`${BASE_URL}/feed.xml`);
    const xml = await res.text();

    expect(res.status).toBe(200);
    expect(xml).toContain('<rss version="2.0"');
    expect(xml).toContain("<title>automaktab.uz blog</title>");
  });
});
