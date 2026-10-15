import type { Metadata, Viewport } from "next";
import { SUPPORTED_LOCALES, type Locale } from "@/i18n/config";
import {
  buildLocaleAlternates,
  buildOpenGraphImageUrl,
} from "@/lib/locale-metadata";

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  colorScheme: "light",
};

const OG_LOCALE: Record<Locale, string> = {
  uz: "uz_UZ",
  ru: "ru_RU",
  en: "en_US",
};

const SEO_METADATA: Record<
  Locale,
  { title: string; description: string }
> = {
  uz: {
    title: "Avtomaktab CRM va boshqaruv tizimi | automaktab.uz",
    description:
      "Talabalar, to‘lovlar, qarzdorlik, dars jadvali va davomatni bir joyda boshqaring. Filiallar holatini ko‘ring va demoni ochib sinang.",
  },
  ru: {
    title: "CRM для автошколы и система управления | automaktab.uz",
    description:
      "Ведите учёт курсантов, оплат и задолженности. Планируйте занятия и отмечайте посещаемость в одной системе. Попробуйте демо.",
  },
  en: {
    title: "Driving school CRM and management | automaktab.uz",
    description:
      "Manage students, payments, debt, schedules and attendance in one system. Compare branch results and try the demo.",
  },
};

// Layout-level defaults shared by every page, including not-found. Canonical,
// hreflang and og:url are page-specific, so they live in each page's own
// metadata (see buildHomePageMetadata) and never leak onto 404 responses.
export function buildHomeMetadata(locale: Locale): Metadata {
  const seo = SEO_METADATA[locale];

  return {
    metadataBase: new URL("https://automaktab.uz"),
    title: seo.title,
    description: seo.description,
    authors: [{ name: "automaktab.uz" }],
    creator: "automaktab.uz",
    openGraph: {
      type: "website",
      siteName: "automaktab.uz",
      title: seo.title,
      description: seo.description,
      locale: OG_LOCALE[locale],
      alternateLocale: SUPPORTED_LOCALES.flatMap((item) =>
        item === locale ? [] : [OG_LOCALE[item]],
      ),
      images: [
        {
          url: buildOpenGraphImageUrl(locale),
          width: 1200,
          height: 630,
          alt: seo.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [buildOpenGraphImageUrl(locale)],
    },
  };
}

export function buildHomePageMetadata(locale: Locale): Metadata {
  const shared = buildHomeMetadata(locale);
  const alternates = buildLocaleAlternates("/", locale);

  return {
    alternates,
    openGraph: {
      ...shared.openGraph,
      url: alternates?.canonical as string,
    },
  };
}
