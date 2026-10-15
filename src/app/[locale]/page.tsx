import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildHomePageMetadata } from "../home-metadata";
import LandingPage from "@/components/landing/LandingPage";
import type { LandingContent } from "@/content/uz";
import { contentUz } from "@/content/uz";
import { contentRu } from "@/content/ru";
import { contentEn } from "@/content/en";
import { isLocale, type Locale } from "@/i18n/config";
import { LANDING_COPY } from "@/config/landing";
import { buildOpenGraphImageUrl } from "@/lib/locale-metadata";

interface PageProps {
  params: Promise<{ locale: string }>;
}

const contentByLocale: Record<Locale, LandingContent> = {
  uz: contentUz,
  ru: contentRu,
  en: contentEn,
};

// Only capabilities the site itself describes (feature pages, landing journey,
// modules and morning report); see the SEO/GEO research report §9.3.
const FEATURE_LIST = [
  "Student payments and debt tracking",
  "Debtors by branch and group",
  "Lesson schedules and study groups",
  "Digital attendance journal",
  "Practical driving minutes and instructor confirmation",
  "Internal theory tests (YHQ, 11 topics)",
  "Multi-branch management and branch comparison",
  "Leads pipeline with source, stage and follow-up",
  "Fleet: maintenance, insurance and fuel records",
  "Expenses and revenue reports",
  "Daily Telegram report at 08:00",
];

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return buildHomePageMetadata(locale);
}

// Brand disambiguation (REPORT §13.3 J): avtomaktab.com is an unrelated
// exam-prep site. No sameAs until official brand profiles exist.
const DISAMBIGUATION: Record<Locale, string> = {
  uz: "Avtomaktablar uchun boshqaruv tizimi (CRM). avtomaktab.com test sayti bilan aloqasi yo‘q.",
  ru: "Система управления (CRM) для автошкол. Не связана с сайтом подготовки к экзамену avtomaktab.com.",
  en: "Management system (CRM) for driving schools. Not affiliated with the avtomaktab.com exam-prep site.",
};

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const content = contentByLocale[locale] || contentUz;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://automaktab.uz/#organization",
        name: "automaktab.uz",
        alternateName: ["Automaktab", "Автомактаб", "automaktab CRM"],
        disambiguatingDescription: DISAMBIGUATION[locale],
        url: "https://automaktab.uz/",
        logo: {
          "@type": "ImageObject",
          url: "https://automaktab.uz/icon.png",
          width: 512,
          height: 512,
        },
        areaServed: "UZ",
      },
      {
        "@type": "WebSite",
        "@id": "https://automaktab.uz/#website",
        name: "automaktab.uz",
        url: "https://automaktab.uz/",
        publisher: { "@id": "https://automaktab.uz/#organization" },
        inLanguage: ["uz", "ru", "en"],
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://automaktab.uz/#software",
        name: "automaktab.uz",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: "https://automaktab.uz/",
        inLanguage: ["uz", "ru", "en"],
        description: content.hero.description,
        featureList: FEATURE_LIST,
        screenshot: buildOpenGraphImageUrl(locale),
        publisher: { "@id": "https://automaktab.uz/#organization" },
      },
      {
        "@type": "FAQPage",
        mainEntity: content.faq.items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answerLogin },
        })),
      },
    ],
  };

  return (
    <>
      <a href="#main-content" className="skip-link">
        {LANDING_COPY[locale].skipLink}
      </a>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <LandingPage locale={locale as Locale} />
    </>
  );
}
