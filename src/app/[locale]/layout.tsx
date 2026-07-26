import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { notFound } from "next/navigation";
import { isLocale, SUPPORTED_LOCALES, type Locale } from "@/i18n/config";
import { buildLocaleAlternates } from "@/lib/locale-metadata";
import "../globals.css";

// DESIGN.md: display/heading font. cyrillic + cyrillic-ext subsets verified
// present in next/font's own Manrope metadata -- ru pages get real Manrope,
// not a system-font fallback.
const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  // 600 loaded too: MidPageSections uses font-heading + font-semibold, and
  // without a real 600 face the browser's ascending-weight match silently
  // substitutes 700, erasing the semibold/bold distinction those headings
  // rely on. Found by review (reviewer-alpha/beta, both independently).
  weight: ["600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

// This is the app's root layout -- there is no app/layout.tsx above it
// anymore. All three locales, including unprefixed uz, render through this
// one [locale] tree, so there is exactly one <html> and its `lang` is
// always correct. proxy.ts rewrites unprefixed requests to /uz/... before
// they reach here.
export function generateStaticParams() {
  return [{ locale: "uz" }, { locale: "ru" }, { locale: "en" }];
}

// Ported from autodrive-frontend/index.html -- deprecated on Metadata itself
// (see metadata-interface.d.ts: "Use the new viewport configuration
// instead"), so these go through the Viewport export, not generateMetadata.
export const viewport: Viewport = {
  themeColor: "#1a1f2e",
  colorScheme: "dark light",
};

// Open Graph locale codes (language_TERRITORY). Source only ever hardcoded
// uz_UZ + a single ru_RU alternate; en_US fills the gap using the same
// convention so all three locales get a real og:locale/og:locale:alternate.
const OG_LOCALE: Record<Locale, string> = {
  uz: "uz_UZ",
  ru: "ru_RU",
  en: "en_US",
};

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const alternates = buildLocaleAlternates("/", locale);
  const canonicalUrl =
    typeof alternates?.canonical === "string" ? alternates.canonical : undefined;

  return {
    // Ported from autodrive-frontend/index.html -- uz-only for now, same
    // for all three locales, since ru/en title/description copy wasn't
    // part of any of the three section builds.
    title: "Avtomaktab CRM — to'lov, davomat, jadval | Auto Maktab",
    description: "Qarzdorlar ro'yxati, kunlik tushum, davomat va dars jadvali — bitta tizimda. Birinchi oy bepul, o'rnatish shart emas: brauzerda ishlaydi.",
    alternates,
    robots: "index, follow",
    authors: [{ name: "Auto Maktab" }],
    verification: { yandex: "76839dfd1ebe1b22" },
    openGraph: {
      type: "website",
      siteName: "Auto Maktab CRM",
      locale: OG_LOCALE[locale],
      alternateLocale: SUPPORTED_LOCALES.filter((loc) => loc !== locale).map(
        (loc) => OG_LOCALE[loc],
      ),
      url: canonicalUrl,
    },
    // Card type only -- og:image/twitter:image are skipped, no banner asset
    // exists anywhere in this repo (no public/ directory at all).
    twitter: {
      card: "summary_large_image",
    },
  };
}

// Sets `.dark` on <html> before first paint, from system preference only --
// no persisted user choice (the nav's theme button is a non-functional stub
// until a later ticket). suppressHydrationWarning below is required because
// this mutates the DOM outside React's render; see Next's "Preventing Flash"
// guide (node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md).
const THEME_SCRIPT =
  "(function(){try{if(window.matchMedia('(prefers-color-scheme: dark)').matches){document.documentElement.classList.add('dark')}}catch(e){}})()";

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale} className={manrope.variable} suppressHydrationWarning>
      <head>
        {/* type differs between server/client render on purpose -- React
            warns in dev about rendering raw <script> tags on the client, so
            the client render reports a type ("text/plain") that isn't an
            executable script type. suppressHydrationWarning covers that
            mismatch. See Next's docs: preventing-flash-before-hydration.md,
            "Extracting a reusable component". */}
        <script
          type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
