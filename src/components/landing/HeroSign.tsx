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

    const yolEl = document.getElementById("yol");
    if (yolEl) {
      const header = document.querySelector(".site-header");
      const clearance = header && getComputedStyle(header).position === "sticky"
        ? header.getBoundingClientRect().height + 16
        : 16;
      const top = yolEl.getBoundingClientRect().top + window.scrollY - clearance;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top, behavior: reducedMotion ? "auto" : "smooth" });
    }
  };

  return (
    <div className="w-full bg-forest-600 rounded-[var(--r-l)] border border-white/15 p-4 sm:p-5">
      <p className="m-0 mb-3 font-mono font-semibold text-xs tracking-[0.08em] text-white/90 uppercase">
        {content.signTitle}
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {content.signRows.map((row) => (
          <button
            key={row.title}
            type="button"
            onClick={() => handleRowClick(row.stopIndex)}
            className="min-w-0 min-h-[72px] text-left p-3 flex items-start gap-2.5 border border-white/15 rounded-[var(--r-m)] hover:bg-white/10 transition-colors cursor-pointer"
          >
            <span className="font-display font-bold text-2xl leading-none text-white shrink-0" aria-hidden="true">
              {row.arrow}
            </span>

            <span className="min-w-0 flex flex-col gap-1 [overflow-wrap:anywhere]">
              <span className="font-body font-semibold text-sm sm:text-[15px] leading-snug text-white">
                {row.title}
              </span>
              <span className="font-body text-xs sm:text-[13px] leading-relaxed text-white/90">
                {row.sub}
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
