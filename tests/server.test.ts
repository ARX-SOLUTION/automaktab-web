import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { spawn, type ChildProcess } from "node:child_process";
import path from "node:path";
import { SUPPORTED_LOCALES, type Locale } from "@/i18n/config";
import { buildLocaleAlternates } from "@/lib/locale-metadata";

const PORT = 3847;
const BASE_URL = `http://localhost:${PORT}`;

let server: ChildProcess;

// Assumes `next build` already ran (true for the mandated verify chain:
// typecheck && lint && build && test) — this test serves that build, it
// doesn't create one.
beforeAll(async () => {
  server = spawn(
    path.join(process.cwd(), "node_modules/.bin/next"),
    ["start", "-p", String(PORT)],
    // detached => server.pid is the leader of its own process group, so
    // cleanup can signal next start plus any children it spawns, not just
    // the one pid.
    { stdio: "pipe", detached: true },
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
}, 35_000);

afterAll(async () => {
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

const HERO_HEADING: Record<Locale, { prefix: string; accent: string }> = {
  uz: { prefix: "Siz yo‘qligingizda", accent: "nazoratda" },
  ru: { prefix: "Автошкола под контролем", accent: "вас нет" },
  en: { prefix: "Your driving school", accent: "under control" },
};

const METADATA_LANGUAGE_SIGNAL: Record<
  Locale,
  { title: string; description: string }
> = {
  uz: {
    title: "Avtomaktab CRM",
    description: "qarzdorlik",
  },
  ru: {
    title: "CRM для автошколы",
    description: "долги",
  },
  en: {
    title: "Driving School CRM",
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
  uz: "Rahbar ko‘radi. Jamoa bir xil tizimda ishlaydi.",
  ru: "Руководитель видит. Команда работает в одной системе.",
  en: "The owner sees. The team works in one system.",
};

const FAQ_TITLE: Record<Locale, string> = {
  uz: "Savol qolmasin.",
  ru: "Без скрытых условий.",
  en: "No hidden claims.",
};

const FAQ_ITEM_COUNT = 6;

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
      expect(html).toContain(CAPABILITIES_TITLE[locale]);
      expect(html).toContain(FAQ_TITLE[locale]);
      expect(html).toContain("/images/product/dashboard.webp");
      expect(html).toContain("/images/product/schedule.webp");
      expect(html).toContain("/images/product/attendance.webp");
      expect(html).toContain("https://app.automaktab.uz/login?demo=1");
      expect(html).not.toContain("AutoDrive");
    });

    it(`serves ${locale} HTML with one coherent Organization, SoftwareApplication, and FAQ graph`, async () => {
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
      expect(organization.logo).toBe("https://automaktab.uz/icon.svg");

      const softwareApp = organizationGraph["@graph"]
        .find(
          (entry: { "@type"?: string }) =>
            entry["@type"] === "SoftwareApplication",
        );
      expect(softwareApp).toBeTruthy();
      expect(softwareApp.name).toBe("automaktab.uz");

      const faqPage = organizationGraph["@graph"].find(
        (entry: { "@type"?: string }) => entry["@type"] === "FAQPage",
      );
      expect(faqPage).toBeTruthy();
      expect(faqPage.mainEntity).toHaveLength(FAQ_ITEM_COUNT);
    });
  },
);

describe("GET /uz (must not exist as a duplicate of the unprefixed root)", () => {
  it("404s — uz's canonical URL is /, never /uz", async () => {
    const res = await fetch(`${BASE_URL}/uz`);
    expect(res.status).toBe(404);
  });
});

describe("GET /fr (unsupported locale)", () => {
  it("404s instead of rendering", async () => {
    const res = await fetch(`${BASE_URL}/fr`);
    expect(res.status).toBe(404);
  });
});

describe("blog and sitemap surfaces", () => {
  it("serves the localized blog index without requiring article data", async () => {
    const res = await fetch(`${BASE_URL}/blog`);
    const html = await res.text();

    expect(res.status).toBe(200);
    expect(html).toContain("Tartibli boshqaruv uchun sodda qo‘llanmalar.");
    expect(html).toContain('rel="canonical" href="https://automaktab.uz/blog"');
  });

  it("lists the localized blog indexes in sitemap.xml", async () => {
    const res = await fetch(`${BASE_URL}/sitemap.xml`);
    const xml = await res.text();

    expect(res.status).toBe(200);
    expect(xml).toContain("https://automaktab.uz/blog");
    expect(xml).toContain("https://automaktab.uz/ru/blog");
    expect(xml).toContain("https://automaktab.uz/en/blog");
  });
});
