"use client";

import React, { useState } from "react";
import type { LandingContent } from "@/content/uz";
import { track } from "@/lib/analytics";

interface FaqAccordionProps {
  content: LandingContent["faq"];
  demoAccess: "login" | "oneclick";
}

export default function FaqAccordion({ content, demoAccess }: FaqAccordionProps) {
  // First item open by default per design.md §6.12
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    const next = openIndex === idx ? null : idx;
    setOpenIndex(next);
    if (next !== null) {
      track("faq_open", { index: idx });
    }
  };

  return (
    <section
      id="savollar"
      data-screen-label="10 Savollar"
      className="py-24 sm:py-28 px-6 bg-[#FFFCF6] border-t border-[#E2D9C6] scroll-mt-[68px]"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 sm:gap-14 items-start">
        {/* Section Heading */}
        <div className="flex flex-col gap-3.5">
          <span className="font-['JetBrains_Mono'] font-semibold text-[13px] tracking-[0.08em] text-[#9A6400] uppercase">
            {content.eyebrow}
          </span>
          <h2
            id="faq-heading"
            className="m-0 font-['Barlow_Condensed'] font-extrabold text-[clamp(40px,5vw,64px)] leading-[0.95] text-[#14211A] [text-wrap:balance]"
          >
            {content.title}
          </h2>
        </div>

        {/* Accordion List */}
        <div className="lg:col-span-2 min-w-0 flex flex-col border-t-2 border-[#14211A]">
          {content.items.map((item, idx) => {
            const isOpen = openIndex === idx;
            const answer =
              demoAccess === "oneclick" && item.answerOneClick
                ? item.answerOneClick
                : item.answerLogin;

            return (
              <div key={item.question} className="border-b border-[#E2D9C6]">
                <button
                  type="button"
                  id={`faq-btn-${idx}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  onClick={() => toggle(idx)}
                  className="w-full min-h-[64px] py-3.5 flex justify-between items-center gap-4 bg-transparent border-0 cursor-pointer text-left text-[#14211A] font-['Barlow_Condensed'] font-bold text-[20px] sm:text-[22px] leading-[1.2] group"
                >
                  <span className="group-hover:text-[#0E6B43] transition-colors">
                    {item.question}
                  </span>
                  <span
                    className="w-8 h-8 rounded-full border-[1.5px] border-[#14211A] grid place-items-center font-['Barlow'] font-semibold text-[18px] shrink-0 leading-none group-hover:border-[#0E6B43] group-hover:text-[#0E6B43] transition-colors"
                    aria-hidden="true"
                  >
                    {isOpen ? "–" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${idx}`}
                    role="region"
                    aria-labelledby={`faq-btn-${idx}`}
                    className="pb-5 pr-8 sm:pr-12 font-['Barlow'] font-normal text-[17px] leading-[1.6] text-[#2F3B35]"
                  >
                    {answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
