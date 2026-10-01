import React from "react";
import { Clock3 } from "lucide-react";
import type { LandingContent } from "@/content/uz";

interface RoadmapCardProps {
  content: LandingContent["resources"]["roadmapCard"];
}

export default function RoadmapCard({ content }: RoadmapCardProps) {
  return (
    <div data-resource-card className="bg-[#FBEFD5] border-2 border-dashed border-[#B7791F] rounded-[20px] p-7 flex flex-col gap-4 shadow-sm">
      {/* Warning Sign + Eyebrow */}
      <div className="flex items-center gap-3.5 select-none">
        <Clock3 size={32} className="text-warn-text shrink-0" aria-hidden="true" />
        <div className="font-mono font-semibold text-[12px] text-[#7A4E00] uppercase tracking-wider">
          {content.title}
        </div>
      </div>

      <h3 className="m-0 font-display font-extrabold text-[24px] sm:text-[28px] leading-tight text-[var(--c-ink)]">
        {content.notice}
      </h3>

      <div className="flex flex-col gap-2.5">
        {content.items.map((item) => (
          <div
            key={item.title}
            className="bg-[var(--c-paper)] rounded-[12px] p-3.5 flex flex-col gap-1 border border-[#E8C27A]"
          >
            <div className="flex justify-between gap-2.5 items-center">
              <span className="font-body font-bold text-[18px] text-[var(--c-ink)]">
                {item.title}
              </span>
              <span className="font-body font-bold text-[12px] px-2 py-0.5 rounded-[5px] bg-[var(--c-ink)] text-[#FFE08A] whitespace-nowrap">
                {item.badge}
              </span>
            </div>
            <span className="font-body font-normal text-[15px] leading-[1.45] text-[#4A4232]">
              {item.description}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
