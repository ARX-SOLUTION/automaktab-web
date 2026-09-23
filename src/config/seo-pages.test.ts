import { describe, expect, it } from "vitest";
import {
  getSeoPage,
  getSeoPagePath,
  getSeoPagePaths,
  getSeoPageStaticParams,
  SEO_LEGAL_PAGE_IDS,
  SEO_LEGACY_PATH_REDIRECTS,
  SEO_PAGE_IDS,
  SEO_PAGES,
  SEO_RELATED_PAGE_IDS,
} from "./seo-pages";

describe("seo pages use English path segments in every locale", () => {
  it("exposes privacy and terms for every locale with English paths", () => {
    expect(SEO_PAGE_IDS).toContain("privacy");
    expect(SEO_PAGE_IDS).toContain("terms");
    expect(SEO_LEGAL_PAGE_IDS).toEqual(["privacy", "terms"]);
    expect(SEO_RELATED_PAGE_IDS).not.toContain("privacy");

    expect(getSeoPagePath("privacy", "uz")).toBe("/privacy");
    expect(getSeoPagePath("privacy", "ru")).toBe("/ru/privacy");
    expect(getSeoPagePath("privacy", "en")).toBe("/en/privacy");
    expect(getSeoPagePath("terms", "uz")).toBe("/terms");
    expect(getSeoPagePath("terms", "ru")).toBe("/ru/terms");
    expect(getSeoPagePath("terms", "en")).toBe("/en/terms");

    const privacyPaths = getSeoPagePaths("privacy");
    expect(privacyPaths.uz).toBe("/privacy");
    expect(privacyPaths.ru).toBe("/ru/privacy");
  });

  it("uses shared English feature/pricing segments across locales", () => {
    expect(getSeoPagePath("payments", "uz")).toBe(
      "/features/payments-and-debt",
    );
    expect(getSeoPagePath("payments", "ru")).toBe(
      "/ru/features/payments-and-debt",
    );
    expect(getSeoPagePath("pricing", "uz")).toBe("/pricing");
    expect(getSeoPagePath("pricing", "ru")).toBe("/ru/pricing");
    expect(getSeoPagePath("schedule", "uz")).toBe(
      "/features/schedules-and-groups",
    );
    expect(getSeoPagePath("attendance", "ru")).toBe(
      "/ru/features/digital-attendance",
    );
    expect(getSeoPagePath("branches", "en")).toBe(
      "/en/features/branch-management",
    );
  });

  it("resolves pages via English segments and includes them in static params", () => {
    const privacy = getSeoPage("uz", ["privacy"]);
    expect(privacy?.id).toBe("privacy");
    expect(privacy?.copy.heading).toContain("Maxfiylik");

    const terms = getSeoPage("en", ["terms"]);
    expect(terms?.id).toBe("terms");

    const params = getSeoPageStaticParams();
    expect(
      params.some(
        (entry) =>
          entry.locale === "uz" && entry.seoPath.join("/") === "privacy",
      ),
    ).toBe(true);
    expect(
      params.some(
        (entry) =>
          entry.locale === "ru" && entry.seoPath.join("/") === "terms",
      ),
    ).toBe(true);

    for (const id of SEO_LEGAL_PAGE_IDS) {
      for (const locale of ["uz", "ru", "en"] as const) {
        expect(SEO_PAGES[id][locale].sections.length).toBeGreaterThan(0);
        expect(SEO_PAGES[id][locale].updatedAt).toBe("2026-09-24");
      }
    }
  });

  it("maps legacy localized paths to English-segment URLs", () => {
    expect(SEO_LEGACY_PATH_REDIRECTS["/maxfiylik"]).toBe("/privacy");
    expect(SEO_LEGACY_PATH_REDIRECTS["/ru/konfidencialnost"]).toBe(
      "/ru/privacy",
    );
    expect(SEO_LEGACY_PATH_REDIRECTS["/tariflar"]).toBe("/pricing");
    expect(SEO_LEGACY_PATH_REDIRECTS["/ru/tarify"]).toBe("/ru/pricing");
    expect(
      SEO_LEGACY_PATH_REDIRECTS["/imkoniyatlar/tolovlar-va-qarzdorlik"],
    ).toBe("/features/payments-and-debt");
    expect(
      SEO_LEGACY_PATH_REDIRECTS["/ru/vozmozhnosti/platezhi-i-zadolzhennost"],
    ).toBe("/ru/features/payments-and-debt");
  });
});
