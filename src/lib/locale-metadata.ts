import type { Metadata } from "next";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type Locale } from "@/i18n/config";

const SITE_URL = "https://automaktab.uz";

// uz is unprefixed ("/", "/foo"); ru/en get a "/ru" or "/en" prefix, with no
// trailing slash on their bare homepage ("/ru", not "/ru/") -- matches
// CLAUDE.md's i18n section exactly.
function localePath(path: string, locale: Locale): string {
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
