import { describe, it, expect } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import DebtStory from "@/components/landing/DebtStory";
import { DEBTORS, debtStory } from "@/content/stories/debt";

const TOTALS = { uz: "4 950 000", ru: "4 950 000", en: "4,950,000" } as const;

describe("debt story", () => {
  it.each(Object.entries(debtStory))("renders the finished %s list before JavaScript runs", (locale, content) => {
    const html = renderToStaticMarkup(createElement(DebtStory, { content }));
    expect(html.match(/data-debt-row=/g)).toHaveLength(DEBTORS.length);
    expect(html).toContain(`data-debt-total="true" aria-hidden="true">${TOTALS[locale as keyof typeof TOTALS]}<`);
    expect(html).toContain(content.exportFile);
    expect(html).toContain(content.title);
    // The running balance already includes the sample payment.
    expect(html).toContain('data-debt-balance="1200000"');
    expect(html).not.toMatch(/[\u00a0\u202f]/);
    // Notebook slips are decoration and stay out of the accessibility tree.
    expect(html.match(/data-debt-slip="true" class="debt-slip" aria-hidden="true"/g)).toHaveLength(DEBTORS.length);
  });

  it("keeps Uzbek apostrophes and avoids long dashes", () => {
    const text = JSON.stringify(debtStory) + JSON.stringify(DEBTORS);
    expect(text).not.toMatch(/[—–]/);
    expect(JSON.stringify(debtStory.uz)).not.toMatch(/[a-z]'[a-z]/i);
    expect(debtStory.uz.lead).toContain("ro\u2018yxat");
    expect(DEBTORS.map((d) => d.name).join(" ")).toContain("Yo\u2018ldosheva");
  });

  it("uses one illustrative payment that lowers a balance", () => {
    expect(DEBTORS.filter((d) => d.payment)).toHaveLength(1);
    for (const d of DEBTORS) expect(d.paid + (d.payment ?? 0)).toBeLessThan(d.price);
  });
});
