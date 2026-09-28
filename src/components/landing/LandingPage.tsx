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
    <div className="min-h-screen bg-[#F4EFE4] text-[#14211A] flex flex-col font-['Barlow',system-ui,sans-serif] selection:bg-[#E8A317] selection:text-[#0B2B1F]">
      {/* 00 Sticky Header */}
      <SiteHeader content={content.header} locale={locale} />

      <main id="main-content" className="flex-1">
        {/* 01 Hero Section */}
        <section
          data-screen-label="01 Hero"
          className="bg-[#0B2B1F] text-white pt-16 sm:pt-20 pb-44 sm:pb-52 px-6 relative overflow-hidden"
          aria-labelledby="hero-heading"
        >
          {/* Dashed Road Line */}
          <div
            className="absolute inset-x-0 bottom-28 h-1.5 opacity-20 pointer-events-none select-none"
            style={{
              background:
                "repeating-linear-gradient(90deg, rgba(255,255,255,0.3) 0 56px, transparent 56px 96px)",
            }}
            aria-hidden="true"
          />

          <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-14 items-center relative z-10">
            {/* Left Value Proposition */}
            <div className="flex flex-col gap-6 sm:gap-7">
              <div className="flex items-center gap-2.5 font-['JetBrains_Mono'] font-semibold text-[13px] tracking-[0.08em] text-[#E8A317] uppercase">
                <span className="w-5 h-0.5 bg-[#E8A317]" aria-hidden="true" />
                <span>{content.hero.eyebrow}</span>
              </div>

              <h1
                id="hero-heading"
                className="m-0 font-['Barlow_Condensed'] font-extrabold text-[clamp(48px,6vw,76px)] leading-[0.92] tracking-[-0.01em] [text-wrap:balance]"
              >
                {content.hero.title}
                <span className="text-[#E8A317]">{content.hero.titleAccent}</span>
              </h1>

              <p className="m-0 max-w-[560px] font-['Barlow'] font-normal text-[19px] leading-[1.6] text-[#C4D3CA] [text-wrap:pretty]">
                {content.hero.description}
              </p>

              {/* 2-Lane CTA */}
              <LaneCTA content={content.hero} demoAccess={config.demoAccess} />
            </div>

            {/* Right Highway Direction Sign */}
            <HeroSign content={content.hero} />
          </div>
        </section>

        {/* 02 Proof Frame Section (overlaps hero by -150px) */}
        <ProofFrame content={content.proof} />

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
