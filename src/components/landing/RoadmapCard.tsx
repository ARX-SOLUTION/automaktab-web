import React from "react";
import type { LandingContent } from "@/content/uz";

interface RoadmapCardProps {
  content: LandingContent["resources"]["roadmapCard"];
}

export default function RoadmapCard({ content }: RoadmapCardProps) {
  return (
    <div data-resource-card className="bg-[#FBEFD5] border-2 border-dashed border-[#B7791F] rounded-[20px] p-7 flex flex-col gap-4 shadow-sm">
      {/* Warning Sign + Eyebrow */}
      <div className="flex items-center gap-3.5 select-none">
        <span className="relative w-[52px] h-[46px] shrink-0" aria-hidden="true">
          {/* Red Outer Triangle */}
          <span
            className="absolute inset-0 bg-[#D7261E]"
            style={{ clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }}
          />
          {/* Yellow Inner Triangle */}
          <span
            className="absolute left-[6px] right-[6px] top-[8px] bottom-[4px] bg-[#FFE08A]"
            style={{ clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }}
          />
          {/* Exclamation mark */}
          <span className="absolute inset-x-0 top-[17px] text-center font-['Barlow_Condensed'] font-extrabold text-[22px] leading-none text-[#14211A]">
            !
          </span>
        </span>
        <div className="font-['JetBrains_Mono'] font-semibold text-[12px] text-[#7A4E00] uppercase tracking-wider">
          {content.title}
        </div>
      </div>

      <h3 className="m-0 font-['Barlow_Condensed'] font-extrabold text-[24px] sm:text-[28px] leading-tight text-[#14211A]">
        {content.notice}
      </h3>

      <div className="flex flex-col gap-2.5">
        {content.items.map((item) => (
          <div
            key={item.title}
            className="bg-[#FFFCF6] rounded-[12px] p-3.5 flex flex-col gap-1 border border-[#E8C27A]"
          >
            <div className="flex justify-between gap-2.5 items-center">
              <span className="font-['Barlow'] font-bold text-[18px] text-[#14211A]">
                {item.title}
              </span>
              <span className="font-['Barlow'] font-bold text-[12px] px-2 py-0.5 rounded-[5px] bg-[#14211A] text-[#FFE08A] whitespace-nowrap">
                {item.badge}
              </span>
            </div>
            <span className="font-['Barlow'] font-normal text-[15px] leading-[1.45] text-[#4A4232]">
              {item.description}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
