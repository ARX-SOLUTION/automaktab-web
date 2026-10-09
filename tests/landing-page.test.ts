import { describe, it, expect } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { contentUz } from "@/content/uz";
import { contentRu } from "@/content/ru";
import { contentEn } from "@/content/en";
import { formatMoney } from "@/lib/money";
import { normalizePhone } from "@/lib/utils";
import LandingPage from "@/components/landing/LandingPage";
import FinalCTA from "@/components/landing/FinalCTA";
import ProofFrame from "@/components/landing/ProofFrame";
import ProductScene from "@/components/landing/ProductScene";
import RoleTabs from "@/components/landing/RoleTabs";
import RoadStepper from "@/components/landing/RoadStepper";
import MorningReportWidget from "@/components/landing/MorningReportWidget";
import ResourceCards from "@/components/landing/ResourceCards";
import { buildDemoUrl } from "@/lib/analytics";
import { buildHomeMetadata } from "@/app/home-metadata";
import { generateMetadata as seoMetadata } from "@/app/[locale]/[...seoPath]/page";
import ChangelogPage from "@/app/[locale]/changelog/page";
import { SEO_PAGES, SEO_PAGE_IDS, getSeoPagePath } from "@/config/seo-pages";

describe("automaktab.uz marketing page verification", () => {
  it.each([contentUz, contentRu, contentEn])("makes every student chapter available before JavaScript runs", (content) => {
    const html = renderToStaticMarkup(createElement(RoadStepper, { content: content.journey, scenes: content.scenes }));
    expect(html.match(/data-journey-chapter=/g)).toHaveLength(5);
    expect(html.match(/<details\b/g)).toHaveLength(5);
    for (const stop of content.journey.stops) {
      expect(html).toContain(stop.title.replaceAll('&', '&amp;'));
      for (const point of stop.points) expect(html).toContain(point.replaceAll('&', '&amp;'));
    }
    expect(html).toContain(content.journey.previews.exam.question);
  });
  it.each([contentUz, contentRu, contentEn])("shows exactly three illustrative branches and their computed report total", (content) => {
    const html = renderToStaticMarkup(createElement(MorningReportWidget, { content: content.morningReport }));
    expect(html.match(/data-report-branch=/g)).toHaveLength(3);
    expect(html).toContain('data-report-total-revenue="14800000"');
    expect(html).toContain('data-report-total-students="8"');
    expect(html).toContain(content.morningReport.botSub);
    expect(html).toContain(content.morningReport.sampleCaption);
    for (const branch of content.morningReport.branches) expect(html).toContain(branch.name);
    const changed = renderToStaticMarkup(createElement(MorningReportWidget, { content: {
      ...content.morningReport,
      branches: [{ ...content.morningReport.branches[0], revenue: 7201000, students: 5 }, content.morningReport.branches[1], content.morningReport.branches[2]],
    } }));
    expect(changed).toContain('data-report-total-revenue="14801000"');
    expect(changed).toContain('data-report-total-students="9"');
  });
  it.each([[contentUz, "7 200 000"], [contentRu, "7 200 000"], [contentEn, "7,200,000"]] as const)("renders stable readable report separators", (content, expected) => {
    const html = renderToStaticMarkup(createElement(MorningReportWidget, { content: content.morningReport }));
    expect(html).toContain(`<td>${expected}<small>`);
    expect(html).not.toMatch(/[\u00a0\u202f]/);
  });
  it.each([contentUz, contentRu, contentEn])("makes leads, fleet and education workflows explicit in static module proofs", (content) => {
    const html = renderToStaticMarkup(createElement(ResourceCards, { content: content.resources, scenes: content.scenes }));
    expect(html.match(/data-module-proof=/g)).toHaveLength(3);
    for (const feature of content.resources.modules) {
      expect(html).toContain(feature.title);
      expect(html).toContain(`data-product-scene="${feature.kind}"`);
      for (const point of feature.points) expect(html).toContain(point);
    }
    expect(html).toContain(content.scenes.leads.followupLabel);
    expect(html).toContain(content.scenes.fleet.maintenanceLabel);
    expect(html).toContain(content.scenes.education.internalNote);
    expect(html).toContain(content.resources.roadmapCard.notice);
  });
  it.each(["uz", "ru", "en"] as const)("links every public SEO page and separates demo from trial in %s", (locale) => {
    const html = renderToStaticMarkup(createElement(LandingPage, { locale }));
    for (const id of SEO_PAGE_IDS) {
      expect(html.includes(`href="${getSeoPagePath(id, locale)}"`)).toBe(true);
    }
    const copy = JSON.stringify([SEO_PAGES.pricing[locale], SEO_PAGES.terms[locale]]);
    expect(copy).not.toMatch(/bepul sinov|бесплатн|free trial/i);
  });
  it("keeps localized sharing metadata and released changelog schema", async () => {
    for (const locale of ["uz", "ru", "en"] as const) {
      const home = buildHomeMetadata(locale);
      expect(home.keywords).toBeUndefined();
      expect(home.description).not.toMatch(/бесплатно|free for 30 days/);
      const page = await seoMetadata({
        params: Promise.resolve({ locale, seoPath: ["features", "payments-and-debt"] }),
      });
      expect(page.openGraph).toMatchObject({
        images: home.openGraph?.images,
        url: `https://automaktab.uz${locale === "uz" ? "" : `/${locale}`}/features/payments-and-debt`,
      });
      expect(page.twitter).toMatchObject({ images: home.twitter?.images });
    }
    const html = renderToStaticMarkup(await ChangelogPage({ params: Promise.resolve({ locale: "uz" }) }));
    const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)![1]);
    expect(schema.releaseNotes.length).toBeGreaterThan(0);
    expect(schema.releaseNotes.every((note: unknown) => typeof note === "string")).toBe(true);
    expect(schema.releaseNotes.join(" ")).not.toContain("v3.0.0");
  });
  it.each([
    ["uz", contentUz],
    ["ru", contentRu],
    ["en", contentEn],
  ] as const)("keeps the %s sample workflow visible without JavaScript and renders no CRM screenshots", (locale, content) => {
    const html = renderToStaticMarkup(createElement(LandingPage, { locale }));
    const hero = html.match(/<section[^>]*data-screen-label="01 Hero"[\s\S]*?<\/section>/)?.[0];
    const platforms = html.match(/<div[^>]*data-flow-platform[^>]*>[\s\S]*?<\/div>/g) ?? [];

    expect(hero).toContain('id="finance-preview"');
    expect(hero).toContain('data-finance-total="revenue" data-value="18400000"');
    expect(hero).toContain('data-finance-total="debt" data-value="6200000"');
    expect(html).toContain('id="platform-flow"');
    for (const source of content.problem.sources) expect(html).toContain(source.title);
    expect(platforms).toHaveLength(1);
    expect(platforms[0]?.match(/data-flow-output/g)).toHaveLength(3);
    for (const outcome of content.problem.outcomes) {
      expect(platforms[0]).toContain(outcome.title.replaceAll('&', '&amp;'));
      expect(platforms[0]).toContain(outcome.detail);
    }
    expect(hero).not.toContain('flow-controls');
    expect(hero).not.toContain('flow-caption');
    expect(/(?:\/images\/demo\/|%2Fimages%2Fdemo%2F)/i.test(html)).toBe(false);
    expect(html).toContain(content.scenes.sampleLabel);
    expect(html).toContain(content.proof.caption);
  });

  it.each([contentUz, contentRu, contentEn])("renders every role example as labelled static content", (content) => {
    for (const kind of ["director", "registrar", "teacher", "accountant"] as const) {
      const html = renderToStaticMarkup(createElement(ProductScene, { kind, content: content.scenes }));
      expect(html).toContain(content.scenes[kind].title);
      expect(html).toContain(content.scenes.sampleLabel);
      expect(html).not.toContain('<img');
      expect(html).not.toContain('visibility:hidden');
      expect(html).not.toContain('opacity:0');
    }
  });

  it.each([contentUz, contentRu, contentEn])("keeps every role available in native server-rendered disclosures", (content) => {
    const html = renderToStaticMarkup(createElement(RoleTabs, { content: content.roles, scenes: content.scenes }));
    expect(html.match(/<details\b/g)).toHaveLength(4);
    for (const role of content.roles.tabs) {
      expect(html).toContain(`<summary>${role.label.replaceAll('&', '&amp;')}</summary>`);
      expect(html).toContain(role.answer.replaceAll('&', '&amp;'));
    }
    expect(html.match(/aria-controls="role-panel"/g)).toHaveLength(4);
    expect(html.match(/id="role-panel"/g)).toHaveLength(1);
  });

  it.each([contentUz, contentRu, contentEn])("sends the final demo action to the tracked CRM login", (content) => {
    const html = renderToStaticMarkup(createElement(FinalCTA, { content: content.finalCta }));

    expect(html).toContain(`href="${buildDemoUrl("footer").replaceAll("&", "&amp;")}"`);
    expect(html).not.toContain("https://demo.automaktab.uz");
    expect(html).toContain(content.finalCta.demoButton);
  });

  it.each([
    ["uz", contentUz],
    ["ru", contentRu],
    ["en", contentEn],
  ] as const)("explains the %s director sample with visible outcomes", (_locale, content) => {
    const html = renderToStaticMarkup(createElement(ProofFrame, { content: content.proof, scenes: content.scenes }));

    for (const callout of content.proof.callouts) {
      expect(html).toContain(callout.title);
      expect(html).toContain(callout.description);
    }
  });

  it("includes all 11 sections required by design.md §7", () => {
    expect(contentUz.hero).toBeDefined();
    expect(contentUz.proof).toBeDefined();
    expect(contentUz.problem).toBeDefined();
    expect(contentUz.journey.stops).toHaveLength(5);
    expect(contentUz.attendanceDemo.students).toHaveLength(6);
    expect(contentUz.attendanceDemo.statuses).toHaveLength(4);
    expect(contentUz.roles.tabs).toHaveLength(4);
    expect(contentUz.resources.roadmapCard.items).toHaveLength(2);
    expect(contentUz.howItWorks.steps).toHaveLength(3);
    expect(contentUz.pricing.comparisonRows).toHaveLength(3);
    expect(contentUz.faq.items).toHaveLength(7);
    expect(contentUz.finalCta).toBeDefined();
  });

  it("strictly enforces Uzbek curly apostrophe ‘ (U+2018) and ’ (U+2019) over straight quotes", () => {
    const json = JSON.stringify(contentUz);
    // Disallow common words with straight quotes
    expect(json).not.toMatch(/o'q/i);
    expect(json).not.toMatch(/o'quvchi/i);
    expect(json).not.toMatch(/g'oy/i);
    expect(json).not.toMatch(/ma'lumot/i);
    expect(json).not.toMatch(/to'lov/i);
    expect(json).not.toMatch(/ko'r/i);
    expect(json).not.toMatch(/yo'l/i);

    // Verify correct characters are present
    expect(json).toMatch(/o‘q/i);
    expect(json).toMatch(/ma’lumot/i);
    expect(json).toMatch(/to‘lov/i);
    expect(json).toMatch(/ko‘r/i);
    expect(json).toMatch(/yo‘l/i);
  });

  it("formats currency in mono style with space separators", () => {
    expect(formatMoney(3500000)).toBe("3 500 000 so‘m");
    expect(formatMoney(4432546000)).toBe("4 432 546 000 so‘m");
  });

  it("normalizes phone numbers to +998XXXXXXXXX format", () => {
    expect(normalizePhone("901234567")).toBe("+998901234567");
    expect(normalizePhone("+998 90 123 45 67")).toBe("+998901234567");
    expect(normalizePhone("+998 (90) 123-45-67")).toBe("+998901234567");
  });

  it("contains valid FAQs with demoAccess variants", () => {
    const faq2 = contentUz.faq.items[1];
    expect(faq2.question).toBe("Demoga qanday kiraman?");
    expect(faq2.answerLogin).toContain("Demo email va parol bilan kirasiz.");
    expect(faq2.answerOneClick).toContain("bir bosishda, parolsiz ochadi");
  });

  it("verifies full Uzbek (uz), Russian (ru), and English (en) localization completeness and antislop rules", () => {
    for (const content of [contentUz, contentRu, contentEn]) {
      expect(content.hero).toBeDefined();
      expect(content.proof).toBeDefined();
      expect(content.morningReport.bullets).toHaveLength(3);
      expect(content.problem).toBeDefined();
      expect(content.journey.stops).toHaveLength(5);
      expect(content.attendanceDemo.students).toHaveLength(6);
      expect(content.attendanceDemo.statuses).toHaveLength(4);
      expect(content.roles.tabs).toHaveLength(4);
      expect(content.resources.roadmapCard.items).toHaveLength(2);
      expect(content.resources.teamCard.stats).toHaveLength(2);
      expect(content.howItWorks.steps).toHaveLength(3);
      expect(content.pricing.comparisonRows).toHaveLength(3);
      expect(content.pricing.form.fields.city.options).toHaveLength(14);
      expect(content.pricing.form.disclaimer).toBeTruthy();
      expect(content.faq.items).toHaveLength(7);
      expect(content.finalCta).toBeDefined();

      // Antislop rule R-02: Zero em dashes in newly authored content across all languages
      const json = JSON.stringify(content);
      expect(json).not.toContain("—");
    }
  });

  it("keeps landing copy within the ADR 0005 budget", () => {
    const words = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;
    const locales = [
      { content: contentUz, banned: ["1 kunda", "1 ish kuni"] },
      { content: contentRu, banned: ["1 день", "рабочего дня"] },
      { content: contentEn, banned: ["1 day", "business day"] },
    ];

    for (const { content, banned } of locales) {
      expect(words(`${content.hero.title} ${content.hero.titleAccent}`)).toBeLessThanOrEqual(10);

      const descriptions = [
        content.hero.description,
        content.morningReport.description,
        content.attendanceDemo.description,
        content.pricing.description,
        content.resources.expenseCard.description,
        content.resources.teamCard.description,
      ];
      for (const description of descriptions) {
        expect(words(description)).toBeLessThanOrEqual(25);
      }

      const json = JSON.stringify(content);
      for (const phrase of ["RBAC", "settlements", "Leaflet", ...banned]) {
        expect(json).not.toContain(phrase);
      }
    }
  });
});
