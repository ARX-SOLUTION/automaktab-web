import { notFound } from "next/navigation";
import LandingPage from "@/components/landing/LandingPage";
import { LANDING_COPY } from "@/config/landing";
import { isLocale } from "@/i18n/config";

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const copy = LANDING_COPY[locale];
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://automaktab.uz/#organization",
        name: "automaktab.uz",
        url: "https://automaktab.uz/",
        logo: "https://automaktab.uz/icon.svg",
        areaServed: "UZ",
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://automaktab.uz/#software",
        name: "automaktab.uz",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: "https://automaktab.uz/",
        inLanguage: ["uz", "ru", "en"],
        description: copy.hero.body,
        publisher: { "@id": "https://automaktab.uz/#organization" },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "UZS",
          eligibleDuration: {
            "@type": "QuantitativeValue",
            value: 30,
            unitText: "day",
          },
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: copy.faq.items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };

  return (
    <>
      <a href="#main-content" className="skip-link">
        {copy.skipLink}
      </a>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <LandingPage locale={locale} />
    </>
  );
}
