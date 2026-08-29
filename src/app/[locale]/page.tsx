import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import HeroSection, { LandingNav } from "@/components/landing/HeroSection";
import MidPageSections from "@/components/landing/MidPageSections";
import ClosingSections from "@/components/landing/ClosingSections";
import PageMotion from "@/components/landing/PageMotion";

const SKIP_LINK_COPY: Record<Locale, string> = {
  uz: "Asosiy kontentga o'tish",
  ru: "Перейти к основному содержимому",
  en: "Skip to main content",
};

// Organization + SoftwareApplication structured data, ported from the
// @graph block in autodrive-frontend/index.html. (FAQPage JSON-LD lives in
// ClosingSections.tsx instead, generated from the same copy as the visible
// FAQ accordion so the two can't drift.)
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://automaktab.uz/#org",
      name: "Auto Maktab CRM",
      url: "https://automaktab.uz/",
      logo: "https://automaktab.uz/favicon.png",
      email: "demo@automaktab.uz",
      areaServed: "UZ",
    },
    {
      "@type": "SoftwareApplication",
      name: "Auto Maktab CRM",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: "https://automaktab.uz/",
      inLanguage: ["uz", "ru", "en"],
      description: "O'zbekistondagi avtomaktablar uchun boshqaruv tizimi: talabalar, guruhlar, to'lovlar, davomat va jadval — bitta CRM'da. CRM для автошкол Узбекистана.",
      publisher: { "@id": "https://automaktab.uz/#org" },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "UZS",
        // price "0" describes the trial only -- eligibleDuration bounds it so
        // this doesn't read as a permanently free product in rich results.
        eligibleDuration: {
          "@type": "QuantitativeValue",
          value: 1,
          unitText: "month",
        },
        description: "Birinchi oy — bepul. Первый месяц — бесплатно.",
      },
    },
  ],
};

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-cyan-400 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-700 focus-visible:outline-offset-2"
      >
        {SKIP_LINK_COPY[locale]}
      </a>
      <script
        type="application/ld+json"
        // Same escaping as ClosingSections.tsx's FAQPage JSON-LD.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <LandingNav locale={locale} />
      <PageMotion>
        <HeroSection locale={locale} />
        <MidPageSections locale={locale} />
        <ClosingSections locale={locale} />
      </PageMotion>
    </>
  );
}
