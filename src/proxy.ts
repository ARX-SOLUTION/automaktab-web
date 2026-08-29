import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/i18n/config";

const LOCALE_COOKIE = "NEXT_LOCALE";

// uz is unprefixed by design (see CLAUDE.md's i18n section), so a leading
// path segment only ever names a locale prefix for ru/en -- "uz" itself is
// never a prefix, it's just Uzbek content living at an unprefixed path.
function resolveLocale(pathname: string): Locale {
  const [, segment] = pathname.split("/");
  if (segment !== DEFAULT_LOCALE && isLocale(segment)) {
    return segment;
  }
  return DEFAULT_LOCALE;
}

// The locale in the URL always wins over any stored preference. This is
// the opposite of typical i18n proxy defaults, and deliberate: unprefixed
// paths (including "/") always resolve to Uzbek regardless of cookie value,
// so today's indexed "/" URL never redirects away from Uzbek and never
// silently breaks search rankings. The cookie below only records the
// URL-resolved locale so it persists across navigation -- it is never read
// here to make a routing decision.
//
// Unprefixed requests are rewritten (not redirected) to /uz/... so the
// [locale] segment always has a real value to match against; the address
// bar keeps the unprefixed path since a rewrite is invisible to the
// browser. A direct request for /uz itself becomes /uz/uz after this
// rewrite, which has no matching route under the single-segment [locale]
// tree and 404s on its own -- no separate guard needed.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
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
