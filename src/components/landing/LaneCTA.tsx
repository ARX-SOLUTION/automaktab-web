"use client";

import React from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
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
      const header = document.querySelector(".site-header");
      const clearance = header && getComputedStyle(header).position === "sticky"
        ? header.getBoundingClientRect().height + 16
        : 16;
      const top = target.getBoundingClientRect().top + window.scrollY - clearance;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top, behavior: reducedMotion ? "auto" : "smooth" });
    }
  };

  return (
    <div className="min-w-0 flex flex-col gap-3 max-w-[620px] w-full">
      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
        <a
          href={demoUrl}
          onClick={() => track("cta_demo_click", { location: "hero_lane" })}
          className="action-primary min-w-0 min-h-[52px] px-5 py-3 flex items-center justify-between gap-4 bg-amber-500 hover:bg-amber-400 text-forest-800 font-body font-bold text-base rounded-[var(--r-s)] no-underline transition-colors"
        >
          <span>{content.lane1.button}</span>
          <ArrowUpRight size={20} className="shrink-0" aria-hidden="true" />
        </a>
        <a
          href="#tariflar"
          onClick={handleTrialClick}
          className="action-secondary min-w-0 min-h-[52px] px-5 py-3 flex items-center justify-between gap-4 hover:bg-sand-100 text-ink border-2 border-sand-300 font-body font-bold text-base rounded-[var(--r-s)] no-underline transition-colors"
        >
          <span>{content.lane2.button}</span>
          <ArrowRight size={20} className="shrink-0" aria-hidden="true" />
        </a>
      </div>
      <p className="m-0 text-sm leading-relaxed text-muted">
        {helperText} {content.lane2.helper}
      </p>
    </div>
  );
}
