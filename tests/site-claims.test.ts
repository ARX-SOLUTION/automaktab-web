import { describe, expect, it } from "vitest";
import { contentEn } from "@/content/en";
import { contentRu } from "@/content/ru";
import { contentUz } from "@/content/uz";
import { LANDING_COPY } from "@/config/landing";
import { SEO_PAGES } from "@/config/seo-pages";
import { buildLlmsFullTxt, buildLlmsTxt } from "@/lib/llms";

const site = JSON.stringify([contentUz, contentRu, contentEn, LANDING_COPY, SEO_PAGES]) + buildLlmsTxt() + buildLlmsFullTxt();

describe("site-wide claims", () => {
  it("does not name or compare competitors", () => {
    expect(site).not.toMatch(/e-avtomaktab|leadercrm|leader crm|intalim|educationcrm|drivli|avtodrom|avtomaktab\.com/i);
  });

  it("states a 14-day trial, never 30 days or a free first month", () => {
    expect(site).not.toMatch(/30 kunlik sinov|30 kun sinang|30 kun bepul|30[- ]дн|30-дневн|30-day trial|30 days free|for 30 days|first month|первый месяц|birinchi oy/i);
    expect(site).toContain("14 kunlik sinov");
    expect(site).toContain("14-дневный пробный период");
    expect(site).toContain("14-day trial");
  });
});
