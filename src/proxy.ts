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
// canonical Uzbek. Cookie NEXT_LOCALE is updated from the URL but never
// redirects / away from Uzbek.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const legacyTarget = SEO_LEGACY_PATH_REDIRECTS[pathname];
  if (legacyTarget) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = legacyTarget;
    return NextResponse.redirect(redirectUrl, 308);
  }

  const locale = resolveLocale(pathname);
  const response = NextResponse.next();

  response.cookies.set(LOCALE_COOKIE, locale, { path: "/" });
  return response;
}

export const config = {
  // Skip Next internals and any path with a file extension (favicon.ico,
  // sitemap.xml, images, ...); everything else participates in locale
  // resolution.
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
