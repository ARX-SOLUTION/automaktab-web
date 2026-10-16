import DrivingCard from "@/components/landing/DrivingCard";
import MorningReportWidget from "@/components/landing/MorningReportWidget";
import { PricingPlans } from "@/components/landing/PricingCards";
import ProductScene from "@/components/landing/ProductScene";
import { getLandingConfig } from "@/config/landing-config";
import type { SeoVisualId } from "@/config/seo-pages";
import { contentEn } from "@/content/en";
import { contentRu } from "@/content/ru";
import { contentUz } from "@/content/uz";
import type { Locale } from "@/i18n/config";

const CONTENT = { uz: contentUz, ru: contentRu, en: contentEn } as const;

/** Maps a page's visual id to an existing landing motion component. */
export default function SeoVisual({ id, locale }: { id: SeoVisualId; locale: Locale }) {
  const content = CONTENT[locale];
  if (id === "morning-report") return <MorningReportWidget content={content.morningReport} variant="card" />;
  if (id === "pricing-cards") {
    return (
      <div className="seo-visual">
        <PricingPlans content={content.pricing} demoAccess={getLandingConfig().demoAccess} />
      </div>
    );
  }
  if (id === "driving-card") {
    return (
      <div className="seo-visual">
        <DrivingCard content={content.journey.previews.driving} sampleLabel={content.scenes.sampleLabel} />
      </div>
    );
  }
  const kind = id.slice("scene:".length) as Parameters<typeof ProductScene>[0]["kind"];
  return (
    <div className="seo-visual">
      <ProductScene kind={kind} content={content.scenes} />
    </div>
  );
}
