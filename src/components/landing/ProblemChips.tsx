import React from "react";
import type { LandingContent } from "@/content/uz";

interface ProblemChipsProps {
  content: LandingContent["problem"];
}

const rotations = ["-rotate-2", "rotate-[1.5deg]", "-rotate-1", "rotate-2"];

export default function ProblemChips({ content }: ProblemChipsProps) {
  return (
    <section
      data-screen-label="03 Muammo"
      className="px-6 pb-24 sm:pb-28"
      aria-labelledby="problem-heading"
    >
      <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 items-center border-t-2 border-[#14211A] pt-12">
        <h2
          id="problem-heading"
          className="m-0 font-['Barlow_Condensed'] font-extrabold text-[clamp(40px,5vw,64px)] leading-[0.95] text-[#14211A] [text-wrap:balance]"
        >
          {content.title}
        </h2>

        <div className="flex flex-col gap-4.5">
          {/* Crossed-out chips */}
          <div className="flex flex-wrap gap-2.5 items-center">
            {content.chips.map((chip, i) => (
              <span
                key={chip}
                className={`px-4 py-2.5 border-[1.5px] border-dashed border-[#9A9383] rounded-[10px] font-['Barlow'] font-semibold text-[17px] text-[#6D675B] line-through select-none whitespace-nowrap ${
                  rotations[i % rotations.length]
                }`}
              >
                {chip}
              </span>
            ))}
          </div>

          <p className="m-0 font-['Barlow'] font-normal text-[19px] leading-[1.6] text-[#2F3B35] [text-wrap:pretty]">
            {content.bridge}
          </p>
        </div>
      </div>
    </section>
  );
}
