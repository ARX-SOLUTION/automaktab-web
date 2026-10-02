import { expect, test, type Page } from "@playwright/test";
import { contentEn } from "../../src/content/en";
import { contentRu } from "../../src/content/ru";
import { contentUz } from "../../src/content/uz";

const requests: unknown[] = [];

test("consolidation flow automatically repeats, pauses for reading and respects reduced motion", async ({ page }) => {
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
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(flow).toHaveAttribute("data-flow-state", "playing");
  for (const phase of ["source-1", "source-2", "source-3", "resolve", "confirm-2", "hold"]) {
    await expect.poll(() => flow.getAttribute("data-flow-phase"), { intervals: [40], timeout: 10_000 }).toBe(phase);
    await expectReadable();
  }
  for (const check of await flow.locator(".flow-check path").all()) await expect(check).toHaveCSS("stroke-dashoffset", "0px");
  const firstCycle = Number(await flow.getAttribute("data-flow-cycle"));
  await expect.poll(async () => Number(await flow.getAttribute("data-flow-cycle")), { timeout: 10_000 }).toBeGreaterThan(firstCycle);
  await expect.poll(() => flow.locator(".flow-lines-mobile .flow-packet").evaluateAll((packets) => packets.some((packet) => Number(getComputedStyle(packet).opacity) > 0.8))).toBe(true);
  const visualFrame = () => flow.evaluate((element) => ({
    phase: element.getAttribute("data-flow-phase"),
    cycle: element.getAttribute("data-flow-cycle"),
    values: Array.from(element.querySelectorAll("[data-flow-path], .flow-packet, .flow-check, .flow-platform-header, [data-flow-source]")).map((node) => {
      const style = getComputedStyle(node);
      return [style.strokeDashoffset, style.opacity, style.transform, style.backgroundColor, style.borderColor];
    }),
  }));
  await stage.hover();
  await expect(flow).toHaveAttribute("data-flow-state", "paused");
  const readingFrame = await visualFrame();
  await page.waitForTimeout(250);
  expect(await visualFrame()).toEqual(readingFrame);
  await stage.focus();
  await page.mouse.move(0, 0);
  await expect(stage).toBeFocused();
  await expect(flow).toHaveAttribute("data-flow-state", "paused");
  await page.setViewportSize({ width: 1280, height: 900 });
  // Responsive GSAP rebuilding restores the reading position over animation frames.
  await expect(page.locator("#main-content")).not.toHaveAttribute("data-motion-changing", "true");
  await expect(flow).toHaveAttribute("data-flow-state", "paused");
  await expectReadable();
  await expect(flow.locator(".flow-lines-desktop")).toBeVisible();
  await expect(flow.locator(".flow-lines-mobile")).toBeHidden();
  const routeDistances = await flow.locator(".flow-lines-desktop").evaluate((svg) => Array.from(svg.querySelectorAll("g")).flatMap((group) => {
    const packet = group.querySelector<SVGCircleElement>(".flow-packet")!;
    if (Number(getComputedStyle(packet).opacity) <= 0.8) return [];
    const path = group.querySelector<SVGPathElement>("[data-flow-path]")!;
    const point = new DOMPoint(0, 0).matrixTransform(packet.getScreenCTM()!);
    const length = path.getTotalLength();
    return [Math.min(...Array.from({ length: 101 }, (_, index) => {
      const sample = path.getPointAtLength(length * index / 100);
      const world = new DOMPoint(sample.x, sample.y).matrixTransform(path.getScreenCTM()!);
      return Math.hypot(point.x - world.x, point.y - world.y);
    }))];
  }));
  expect(routeDistances.length).toBeGreaterThan(0);
  for (const distance of routeDistances) expect(distance).toBeLessThan(3);
  await page.keyboard.press("Tab");
  await expect(flow).toHaveAttribute("data-flow-state", "playing");
  await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" }));
  await expect(flow).toHaveAttribute("data-flow-state", "paused");
  const offscreenFrame = await visualFrame();
  await page.waitForTimeout(250);
  expect(await visualFrame()).toEqual(offscreenFrame);
  await flow.scrollIntoViewIfNeeded();
  await expect(flow).toHaveAttribute("data-flow-state", "playing");
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", { configurable: true, value: true });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect(flow).toHaveAttribute("data-flow-state", "paused");
  const hiddenFrame = await visualFrame();
  await page.waitForTimeout(250);
  expect(await visualFrame()).toEqual(hiddenFrame);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.evaluate(() => {
    Reflect.deleteProperty(document, "hidden");
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expectStatic();
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await flow.scrollIntoViewIfNeeded();
  await expect(flow).toHaveAttribute("data-flow-state", "playing");
  await expect(flow).toHaveAttribute("data-flow-phase", "hold", { timeout: 8_000 });
  await expectReadable();
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
  await page.locator('#qanday').scrollIntoViewIfNeeded();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator('#how-it-works-heading')).toHaveCSS("opacity", "1");
  await expect(page.locator('#how-it-works-heading')).toHaveCSS("transform", "none");
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
  const roles = page.locator("#rollar");
  await expect(journey).toHaveAttribute("data-story-ready", "true");
  await expect(roles).toHaveAttribute("data-story-ready", "true");
  await expect(journey.locator(".story-preview")).toHaveCSS("position", "sticky");
  await expect(page.locator("[data-report-branch]").first().locator("td").first()).toHaveText("7 200 000so‘m");
  await roles.locator("[data-role-chapter]").first().evaluate((element) => window.scrollTo({ top: window.scrollY + element.getBoundingClientRect().top - innerHeight * 0.45 + 48, behavior: "instant" }));
  const scene = roles.getByRole("tabpanel").locator("[data-product-scene]");
  await expect(roles.getByRole("tab").first()).toHaveAttribute("aria-selected", "true");
  await expect(scene).toHaveAttribute("data-product-scene", "director");
  await expect(scene).toHaveAttribute("data-scene-state", "complete");
  for (const path of await scene.locator("[data-scene-path]").all()) await expect(path).toHaveCSS("stroke-dashoffset", "0px");
  expect(errors).toEqual([]);
});

test("natural scrolling reaches every student step and team role in both directions", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/en");
  const scrollToChapter = async (chapter: ReturnType<Page["locator"]>) => {
    await chapter.evaluate((element) => window.scrollTo({ top: window.scrollY + element.getBoundingClientRect().top - innerHeight * 0.45 + 48, behavior: "instant" }));
  };
  const journey = page.locator("#yol");
  const roles = page.locator("#rollar");
  await expect(journey).toHaveAttribute("data-story-ready", "true");
  await expect(roles).toHaveAttribute("data-story-ready", "true");
  const titles = [contentEn.journey.previews.student.title, contentEn.journey.previews.payments.title, contentEn.scenes.teacher.title, contentEn.journey.previews.driving.title, contentEn.journey.previews.exam.title];
  for (const index of [0, 1, 2, 3, 4, 3, 2, 1, 0]) {
    await scrollToChapter(journey.locator("[data-journey-chapter]").nth(index));
    await expect(journey.getByRole("tab").nth(index)).toHaveAttribute("aria-selected", "true");
    await expect(journey.getByRole("tabpanel")).toContainText(titles[index]);
  }
  for (const index of [0, 1, 2, 3, 2, 1, 0]) {
    await scrollToChapter(roles.locator("[data-role-chapter]").nth(index));
    await expect(roles.getByRole("tab").nth(index)).toHaveAttribute("aria-selected", "true");
    await expect(roles.getByRole("tabpanel").locator("[data-product-scene]")).toHaveAttribute("data-product-scene", contentEn.roles.tabs[index].scene);
  }
  await roles.getByRole("tab").nth(0).focus();
  await roles.getByRole("tab").nth(0).press("End");
  await scrollToChapter(roles.locator("[data-role-chapter]").nth(1));
  await expect(roles.getByRole("tab").nth(3)).toBeFocused();
  await expect(roles.getByRole("tab").nth(3)).toHaveAttribute("aria-selected", "true");
});

test("role scenes show synthetic workflows, preserve keyboard focus and stop motion on preference changes", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/en");
  const roles = page.locator("#rollar");
  await roles.locator("[data-role-chapter]").first().evaluate((element) => window.scrollTo({ top: window.scrollY + element.getBoundingClientRect().top - innerHeight * 0.45 + 48, behavior: "instant" }));
  await expect(roles.getByRole("tab").first()).toHaveAttribute("aria-selected", "true");
  const tabs = roles.getByRole("tab");
  const panel = roles.getByRole("tabpanel");
  const scene = panel.locator("[data-product-scene]");
  const panelId = (await panel.getAttribute("id"))!;
  for (const tab of await tabs.all()) await expect(tab).toHaveAttribute("aria-controls", panelId);
  await expect(roles.getByRole("group", { name: contentEn.scenes.director.title })).toBeVisible();
  await expect(scene).toHaveAttribute("data-product-scene", "director");
  await expect(scene).toContainText(contentEn.scenes.sampleLabel);
  await expect(scene).toHaveAttribute("data-scene-state", "complete");
  for (const fallback of await roles.locator(".story-inline-preview").all()) await expect(fallback).toBeHidden();
  for (const [index, kind] of ["teacher", "registrar", "accountant"].entries()) {
    await tabs.nth(index).press("ArrowRight");
    await expect(tabs.nth(index + 1)).toBeFocused();
    await expect(scene).toHaveAttribute("data-product-scene", kind);
    await expect(scene).toHaveAttribute("data-scene-state", "complete");
  }
  await tabs.nth(3).press("Home");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(tabs.nth(0)).toBeFocused();
  await expect(scene).toHaveAttribute("data-scene-state", "static");
  await expect(scene).toContainText(contentEn.scenes.director.revenue);
  await expect(scene).toContainText(contentEn.scenes.director.debt);
  await expect(page.locator('img[src*="images%2Fdemo"], img[src*="/images/demo/"]')).toHaveCount(0);
  await tabs.nth(0).press("ArrowRight");
  await expect(scene).toBeVisible();
  await expect(scene).toHaveAttribute("data-scene-state", "static");
  for (const status of contentEn.scenes.teacher.statuses) await expect(scene).toContainText(status);
});

for (const viewport of [{ width: 1280, height: 900 }, { width: 1440, height: 1000 }]) {
test(`live preference and desktop-to-phone changes restore the complete story at ${viewport.width}×${viewport.height}`, async ({ page }) => {
  await page.setViewportSize(viewport);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/en");
  const roles = page.locator("#rollar");
  const chapter = roles.locator('[data-role-chapter="2"]');
  await expect(roles).toHaveAttribute("data-story-ready", "true");
  await chapter.evaluate((element) => window.scrollTo({ top: window.scrollY + element.getBoundingClientRect().top - innerHeight * 0.35, behavior: "instant" }));
  await expect(roles).toHaveAttribute("data-active-role", "2");
  const before = await chapter.boundingBox();
  expect(await page.evaluate(() => scrollY)).toBeGreaterThan(1000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(roles).not.toHaveAttribute("data-story-ready", "true");
  await expect(roles).toHaveAttribute("data-active-role", "2");
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
  await expect(roles).toHaveAttribute("data-story-ready", "true");
  await expect(roles).toHaveAttribute("data-active-role", "2");
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
  await expect(roles.locator(".story-preview")).toBeHidden();
  for (const example of await page.locator("#yol .story-inline-preview, #rollar .story-inline-preview").all()) await expect(example).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(roles).not.toHaveAttribute("data-story-ready", "true");
  for (const path of await page.locator("[data-report-path], #rollar [data-scene-path]").all()) await expect(path).toHaveCSS("stroke-dashoffset", "0px");
  for (const example of await page.locator("#yol .story-inline-preview, #rollar .story-inline-preview").all()) {
    await expect(example).toBeVisible();
    await expect(example).toHaveCSS("transform", "none");
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
}

const SAMPLE_LABELS = ["Present", "Present", "Late", "Present", "Absent", "Excused"];

async function attendanceMarks(page: Page) {
  return page.locator("#sinab .attendance-row").evaluateAll((rows) => rows.map((row) => row.querySelector('[aria-checked="true"] .attendance-status-label')?.textContent ?? null));
}

async function scrollToRowLine(page: Page, rowIndex: number) {
  // Rows are marked when their top crosses 70% of the viewport.
  await page.locator("#sinab .attendance-row").nth(rowIndex).evaluate((row) => {
    window.scrollTo({ top: scrollY + row.getBoundingClientRect().top - innerHeight * 0.7 + 4, behavior: "instant" });
  });
}

for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }]) {
  test(`attendance demo marks rows while scrolling, then hands control to the visitor at ${viewport.width}px`, async ({ page }) => {
    const pageErrors: string[] = [];
    page.on("pageerror", (error) => pageErrors.push(error.message));
    await page.setViewportSize(viewport);
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/en");
    const attendance = page.locator("#sinab");
    const progress = attendance.getByRole("progressbar");
    const count = (key: string) => attendance.locator(`[data-attendance-count="${key}"] dd`);
    const today = attendance.locator("[data-attendance-history]").last();
    const feedback = attendance.getByRole("status");
    await attendance.evaluate((element) => window.scrollTo({ top: scrollY + element.getBoundingClientRect().top - innerHeight * 1.5, behavior: "instant" }));
    await expect.poll(() => attendanceMarks(page)).toEqual(Array(6).fill(null));
    await expect(progress).toHaveAttribute("aria-valuenow", "0");
    await expect(today).toHaveAttribute("data-attendance-history", "unmarked");

    await scrollToRowLine(page, 2);
    await expect.poll(() => attendanceMarks(page)).toEqual([...SAMPLE_LABELS.slice(0, 3), null, null, null]);
    await scrollToRowLine(page, 5);
    await expect.poll(() => attendanceMarks(page)).toEqual(SAMPLE_LABELS);
    await expect(progress).toHaveAttribute("aria-valuenow", "6");
    for (const [key, value] of [["keldi", "3"], ["kechikdi", "1"], ["kelmadi", "1"], ["uzrli", "1"]]) await expect(count(key)).toHaveText(value);
    await expect(today).toHaveAttribute("data-attendance-history", "kelmadi");
    await expect(attendance.getByRole("article")).toContainText(contentEn.attendanceDemo.card.debt);
    // Scroll-driven marks are not announced; only the visitor's own changes are.
    await expect(feedback).toHaveText("");

    await scrollToRowLine(page, 3);
    await expect.poll(() => attendanceMarks(page)).toEqual([...SAMPLE_LABELS.slice(0, 4), null, null]);
    const linkedRow = attendance.getByRole("radiogroup").nth(4).getByRole("radio");
    await linkedRow.nth(0).click();
    await expect(today).toHaveAttribute("data-attendance-history", "keldi");
    await expect(feedback).toHaveText(contentEn.attendanceDemo.unmarkedTemplate.replace("{count}", "1"));
    await scrollToRowLine(page, 0);
    await page.waitForTimeout(300);
    expect(await attendanceMarks(page)).toEqual([...SAMPLE_LABELS.slice(0, 4), "Present", null]);
    await expect(attendance.getByRole("link", { name: contentEn.attendanceDemo.ctaButton })).toHaveAttribute("href", /app\.automaktab\.uz\/login\?demo=1.*utm_content=attendance_demo/);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect(pageErrors).toEqual([]);
  });

  test(`reduced motion shows the finished attendance state without movement at ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/en#sinab");
    const attendance = page.locator("#sinab");
    const radios = attendance.getByRole("radiogroup").first().getByRole("radio");
    const count = (key: string) => attendance.locator(`[data-attendance-count="${key}"] dd`);
    const feedback = attendance.getByRole("status");
    await page.waitForTimeout(500);
    expect(await attendanceMarks(page)).toEqual(SAMPLE_LABELS);
    await expect(attendance.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "6");
    await expect(attendance.locator("[data-attendance-history]").last()).toHaveAttribute("data-attendance-history", "kelmadi");
    for (const block of await attendance.locator("[data-attendance-reveal]").all()) {
      await expect(block).toBeVisible();
      await expect(block).toHaveCSS("opacity", "1");
      await expect(block).toHaveCSS("transform", "none");
    }
    await expect(feedback).toHaveText("");

    for (const [index, status] of contentEn.attendanceDemo.statuses.entries()) {
      await expect(radios.nth(index).locator(".attendance-status-label")).toHaveText(status.label);
    }
    await radios.nth(0).click();
    await expect(radios.nth(0)).toHaveAttribute("aria-checked", "false");
    await expect(count("keldi")).toHaveText("2");
    await expect(attendance.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "5");
    await expect(feedback).toHaveText(contentEn.attendanceDemo.unmarkedTemplate.replace("{count}", "1"));
    await radios.nth(0).focus();
    await radios.nth(0).press("ArrowRight");
    await expect(radios.nth(1)).toBeFocused();
    await expect(count("kechikdi")).toHaveText("2");
    await radios.nth(1).press("End");
    await expect(radios.nth(3)).toHaveAttribute("aria-checked", "true");
    await radios.nth(3).press("Home");
    await expect(radios.nth(0)).toHaveAttribute("aria-checked", "true");
    await expect(feedback).toHaveText(contentEn.attendanceDemo.allMarkedMsg);
    await expect(attendance).toContainText(contentEn.attendanceDemo.banner);
  });

  test(`sticky header compacts once scrolled without shifting the page at ${viewport.width}px`, async ({ page }) => {
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
    await expect.poll(async () => (await geometry()).visible).toBeLessThan(viewport.width < 1280 ? 72 : top.box - 8);
    const scrolled = await geometry();
    expect(scrolled.box).toBe(top.box);
    expect(scrolled.mainTop).toBe(top.mainTop);
    const controls = header.locator(".site-header-controls");
    if (viewport.width < 1280) {
      await expect(controls).toHaveCSS("opacity", "0");
      await expect(controls).toHaveCSS("pointer-events", "none");
      // Keyboard focus restores the full header so every control stays reachable.
      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");
      await expect(header.locator(":focus-visible")).toHaveCount(1);
      await expect(controls).toHaveCSS("opacity", "1");
    } else {
      await expect(controls).toBeVisible();
    }
    expect(await page.evaluate(() => (window as unknown as { layoutShift: number }).layoutShift)).toBe(0);

    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await expect(header).not.toHaveClass(/is-scrolled/);
  });
}

test("role motion pauses outside the viewport or on hidden documents and cleans up for reduced motion", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/en");
  const roles = page.locator("#rollar");
  await roles.scrollIntoViewIfNeeded();
  const tabs = roles.getByRole("tab");
  const scene = roles.getByRole("tabpanel").locator("[data-product-scene]");
  await tabs.nth(2).click();
  await expect(scene).toHaveAttribute("data-scene-state", "playing");
  await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" }));
  await expect(scene).toHaveAttribute("data-scene-state", "paused");
  const visualFrame = () => scene.locator("[data-scene-path]").evaluateAll((paths) => paths.map((path) => getComputedStyle(path).strokeDashoffset));
  const offscreenFrame = await visualFrame();
  await page.waitForTimeout(250);
  expect(await visualFrame()).toEqual(offscreenFrame);
  await roles.scrollIntoViewIfNeeded();
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
  await tabs.nth(3).click();
  await tabs.nth(1).click();
  await expect(scene).toHaveAttribute("data-scene-state", "static");
  await expect(tabs.nth(1)).toBeFocused();
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
  test("all role examples remain accessible through native disclosures", async ({ page }) => {
    await page.goto("/en");
    const roles = page.locator("#rollar");
    await expect(roles.getByRole("tab")).toHaveCount(0);
    const disclosures = roles.locator("details");
    await expect(disclosures).toHaveCount(4);
    await expect(page.locator("#yol [data-journey-chapter]")).toHaveCount(5);
    for (const chapter of await page.locator("#yol [data-journey-chapter]").all()) await expect(chapter.locator(".story-inline-preview")).toBeVisible();
    await expect(page.locator("[data-report-branch]")).toHaveCount(3);
    await expect(page.locator("[data-report-total]")).toHaveAttribute("data-report-total-students", "8");
    await expect(page.locator("#morning-report")).toContainText(contentEn.morningReport.sampleCaption);
    await expect(page.locator("[data-module-proof]")).toHaveCount(3);
    for (const [index, role] of contentEn.roles.tabs.entries()) {
      await expect(disclosures.nth(index)).toHaveAttribute("open", "");
      await expect(disclosures.nth(index)).toContainText(role.answer);
      const example = disclosures.nth(index).getByRole("group", { name: contentEn.scenes[role.scene].title });
      await expect(example).toBeVisible();
      await expect(example).toContainText(contentEn.scenes.sampleLabel);
      await expect(example).toHaveAttribute("data-scene-state", "static");
    }
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
  test(`sequential stories, report, modules and attendance stay usable at ${viewport.width}×${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(viewport.path);
    const journey = page.locator("#yol");
    const content = viewport.path === "/ru" ? contentRu : viewport.path === "/en" ? contentEn : contentUz;
    const previewTitles = [content.journey.previews.student.title, content.journey.previews.payments.title, content.scenes.teacher.title, content.journey.previews.driving.title, content.journey.previews.exam.title];
    await expect(journey.getByRole("tab")).toHaveCount(0);
    for (let index = 0; index < 5; index++) {
      const chapter = journey.locator("[data-journey-chapter]").nth(index);
      await expect(chapter).toHaveAttribute("open", "");
      const example = chapter.locator(".story-inline-preview");
      await expect(example).toBeVisible();
      await expect(example).toContainText(previewTitles[index]);
      await expect(example).toContainText(content.scenes.sampleLabel);
      expect(await example.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
    }
    const roles = page.locator("#rollar");
    for (const [index, role] of content.roles.tabs.entries()) {
      const chapter = roles.locator("[data-role-chapter]").nth(index);
      await expect(chapter).toContainText(role.answer);
      await expect(chapter.locator("[data-product-scene]")).toBeVisible();
    }
    const disclosure = roles.locator("summary").first();
    await disclosure.focus();
    await disclosure.press("Enter");
    await expect(roles.locator("details").first()).not.toHaveAttribute("open", "");
    await disclosure.press("Enter");
    await expect(roles.locator("details").first()).toHaveAttribute("open", "");
    await expect(page.locator("[data-report-branch]")).toHaveCount(3);
    await expect(page.locator("[data-report-total]")).toHaveAttribute("data-report-total-revenue", "14800000");
    await expect(page.locator("#morning-report")).toContainText(content.morningReport.sampleCaption);
    for (const feature of content.resources.modules) {
      const proof = page.locator(`[data-module-proof="${feature.kind}"]`);
      await expect(proof).toContainText(feature.title);
      await expect(proof.locator("[data-product-scene]")).toBeVisible();
      expect(await proof.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
    }
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
    for (const [index, radio] of (await radios.all()).entries()) {
      const bounds = await radio.boundingBox();
      expect(bounds?.width).toBeGreaterThanOrEqual(44);
      expect(bounds?.height).toBeGreaterThanOrEqual(44);
      const label = radio.getByText(content.attendanceDemo.statuses[index].label, { exact: true });
      expect((await label.boundingBox())!.width).toBeGreaterThan(16);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await page.reload();
    await expect(attendance.locator('[role="radio"][aria-checked="true"]')).toHaveCount(6);
  });
}
