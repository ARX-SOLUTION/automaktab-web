import React from "react";
import type { LandingContent } from "@/content/uz";

interface FinalCTAProps {
  content: LandingContent["finalCta"];
}

export default function FinalCTA({ content }: FinalCTAProps) {
  return (
    <section className="bg-[#0B2B1F] py-20 px-4 sm:px-6 relative overflow-hidden">
      {/* Background road line accent */}
      <div
        className="absolute inset-x-0 top-0 h-1 bg-[repeating-linear-gradient(90deg,#E8A317,#E8A317_32px,transparent_32px,transparent_56px)] opacity-60"
        aria-hidden="true"
      />

      <div className="max-w-[760px] mx-auto text-center flex flex-col items-center gap-7">
        <h2 className="m-0 font-['Barlow_Condensed'] font-extrabold text-[clamp(40px,5vw,60px)] leading-[1.05] tracking-tight text-white uppercase">
          {content.title}
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://demo.automaktab.uz"
            target="_blank"
            rel="noopener noreferrer"
            className="h-14 px-8 flex items-center gap-2 bg-[#E8A317] hover:bg-[#FFE3A3] text-[#0B2B1F] font-['Barlow'] font-bold text-[18px] rounded-[12px] no-underline shadow-[0_8px_20px_rgba(232,163,23,0.35)] transition-colors"
          >
            <span>{content.demoButton}</span>
            <span className="text-[20px] leading-none">↗</span>
          </a>
          <a
            href="#tariflar"
            className="h-14 px-6 flex items-center border-[1.5px] border-[rgba(255,255,255,0.55)] hover:bg-white text-white hover:text-[#0B2B1F] font-['Barlow'] font-bold text-[18px] rounded-[12px] no-underline transition-colors"
          >
            {content.trialButton}
          </a>
        </div>
      </div>
    </section>
  );
}
