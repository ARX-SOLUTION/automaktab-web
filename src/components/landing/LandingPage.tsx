import React from "react";
import type { Locale } from "@/i18n/config";
import type { LandingContent } from "@/content/uz";
import { contentUz } from "@/content/uz";
import { contentRu } from "@/content/ru";
import { contentEn } from "@/content/en";
import { getLandingConfig } from "@/config/landing-config";
import SiteHeader from "./SiteHeader";
import PageMotion from "./PageMotion";
import HeroSign from "./HeroSign";
import LaneCTA from "./LaneCTA";
import ProofFrame from "./ProofFrame";
import DebtStory from "./DebtStory";
import { debtStory } from "@/content/stories/debt";
import MorningReportWidget from "./MorningReportWidget";
import ProblemChips from "./ProblemChips";
import RoadStepper from "./RoadStepper";
import AttendanceDemo from "./AttendanceDemo";
import RoleTabs from "./RoleTabs";
import ResourceCards from "./ResourceCards";
import TrafficStep from "./TrafficStep";
import PricingCards from "./PricingCards";
import FaqAccordion from "./FaqAccordion";
import FinalCTA from "./FinalCTA";
import SiteFooter from "./SiteFooter";

export { SiteHeader, SiteFooter };

interface LandingPageProps {
  locale?: Locale;
}

const contentByLocale: Record<Locale, LandingContent> = {
  uz: contentUz,
  ru: contentRu,
  en: contentEn,
};

export default function LandingPage({ locale = "uz" }: LandingPageProps) {
  const content = contentByLocale[locale] || contentUz;
  const config = getLandingConfig();

  return (
    <div className="landing-site min-h-screen bg-paper text-ink flex flex-col font-body selection:bg-amber-500 selection:text-ink">
      {/* 00 Header */}
      <SiteHeader content={content.header} locale={locale} />

      <PageMotion>
        {/* 01 Hero Section */}
        <section
          data-screen-label="01 Hero"
          className="landing-hero bg-paper text-ink"
          aria-labelledby="hero-heading"
        >
          <div className="landing-container">
            <div className="landing-hero-grid">
              <div className="landing-hero-intro min-w-0 flex flex-col gap-5 sm:gap-6">
                <h1
                  id="hero-heading"
                  data-hero-item
                  className="m-0 font-display font-black text-[clamp(36px,3.8vw,54px)] leading-[1.08] tracking-[-0.03em] [text-wrap:balance]"
                >
                  {content.hero.title}
                  <span className="hero-accent">{content.hero.titleAccent}</span>
                </h1>

                <p data-hero-item className="m-0 max-w-[560px] text-[17px] sm:text-lg leading-[1.7] text-body-2 [text-wrap:pretty]">
                  {content.hero.description}
                </p>
              </div>

              <ProblemChips content={content.problem} />

              <div data-hero-item className="landing-hero-actions min-w-0">
                <LaneCTA content={content.hero} demoAccess={config.demoAccess} />
              </div>
            </div>

          </div>
        </section>

        <section className="product-proof bg-sand-100" aria-labelledby="proof-heading">
          <div className="landing-container">
            <h2 id="proof-heading" className="font-display font-black text-ink m-0 mb-8">{content.proof.title}</h2>
            <ProofFrame content={content.proof} scenes={content.scenes} />
            <div className="mt-8"><HeroSign content={content.hero} /></div>
          </div>
        </section>

        {/* 03a Debt story (Kim qancha qarz?) */}
        <DebtStory content={debtStory[locale] ?? debtStory.uz} />

        {/* 03b Morning Telegram Report (08:00 Nazorat Hisoboti) */}
        <MorningReportWidget content={content.morningReport} />

        {/* 04 Student Journey (Talaba yo‘li) */}
        <RoadStepper content={content.journey} scenes={content.scenes} />

        {/* 05 Live Attendance Demo (Sinab ko‘ring) */}
        <AttendanceDemo content={content.attendanceDemo} />

        {/* 06 Personas (Kimlar uchun) */}
        <RoleTabs content={content.roles} scenes={content.scenes} />

        {/* 07 Resources & Roadmap (Resurslar) */}
        <ResourceCards
          content={content.resources}
          scenes={content.scenes}
          showRoadmap={config.showRoadmap}
        />

        {/* 08 How It Works (Qanday ishlaydi) */}
        <TrafficStep content={content.howItWorks} />

        {/* 09 Pricing & Onboarding Form (Tariflar) */}
        <PricingCards content={content.pricing} demoAccess={config.demoAccess} />

        {/* 10 FAQ (Savollar) */}
        <FaqAccordion content={content.faq} demoAccess={config.demoAccess} />

        {/* 11 Final Call To Action */}
        <FinalCTA content={content.finalCta} />
      </PageMotion>

      {/* 12 Site Footer */}
      <SiteFooter content={content.footer} locale={locale} />
    </div>
  );
}
