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
  it("returns 404 for a direct /uz request", () => {
    const response = proxy(new NextRequest(`${ORIGIN}/uz`));

    expect(response.status).toBe(404);
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
});
