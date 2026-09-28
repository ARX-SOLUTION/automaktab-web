import React from "react";
import type { LandingContent } from "@/content/uz";
import LeadForm from "./LeadForm";

interface PricingCardsProps {
  content: LandingContent["pricing"];
  demoAccess: "login" | "oneclick";
}

export default function PricingCards({ content, demoAccess }: PricingCardsProps) {
  const demoShortBadge =
    demoAccess === "oneclick" ? content.demoCard.badgeOneClick : content.demoCard.badgeLogin;

  return (
    <section
      id="tariflar"
      data-screen-label="09 Tariflar"
      className="py-24 sm:py-28 px-6 scroll-mt-[68px]"
      aria-labelledby="pricing-heading"
    >
      <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-14 items-start">
        {/* Left Column: Context, Cards, Table */}
        <div className="flex flex-col gap-6">
          <span className="font-['JetBrains_Mono'] font-semibold text-[13px] tracking-[0.08em] text-[#9A6400] uppercase">
            {content.eyebrow}
          </span>
          <h2
            id="pricing-heading"
            className="m-0 font-['Barlow_Condensed'] font-extrabold text-[clamp(40px,5vw,64px)] leading-[0.95] text-[#14211A] [text-wrap:balance]"
          >
            {content.title}
          </h2>
          <p className="m-0 font-['Barlow'] font-normal text-[18px] leading-[1.6] text-[#2F3B35]">
            {content.description}
          </p>

          {/* 2 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
            {/* Demo Card */}
            <div className="border-[1.5px] border-[#14211A] rounded-[16px] p-4.5 flex flex-col gap-2">
              <span className="font-['JetBrains_Mono'] font-semibold text-[12px] text-[#5A6660]">
                {content.demoCard.label}
              </span>
              <span className="font-['Barlow_Condensed'] font-extrabold text-[28px] leading-none text-[#14211A]">
                {content.demoCard.price}
              </span>
              <span className="font-['Barlow'] font-normal text-[15px] leading-[1.5] text-[#2F3B35]">
                {content.demoCard.description} ({demoShortBadge})
              </span>
            </div>

            {/* Trial Card */}
            <div className="bg-[#14211A] text-white rounded-[16px] p-4.5 flex flex-col gap-2 shadow-sm">
              <span className="font-['JetBrains_Mono'] font-semibold text-[12px] text-[#E8A317]">
                {content.trialCard.label}
              </span>
              <span className="font-['Barlow_Condensed'] font-extrabold text-[28px] leading-none text-white">
                {content.trialCard.badge}
              </span>
              <span className="font-['Barlow'] font-normal text-[15px] leading-[1.5] text-[#C4D3CA]">
                {content.trialCard.description}
              </span>
            </div>
          </div>

          {/* Conditions Comparison Table */}
          <div className="flex flex-col border-t-2 border-[#14211A] mt-2">
            {content.comparisonRows.map((row) => (
              <div
                key={row.field}
                className="grid grid-cols-1 sm:grid-cols-[170px_1fr] gap-1 sm:gap-4 py-3 border-b border-[#E2D9C6] items-baseline"
              >
                <span className="font-['Barlow'] font-bold text-[16px] text-[#14211A]">
                  {row.field}
                </span>
                <span className="font-['Barlow'] font-normal text-[15px] sm:text-[16px] leading-[1.5] text-[#2F3B35]">
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Lead Capture Form */}
        <LeadForm content={content.form} />
      </div>
    </section>
  );
}
