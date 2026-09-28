import { notFound } from "next/navigation";
import LandingPage from "@/components/landing/LandingPage";
import type { LandingContent } from "@/content/uz";
import { contentUz } from "@/content/uz";
import { contentRu } from "@/content/ru";
import { contentEn } from "@/content/en";
import { isLocale, type Locale } from "@/i18n/config";

interface PageProps {
  params: Promise<{ locale: string }>;
}

const contentByLocale: Record<Locale, LandingContent> = {
  uz: contentUz,
  ru: contentRu,
  en: contentEn,
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
        Asosiy kontentga o‘tish
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
