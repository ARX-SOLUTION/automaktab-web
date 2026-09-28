import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Barlow, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import UmamiAnalytics from "@/components/analytics/UmamiAnalytics";
import { isLocale, SUPPORTED_LOCALES, type Locale } from "@/i18n/config";
import {
  buildLocaleAlternates,
  buildOpenGraphImageUrl,
} from "@/lib/locale-metadata";
import "../globals.css";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#0B2B1F",
  colorScheme: "dark",
};

const OG_LOCALE: Record<Locale, string> = {
  uz: "uz_UZ",
  ru: "ru_RU",
  en: "en_US",
};

const SEO_METADATA: Record<
  Locale,
  { title: string; description: string; keywords: string[] }
> = {
  uz: {
    title: "Avtomaktab CRM va boshqaruv tizimi | automaktab.uz",
    description:
      "Avtomaktabdagi talabalar, guruhlar, to‘lov va qarzdorlik, dars jadvali, davomat hamda filial holatini bir platformada ko‘ring. Namuna demoni oching.",
    keywords: [
      "avtomaktab CRM",
      "avtomaktab boshqaruv tizimi",
      "avtomaktab dasturi",
    ],
  },
  ru: {
    title: "CRM для автошколы и система управления | automaktab.uz",
    description:
      "Контролируйте оплаты, долги, расписание и посещаемость автошколы в одной CRM-системе. Откройте демо и попробуйте 30 дней бесплатно.",
    keywords: ["CRM для автошколы", "система управления автошколой"],
  },
  en: {
    title: "Driving School CRM & Management | automaktab.uz",
    description:
      "Manage driving-school payments, debt, lesson schedules, and attendance in one CRM. Open the product demo and try it free for 30 days.",
    keywords: ["driving school CRM", "driving school management system"],
  },
};

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const seo = SEO_METADATA[locale];
  const alternates = buildLocaleAlternates("/", locale);
  const canonical =
    typeof alternates?.canonical === "string"
      ? alternates.canonical
      : undefined;

  return {
    metadataBase: new URL("https://automaktab.uz"),
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates,
    robots: { index: true, follow: true },
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
      url: canonical,
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

const JS_ENHANCEMENT_SCRIPT =
  "document.documentElement.classList.add('js')";

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html
      lang={locale}
      className={`${barlowCondensed.variable} ${barlow.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          id="js-enhancement"
          dangerouslySetInnerHTML={{ __html: JS_ENHANCEMENT_SCRIPT }}
        />
      </head>
      <body>
        {children}
        <UmamiAnalytics />
      </body>
    </html>
  );
}
