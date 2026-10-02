import { expect, test, type Page } from "@playwright/test";

const VIEWPORTS = [
  { width: 390, height: 844 },
  { width: 1440, height: 900 },
];

async function finalState(page: Page) {
  return page.locator("#qarzdorlik").evaluate((section) => ({
    state: section.getAttribute("data-debt-state"),
    total: section.querySelector("[data-debt-total]")?.textContent,
    transforms: Array.from(section.querySelectorAll("[data-debt-row]")).map((row) => getComputedStyle(row).transform),
    slips: Array.from(section.querySelectorAll("[data-debt-slip]")).map((slip) => Number(getComputedStyle(slip).opacity)),
    exportOpacity: Number(getComputedStyle(section.querySelector("[data-debt-export]")!).opacity),
    trackTaller: (section.querySelector("[data-debt-track]") as HTMLElement).offsetHeight > (section.querySelector(".debt-stage") as HTMLElement).offsetHeight + 1,
  }));
}

for (const viewport of VIEWPORTS) {
  test(`debt story shows the finished list with reduced motion at ${viewport.width}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.locator("#qarzdorlik").scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    const state = await finalState(page);
    expect(state.state).toBe("static");
    expect(state.total).toBe("4 950 000");
    expect(state.transforms.every((value) => value === "none")).toBe(true);
    expect(state.slips.every((value) => value === 0)).toBe(true);
    expect(state.exportOpacity).toBe(1);
    expect(state.trackTaller).toBe(false);
    await expect(page.locator("#qarzdorlik .debt-row").nth(1)).toContainText("1 200 000");
  });

  test(`debt story turns scattered notes into the list while scrolling at ${viewport.width}`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(String(error)));
    await page.setViewportSize(viewport);
    await page.goto("/");
    await page.evaluate(() => {
      (window as unknown as { __cls: number }).__cls = 0;
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as (PerformanceEntry & { value: number; hadRecentInput: boolean })[]) {
          if (!entry.hadRecentInput) (window as unknown as { __cls: number }).__cls += entry.value;
        }
      }).observe({ type: "layout-shift", buffered: true });
    });
    const track = page.locator("[data-debt-track]");
    const top = await track.evaluate((el) => el.getBoundingClientRect().top + window.scrollY);
    await page.evaluate((y) => window.scrollTo(0, y - window.innerHeight), top);
    await page.waitForTimeout(300);
    await page.evaluate((y) => window.scrollTo(0, y - 40), top);
    await expect(page.locator("#qarzdorlik")).toHaveAttribute("data-debt-state", "scroll");
    await page.waitForTimeout(900);
    let state = await finalState(page);
    expect(state.trackTaller).toBe(true);
    expect(state.total).toBe("?");
    expect(Math.min(...state.slips)).toBeGreaterThan(0.9);
    expect(state.transforms.some((value) => value !== "none" && value !== "matrix(1, 0, 0, 1, 0, 0)")).toBe(true);
    // Scattered slips must never make the page scroll sideways.
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);

    const bottom = await track.evaluate((el) => el.getBoundingClientRect().bottom + window.scrollY);
    for (let y = top; y <= bottom; y += 160) {
      await page.evaluate((value) => window.scrollTo(0, value), y);
      await page.waitForTimeout(40);
    }
    await page.evaluate((y) => window.scrollTo(0, y - window.innerHeight), bottom);
    await page.waitForTimeout(1200);
    state = await finalState(page);
    expect(state.total).toBe("4 950 000");
    expect(Math.max(...state.slips)).toBeLessThan(0.05);
    expect(state.exportOpacity).toBeGreaterThan(0.95);
    expect(await page.evaluate(() => (window as unknown as { __cls: number }).__cls)).toBe(0);
    expect(errors).toEqual([]);
  });
}

test("debt story renders the finished list without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto("/");
  const state = await finalState(page);
  expect(state.total).toBe("4 950 000");
  expect(state.slips.every((value) => value === 0)).toBe(true);
  expect(state.trackTaller).toBe(false);
  await context.close();
});
