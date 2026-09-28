"use client";

import React, { useState, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import type { LandingContent } from "@/content/uz";

interface MorningReportWidgetProps {
  content: LandingContent["morningReport"];
}

export default function MorningReportWidget({ content }: MorningReportWidgetProps) {
  const [activeAction, setActiveAction] = useState<"none" | "debts" | "confirmed">("none");
  const feedbackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!feedbackRef.current || activeAction === "none") return;
      const mm = gsap.matchMedia();
      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          animate: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { reduceMotion } = context.conditions!;
          gsap.fromTo(
            feedbackRef.current,
            { autoAlpha: 0, y: reduceMotion ? 0 : -6, scale: reduceMotion ? 1 : 0.98 },
            { autoAlpha: 1, y: 0, scale: 1, duration: reduceMotion ? 0 : 0.24, ease: "power2.out" }
          );
        }
      );
      return () => mm.revert();
    },
    { dependencies: [activeAction] }
  );

  const handleTrialClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById("tariflar");
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 68;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section
      id="morning-report"
      data-screen-label="02b Morning Report"
      className="py-14 sm:py-20 px-4 sm:px-6 bg-[#0B2B1F] text-white relative overflow-hidden border-t border-[#184634]"
      aria-labelledby="morning-report-heading"
    >
      {/* Background road line accent */}
      <div
        className="absolute inset-x-0 top-0 h-1 opacity-20 pointer-events-none select-none"
        style={{
          background:
            "repeating-linear-gradient(90deg, #E8A317 0 48px, transparent 48px 80px)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
        
        {/* Left Explanation & Proof Ladder context */}
        <div className="lg:col-span-6 flex flex-col gap-5 sm:gap-6">
          <div className="flex items-center gap-2.5 font-['JetBrains_Mono'] font-semibold text-[13px] tracking-[0.08em] text-[#E8A317] uppercase">
            <span className="w-5 h-0.5 bg-[#E8A317]" aria-hidden="true" />
            <span>{content.eyebrow}</span>
          </div>

          <h2
            id="morning-report-heading"
            className="m-0 font-['Barlow_Condensed'] font-extrabold text-[clamp(36px,5vw,60px)] leading-[0.98] tracking-[-0.01em] [text-wrap:balance]"
          >
            {content.title}
            <span className="text-[#E8A317]">{content.titleAccent}</span>
          </h2>

          <p className="m-0 text-[#C4D3CA] text-base sm:text-lg leading-[1.6] [text-wrap:pretty]">
            {content.description}
          </p>

          <ul className="m-0 p-0 list-none flex flex-col gap-2.5 font-['Barlow'] text-[16px] text-[#D5E2DA]">
            {content.bullets.map((bullet) => (
              <li key={bullet} className="flex items-center gap-2.5">
                <span className="text-[#E8A317] font-bold" aria-hidden="true">✓</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          <div className="pt-1 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <a
              href="#tariflar"
              onClick={handleTrialClick}
              className="inline-flex items-center justify-between gap-3 bg-[#E8A317] hover:bg-[#F2B535] text-[#0B2B1F] font-['Barlow'] font-bold text-[15px] sm:text-[16px] px-5 py-3 rounded-lg no-underline transition-transform active:scale-95 shadow-md"
            >
              <span>{content.ctaButton}</span>
              <span className="text-lg leading-none">→</span>
            </a>
            <span className="text-xs text-[#9BB4A7] font-['JetBrains_Mono']">
              {content.trialNote}
            </span>
          </div>
        </div>

        {/* Right Telegram Simulation Card */}
        <div className="lg:col-span-6 w-full max-w-[560px] mx-auto">
          <div className="bg-[#0E1621] rounded-2xl p-4 sm:p-6 text-white shadow-2xl border border-[#232E3C] font-sans">
            
            {/* Telegram Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-[#1E2C3A] mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E8A317] text-[#0B2B1F] flex items-center justify-center font-bold text-lg font-['Barlow_Condensed'] shrink-0 shadow-sm">
                  AD
                </div>
                <div>
                  <div className="font-bold text-sm text-white flex items-center gap-1.5">
                    <span>{content.botTitle}</span>
                    <svg className="w-4 h-4 text-[#5288C1]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <div className="text-[11px] text-[#708499]">{content.botSub}</div>
                </div>
              </div>
              <span className="text-xs font-['JetBrains_Mono'] text-[#708499]">{content.timeLabel}</span>
            </div>

            {/* Telegram Bubble */}
            <div className="bg-[#182533] rounded-xl p-4 sm:p-5 border border-[#243447] text-sm leading-relaxed space-y-3.5">
              
              {/* Message Title */}
              <div className="font-bold text-sm sm:text-base text-[#64B5F6] border-b border-[#243447] pb-2 flex items-center justify-between">
                <span>{content.headerTitle}</span>
                <span className="text-xs font-['JetBrains_Mono'] text-[#A8C7B7]">{content.dateLabel}</span>
              </div>

              {/* 1. Cash flow */}
              <div>
                <div className="text-xs text-[#829BB0] uppercase font-['JetBrains_Mono'] font-semibold">
                  1. {content.revenueLabel}:
                </div>
                <div className="font-['JetBrains_Mono'] text-white text-xs sm:text-sm mt-1 space-y-0.5">
                  <div>• {content.revenueCollectedLabel}: <span className="text-[#81C784] font-bold">{content.revenueCollected}</span></div>
                  <div>• {content.revenueExpectedLabel}: <span className="text-[#FFD54F] font-bold">{content.revenueExpected}</span></div>
                </div>
              </div>

              {/* 2. Urgent Debt Alert */}
              <div className="p-3 rounded-lg bg-[#2E1E24] border border-[#522933]">
                <div className="text-xs text-[#E57373] uppercase font-['JetBrains_Mono'] font-bold flex items-center gap-1.5">
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                  </svg>
                  <span>2. {content.debtLabel}:</span>
                </div>
                
                <div className="font-['JetBrains_Mono'] text-xs text-[#FFCDD2] mt-2 space-y-1">
                  {content.debtStudents.map((st, idx) => (
                    <div key={idx} className="flex justify-between items-baseline gap-2">
                      <span>• {st.name} ({st.group}):</span>
                      <span className="font-bold text-[#FF8A80]">{st.amount}</span>
                    </div>
                  ))}
                </div>

                <div className="text-[11px] text-[#E0A8AE] mt-2 italic font-['Barlow']">
                  {content.debtNote}
                </div>
              </div>

              {/* 3. Driving Schedule & Fuel */}
              <div>
                <div className="text-xs text-[#829BB0] uppercase font-['JetBrains_Mono'] font-semibold">
                  3. {content.scheduleLabel}:
                </div>
                <div className="font-['JetBrains_Mono'] text-white text-xs mt-1 space-y-0.5">
                  <div>• {content.scheduleSessionsLabel}: <span className="font-bold">{content.scheduleSessions}</span> ({content.scheduleInstructors})</div>
                  <div>• {content.scheduleOpenSlotsLabel}: <span className="text-[#81C784] font-semibold">{content.scheduleOpenSlots}</span></div>
                  <div>• {content.scheduleFuelLabel}: <span>{content.scheduleFuel}</span></div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 grid grid-cols-2 gap-2 text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setActiveAction(activeAction === "debts" ? "none" : "debts")}
                  className={`py-2.5 px-3 rounded text-center transition-all min-h-[44px] flex items-center justify-center font-['Barlow'] ${
                    activeAction === "debts"
                      ? "bg-[#5288C1] text-white"
                      : "bg-[#243447] hover:bg-[#2F445C] text-[#64B5F6]"
                  }`}
                >
                  {content.btnDebts}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveAction(activeAction === "confirmed" ? "none" : "confirmed")}
                  className={`py-2.5 px-3 rounded text-center transition-all min-h-[44px] flex items-center justify-center font-['Barlow'] ${
                    activeAction === "confirmed"
                      ? "bg-[#1F7A4A] text-white"
                      : "bg-[#243447] hover:bg-[#2F445C] text-[#64B5F6]"
                  }`}
                >
                  {content.btnConfirm}
                </button>
              </div>

              {/* Dynamic Feedback Area */}
              {activeAction !== "none" && (
                <div ref={feedbackRef}>
                  {activeAction === "debts" && (
                    <div className="p-3 bg-[#13202E] border border-[#2B3E54] rounded-lg text-xs font-['JetBrains_Mono'] text-[#A8C7B7] space-y-1">
                      <div className="font-semibold text-white">✓ {content.feedbackDebts}:</div>
                      {content.debtStudents.map((st, idx) => (
                        <div key={idx}>
                          {st.name}: {st.time} {st.car} ({st.amount})
                        </div>
                      ))}
                      <div className="text-[11px] text-[#708499] pt-1">{content.debtNote}</div>
                    </div>
                  )}

                  {activeAction === "confirmed" && (
                    <div className="p-3 bg-[#142C20] border border-[#25523A] rounded-lg text-xs font-['JetBrains_Mono'] text-[#81C784]">
                      ✓ {content.revenueCollected}: {content.feedbackConfirm}.
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
