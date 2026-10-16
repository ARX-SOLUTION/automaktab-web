import { expect, test, type Page } from "@playwright/test";
import { contentEn } from "../../src/content/en";
import { contentRu } from "../../src/content/ru";
import { contentUz } from "../../src/content/uz";

const requests: unknown[] = [];

test("consolidation flow plays once, pauses for reading and offscreen, and respects reduced motion", async ({ page }) => {
  test.setTimeout(45_000);
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en");
  const flow = page.locator("#platform-flow");
  const stage = flow.locator(".flow-stage");
  const platform = flow.getByRole("group", { name: contentEn.problem.platformLabel, exact: true });
  const expectStatic = async () => {
    await expect(flow).toHaveAttribute("data-flow-state", "static");
    await expect(flow.getByRole("button")).toHaveCount(0);
    await expect(flow.locator(".flow-caption")).toHaveCount(0);
    for (const path of await flow.locator("[data-flow-path]").all()) await expect(path).toHaveCSS("stroke-dashoffset", "0px");
    for (const node of await flow.locator("[data-flow-source], [data-flow-output], .flow-platform-header, .flow-platform-mark, .flow-inlet, .flow-check").all()) {
      await expect(node).toBeVisible();
      await expect(node).toHaveCSS("transform", "none");
      expect((await node.getAttribute("style")) ?? "").not.toMatch(/transform/);
    }
    expect(pageErrors).toEqual([]);
  };
  const expectReadable = async () => {
    await expect.poll(() => flow.locator(".flow-node-copy strong, .flow-node-copy > span, .flow-brand strong, .flow-brand > span").evaluateAll((nodes) => nodes.every((node) => {
      const bounds = node.getBoundingClientRect();
      const style = getComputedStyle(node);
      return bounds.width > 0 && bounds.height > 0 && style.visibility === "visible" && style.opacity === "1";
    }))).toBe(true);
  };
  await flow.scrollIntoViewIfNeeded();
  await expect(flow.locator("[data-flow-source]")).toHaveCount(3);
  await expect(platform).toHaveCount(1);
  await expect(platform.locator("[data-flow-output]")).toHaveCount(3);
  for (const outcome of contentEn.problem.outcomes) {
    await expect(platform).toContainText(outcome.title);
    await expect(platform).toContainText(outcome.detail);
  }
  await expectStatic();
  await page.mouse.move(0, 0);
  const visualFrame = () => flow.evaluate((element) => ({
    phase: element.getAttribute("data-flow-phase"),
    values: Array.from(element.querySelectorAll("[data-flow-path], .flow-packet, .flow-check, .flow-platform-header, [data-flow-source]")).map((node) => {
      const style = getComputedStyle(node);
      return [style.strokeDashoffset, style.opacity, style.transform, style.backgroundColor, style.borderColor];
    }),
  }));
  const expectFrozen = async () => {
    const frame = await visualFrame();
    await page.waitForTimeout(250);
    expect(await visualFrame()).toEqual(frame);
  };
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(flow).toHaveAttribute("data-flow-state", "playing");
  // Hover pauses for reading; leaving resumes.
  await stage.hover();
  await expect(flow).toHaveAttribute("data-flow-state", "paused");
  await expectFrozen();
  await page.mouse.move(0, 0);
  await expect(flow).toHaveAttribute("data-flow-state", "playing");
  // Offscreen pauses too.
  await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" }));
  await expect(flow).toHaveAttribute("data-flow-state", "paused");
  await expectFrozen();
  await flow.scrollIntoViewIfNeeded();
  for (const phase of ["source-3", "resolve", "confirm-2", "hold"]) {
    await expect.poll(() => flow.getAttribute("data-flow-phase"), { intervals: [40], timeout: 10_000 }).toBe(phase);
    await expectReadable();
  }
  // It plays once and holds the finished diagram: no loop, no reset.
  await expect(flow).toHaveAttribute("data-flow-state", "complete");
  for (const check of await flow.locator(".flow-check path").all()) await expect(check).toHaveCSS("stroke-dashoffset", "0px");
  for (const path of await flow.locator("[data-flow-path]").all()) await expect(path).toHaveCSS("stroke-dashoffset", "0px");
  await expectFrozen();
  await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" }));
  await flow.scrollIntoViewIfNeeded();
  await expect(flow).toHaveAttribute("data-flow-state", "complete");
  await expect(flow).toHaveAttribute("data-flow-phase", "hold");
  await page.setViewportSize({ width: 1280, height: 900 });
  await expect(page.locator("#main-content")).not.toHaveAttribute("data-motion-changing", "true");
  await expectReadable();
  await expect(flow.locator(".flow-lines-desktop")).toBeVisible();
  await expect(flow.locator(".flow-lines-mobile")).toBeHidden();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expectStatic();
  expect(pageErrors).toEqual([]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(requests).toHaveLength(0);
});

test("mobile hero keeps actions before product proof and navigation accessible", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const actions = await page.locator('.landing-hero-actions').boundingBox();
  const proof = await page.locator('.landing-hero-proof').boundingBox();
  expect(actions!.y + actions!.height).toBeLessThan(proof!.y);
  expect((await page.locator('.site-header').boundingBox())!.height).toBeLessThan(140);
  await page.locator('.site-header-menu summary').click();
  await expect(page.locator('.site-header-menu nav')).toBeVisible();
  await page.locator('.site-header-menu a[href="/#savollar"]').click();
  await expect(page.locator('.site-header-menu')).not.toHaveAttribute("open");
  await expect(page.locator('#savollar')).toBeInViewport();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

for (const width of [320, 390, 640, 1024, 1280]) {
test(`consolidation diagram keeps one readable platform at ${width}px`, async ({ page }) => {
  await page.setViewportSize({ width, height: 900 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/ru");
  const flow = page.locator("#platform-flow");
  const platform = flow.getByRole("group", { name: contentRu.problem.platformLabel, exact: true });
  await expect(platform).toHaveCount(1);
  await expect(platform.locator("[data-flow-output]")).toHaveCount(3);
  const stage = (await page.locator(".flow-stage").boundingBox())!;
  for (const node of await flow.locator("[data-flow-source], [data-flow-platform]").all()) {
    const bounds = (await node.boundingBox())!;
    expect(bounds.x).toBeGreaterThanOrEqual(stage.x - 1);
    expect(bounds.y).toBeGreaterThanOrEqual(stage.y - 1);
    expect(bounds.x + bounds.width).toBeLessThanOrEqual(stage.x + stage.width + 1);
    expect(bounds.y + bounds.height).toBeLessThanOrEqual(stage.y + stage.height + 1);
  }
  const destination = (await platform.boundingBox())!;
  for (const source of await flow.locator("[data-flow-source]").all()) {
    const bounds = (await source.boundingBox())!;
    if (width < 640) expect(bounds.y + bounds.height).toBeLessThan(destination.y);
    else expect(bounds.x + bounds.width).toBeLessThan(destination.x);
  }
  for (const text of await flow.locator(".flow-node-copy strong, .flow-node-copy > span, .flow-brand strong, .flow-brand > span").all()) {
    await expect(text).toBeVisible();
    expect(await text.evaluate((element) => element.scrollWidth <= element.clientWidth + 1 && element.scrollHeight <= element.clientHeight + 1)).toBe(true);
  }
  await expect(flow.locator(".flow-caption")).toHaveCount(0);
  await expect(flow.getByRole("button")).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
}

test("motion resets when reduced motion is enabled", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page.locator('#tariflar').scrollIntoViewIfNeeded();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator('#pricing-heading')).toHaveCSS("opacity", "1");
  await expect(page.locator('#pricing-heading')).toHaveCSS("transform", "none");
  await page.goto('/ru');
  await expect(page.locator('h1')).toBeVisible();
  expect(await page.locator('main').count()).toBe(1);
});

test("Uzbek report hydrates without errors and initial sticky scenes start normally", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const journey = page.locator("#yol");
  await expect(journey).toHaveAttribute("data-story-ready", "true");
  await expect(journey.locator(".story-preview")).toHaveCSS("position", "sticky");
  await expect(page.locator("[data-report-branch]").first().locator("td").first()).toHaveText("7 200 000so‘m");
  await journey.locator("[data-journey-chapter]").nth(2).evaluate((element) => window.scrollTo({ top: window.scrollY + element.getBoundingClientRect().top - innerHeight * 0.45 + 48, behavior: "instant" }));
  const scene = journey.getByRole("tabpanel").locator("[data-product-scene]");
  await expect(journey.getByRole("tab").nth(2)).toHaveAttribute("aria-selected", "true");
  await expect(scene).toHaveAttribute("data-product-scene", "teacher");
  await expect(scene).toHaveAttribute("data-scene-state", "complete");
  for (const path of await scene.locator("[data-scene-path]").all()) await expect(path).toHaveCSS("stroke-dashoffset", "0px");
  expect(errors).toEqual([]);
});

test("natural scrolling reaches every student step in both directions", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/en");
  const scrollToChapter = async (chapter: ReturnType<Page["locator"]>) => {
    await chapter.evaluate((element) => window.scrollTo({ top: window.scrollY + element.getBoundingClientRect().top - innerHeight * 0.45 + 48, behavior: "instant" }));
  };
  const journey = page.locator("#yol");
  await expect(journey).toHaveAttribute("data-story-ready", "true");
  const titles = [contentEn.journey.previews.student.title, contentEn.journey.previews.payments.title, contentEn.scenes.teacher.title, contentEn.journey.previews.driving.title, contentEn.journey.previews.exam.title];
  for (const index of [0, 1, 2, 3, 4, 3, 2, 1, 0]) {
    await scrollToChapter(journey.locator("[data-journey-chapter]").nth(index));
    await expect(journey.getByRole("tab").nth(index)).toHaveAttribute("aria-selected", "true");
    await expect(journey.getByRole("tabpanel")).toContainText(titles[index]);
  }
});

for (const viewport of [{ width: 1280, height: 900 }, { width: 1440, height: 1000 }]) {
test(`live preference and desktop-to-phone changes restore the complete story at ${viewport.width}×${viewport.height}`, async ({ page }) => {
  await page.setViewportSize(viewport);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/en");
  const journey = page.locator("#yol");
  const chapter = journey.locator('[data-journey-chapter="2"]');
  await expect(journey).toHaveAttribute("data-story-ready", "true");
  await chapter.evaluate((element) => window.scrollTo({ top: window.scrollY + element.getBoundingClientRect().top - innerHeight * 0.35, behavior: "instant" }));
  await expect(journey).toHaveAttribute("data-active-stop", "2");
  const before = await chapter.boundingBox();
  expect(await page.evaluate(() => scrollY)).toBeGreaterThan(1000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(journey).not.toHaveAttribute("data-story-ready", "true");
  await expect(journey).toHaveAttribute("data-active-stop", "2");
  await expect(page.locator("main")).not.toHaveAttribute("data-motion-changing", "true");
  await expect.poll(() => chapter.evaluate(async (element, top) => {
    let drift = 0;
    for (let frame = 0; frame < 4; frame++) {
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
      drift = Math.max(drift, Math.abs(element.getBoundingClientRect().top - top));
    }
    return drift;
  }, before!.y)).toBeLessThanOrEqual(3);
  expect(await page.evaluate(() => scrollY)).toBeGreaterThan(1000);
  await expect(chapter.locator(".story-inline-preview")).toBeVisible();
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(journey).toHaveAttribute("data-story-ready", "true");
  await expect(journey).toHaveAttribute("data-active-stop", "2");
  await expect(page.locator("main")).not.toHaveAttribute("data-motion-changing", "true");
  await expect.poll(() => chapter.evaluate(async (element, top) => {
    let drift = 0;
    for (let frame = 0; frame < 4; frame++) {
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
      drift = Math.max(drift, Math.abs(element.getBoundingClientRect().top - top));
    }
    return drift;
  }, before!.y)).toBeLessThanOrEqual(3);
  expect(await page.evaluate(() => scrollY)).toBeGreaterThan(1000);
  await page.setViewportSize({ width: 844, height: 390 });
  await expect(journey.locator(".story-preview")).toBeHidden();
  // Stacked stories keep only the current chapter open; the step chosen on desktop stays current.
  await expect(journey.locator("details[open]")).toHaveCount(1);
  await expect(chapter.locator(".story-inline-preview")).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(journey).not.toHaveAttribute("data-story-ready", "true");
  for (const path of await page.locator("[data-report-path], #yol details[open] [data-scene-path]").all()) await expect(path).toHaveCSS("stroke-dashoffset", "0px");
  for (const example of await page.locator("#yol details[open] .story-inline-preview").all()) {
    await expect(example).toBeVisible();
    await expect(example).toHaveCSS("transform", "none");
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
}

for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }]) {
  test(`sticky header keeps login and language once scrolled without shifting the page at ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.addInitScript(() => {
      (window as unknown as { layoutShift: number }).layoutShift = 0;
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as unknown as Array<{ value: number; hadRecentInput: boolean }>) {
          if (!entry.hadRecentInput) (window as unknown as { layoutShift: number }).layoutShift += entry.value;
        }
      }).observe({ type: "layout-shift", buffered: true });
    });
    await page.goto("/");
    const header = page.locator(".site-header");
    const geometry = () => header.evaluate((element) => ({
      box: element.getBoundingClientRect().height,
      visible: element.getBoundingClientRect().height + new DOMMatrix(getComputedStyle(element, "::before").transform).m42,
      mainTop: document.getElementById("main-content")!.offsetTop,
    }));
    await expect(header).not.toHaveClass(/is-scrolled/);
    const top = await geometry();
    expect(top.visible).toBe(top.box);

    await page.mouse.wheel(0, 900);
    await expect(header).toHaveClass(/is-scrolled/);
    // Below 1280px nothing is hidden any more; from 1280px the single row tucks up slightly.
    if (viewport.width >= 1280) await expect.poll(async () => (await geometry()).visible).toBeLessThan(top.box - 8);
    const scrolled = await geometry();
    if (viewport.width < 1280) expect(scrolled.visible).toBe(top.box);
    expect(scrolled.box).toBe(top.box);
    expect(scrolled.mainTop).toBe(top.mainTop);
    const controls = header.locator(".site-header-controls");
    await expect(controls).toBeVisible();
    await expect(controls).toHaveCSS("opacity", "1");
    await expect(controls).not.toHaveCSS("pointer-events", "none");
    expect(await page.evaluate(() => (window as unknown as { layoutShift: number }).layoutShift)).toBe(0);

    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await expect(header).not.toHaveClass(/is-scrolled/);
  });
}

test("scene motion pauses outside the viewport or on hidden documents and cleans up for reduced motion", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/en");
  const proof = page.locator('[data-module-proof="leads"]');
  const scene = proof.locator("[data-product-scene]");
  await scene.scrollIntoViewIfNeeded();
  await expect(scene).toHaveAttribute("data-scene-state", "playing");
  await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" }));
  await expect(scene).toHaveAttribute("data-scene-state", "paused");
  const visualFrame = () => scene.locator("[data-scene-path], [data-scene-node]").evaluateAll((nodes) => nodes.map((node) => `${getComputedStyle(node).strokeDashoffset}|${getComputedStyle(node).transform}`));
  const offscreenFrame = await visualFrame();
  await page.waitForTimeout(250);
  expect(await visualFrame()).toEqual(offscreenFrame);
  await scene.scrollIntoViewIfNeeded();
  await expect(scene).toHaveAttribute("data-scene-state", "playing");
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", { configurable: true, value: true });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect(scene).toHaveAttribute("data-scene-state", "paused");
  const hiddenFrame = await visualFrame();
  await page.waitForTimeout(250);
  expect(await visualFrame()).toEqual(hiddenFrame);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.evaluate(() => {
    Reflect.deleteProperty(document, "hidden");
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect(scene).toHaveAttribute("data-scene-state", "static");
  for (const path of await scene.locator("[data-scene-path]").all()) await expect(path).toHaveCSS("stroke-dashoffset", "0px");
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });
  test("consolidation diagram remains complete without JavaScript", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/ru");
    const flow = page.locator("#platform-flow");
    const platform = flow.getByRole("group", { name: contentRu.problem.platformLabel, exact: true });
    await expect(flow).toHaveAttribute("data-flow-state", "static");
    await expect(platform).toHaveCount(1);
    await expect(platform.locator("[data-flow-output]")).toHaveCount(3);
    for (const text of await flow.locator(".flow-node-copy strong, .flow-node-copy > span").all()) await expect(text).toBeVisible();
    for (const path of await flow.locator("[data-flow-path]").all()) await expect(path).toHaveCSS("stroke-dashoffset", "0px");
    await expect(flow.locator(".flow-caption")).toHaveCount(0);
    await expect(flow.getByRole("button")).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
  test("all story examples remain accessible through native disclosures", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator("#rollar")).toHaveCount(0);
    await expect(page.locator("#yol").getByRole("tab")).toHaveCount(0);
    await expect(page.locator("#yol [data-journey-chapter]")).toHaveCount(5);
    for (const chapter of await page.locator("#yol [data-journey-chapter]").all()) await expect(chapter.locator(".story-inline-preview")).toBeVisible();
    await expect(page.locator("[data-report-branch]")).toHaveCount(3);
    await expect(page.locator("[data-report-total]")).toHaveAttribute("data-report-total-students", "8");
    await expect(page.locator("#morning-report")).toContainText(contentEn.morningReport.sampleCaption);
    await expect(page.locator("[data-module-proof]")).toHaveCount(3);
  });
});

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
  await form.getByLabel("Full name *", { exact: true }).fill("Demo Director");
  await form.getByLabel("Phone number *", { exact: true }).fill("+998 90 000 00 00");
  await form.getByLabel("Driving school name *", { exact: true }).fill("Sample Driving School");
  await form.getByLabel("City or region", { exact: true }).selectOption("Tashkent City");
  await form.getByRole("button", { name: "2–3", exact: true }).click();
  await form.getByRole("button", { name: "100–500", exact: true }).click();
  await form.getByRole("button", { name: "Payments and debt", exact: true }).click();
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
    flows: ["Payments and debt"],
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
  await expect(form.getByLabel("Full name *", { exact: true })).toBeFocused();
  expect(requests).toHaveLength(0);
});

test("keeps trial details available after a failed submission", async ({ page }) => {
  await page.route("**/api/lead", (route) => route.fulfill({
    status: 200, contentType: "application/json", body: '{"error":"test failure"}',
  }));
  const form = await openForm(page);
  await form.getByLabel("Full name *", { exact: true }).fill("Demo Director");
  await form.getByLabel("Phone number *", { exact: true }).fill("+998 90 000 00 00");
  await form.getByLabel("Driving school name *", { exact: true }).fill("Sample Driving School");
  await form.getByRole("checkbox").check();
  await form.locator('button[type="submit"]').click();
  await expect(form.getByRole("alert")).toHaveText(contentEn.pricing.form.networkError);
  await expect(form.getByLabel("Full name *", { exact: true })).toHaveValue("Demo Director");
  await expect(form.locator('button[type="submit"]')).toBeEnabled();
});

test("guards duplicate submit, preserves rejected details and counts only a confirmed retry", async ({ page }) => {
  const form = await openForm(page);
  await form.getByLabel("Full name *", { exact: true }).fill("Synthetic Director");
  await form.getByLabel("Phone number *", { exact: true }).fill("+998 90 000 00 00");
  await form.getByLabel("Driving school name *", { exact: true }).fill("Synthetic School");
  await form.getByRole("checkbox").check();
  await page.evaluate(() => {
    const events: unknown[] = [];
    (window as unknown as Window & { acceptedEvents: unknown[] }).acceptedEvents = events;
    window.umami = { track: (name, data) => { events.push({ name, data }); } };
  });
  let attempts = 0;
  let release!: () => void;
  const held = new Promise<void>((resolve) => { release = resolve; });
  await page.route("**/api/lead", async (route) => {
    attempts += 1;
    if (attempts === 1) {
      await held;
      await route.fulfill({ status: 503, json: { ok: false, code: "delivery_unavailable" } });
    } else {
      await route.fulfill({ status: 200, json: { ok: true } });
    }
  });
  await form.locator("form").evaluate((element) => {
    element.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    element.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
  });
  await expect(form.locator('button[type="submit"]')).toBeDisabled();
  await expect.poll(() => attempts).toBe(1);
  release();
  await expect(form.getByRole("alert")).toHaveText(contentEn.pricing.form.networkError);
  await expect(form.getByLabel("Full name *", { exact: true })).toHaveValue("Synthetic Director");
  await expect(form.getByLabel("Phone number *", { exact: true })).toHaveValue("+998 90 000 00 00");
  expect(await page.evaluate(() => (window as unknown as Window & { acceptedEvents: unknown[] }).acceptedEvents)).toEqual([]);
  await form.locator('button[type="submit"]').click();
  await expect(form.getByRole("status")).toContainText(contentEn.pricing.form.success.title);
  expect(attempts).toBe(2);
  expect(await page.evaluate(() => (window as unknown as Window & { acceptedEvents: unknown[] }).acceptedEvents)).toEqual([{ name: "intro_submit", data: { locale: "en" } }]);
});

test("a stalled lead request times out without clearing the form or recording success", async ({ page }) => {
  test.setTimeout(25_000);
  const form = await openForm(page);
  await form.getByLabel("Full name *", { exact: true }).fill("Synthetic Director");
  await form.getByLabel("Phone number *", { exact: true }).fill("+998 90 000 00 00");
  await form.getByLabel("Driving school name *", { exact: true }).fill("Synthetic School");
  await form.getByRole("checkbox").check();
  await page.evaluate(() => {
    const events: unknown[] = [];
    (window as unknown as Window & { acceptedEvents: unknown[] }).acceptedEvents = events;
    window.umami = { track: (name, data) => { events.push({ name, data }); } };
  });
  await page.route("**/api/lead", () => { /* Deliberately leave the synthetic transport unresolved. */ });
  await form.locator('button[type="submit"]').click();
  await expect(form.getByRole("alert")).toHaveText(contentEn.pricing.form.networkError, { timeout: 15_000 });
  await expect(form.getByLabel("Full name *", { exact: true })).toHaveValue("Synthetic Director");
  await expect(form.getByLabel("Phone number *", { exact: true })).toHaveValue("+998 90 000 00 00");
  await expect(form.locator('button[type="submit"]')).toBeEnabled();
  await expect(form.getByRole("status")).toHaveCount(0);
  expect(await page.evaluate(() => (window as unknown as Window & { acceptedEvents: unknown[] }).acceptedEvents)).toEqual([]);
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
  expect(await analytics).toMatchObject({ event: "cta_demo_click", params: { locale: "en" } });
  await expect(page).toHaveURL("https://app.automaktab.uz/login?demo=1&utm_source=site&utm_content=hero_lane");
  expect(requests).toHaveLength(0);
});

for (const viewport of [
  { width: 320, height: 740, path: "/ru" },
  { width: 390, height: 844, path: "/" },
  { width: 844, height: 390, path: "/en" },
  { width: 1280, height: 800, path: "/ru" },
  { width: 1440, height: 1000, path: "/en" },
]) {
  test(`sequential stories, report and modules stay usable at ${viewport.width}×${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(viewport.path);
    const journey = page.locator("#yol");
    const content = viewport.path === "/ru" ? contentRu : viewport.path === "/en" ? contentEn : contentUz;
    const previewTitles = [content.journey.previews.student.title, content.journey.previews.payments.title, content.scenes.teacher.title, content.journey.previews.driving.title, content.journey.previews.exam.title];
    await expect(journey.getByRole("tab")).toHaveCount(0);
    // Stacked chapters work as an accordion: opening one closes the others.
    for (let index = 0; index < 5; index++) {
      const chapter = journey.locator("[data-journey-chapter]").nth(index);
      if (index > 0) await chapter.locator("summary").click();
      await expect(chapter).toHaveAttribute("open", "");
      await expect(journey.locator("details[open]")).toHaveCount(1);
      const example = chapter.locator(".story-inline-preview");
      await expect(example).toBeVisible();
      await expect(example).toContainText(previewTitles[index]);
      await expect(example).toContainText(content.scenes.sampleLabel);
      expect(await example.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
    }
    await expect(page.locator("[data-report-branch]")).toHaveCount(3);
    await expect(page.locator("[data-report-total]")).toHaveAttribute("data-report-total-revenue", "14800000");
    await expect(page.locator("#morning-report")).toContainText(content.morningReport.sampleCaption);
    const moduleTabs = page.locator(".resources-section").getByRole("tab");
    await expect(moduleTabs).toHaveCount(viewport.width < 768 ? 3 : 0);
    for (const [index, feature] of content.resources.modules.entries()) {
      const proof = page.locator(`[data-module-proof="${feature.kind}"]`);
      if (viewport.width < 768) {
        await moduleTabs.nth(index).click();
        await expect(moduleTabs.nth(index)).toHaveAttribute("aria-selected", "true");
        await expect(page.locator("[data-module-proof]:visible")).toHaveCount(1);
      }
      await expect(proof).toContainText(feature.title);
      await expect(proof.locator("[data-product-scene]")).toBeVisible();
      expect(await proof.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });
}
