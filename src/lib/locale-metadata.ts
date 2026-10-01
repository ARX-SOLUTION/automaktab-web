import type { Metadata } from "next";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type Locale } from "@/i18n/config";

const SITE_URL = "https://automaktab.uz";

// uz is unprefixed ("/", "/foo"); ru/en get a "/ru" or "/en" prefix, with no
// trailing slash on their bare homepage ("/ru", not "/ru/") -- matches
// CONTEXT.md's localization section exactly.
export function localePath(path: string, locale: Locale): string {
  if (locale === DEFAULT_LOCALE) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

function localeUrl(path: string, locale: Locale): string {
  return `${SITE_URL}${localePath(path, locale)}`;
}

function buildLanguages(path: string): Record<Locale, string> {
  const entries = SUPPORTED_LOCALES.map(
    (loc): [Locale, string] => [loc, localeUrl(path, loc)],
  );
  return Object.fromEntries(entries) as Record<Locale, string>;
}

export function buildLocaleAlternates(
  path: string,
  locale: Locale,
): Metadata["alternates"] {
  const languages = buildLanguages(path);

  return {
    canonical: localeUrl(path, locale),
    languages: {
      ...languages,
      "x-default": languages[DEFAULT_LOCALE],
    },
  };
}

// Some translated pages intentionally use localized slugs rather than a
// common route suffix. Their public paths are already fully localized, so
// applying localePath() a second time would produce duplicate prefixes.
export function buildLocalizedAlternates(
  paths: Record<Locale, string>,
  locale: Locale,
): Metadata["alternates"] {
  const languages = Object.fromEntries(
    SUPPORTED_LOCALES.map(
      (loc): [Locale, string] => [loc, `${SITE_URL}${paths[loc]}`],
    ),
  ) as Record<Locale, string>;

  return {
    canonical: languages[locale],
    languages: {
      ...languages,
      "x-default": languages[DEFAULT_LOCALE],
    },
  };
}

// OG images are served from /[locale]/opengraph-image (route handler) but
// public Uzbek URLs stay unprefixed, so metadata must advertise
// /opengraph-image for uz (and /ru|/en/... for the others).
export function buildOpenGraphImageUrl(locale: Locale): string {
  return localeUrl("/opengraph-image", locale);
}

export function switchLocalePath(pathname: string, locale: Locale, availableLocales?: readonly Locale[]): string {
  const path = pathname.replace(/^\/(uz|ru|en)(?=\/|$)/, "") || "/";
  // An unavailable article translation returns to that language's blog index.
  return localePath(availableLocales && !availableLocales.includes(locale) ? "/blog" : path, locale);
}

export function preserveLocaleSuffix(event: { currentTarget: HTMLAnchorElement }) {
  const target = new URL(event.currentTarget.href);
  target.search = window.location.search;
  target.hash = window.location.hash;
  event.currentTarget.href = target.href;
}
