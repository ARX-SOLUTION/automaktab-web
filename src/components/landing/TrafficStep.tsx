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
      className="py-24 sm:py-28 px-6 bg-[var(--c-paper)] border-y border-[var(--c-sand-300)] scroll-mt-[68px]"
      aria-labelledby="how-it-works-heading"
    >
      <div className="max-w-[1240px] mx-auto grid lg:grid-cols-[.8fr_1.2fr] gap-10 lg:gap-20 items-start">
        {/* Header */}
        <div className="flex flex-col gap-3.5 max-w-[820px]">
          <h2
            id="how-it-works-heading"
            className="m-0 font-display font-extrabold text-[clamp(40px,5vw,64px)] leading-[0.95] text-[var(--c-ink)] [text-wrap:balance]"
          >
            {content.title}
          </h2>
        </div>

        <ol className="m-0 list-none p-0 divide-y divide-sand-300 border-y border-sand-300">
          {content.steps.map((step) => (
            <li key={step.number} className="grid grid-cols-[48px_1fr] sm:grid-cols-[64px_1fr] gap-5 py-7">
              <span className="font-mono text-amber-700 text-sm pt-1" aria-hidden="true">{step.number}</span>
              <div className="min-w-0">
                <h3 className="m-0 font-display font-bold text-[28px] leading-tight text-ink">{step.title}</h3>
                <p className="m-0 mt-2 text-base leading-relaxed text-body-2 max-w-[52ch]">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
