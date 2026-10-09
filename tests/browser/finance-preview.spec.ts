import { expect, test } from "@playwright/test";
import { financePreviewContent } from "../../src/content/finance-preview";

test("a sample payment changes only its branch, remains local and can be reset", async ({ page }) => {
  const requests: string[] = [];
  const errors: string[] = [];
  page.on("request", (request) => { if (request.method() !== "GET") requests.push(request.url()); });
  page.on("pageerror", (error) => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en");
  const preview = page.locator("#finance-preview");
  const copy = financePreviewContent.en;
  const revenue = preview.locator('[data-finance-total="revenue"]');
  const debt = preview.locator('[data-finance-total="debt"]');
  await expect(revenue).toHaveAttribute("data-value", "18400000");
  await expect(debt).toHaveAttribute("data-value", "6200000");

  const branch = preview.getByRole("radio", { name: copy.branches.yunusobod, exact: true });
  await branch.check();
  await expect(revenue).toHaveAttribute("data-value", "6000000");
  await expect(debt).toHaveAttribute("data-value", "2100000");
  await expect(preview.locator("[data-finance-student]")).toHaveCount(1);
  await preview.locator("summary").click();
  await expect(preview.locator('[data-finance-student="yunusobod"]')).toBeVisible();
  await preview.getByRole("button", { name: copy.payment, exact: true }).click();
  await expect(revenue).toHaveAttribute("data-value", "6600000");
  await expect(debt).toHaveAttribute("data-value", "1500000");
  await expect(preview.getByRole("status")).toContainText(copy.success);
  await expect(preview.getByRole("button", { name: copy.recorded, exact: true })).toBeDisabled();

  await preview.getByRole("radio", { name: copy.branches.chilonzor, exact: true }).check();
  await expect(revenue).toHaveAttribute("data-value", "8400000");
  await preview.getByRole("radio", { name: copy.allBranches, exact: true }).check();
  await expect(revenue).toHaveAttribute("data-value", "19000000");
  await expect(debt).toHaveAttribute("data-value", "5600000");
  await preview.getByRole("button", { name: copy.reset, exact: true }).click();
  await expect(revenue).toHaveAttribute("data-value", "18400000");
  await expect(debt).toHaveAttribute("data-value", "6200000");
  await expect(preview.getByRole("status")).toHaveText(copy.resetSuccess);
  expect(requests.filter((url) => /\/api\/(?:lead|demo-request)|app\.automaktab\.uz/.test(url))).toEqual([]);
  expect(errors).toEqual([]);
});

test("keyboard filtering and a live reduced-motion change preserve the financial state", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/en");
  const preview = page.locator("#finance-preview");
  const copy = financePreviewContent.en;
  const all = preview.getByRole("radio", { name: copy.allBranches, exact: true });
  await all.focus();
  await all.press("ArrowRight");
  const branch = preview.getByRole("radio", { name: copy.branches.chilonzor, exact: true });
  await expect(branch).toBeChecked();
  await expect(branch).toBeFocused();
  await branch.press("Tab");
  const details = preview.locator("summary");
  await expect(details).toBeFocused();
  await details.press("Enter");
  await expect(preview.locator('[data-finance-student="chilonzor"]')).toBeVisible();
  await details.press("Tab");
  const payment = preview.getByRole("button", { name: copy.payment, exact: true });
  await expect(payment).toBeFocused();
  await payment.press("Enter");
  const recorded = preview.getByRole("button", { name: copy.recorded, exact: true });
  await expect(recorded).toBeFocused();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(preview.locator('[data-finance-total="revenue"]')).toHaveAttribute("data-value", "9000000");
  await expect(preview.locator('[data-finance-total="debt"]')).toHaveAttribute("data-value", "1800000");
  for (const node of await preview.locator("[data-finance-total], [data-finance-bar], [data-finance-receipt]").all()) {
    await expect(node).toHaveCSS("transform", "none");
  }
  await recorded.press("Tab");
  const reset = preview.getByRole("button", { name: copy.reset, exact: true });
  await expect(reset).toBeFocused();
  await reset.press("Enter");
  await expect(all).toBeChecked();
  await expect(reset).toBeFocused();
  await expect(reset).toHaveAttribute("aria-disabled", "true");
  await reset.press("Tab");
  await expect(reset).not.toBeFocused();
});

for (const { locale, path, width } of [
  { locale: "uz", path: "/", width: 320 },
  { locale: "uz", path: "/", width: 390 },
  { locale: "uz", path: "/", width: 1440 },
  { locale: "ru", path: "/ru", width: 320 },
  { locale: "ru", path: "/ru", width: 1280 },
  { locale: "en", path: "/en", width: 1440 },
] as const) {
  test(`the ${locale} hero is readable at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(path);
    const preview = page.locator("#finance-preview");
    await expect(preview.getByRole("heading", { name: financePreviewContent[locale].title })).toBeVisible();
    await expect(preview).toContainText(financePreviewContent[locale].disclaimer);
    const layout = await page.evaluate(() => {
      const overflow = document.documentElement.scrollWidth > innerWidth
        ? [...document.querySelectorAll<HTMLElement>("body *")]
          .filter((element) => !element.closest("details:not([open])") && (element.getBoundingClientRect().right > innerWidth + 1 || element.scrollWidth > element.clientWidth + 1))
          .slice(0, 12)
          .map((element) => ({ tag: element.tagName, className: element.className, width: element.scrollWidth, available: element.clientWidth, text: element.textContent?.slice(0, 80) }))
        : [];
      return { width: document.documentElement.scrollWidth, viewport: innerWidth, overflow };
    });
    expect(layout.width, JSON.stringify(layout.overflow)).toBeLessThanOrEqual(layout.viewport);
    for (const number of await preview.locator("[data-finance-total]").all()) {
      expect(await number.evaluate((element) => element.scrollWidth <= element.clientWidth + 1)).toBe(true);
    }
    for (const label of await preview.locator(".finance-filter-options span").all()) {
      const box = (await label.boundingBox())!;
      expect(box.width).toBeGreaterThanOrEqual(44);
      expect(box.height).toBeGreaterThanOrEqual(44);
    }
    if (width < 1280) {
      const actions = (await page.locator(".landing-hero-actions").boundingBox())!;
      const proof = (await preview.boundingBox())!;
      expect(actions.y + actions.height).toBeLessThan(proof.y);
      expect(await page.locator(".landing-hero-actions").evaluate((actions) => Boolean(actions.compareDocumentPosition(document.querySelector("#finance-preview")!) & Node.DOCUMENT_POSITION_FOLLOWING))).toBe(true);
    }
    // Review artifacts stay local and out of the shipping bundle.
    await page.screenshot({ path: `.impeccable/review/${locale}-${width}-viewport.png` });
    await page.screenshot({ path: `.impeccable/review/${locale}-${width}.png`, fullPage: true });
    await page.locator(".landing-hero").screenshot({ path: `.impeccable/review/${locale}-${width}-hero.png` });
    await page.locator(".workflow-overview").screenshot({ path: `.impeccable/review/${locale}-${width}-workflow.png` });
  });
}

test("owner shortcuts reach the requested chapter on a phone", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en");
  const chapter = page.locator('[data-journey-chapter="1"]');
  await chapter.locator("summary").click();
  await expect(chapter).not.toHaveAttribute("open");
  await page.getByRole("button", { name: "Who has overdue payments? Payments and debt" }).press("Enter");
  await expect(chapter).toHaveAttribute("open");
  await expect(chapter).toBeInViewport();
  await expect(chapter.locator("summary")).toBeFocused();
});

test.describe("static finance preview", () => {
  test.use({ javaScriptEnabled: false });
  test("shows all sample records with honest inactive controls without JavaScript", async ({ page }) => {
    await page.goto("/ru");
    const preview = page.locator("#finance-preview");
    await expect(preview.locator('[data-finance-total="revenue"]')).toHaveText("18 400 000сум");
    await expect(preview.locator("[data-finance-student]")).toHaveCount(3);
    await preview.locator("summary").click();
    await expect(preview.locator("[data-finance-student]").first()).toBeVisible();
    await expect(preview.getByRole("button", { name: financePreviewContent.ru.payment, exact: true })).toBeDisabled();
    await expect(preview.locator(".finance-noscript")).toBeVisible();
    await expect(preview.locator(".finance-noscript")).toHaveText(financePreviewContent.ru.noScript);
  });
});
