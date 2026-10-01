import React from "react";
import type { Locale } from "@/i18n/config";
import type { LandingContent } from "@/content/uz";
import { contentUz } from "@/content/uz";
import { contentRu } from "@/content/ru";
import { contentEn } from "@/content/en";
import { getLandingConfig } from "@/config/landing-config";
import SiteHeader from "./SiteHeader";
import HeroSign from "./HeroSign";
import LaneCTA from "./LaneCTA";
import ProofFrame from "./ProofFrame";
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
    <div className="min-h-screen bg-sand-100 text-ink flex flex-col font-body selection:bg-amber-500 selection:text-forest-800">
      {/* 00 Header */}
      <SiteHeader content={content.header} locale={locale} />

      <main id="main-content" className="flex-1">
        {/* 01 Hero Section */}
        <section
          data-screen-label="01 Hero"
          className="landing-hero bg-forest-800 text-white"
          aria-labelledby="hero-heading"
        >
          <div className="landing-container">
            <div className="landing-hero-grid">
              <div className="landing-hero-intro min-w-0 flex flex-col gap-5 sm:gap-6">
                <div className="flex items-center gap-2.5 font-mono font-semibold text-xs tracking-[0.08em] text-amber-500 uppercase">
                  <span className="w-5 h-0.5 bg-amber-500 shrink-0" aria-hidden="true" />
                  <span>{content.hero.eyebrow}</span>
                </div>

                <h1
                  id="hero-heading"
                  className="m-0 font-display font-extrabold text-[clamp(36px,4.6vw,64px)] leading-[1.02] tracking-tight [text-wrap:balance] [overflow-wrap:anywhere]"
                >
                  {content.hero.title}
                  <span className="text-amber-500">{content.hero.titleAccent}</span>
                </h1>

                <p className="m-0 max-w-[560px] text-[17px] sm:text-lg leading-[1.6] text-on-dark-2 [text-wrap:pretty]">
                  {content.hero.description}
                </p>
              </div>

              <ProofFrame content={content.proof} />

              <div className="landing-hero-actions min-w-0">
                <LaneCTA content={content.hero} demoAccess={config.demoAccess} />
              </div>
            </div>

            <div className="mt-8 lg:mt-10">
              <HeroSign content={content.hero} />
            </div>
          </div>
        </section>

        {/* 03 Problem (Muammo) */}
        <ProblemChips content={content.problem} />

        {/* 03b Morning Telegram Report (08:00 Nazorat Hisoboti) */}
        <MorningReportWidget content={content.morningReport} />

        {/* 04 Student Journey (Talaba yo‘li) */}
        <RoadStepper content={content.journey} />

        {/* 05 Live Attendance Demo (Sinab ko‘ring) */}
        <AttendanceDemo content={content.attendanceDemo} />

        {/* 06 Personas (Kimlar uchun) */}
        <RoleTabs content={content.roles} />

        {/* 07 Resources & Roadmap (Resurslar) */}
        <ResourceCards
          content={content.resources}
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
      </main>

      {/* 12 Site Footer */}
      <SiteFooter content={content.footer} locale={locale} />
    </div>
  );
}
