"use client";

import React from "react";
import type { LandingContent } from "@/content/uz";
import { track } from "@/lib/analytics";

interface HeroSignProps {
  content: LandingContent["hero"];
}

export default function HeroSign({ content }: HeroSignProps) {
  const handleRowClick = (stopIndex: number) => {
    track("sign_row_click", { stop: stopIndex + 1 });

    // Notify RoadStepper component
    window.dispatchEvent(
      new CustomEvent("automaktab_goto_stop", { detail: { stop: stopIndex } })
    );

    // Smooth scroll to #yol with 68px header clearance
    const yolEl = document.getElementById("yol");
    if (yolEl) {
      const top = yolEl.getBoundingClientRect().top + window.scrollY - 68;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div className="relative flex flex-col items-center w-full max-w-[560px] mx-auto select-none">
      {/* Sign Board */}
      <div
        className="w-full bg-[#0E6B43] rounded-[20px] p-2.5 shadow-[0_40px_80px_rgba(0,0,0,0.45)] border border-[rgba(255,255,255,0.1)] relative z-10"
      >
        <div className="border-[3px] border-white rounded-[13px] p-4 sm:p-5 flex flex-col gap-3">
          {/* Header of Road Sign */}
          <div className="pb-3 border-b-2 border-[rgba(255,255,255,0.28)]">
            <span className="font-['JetBrains_Mono'] font-bold text-[12px] tracking-[0.12em] text-[#CFE6D8] uppercase">
              {content.signTitle}
            </span>
          </div>

          {/* Rows */}
          <div className="flex flex-col">
            {content.signRows.map((row, idx) => (
              <button
                key={row.title}
                type="button"
                onClick={() => handleRowClick(row.stopIndex)}
                className={`w-full text-left py-3.5 px-2 flex items-center gap-3 sm:gap-4 transition-colors group cursor-pointer ${
                  idx > 0 ? "border-t-2 border-[rgba(255,255,255,0.28)]" : ""
                }`}
              >
                {/* Arrow */}
                <span className="w-10 sm:w-12 text-center font-['Barlow_Condensed'] font-extrabold text-[36px] sm:text-[44px] leading-none text-white group-hover:text-[#FFE3A3] transition-colors shrink-0">
                  {row.arrow}
                </span>

                {/* Title + subtitle */}
                <div className="flex-1 min-w-0 flex flex-col">
                  <span className="font-['Barlow_Condensed'] font-bold text-[22px] sm:text-[clamp(24px,2.6vw,31px)] text-white group-hover:text-[#FFE3A3] leading-tight transition-colors">
                    {row.title}
                  </span>
                  <span className="font-['Barlow'] font-medium text-[13px] sm:text-[14px] text-[#CFE6D8] leading-tight mt-0.5">
                    {row.sub}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2 Metal Support Poles */}
      <div className="w-full flex justify-between px-16 sm:px-24 -mt-2">
        <div
          className="w-3.5 sm:w-4 h-16 bg-gradient-to-r from-[#5A6660] via-[#8E9B94] to-[#404B46] shadow-md rounded-b-[2px]"
          aria-hidden="true"
        />
        <div
          className="w-3.5 sm:w-4 h-16 bg-gradient-to-r from-[#5A6660] via-[#8E9B94] to-[#404B46] shadow-md rounded-b-[2px]"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
