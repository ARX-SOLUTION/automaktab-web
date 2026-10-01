import { expect, test, type Page } from "@playwright/test";
import { contentEn } from "../../src/content/en";

const requests: unknown[] = [];

test.beforeEach(async ({ page }) => {
  requests.splice(0);
  // Intercept the active form endpoint before navigation; tests never send real leads.
  await page.route("**/api/lead", async (route) => {
    requests.push(route.request().postDataJSON());
    await route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' });
  });
});

async function openForm(page: Page) {
  await page.goto("/en");
  await page.locator('main a[href="#tariflar"]').first().click();
  return page.locator("#tariflar");
}

test("submits the trial form to the active lead endpoint with pending and success states", async ({ page }) => {
  const form = await openForm(page);
  await form.getByLabel("Full Name *", { exact: true }).fill("Demo Director");
  await form.getByLabel("Phone Number *", { exact: true }).fill("+998 90 000 00 00");
  await form.getByLabel("Driving School Name *", { exact: true }).fill("Sample Driving School");
  await form.getByLabel("City / Region", { exact: true }).selectOption("Tashkent City");
  await form.getByRole("button", { name: "2–3", exact: true }).click();
  await form.getByRole("button", { name: "100–500", exact: true }).click();
  await form.getByRole("button", { name: "Tuition & Debt", exact: true }).click();
  await form.getByRole("checkbox").check();

  let releaseResponse!: () => void;
  const responseReady = new Promise<void>((resolve) => { releaseResponse = resolve; });
  await page.route("**/api/lead", async (route) => {
    await responseReady;
    await route.fallback();
  });
  const submission = page.waitForRequest((request) => request.url().endsWith("/api/lead"));
  const submit = form.locator('button[type="submit"]');
  await submit.click();
  const captured = await submission;
  await expect(submit).toBeDisabled();
  await expect(submit).toContainText(contentEn.pricing.form.submitting);
  expect(captured.method()).toBe("POST");
  expect(captured.postDataJSON()).toEqual({
    name: "Demo Director",
    phone: "+998 90 000 00 00",
    school: "Sample Driving School",
    city: "Tashkent City",
    branches: "2–3",
    students: "100–500",
    flows: ["Tuition & Debt"],
    consent: true,
    company_website: "",
    page_url: expect.stringMatching(/\/en(?:#tariflar)?$/),
    submitted_at: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T/),
  });
  releaseResponse();
  await expect(form.getByRole("status")).toContainText(contentEn.pricing.form.success.title);
  await expect(form.locator("form")).toHaveCount(0);
  expect(requests).toHaveLength(1);
});

test("shows required-field errors without sending a lead", async ({ page }) => {
  const form = await openForm(page);
  await form.locator('button[type="submit"]').click();
  await expect(form.getByRole("alert")).toHaveCount(4);
  await expect(form.getByLabel("Full Name *", { exact: true })).toBeFocused();
  expect(requests).toHaveLength(0);
});

test("keeps trial details available after a failed submission", async ({ page }) => {
  await page.route("**/api/lead", (route) => route.fulfill({
    status: 500, contentType: "application/json", body: '{"error":"test failure"}',
  }));
  const form = await openForm(page);
  await form.getByLabel("Full Name *", { exact: true }).fill("Demo Director");
  await form.getByLabel("Phone Number *", { exact: true }).fill("+998 90 000 00 00");
  await form.getByLabel("Driving School Name *", { exact: true }).fill("Sample Driving School");
  await form.getByRole("checkbox").check();
  await form.locator('button[type="submit"]').click();
  await expect(form.getByRole("alert")).toHaveText(contentEn.pricing.form.networkError);
  await expect(form.getByLabel("Full Name *", { exact: true })).toHaveValue("Demo Director");
  await expect(form.locator('button[type="submit"]')).toBeEnabled();
});

test("opens the self-service demo from the tracked primary link", async ({ page }) => {
  await page.route("https://app.automaktab.uz/**", (route) => route.fulfill({
    status: 200, contentType: "text/html", body: "<!doctype html><title>Demo login stub</title>",
  }));
  await page.goto("/en");
  const demo = page.locator('main a[href*="utm_content=hero_lane"]');
  await expect(demo).toHaveAttribute("href", "https://app.automaktab.uz/login?demo=1&utm_source=site&utm_content=hero_lane");
  const analytics = page.evaluate(() => new Promise((resolve) => {
    window.addEventListener("automaktab_analytics", (event) => resolve((event as CustomEvent).detail), { once: true });
  }));
  await demo.click();
  expect(await analytics).toMatchObject({ event: "cta_demo_click", params: { location: "hero_lane" } });
  await expect(page).toHaveURL("https://app.automaktab.uz/login?demo=1&utm_source=site&utm_content=hero_lane");
  expect(requests).toHaveLength(0);
});

for (const viewport of [
  { width: 375, height: 812, path: "/en" },
  { width: 390, height: 844, path: "/" },
  { width: 844, height: 390, path: "/en" },
  { width: 768, height: 1024, path: "/ru" },
  { width: 1440, height: 1000, path: "/en" },
]) {
  test(`journey, role tabs and attendance stay usable at ${viewport.width}×${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(viewport.path);
    const journey = page.locator("#yol");
    const stops = journey.getByRole("tab");
    await expect(stops).toHaveCount(5);
    for (let index = 0; index < 5; index++) {
      await stops.nth(index).click();
      await expect(stops.nth(index)).toHaveAttribute("aria-selected", "true");
      const bounds = await stops.nth(index).boundingBox();
      expect(bounds?.width).toBeGreaterThanOrEqual(44);
      expect(bounds?.height).toBeGreaterThanOrEqual(44);
      expect(bounds!.x).toBeGreaterThanOrEqual(0);
      expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(viewport.width);
      expect(await journey.getByRole("tabpanel").evaluate((panel) => panel.scrollWidth <= panel.clientWidth)).toBe(true);
    }
    await stops.nth(4).press("Home");
    await expect(stops.nth(0)).toBeFocused();
    await stops.nth(0).press("ArrowRight");
    await expect(stops.nth(1)).toBeFocused();
    await expect(stops.nth(1)).toHaveAttribute("aria-selected", "true");
    await journey.getByRole("button").last().click();
    await expect(stops.nth(2)).toHaveAttribute("aria-selected", "true");

    const roles = page.locator("#rollar");
    const tabs = roles.getByRole("tab");
    await tabs.nth(0).click();
    await tabs.nth(0).press("End");
    await expect(tabs.nth(3)).toBeFocused();
    await expect(roles.getByRole("tabpanel")).toHaveAttribute("aria-labelledby", "role-tab-3");
    await tabs.nth(3).press("ArrowRight");
    await expect(tabs.nth(0)).toBeFocused();

    const attendance = page.locator("#sinab");
    const radios = attendance.getByRole("radiogroup").first().getByRole("radio");
    await radios.nth(0).focus();
    await radios.nth(0).press("ArrowRight");
    await expect(radios.nth(1)).toBeFocused();
    await expect(radios.nth(1)).toHaveAttribute("aria-checked", "true");
    await radios.nth(1).press("End");
    await expect(radios.nth(3)).toHaveAttribute("aria-checked", "true");
    await radios.nth(3).press("End");
    await expect(radios.nth(3)).toHaveAttribute("aria-checked", "true");
    await radios.nth(3).click();
    await expect(radios.nth(3)).toHaveAttribute("aria-checked", "false");
    for (const radio of await radios.all()) {
      const bounds = await radio.boundingBox();
      expect(bounds?.width).toBeGreaterThanOrEqual(44);
      expect(bounds?.height).toBeGreaterThanOrEqual(44);
    }
    await attendance.getByRole("button").click();
    await expect(attendance.locator('[role="radio"][aria-checked="true"]')).toHaveCount(6);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await page.reload();
    await expect(attendance.locator('[role="radio"][aria-checked="true"]')).toHaveCount(0);
  });
}
