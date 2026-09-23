import { describe, expect, it } from "vitest";
import {
  getSeoPage,
  getSeoPagePath,
  getSeoPagePaths,
  getSeoPageStaticParams,
  SEO_LEGAL_PAGE_IDS,
  SEO_PAGE_IDS,
  SEO_PAGES,
  SEO_RELATED_PAGE_IDS,
} from "./seo-pages";

describe("seo legal pages", () => {
  it("exposes privacy and terms for every locale with expected paths", () => {
    expect(SEO_PAGE_IDS).toContain("privacy");
    expect(SEO_PAGE_IDS).toContain("terms");
    expect(SEO_LEGAL_PAGE_IDS).toEqual(["privacy", "terms"]);
    expect(SEO_RELATED_PAGE_IDS).not.toContain("privacy");

    expect(getSeoPagePath("privacy", "uz")).toBe("/maxfiylik");
    expect(getSeoPagePath("privacy", "ru")).toBe("/ru/konfidencialnost");
    expect(getSeoPagePath("privacy", "en")).toBe("/en/privacy");
    expect(getSeoPagePath("terms", "uz")).toBe("/oferta");
    expect(getSeoPagePath("terms", "ru")).toBe("/ru/oferta");
    expect(getSeoPagePath("terms", "en")).toBe("/en/terms");

    const privacyPaths = getSeoPagePaths("privacy");
    expect(privacyPaths.uz).toBe("/maxfiylik");
    expect(privacyPaths.ru).toBe("/ru/konfidencialnost");
  });

  it("resolves legal stubs via getSeoPage and includes them in static params", () => {
    const privacy = getSeoPage("uz", ["maxfiylik"]);
    expect(privacy?.id).toBe("privacy");
    expect(privacy?.copy.heading).toContain("Maxfiylik");

    const terms = getSeoPage("en", ["terms"]);
    expect(terms?.id).toBe("terms");

    const params = getSeoPageStaticParams();
    expect(
      params.some(
        (entry) =>
          entry.locale === "uz" && entry.seoPath.join("/") === "maxfiylik",
      ),
    ).toBe(true);
    expect(
      params.some(
        (entry) =>
          entry.locale === "ru" && entry.seoPath.join("/") === "oferta",
      ),
    ).toBe(true);

    for (const id of SEO_LEGAL_PAGE_IDS) {
      for (const locale of ["uz", "ru", "en"] as const) {
        expect(SEO_PAGES[id][locale].sections.length).toBeGreaterThan(0);
        expect(SEO_PAGES[id][locale].updatedAt).toBe("2026-09-24");
      }
    }
  });
});
