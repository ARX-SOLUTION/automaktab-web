import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SEO_LEGACY_PATH_REDIRECTS } from "@/config/seo-pages";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/i18n/config";

const LOCALE_COOKIE = "NEXT_LOCALE";

// uz is unprefixed by design (see CONTEXT.md's localization section), so a leading
// path segment only ever names a locale prefix for ru/en -- "uz" itself is
// never a prefix, it's just Uzbek content living at an unprefixed path.
function resolveLocale(pathname: string): Locale {
  const [, segment] = pathname.split("/");
  if (segment !== DEFAULT_LOCALE && isLocale(segment)) {
    return segment;
  }
  return DEFAULT_LOCALE;
}

// Explicit URL locales always win. Unprefixed paths (including /) are always
// canonical Uzbek and are rewritten internally to the /uz route tree. Cookie
// NEXT_LOCALE is updated from the URL but never redirects / away from Uzbek.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const legacyTarget = SEO_LEGACY_PATH_REDIRECTS[pathname];
  if (legacyTarget) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = legacyTarget;
    return NextResponse.redirect(redirectUrl, 308);
  }

  // Public Uzbek URLs are unprefixed. Send /uz and /uz/* to the canonical
  // unprefixed path so metadata/crawlers never keep a soft-404 /uz URL.
  if (
    pathname === `/${DEFAULT_LOCALE}` ||
    pathname.startsWith(`/${DEFAULT_LOCALE}/`)
  ) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname =
      pathname === `/${DEFAULT_LOCALE}`
        ? "/"
        : pathname.slice(`/${DEFAULT_LOCALE}`.length) || "/";
    return NextResponse.redirect(redirectUrl);
  }

  const locale = resolveLocale(pathname);

  let response: NextResponse;
  if (locale === DEFAULT_LOCALE) {
    const rewrittenUrl = request.nextUrl.clone();
    rewrittenUrl.pathname = pathname === "/" ? "/uz" : `/uz${pathname}`;
    response = NextResponse.rewrite(rewrittenUrl);
  } else {
    response = NextResponse.next();
  }

  response.cookies.set(LOCALE_COOKIE, locale, { path: "/" });
  return response;
}

export const config = {
  // Skip Next internals and any path with a file extension (favicon.ico,
  // sitemap.xml, images, ...); everything else participates in locale
  // resolution.
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
