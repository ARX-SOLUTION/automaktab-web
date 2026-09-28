import React from "react";
import Image from "next/image";
import type { LandingContent } from "@/content/uz";
import DemoBadge from "./DemoBadge";
import { CalloutPin, CalloutCard } from "./Callout";

interface ProofFrameProps {
  content: LandingContent["proof"];
}

export default function ProofFrame({ content }: ProofFrameProps) {
  return (
    <section
      data-screen-label="02 Proof"
      className="px-6 -mt-[150px] relative z-20 pb-24"
      aria-label="Tizim interfeysi isboti"
    >
      <div className="max-w-[1240px] mx-auto flex flex-col gap-[22px]">
        {/* Browser Frame */}
        <div className="bg-[#FFFCF6] border border-[#E2D9C6] rounded-[18px] shadow-[0_30px_80px_rgba(11,43,31,0.28)] overflow-hidden">
          {/* Browser Top Bar */}
          <div className="h-[46px] bg-[#F8F3E8] border-b border-[#E2D9C6] px-4 sm:px-5 flex items-center justify-between gap-3.5 select-none">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D9CFBC]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#D9CFBC]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#D9CFBC]" />
            </div>

            <div className="font-['JetBrains_Mono'] font-medium text-[13px] text-[#5A6660] truncate">
              {content.urlText}
            </div>

            <DemoBadge label={content.badge} />
          </div>

          {/* Screenshot Container with Pins */}
          <div className="relative w-full aspect-[1353/929] bg-[#14211A] overflow-hidden">
            <Image
              src="/images/demo/dashboard.webp"
              alt={content.imageAlt}
              width={1353}
              height={929}
              loading="eager"
              sizes="(max-width: 1240px) 100vw, 1240px"
              className="w-full h-auto object-cover"
            />

            {/* Numbered Callout Pins */}
            {content.callouts.map((c) => (
              <CalloutPin
                key={c.number}
                number={c.number}
                topPct={c.topPct}
                leftPct={c.leftPct}
              />
            ))}
          </div>
        </div>

        {/* 3 Callout items below frame */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {content.callouts.map((c) => (
            <CalloutCard
              key={c.number}
              number={c.number}
              title={c.title}
              description={c.description}
            />
          ))}
        </div>

        {/* Frame Caption */}
        <p className="m-0 font-['JetBrains_Mono'] font-medium text-[13px] leading-[1.5] text-[#5A6660]">
          {content.caption}
        </p>
      </div>
    </section>
  );
}
