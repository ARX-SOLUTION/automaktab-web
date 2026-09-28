"use client";

import React from "react";
import type { LandingContent } from "@/content/uz";
import { track, buildDemoUrl } from "@/lib/analytics";

interface LaneCTAProps {
  content: LandingContent["hero"];
  demoAccess: "login" | "oneclick";
}

export default function LaneCTA({ content, demoAccess }: LaneCTAProps) {
  const demoUrl = buildDemoUrl("hero_lane");
  const helperText =
    demoAccess === "oneclick"
      ? content.lane1.helperOneClick
      : content.lane1.helperLogin;

  const handleTrialClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    track("cta_trial_click", { location: "hero_lane" });
    const target = document.getElementById("tariflar");
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 68;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col gap-3 max-w-[620px] w-full">
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={demoUrl}
          onClick={() => track("cta_demo_click", { location: "hero_lane" })}
          className="h-[52px] px-5 flex items-center justify-between gap-4 bg-[#E8A317] hover:bg-[#F2B535] text-[#0B2B1F] font-['Barlow'] font-bold text-[17px] rounded-[11px] no-underline shadow-sm transition-colors select-none"
        >
          <span>{content.lane1.button}</span>
          <span className="text-[19px] leading-none" aria-hidden="true">↗</span>
        </a>
        <a
          href="#tariflar"
          onClick={handleTrialClick}
          className="h-[52px] px-5 flex items-center justify-between gap-4 bg-transparent hover:bg-white text-white hover:text-[#0B2B1F] border-[1.5px] border-[rgba(255,255,255,0.5)] font-['Barlow'] font-bold text-[17px] rounded-[11px] no-underline transition-colors select-none"
        >
          <span>{content.lane2.button}</span>
          <span className="text-[19px] leading-none" aria-hidden="true">→</span>
        </a>
      </div>
      <p className="m-0 font-['Barlow'] font-normal text-[14px] leading-[1.45] text-[#B9C9BF]">
        {helperText} {content.lane2.helper}
      </p>
    </div>
  );
}
