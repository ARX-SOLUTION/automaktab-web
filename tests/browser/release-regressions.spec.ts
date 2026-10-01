import { expect, test, type Page } from "@playwright/test";

// Regression checks for the 2 Oct 2026 production audit: supporting pages
// lost their component CSS, and the changelog depended on the OS colour
// scheme and on fonts the site never loads.

const SUPPORTING_PAGES = [
  "/pricing",
  "/ru/pricing",
  "/en/pricing",
  "/features/payments-and-debt",
  "/privacy",
  "/blog",
];
const CHANGELOG_PAGES = ["/changelog", "/ru/changelog"];

async function classesWithoutRules(page: Page, scope: string) {
  return page.evaluate((selector) => {
    const selectors: string[] = [];
    const collect = (rules: CSSRuleList) => {
      for (const rule of Array.from(rules)) {
        if (rule instanceof CSSStyleRule) selectors.push(rule.selectorText);
        if ("cssRules" in rule && (rule as CSSGroupingRule).cssRules) {
          collect((rule as CSSGroupingRule).cssRules);
        }
      }
    };
    for (const sheet of Array.from(document.styleSheets)) collect(sheet.cssRules);
    const css = selectors.join("\n");
    const classes = new Set<string>();
    for (const element of Array.from(document.querySelectorAll(`${selector}, ${selector} *`))) {
      for (const name of Array.from(element.classList)) classes.add(name);
    }
    return Array.from(classes)
      // Lucide adds marker classes to every icon; they are not meant to be styled.
      .filter((name) => !name.startsWith("lucide"))
      .filter((name) => {
        const escaped = CSS.escape(name).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        return !new RegExp(`\\.${escaped}(?![\\w-])`).test(css);
      })
      .sort();
  }, scope);
}

test.describe("supporting pages keep their component styles", () => {
  for (const path of SUPPORTING_PAGES) {
    test(`${path} ships CSS for every class it renders`, async ({ page }) => {
      await page.goto(path);
      expect(await classesWithoutRules(page, "main")).toEqual([]);
    });
  }

  test("/pricing renders the eyebrow, related links and CTA as components", async ({ page }) => {
    await page.goto("/pricing");
    const main = page.locator("main");

    const point = main.locator(".eyebrow .signal-point");
    const pointBox = await point.boundingBox();
    expect(pointBox?.width ?? 0).toBeGreaterThan(0);

    const related = main.locator("nav[aria-label] li");
    expect(await related.count()).toBeGreaterThan(0);
    expect(await related.evaluateAll((items) => items.every((item) => item.parentElement?.tagName === "UL"))).toBe(true);
    await expect(related.first()).toHaveCSS("list-style-type", "none");

    const cta = main.locator(".article-cta");
    await expect(cta).not.toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
    await expect(cta.locator("h2")).toHaveCSS("font-weight", "800");
    expect(await cta.locator("h2").evaluate((node) => getComputedStyle(node).fontFamily)).toMatch(/Nunito/);

    const button = cta.locator("a.button-primary");
    // A grid item is blockified, so .button computes to flex here.
    await expect(button).toHaveCSS("display", /flex/);
    await expect(button).toHaveCSS("min-height", "48px");
    await expect(button).not.toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
    const icon = await button.locator("svg").boundingBox();
    expect(icon?.height ?? 99).toBeLessThanOrEqual(20);
  });
});

function relativeLuminance([r, g, b]: number[]) {
  const [lr, lg, lb] = [r, g, b].map((value) => {
    const channel = value / 255;
    return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
}

async function textContrasts(page: Page, selector = "main h1, main h2, main p, main li, main select, main input") {
  const samples = await page.evaluate((selector) => {
    const parse = (value: string) => {
      const match = value.match(/rgba?\(([^)]+)\)/);
      if (!match) return [0, 0, 0, 0];
      const parts = match[1].split(/[ ,/]+/).filter(Boolean).map(Number);
      return [parts[0], parts[1], parts[2], parts[3] ?? 1];
    };
    const background = (element: Element | null): number[] => {
      const layers: number[][] = [];
      for (let node = element; node; node = node.parentElement) {
        const layer = parse(getComputedStyle(node).backgroundColor);
        if (layer[3] > 0) layers.push(layer);
        if (layer[3] === 1) break;
      }
      let result = [255, 255, 255];
      for (const [r, g, b, a] of layers.reverse()) {
        result = [r * a + result[0] * (1 - a), g * a + result[1] * (1 - a), b * a + result[2] * (1 - a)];
      }
      return result;
    };
    return Array.from(document.querySelectorAll(selector))
      .filter((node) => (node as HTMLElement).offsetParent !== null && node.textContent?.trim() !== "")
      .slice(0, 80)
      .map((node) => ({
        text: (node.textContent || (node as HTMLInputElement).placeholder || "").trim().slice(0, 40),
        color: parse(getComputedStyle(node).color),
        background: background(node),
      }));
  }, selector);
  return samples.map(({ text, color, background }) => {
    const [a, b] = [relativeLuminance(color), relativeLuminance(background)].sort((x, y) => y - x);
    return { text, ratio: Math.round(((a + 0.05) / (b + 0.05)) * 100) / 100 };
  });
}

test.describe("changelog stays readable", () => {
  for (const path of CHANGELOG_PAGES) {
    test(`${path} keeps AA text contrast when the OS prefers dark mode`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });
      await page.goto(path);
      const failing = (await textContrasts(page)).filter((sample) => sample.ratio < 4.5);
      expect(failing).toEqual([]);
    });

    test(`${path} renders every glyph with the site's web fonts`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready);
      const families = await page.locator("main h1, main h2, main p, main li, main button").evaluateAll((nodes) =>
        Array.from(new Set(nodes.map((node) => getComputedStyle(node).fontFamily))),
      );
      for (const family of families) expect(family).not.toMatch(/Barlow/);

      const session = await page.context().newCDPSession(page);
      await session.send("DOM.enable");
      await session.send("CSS.enable");
      const { root } = await session.send("DOM.getDocument", { depth: -1 });
      const { nodeIds } = await session.send("DOM.querySelectorAll", {
        nodeId: root.nodeId,
        selector: "main h1, main h2, main li",
      });
      const systemFonts = new Map<string, number>();
      for (const nodeId of nodeIds) {
        const { fonts } = await session.send("CSS.getPlatformFontsForNode", { nodeId });
        for (const font of fonts) {
          if (!font.isCustomFont) systemFonts.set(font.familyName, (systemFonts.get(font.familyName) ?? 0) + font.glyphCount);
        }
      }
      expect(Object.fromEntries(systemFonts)).toEqual({});
    });
  }
});

test("/changelog release notes are readable on the light shell", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" });
  await page.goto("/changelog");
  // Category labels such as "Yaxshilanishlar" used amber text at about 2:1.
  const failing = (await textContrasts(page, "main div.uppercase")).filter((sample) => sample.ratio < 4.5);
  expect(failing).toEqual([]);
  const sizes = await page.locator("main article li").evaluateAll((items) =>
    Array.from(new Set(items.map((item) => getComputedStyle(item).fontSize))),
  );
  expect(sizes).toEqual(["15px"]);
});

test("CSP lets the Umami tracker deliver pageviews", async ({ page }) => {
  const violations: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error" && /Content Security Policy/.test(message.text())) violations.push(message.text());
  });
  // Never reach the real analytics service: if CSP allows the request, the
  // route answers it locally.
  await page.route("https://gateway.umami.is/**", (route) => route.fulfill({ status: 204 }));
  await page.goto("/");
  const status = await page.evaluate(async () => {
    try {
      const response = await fetch("https://gateway.umami.is/api/send", { method: "POST", body: "{}" });
      return response.status;
    } catch {
      return "blocked";
    }
  });
  expect(status).toBe(204);
  expect(violations).toEqual([]);
});

test.describe("mobile details", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("changelog search has a name and does not trigger iOS focus zoom", async ({ page }) => {
    await page.goto("/changelog");
    const search = page.locator("main input[type=text]");
    await expect(search).toHaveAttribute("aria-label", "Yangilanishlarni qidirish");
    await expect(search).toHaveCSS("font-size", "16px");
    await expect(page.locator("main select")).toHaveCSS("font-size", "16px");
  });

  test("payment amounts never break between digit groups", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const broken = await page.locator("main span.font-mono.text-right").evaluateAll((cells) =>
      cells.flatMap((cell) => {
        const text = cell.firstChild;
        if (!(text instanceof Text) || cell.getBoundingClientRect().width === 0) return [];
        return Array.from(text.data.matchAll(/\d{1,3}(?:\s\d{3})+/g)).flatMap((match) => {
          const range = document.createRange();
          range.setStart(text, match.index);
          range.setEnd(text, match.index + match[0].length);
          const lines = new Set(Array.from(range.getClientRects()).map((rect) => Math.round(rect.top)));
          return lines.size > 1 ? [match[0]] : [];
        });
      }),
    );
    expect(broken).toEqual([]);
  });
});
