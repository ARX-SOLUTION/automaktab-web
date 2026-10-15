import { describe, expect, it } from "vitest";
import { contentUz } from "@/content/uz";
import { SEO_PAGE_IDS, SEO_PAGES, getSeoPagePath } from "@/config/seo-pages";
import { SUPPORTED_LOCALES } from "@/i18n/config";
import { buildLlmsFullTxt, buildLlmsTxt } from "./llms";

describe("llms.txt", () => {
  it("starts with the llmstxt.org title and summary", () => {
    const text = buildLlmsTxt();
    expect(text).toMatch(/^# automaktab\.uz\n\n> automaktab\.uz is a CRM and management system for driving schools/);
    expect(text).toContain("## Features");
    expect(text).not.toMatch(/price:|UZS|so‘m/i);
  });

  it("links every localized homepage and SEO page", () => {
    const text = buildLlmsTxt();
    for (const url of ["https://automaktab.uz/", "https://automaktab.uz/ru", "https://automaktab.uz/en"]) {
      expect(text).toContain(`](${url})`);
    }
    for (const id of SEO_PAGE_IDS) {
      expect(text).toContain(`https://automaktab.uz${getSeoPagePath(id, "en")}`);
    }
    expect(text).toContain("https://automaktab.uz/llms-full.txt");
  });
});

describe("llms-full.txt", () => {
  it("contains existing page and FAQ copy in every locale", () => {
    const text = buildLlmsFullTxt();
    for (const locale of SUPPORTED_LOCALES) {
      for (const id of SEO_PAGE_IDS) {
        const page = SEO_PAGES[id][locale];
        const wording = (value: string) => locale === "uz" ? value.replace(/talaba/g, "o‘quvchi").replace(/Talaba/g, "O‘quvchi") : value;
        expect(text).toContain(wording(page.intro));
        for (const section of page.sections) expect(text).toContain(wording(section.body));
      }
    }
    for (const item of contentUz.faq.items) expect(text).toContain(item.answerLogin.replace(/talaba/g, "o‘quvchi").replace(/Talaba/g, "O‘quvchi"));
  });

  it("uses o‘quvchi rather than talaba in generated Uzbek text", () => {
    expect(buildLlmsFullTxt()).not.toMatch(/talaba/i);
    expect(buildLlmsTxt()).not.toMatch(/talaba/i);
  });
});
