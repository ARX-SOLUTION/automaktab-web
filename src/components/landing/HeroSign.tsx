"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
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

    const yolEl = document.querySelector<HTMLElement>(`#yol [data-journey-chapter="${stopIndex}"]`)
      ?? document.getElementById("yol");
    if (yolEl) {
      if (yolEl instanceof HTMLDetailsElement) yolEl.open = true;
      yolEl.querySelector<HTMLElement>("summary")?.focus({ preventScroll: true });
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
    <div className="hero-shortcuts w-full border-t-2 border-sand-300 pt-6">
      <p className="m-0 mb-3 font-body font-bold text-sm text-muted">
        {content.signTitle}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {content.signRows.map((row) => (
          <button
            key={row.title}
            type="button"
            onClick={() => handleRowClick(row.stopIndex)}
            className="min-w-0 min-h-[72px] text-left p-3 flex items-start gap-2.5 rounded-2xl hover:bg-white transition-colors cursor-pointer"
          >
            <ChevronRight size={20} className="text-forest-600 shrink-0" aria-hidden="true" />

            <span className="min-w-0 flex flex-col gap-1 [overflow-wrap:anywhere]">
              <span className="font-body font-bold text-sm sm:text-[15px] leading-snug text-ink">
                {row.title}
              </span>
              <span className="font-body text-xs sm:text-[13px] leading-relaxed text-muted">
                {row.sub}
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
