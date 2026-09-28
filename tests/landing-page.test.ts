import { describe, it, expect } from "vitest";
import { contentUz } from "@/content/uz";
import { contentRu } from "@/content/ru";
import { contentEn } from "@/content/en";
import { formatMoney } from "@/lib/money";
import { normalizePhone } from "@/app/api/lead/route";

describe("automaktab.uz marketing page verification", () => {
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
    expect(faq2.answerLogin).toContain("demo email va parol talab qilinadi");
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
