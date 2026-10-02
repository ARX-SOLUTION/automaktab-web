import { expect, test, type Page } from "@playwright/test";

// Mezon QA on #37: the compact header must keep the demo CTA on screen below 1280px,
// the mobile menu must offer demo and login, and Shift+Tab must reach the hidden row.

async function scrollPastHero(page: Page) {
  await page.mouse.wheel(0, 3000);
  await expect(page.locator(".site-header")).toHaveClass(/is-scrolled/);
  await page.waitForTimeout(400);
}

async function isOnTop(page: Page, selector: string) {
  return page.locator(selector).evaluate((element) => {
    const rect = element.getBoundingClientRect();
    const hit = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
    return {
      inViewport: rect.top >= 0 && rect.bottom <= innerHeight && rect.left >= 0 && rect.right <= innerWidth,
      width: rect.width,
      height: rect.height,
      hit: !!hit && (hit === element || element.contains(hit)),
      opacity: getComputedStyle(element).opacity,
    };
  });
}

for (const width of [320, 390, 768, 1024]) {
  for (const reducedMotion of ["no-preference", "reduce"] as const) {
    test(`demo CTA stays visible in the compact header at ${width}px (${reducedMotion})`, async ({ page }) => {
      await page.setViewportSize({ width, height: 844 });
      await page.emulateMedia({ reducedMotion });
      await page.goto("/");
      await scrollPastHero(page);
      const cta = await isOnTop(page, ".site-header-demo");
      expect(cta).toMatchObject({ inViewport: true, hit: true, opacity: "1" });
      expect(cta.width).toBeGreaterThanOrEqual(44);
      expect(cta.height).toBeGreaterThanOrEqual(44);
      const menu = await isOnTop(page, ".site-header-menu summary");
      expect(menu).toMatchObject({ inViewport: true, hit: true });
      expect(Math.min(menu.width, menu.height)).toBeGreaterThanOrEqual(44);
      await expect(page.locator(".site-header-demo")).toHaveAccessibleName(/demo/i);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    });
  }
}

test("mobile menu offers demo, login and languages", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/ru");
  await scrollPastHero(page);
  await page.locator(".site-header-menu summary").click();
  const menu = page.locator(".site-header-menu nav");
  await expect(menu).toBeVisible();
  const demo = menu.locator('a[href*="demo=1"]');
  const login = menu.locator('a[href="https://app.automaktab.uz/login"]');
  await expect(demo).toBeVisible();
  await expect(demo).toHaveText("Открыть демо");
  await expect(login).toBeVisible();
  await expect(login).toHaveText("Войти");
  await expect(menu.locator('[aria-current="page"]')).toHaveText("RU");
  for (const link of await menu.locator("a").all()) {
    const box = (await link.boundingBox())!;
    expect(box.height).toBeGreaterThanOrEqual(44);
    expect(box.width).toBeGreaterThanOrEqual(44);
  }
  await page.keyboard.press("Escape");
  await expect(page.locator(".site-header-menu")).not.toHaveAttribute("open");
});

for (const width of [390, 1024]) {
  test(`Shift+Tab from the page reaches the demo CTA and language switcher at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.addInitScript(() => {
      (window as unknown as { shift: number }).shift = 0;
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as unknown as Array<{ value: number; hadRecentInput: boolean }>) {
          if (!entry.hadRecentInput) (window as unknown as { shift: number }).shift += entry.value;
        }
      }).observe({ type: "layout-shift", buffered: true });
    });
    await page.goto("/");
    await scrollPastHero(page);
    // Put focus on the first focusable element of the page content without scrolling back to the top,
    // so the next Shift+Tab steps into the compact header.
    await page.evaluate(() => {
      document.querySelector<HTMLElement>("#main-content :is(a[href], button, summary, input)")!.focus({ preventScroll: true });
    });
    await expect(page.locator(".site-header")).toHaveClass(/is-scrolled/);
    // Only count shifts caused by keyboard navigation. (The journey story re-lays itself out when it first
    // initialises at >=1024x800; that pre-existing shift is tracked separately and is not part of this header.)
    await page.waitForTimeout(600);
    await page.evaluate(() => { (window as unknown as { shift: number }).shift = 0; });
    const reached: string[] = [];
    for (let i = 0; i < 12; i++) {
      await page.keyboard.press("Shift+Tab");
      const step = await page.evaluate(() => {
        const element = document.activeElement as HTMLElement;
        if (!element.closest(".site-header")) return null;
        return element.getAttribute("aria-label") ?? element.textContent?.trim() ?? "";
      });
      if (step === null) continue;
      reached.push(step);
      const focused = page.locator(":focus");
      await expect(focused).toBeInViewport();
      await expect.poll(() => focused.evaluate((element) => {
        let node: Element | null = element;
        let opacity = 1;
        while (node) { opacity *= Number(getComputedStyle(node).opacity); node = node.parentElement; }
        return opacity;
      })).toBe(1);
      if (step.includes("bosh sahifa")) break;
    }
    expect(reached).toEqual(["Menyu", "Demoni ochish", "English", "Русский", "O‘zbekcha", "Kirish", "automaktab.uz bosh sahifa"]);
    expect(await page.evaluate(() => (window as unknown as { shift: number }).shift)).toBe(0);
  });
}
