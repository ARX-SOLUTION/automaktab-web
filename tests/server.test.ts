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

// The hero h1 (HeroSection.tsx's Hero()) splits its text around the accent
// word with nested <span> tags, so the full sentence never appears as one
// contiguous run in the rendered HTML -- only the text before the accent,
// and the accent word itself, are safe substring checks.
const HERO_HEADING: Record<Locale, { prefix: string; accent: string }> = {
  uz: { prefix: "Avtomaktabingizning har bir so’mi", accent: "nazoratda" },
  ru: { prefix: "Каждый сум вашей автошколы под", accent: "контролем" },
  en: { prefix: "Every sum in your driving school,", accent: "under control" },
};

// Source-of-truth copy strings (layout.tsx's generateMetadata, ported from
// autodrive-frontend/index.html). React/Next HTML-escape `'` as `&#x27;`
// when serializing metadata text, so the served HTML never contains these
// literal apostrophes -- match against the escaped form actually sent.
const REAL_TITLE = "Avtomaktab CRM — to'lov, davomat, jadval | Auto Maktab";
const REAL_DESCRIPTION =
  "Qarzdorlar ro'yxati, kunlik tushum, davomat va dars jadvali — bitta tizimda. Birinchi oy bepul, o'rnatish shart emas: brauzerda ishlaydi.";
const escapeApostrophe = (s: string) => s.replace(/'/g, "&#x27;");

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

// Matches both application/ld+json <script> tags (page.tsx's Organization +
// SoftwareApplication graph, and ClosingSections.tsx's FAQPage) rendered as
// a single line each (JSON.stringify output, not pretty-printed).
const JSON_LD_SCRIPT_RE =
  /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;

describe.each(LOCALE_ROUTES)(
  "GET $route (production server)",
  ({ route, locale }) => {
    it(`serves ${locale} HTML with title, description, heading, hreflang alternates, and canonical`, async () => {
      const res = await fetch(`${BASE_URL}${route}`);
      expect(res.status).toBe(200);

      const html = await res.text();
      expect(html).toContain(`<html lang="${locale}"`);
      expect(html).toContain(`<title>${escapeApostrophe(REAL_TITLE)}</title>`);
      expect(html).toContain('name="description"');
      expect(html).toContain(escapeApostrophe(REAL_DESCRIPTION));
      const heading = HERO_HEADING[locale];
      expect(html).toContain(heading.prefix);
      expect(html).toContain(heading.accent);

      // Derived from buildLocaleAlternates rather than hardcoded, so the
      // test tracks the actual metadata contract instead of a copy of it.
      // All three routes are the same locale-neutral page ("/"), just
      // reached via a different locale prefix.
      const alternates = buildLocaleAlternates("/", locale);
      expect(alternates).toBeTruthy();
      expect(html).toContain(`rel="canonical" href="${alternates!.canonical}"`);

      const languages = alternates!.languages as Record<string, string>;
      for (const loc of [...SUPPORTED_LOCALES, "x-default"]) {
        expect(html).toContain(
          `rel="alternate" hrefLang="${loc}" href="${languages[loc]}"`,
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

      const organizationGraph = parsed.find((doc) => Array.isArray(doc["@graph"]));
      expect(organizationGraph).toBeTruthy();
      expect(
        organizationGraph["@graph"].some(
          (node: { "@type"?: string }) => node["@type"] === "Organization",
        ),
      ).toBe(true);

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
