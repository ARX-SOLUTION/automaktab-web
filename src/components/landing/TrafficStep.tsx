import React from "react";
import type { LandingContent } from "@/content/uz";

interface TrafficStepProps {
  content: LandingContent["howItWorks"];
}

export default function TrafficStep({ content }: TrafficStepProps) {
  return (
    <section
      id="qanday"
      data-screen-label="08 Qanday ishlaydi"
      className="py-24 sm:py-28 px-6 bg-[#FFFCF6] border-y border-[#E2D9C6] scroll-mt-[68px]"
      aria-labelledby="how-it-works-heading"
    >
      <div className="max-w-[1240px] mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col gap-3.5 max-w-[820px]">
          <span className="font-['JetBrains_Mono'] font-semibold text-[13px] tracking-[0.08em] text-[#9A6400] uppercase">
            {content.eyebrow}
          </span>
          <h2
            id="how-it-works-heading"
            className="m-0 font-['Barlow_Condensed'] font-extrabold text-[clamp(40px,5vw,64px)] leading-[0.95] text-[#14211A] [text-wrap:balance]"
          >
            {content.title}
          </h2>
        </div>

        {/* 3 Traffic Light Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {content.steps.map((step, idx) => {
            const isGoal = idx === 2;
            const bg = isGoal ? "bg-[#E8A317]" : "bg-white";

            return (
              <div key={step.number} className="flex gap-4.5 items-stretch">
                {/* Traffic Light Signal Column */}
                <div
                  className="shrink-0 w-[58px] flex flex-col items-center select-none"
                  aria-hidden="true"
                >
                  <div
                    className={`w-[58px] border-2 border-[#14211A] rounded-t-[8px] overflow-hidden ${bg}`}
                  >
                    <div className="h-3.5 bg-[#14211A]" />
                    <div className="font-['Barlow_Condensed'] font-extrabold text-[32px] leading-[1.2] text-center py-1 text-[#14211A]">
                      {step.number}
                    </div>
                  </div>
                  {/* Traffic post beneath */}
                  <div className="w-3.5 flex-1 min-h-[40px] bg-white border-2 border-[#14211A] border-t-0" />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2 pt-1.5 min-w-0">
                  <h3 className="m-0 font-['Barlow_Condensed'] font-extrabold text-[28px] leading-none text-[#14211A]">
                    {step.title}
                  </h3>
                  <p className="m-0 font-['Barlow'] font-normal text-[17px] leading-[1.55] text-[#2F3B35]">
                    {step.description}
                  </p>                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
