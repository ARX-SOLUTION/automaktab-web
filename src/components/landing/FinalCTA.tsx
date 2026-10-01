import React from "react";
import type { LandingContent } from "@/content/uz";
import { buildDemoUrl } from "@/lib/analytics";

interface FinalCTAProps {
  content: LandingContent["finalCta"];
}

export default function FinalCTA({ content }: FinalCTAProps) {
  const demoUrl = buildDemoUrl("footer");

  return (
    <section className="bg-forest-800 border-t border-white/10 py-16 sm:py-20 px-4 sm:px-6">
      <div className="max-w-[760px] mx-auto text-center flex flex-col items-center gap-7">
        <h2 className="m-0 font-display font-extrabold text-[clamp(36px,5vw,60px)] leading-[1.05] tracking-tight text-white uppercase [overflow-wrap:anywhere] [text-wrap:balance]">
          {content.title}
        </h2>

        <div className="w-full flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-center gap-3">
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-w-0 min-h-[52px] px-6 py-3 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-forest-800 font-body font-bold text-base rounded-[var(--r-s)] no-underline transition-colors"
          >
            <span>{content.demoButton}</span>
            <span className="text-xl leading-none shrink-0" aria-hidden="true">↗</span>
          </a>
          <a
            href="#tariflar"
            className="min-w-0 min-h-[52px] px-6 py-3 flex items-center justify-center border border-white/25 hover:bg-white/10 text-white font-body font-semibold text-base rounded-[var(--r-s)] no-underline transition-colors"
          >
            {content.trialButton}
          </a>
        </div>
      </div>
    </section>
  );
}
