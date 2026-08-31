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

// The hero h1 (HeroSection.tsx's Hero()) splits every word into its own
// <span data-hero-word> for the GSAP roll-in, so the full sentence never
// appears as one contiguous run in the rendered HTML. The first word and the
// accent word are the safe substring checks (crawlers still read the joined
// textContent, so this does not weaken the SEO contract).
const HERO_HEADING: Record<Locale, { prefix: string; accent: string }> = {
  uz: { prefix: "Avtomaktabingizning", accent: "nazoratda" },
  ru: { prefix: "Каждый", accent: "контролем" },
  en: { prefix: "Every", accent: "under control" },
};

const METADATA_LANGUAGE_SIGNAL: Record<
  Locale,
  { title: string; description: string }
> = {
  uz: {
    title: "Avtomaktab CRM",
    description: "Qarzdorlar",
  },
  ru: {
    title: "CRM для автошколы",
    description: "Должники",
  },
  en: {
    title: "Driving School CRM",
    description: "Track debtors",
  },
};

// Next normalizes metadata URLs against metadataBase, stripping the trailing
// slash on the domain root (https://automaktab.uz/ -> https://automaktab.uz).
// buildLocaleAlternates keeps the slash (its own unit test asserts it); this
// only affects how the value is serialized into HTML, so we normalize both
// sides before comparing.
const normalizeUrl = (u: string) => u.replace(/\/$/, "");

// One distinctive, locale-specific string per locale from MidPageSections'
// "benefits" section and ClosingSections' FAQ heading (COPY.benefits.title /
// COPY.faq.title in those files) -- neither uses a straight apostrophe, so
// no escapeApostrophe needed against the served HTML body text.
const MID_PAGE_BENEFITS_TITLE: Record<Locale, string> = {
  uz: "Asosiy imkoniyatlar",
  ru: "Ключевые возможности",
  en: "Key features",
};

const CLOSING_FAQ_TITLE: Record<Locale, string> = {
  uz: "Ko’p so‘raladigan savollar",
  ru: "Часто задаваемые вопросы",
  en: "Frequently asked questions",
};

const FAQ_ITEM_COUNT = 8;

// Two application/ld+json <script> tags, each rendered as a single line
// (JSON.stringify output, not pretty-printed):
//   1. page.tsx's Organization + SoftwareApplication @graph
//   2. ClosingSections.tsx's FAQPage
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

    it(`serves ${locale} HTML with MidPageSections and ClosingSections content`, async () => {
      const res = await fetch(`${BASE_URL}${route}`);
      const html = await res.text();
      expect(html).toContain(MID_PAGE_BENEFITS_TITLE[locale]);
      expect(html).toContain(CLOSING_FAQ_TITLE[locale]);
    });

    it(`serves ${locale} HTML with two well-formed JSON-LD blocks, the FAQPage one with 8 questions`, async () => {
      const res = await fetch(`${BASE_URL}${route}`);
      const html = await res.text();

      const matches = [...html.matchAll(JSON_LD_SCRIPT_RE)];
      expect(matches).toHaveLength(2);

      // JSON.parse throws on malformed JSON -- this is the "well-formed" check.
      const parsed = matches.map(([, json]) => JSON.parse(json));

      const organizationGraph = parsed.find((doc) =>
        Array.isArray(doc["@graph"]),
      );
      expect(organizationGraph).toBeTruthy();
      const organization = organizationGraph["@graph"].find(
        (node: { "@type"?: string }) => node["@type"] === "Organization",
      );
      expect(organization).toBeTruthy();
      expect(organization.logo).toBe("https://automaktab.uz/icon.svg");

      const softwareApp = parsed
        .flatMap((doc) => doc["@graph"] ?? [doc])
        .find((entry) => entry["@type"] === "SoftwareApplication");
      expect(softwareApp).toBeTruthy();
      expect(softwareApp.name).toBe("Auto Maktab CRM");

      const faqPage = parsed.find((doc) => doc["@type"] === "FAQPage");
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
