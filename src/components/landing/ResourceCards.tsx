"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { LandingContent } from "@/content/uz";
import RoadmapCard from "./RoadmapCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface ResourceCardsProps {
  content: LandingContent["resources"];
  showRoadmap?: boolean;
}

export default function ResourceCards({
  content,
  showRoadmap = true,
}: ResourceCardsProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      const mm = gsap.matchMedia();
      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          animate: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { reduceMotion } = context.conditions!;
          if (reduceMotion) return;

          const cards = sectionRef.current?.querySelectorAll("[data-resource-card]");
          if (cards && cards.length > 0) {
            gsap.from(cards, {
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 85%",
                toggleActions: "play none none none",
                once: true,
              },
              autoAlpha: 0,
              y: 24,
              duration: 0.5,
              stagger: 0.12,
              ease: "power2.out",
              clearProps: "transform,opacity,visibility",
            });
          }
        }
      );
      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      data-screen-label="07 Resurslar"
      className="px-6 pb-24 sm:pb-28"
      aria-label="Resurslar va jamoa boshqaruvi"
    >
      <div className="max-w-[1240px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div data-resource-card className="bg-[#14211A] text-white rounded-[20px] overflow-hidden flex flex-col shadow-sm">
          <div className="p-7 pb-5 flex flex-col gap-3">
            <span className="font-['JetBrains_Mono'] font-semibold text-[12px] text-[#E8A317] uppercase tracking-wider">
              {content.expenseCard.badge}
            </span>
            <h3 className="m-0 font-['Barlow_Condensed'] font-extrabold text-[34px] leading-none text-white">
              {content.expenseCard.title}
            </h3>
            <p className="m-0 font-['Barlow'] font-normal text-[16px] leading-[1.55] text-[#C4D3CA]">
              {content.expenseCard.description}
            </p>
          </div>

          <div className="relative flex-1 min-h-[200px] m-5 mt-0 rounded-[12px] overflow-hidden border border-[rgba(255,255,255,0.1)]">
            <Image
              src="/images/demo/xarajatlar.webp"
              alt={content.expenseCard.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 400px"
              style={{ objectFit: "cover", objectPosition: "62% 40%" }}
            />
          </div>
        </div>

        <div data-resource-card className="bg-[#FFFCF6] border border-[#E2D9C6] rounded-[20px] p-7 flex flex-col gap-4 shadow-sm">
          <span className="font-['JetBrains_Mono'] font-semibold text-[12px] text-[#9A6400] uppercase tracking-wider">
            {content.teamCard.badge}
          </span>
          <h3 className="m-0 font-['Barlow_Condensed'] font-extrabold text-[34px] leading-none text-[#14211A]">
            {content.teamCard.title}
          </h3>
          <p className="m-0 font-['Barlow'] font-normal text-[16px] leading-[1.55] text-[#2F3B35]">
            {content.teamCard.description}
          </p>

          <div className="mt-auto pt-4 grid grid-cols-2 gap-2">
            {content.teamCard.stats.map((st) => (
              <div key={st.label} className="bg-[#F4EFE4] rounded-[12px] p-3 text-center border border-[#E2D9C6]">
                <div className="font-['Barlow_Condensed'] font-extrabold text-[30px] leading-none text-[#14211A]">
                  {st.count}
                </div>
                <div className="font-['Barlow'] font-medium text-[13px] text-[#5A6660] mt-1">
                  {st.label}
                </div>
              </div>
            ))}
          </div>
          <div className="font-['JetBrains_Mono'] font-medium text-[12px] text-[#5A6660]">
            {content.teamCard.sampleNote}
          </div>
        </div>

        {/* Card 3: Roadmap (Yo‘lda ta’mir) */}
        {showRoadmap && <RoadmapCard content={content.roadmapCard} />}
      </div>
    </section>
  );
}
