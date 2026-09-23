import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import {
  getRedirectUrl,
  getRewrittenUrl,
  isRewrite,
} from "next/experimental/testing/server";
import { proxy } from "./proxy";

const ORIGIN = "https://automaktab.uz";

describe("proxy", () => {
  it("redirects a direct /uz request to the unprefixed root", () => {
    const response = proxy(new NextRequest(`${ORIGIN}/uz`));

    expect(getRedirectUrl(response)).toBe(`${ORIGIN}/`);
  });

  it("redirects /uz/* paths to the unprefixed canonical URL", () => {
    const response = proxy(new NextRequest(`${ORIGIN}/uz/opengraph-image`));

    expect(getRedirectUrl(response)).toBe(`${ORIGIN}/opengraph-image`);
  });

  it.each(["ru", "en"])(
    "redirects the locale-less root to a valid %s cookie preference",
    (locale) => {
      const response = proxy(
        new NextRequest(`${ORIGIN}/`, {
          headers: { Cookie: `NEXT_LOCALE=${locale}` },
        }),
      );

      expect(getRedirectUrl(response)).toBe(`${ORIGIN}/${locale}`);
    },
  );

  it("lets an explicit URL locale override the cookie", () => {
    const response = proxy(
      new NextRequest(`${ORIGIN}/en/pricing`, {
        headers: { Cookie: "NEXT_LOCALE=ru" },
      }),
    );

    expect(getRedirectUrl(response)).toBeNull();
    expect(isRewrite(response)).toBe(false);
    expect(response.cookies.get("NEXT_LOCALE")?.value).toBe("en");
  });

  it("rewrites a normal unprefixed path to Uzbek despite a cookie", () => {
    const response = proxy(
      new NextRequest(`${ORIGIN}/pricing`, {
        headers: { Cookie: "NEXT_LOCALE=en" },
      }),
    );

    expect(isRewrite(response)).toBe(true);
    expect(getRewrittenUrl(response)).toBe(`${ORIGIN}/uz/pricing`);
    expect(response.cookies.get("NEXT_LOCALE")?.value).toBe("uz");
  });

  it("rewrites /opengraph-image to the internal uz route (no public /uz prefix)", () => {
    const response = proxy(new NextRequest(`${ORIGIN}/opengraph-image`));

    expect(isRewrite(response)).toBe(true);
    expect(getRewrittenUrl(response)).toBe(`${ORIGIN}/uz/opengraph-image`);
  });
});

describe("proxy legacy SEO path redirects", () => {
  it.each([
    ["/maxfiylik", "/privacy"],
    ["/oferta", "/terms"],
    ["/tariflar", "/pricing"],
    [
      "/imkoniyatlar/tolovlar-va-qarzdorlik",
      "/features/payments-and-debt",
    ],
    [
      "/imkoniyatlar/dars-jadvali-va-guruhlar",
      "/features/schedules-and-groups",
    ],
    ["/imkoniyatlar/raqamli-davomat", "/features/digital-attendance"],
    ["/imkoniyatlar/filiallar-boshqaruvi", "/features/branch-management"],
    ["/uz/maxfiylik", "/privacy"],
    ["/uz/tariflar", "/pricing"],
    ["/ru/konfidencialnost", "/ru/privacy"],
    ["/ru/oferta", "/ru/terms"],
    ["/ru/tarify", "/ru/pricing"],
    [
      "/ru/vozmozhnosti/platezhi-i-zadolzhennost",
      "/ru/features/payments-and-debt",
    ],
    [
      "/ru/vozmozhnosti/raspisanie-i-gruppy",
      "/ru/features/schedules-and-groups",
    ],
    [
      "/ru/vozmozhnosti/tsifrovaya-poseshchaemost",
      "/ru/features/digital-attendance",
    ],
    [
      "/ru/vozmozhnosti/upravlenie-filialami",
      "/ru/features/branch-management",
    ],
  ] as const)("308 redirects %s → %s", (from, to) => {
    const response = proxy(new NextRequest(`${ORIGIN}${from}`));

    expect(response.status).toBe(308);
    expect(getRedirectUrl(response)).toBe(`${ORIGIN}${to}`);
  });
});
