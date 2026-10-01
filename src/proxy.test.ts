import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { getRedirectUrl, isRewrite } from "next/experimental/testing/server";
import { proxy } from "./proxy";

const ORIGIN = "https://automaktab.uz";

describe("proxy", () => {
  it("lets the internal /uz route target pass through", () => {
    const response = proxy(new NextRequest(`${ORIGIN}/uz`));

    expect(getRedirectUrl(response)).toBeNull();
    expect(isRewrite(response)).toBe(false);
    expect(response.cookies.get("NEXT_LOCALE")?.value).toBe("uz");
  });

  it("lets internal /uz/* route targets pass through", () => {
    const response = proxy(new NextRequest(`${ORIGIN}/uz/opengraph-image`));

    expect(getRedirectUrl(response)).toBeNull();
    expect(isRewrite(response)).toBe(false);
    expect(response.cookies.get("NEXT_LOCALE")?.value).toBe("uz");
  });

  it.each(["ru", "en"])(
    "keeps the locale-less root as Uzbek despite a %s cookie",
    (locale) => {
      const response = proxy(
        new NextRequest(`${ORIGIN}/`, {
          headers: { Cookie: `NEXT_LOCALE=${locale}` },
        }),
      );

      expect(getRedirectUrl(response)).toBeNull();
      expect(isRewrite(response)).toBe(false);
      expect(response.cookies.get("NEXT_LOCALE")?.value).toBe("uz");
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

  it("keeps normal unprefixed paths canonical Uzbek without an internal /uz rewrite", () => {
    const response = proxy(
      new NextRequest(`${ORIGIN}/pricing`, {
        headers: { Cookie: "NEXT_LOCALE=en" },
      }),
    );

    expect(getRedirectUrl(response)).toBeNull();
    expect(isRewrite(response)).toBe(false);
    expect(response.cookies.get("NEXT_LOCALE")?.value).toBe("uz");
  });

  it("keeps /opengraph-image canonical Uzbek without a public /uz prefix", () => {
    const response = proxy(new NextRequest(`${ORIGIN}/opengraph-image`));

    expect(getRedirectUrl(response)).toBeNull();
    expect(isRewrite(response)).toBe(false);
    expect(response.cookies.get("NEXT_LOCALE")?.value).toBe("uz");
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
