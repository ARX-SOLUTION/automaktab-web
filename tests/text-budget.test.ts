import { describe, expect, it } from "vitest";
import { SEO_LEGAL_PAGE_IDS, SEO_PAGES, type SeoPageId } from "@/config/seo-pages";
import { SUPPORTED_LOCALES } from "@/i18n/config";

// Keeps feature pages scannable: one short lead, few short sections, details in the FAQ.
const words = (text: string) => text.trim().split(/\s+/).length;
const pageIds = (Object.keys(SEO_PAGES) as SeoPageId[]).filter(
  (id) => !(SEO_LEGAL_PAGE_IDS as readonly SeoPageId[]).includes(id),
);

describe("supporting page text budget", () => {
  for (const id of pageIds) {
    for (const locale of SUPPORTED_LOCALES) {
      it(`${id} (${locale}) stays within the text budget`, () => {
        const copy = SEO_PAGES[id][locale];
        // The single rendered lead: the answer-first definition, or the intro when there is none.
        expect(words(copy.definition ?? "")).toBeLessThanOrEqual(20);
        expect(words(copy.definition ?? copy.intro)).toBeLessThanOrEqual(25);
        expect(copy.sections.length).toBeLessThanOrEqual(4);
        for (const section of copy.sections) expect(words(section.body)).toBeLessThanOrEqual(25);
        expect(copy.faq?.length ?? 0).toBeLessThanOrEqual(6);
        expect(JSON.stringify(copy)).not.toContain("—");
      });
    }
  }
});
