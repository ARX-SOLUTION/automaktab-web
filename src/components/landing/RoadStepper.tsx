"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import type { LandingContent } from "@/content/uz";
import { track } from "@/lib/analytics";
import DemoBadge from "./DemoBadge";

interface RoadStepperProps {
  content: LandingContent["journey"];
}

export default function RoadStepper({ content }: RoadStepperProps) {
  const [activeStop, setActiveStop] = useState(0);
  const previewRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!previewRef.current) return;
      const mm = gsap.matchMedia();
      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          animate: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { reduceMotion } = context.conditions!;
          gsap.fromTo(
            previewRef.current,
            { autoAlpha: 0, y: reduceMotion ? 0 : 8 },
            { autoAlpha: 1, y: 0, duration: reduceMotion ? 0 : 0.28, ease: "power2.out" }
          );
        }
      );
      return () => mm.revert();
    },
    { dependencies: [activeStop], scope: previewRef }
  );

  // Listen to external navigation from HeroSign
  useEffect(() => {
    const handleGoto = (e: CustomEvent<{ stop: number }>) => {
      if (typeof e.detail?.stop === "number" && e.detail.stop >= 0 && e.detail.stop < 5) {
        setActiveStop(e.detail.stop);
      }
    };
    window.addEventListener("automaktab_goto_stop", handleGoto as EventListener);
    return () => window.removeEventListener("automaktab_goto_stop", handleGoto as EventListener);
  }, []);

  const setStop = (index: number, method: "click" | "arrow" = "click") => {
    setActiveStop(index);
    track("journey_stop_view", { stop: index + 1, method });
  };

  const prevStop = () => {
    const prev = (activeStop + 4) % 5;
    setStop(prev, "arrow");
  };

  const nextStop = () => {
    const next = (activeStop + 1) % 5;
    setStop(next, "arrow");
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;
    if (e.key === "ArrowLeft") {
      nextIndex = (index + stops.length - 1) % stops.length;
    } else if (e.key === "ArrowRight") {
      nextIndex = (index + 1) % stops.length;
    } else if (e.key === "Home") {
      nextIndex = 0;
    } else if (e.key === "End") {
      nextIndex = stops.length - 1;
    } else {
      return;
    }
    e.preventDefault();
    setStop(nextIndex, "arrow");
    document.getElementById(`journey-stop-${nextIndex}`)?.focus();
  };

  const stops = content.stops.map((s) => ({
    n: s.number,
    label: s.name,
    sub: s.sub,
  }));
  const currentStop = content.stops[activeStop] || content.stops[0];

  return (
    <section
      id="yol"
      data-screen-label="04 Talaba yo‘li"
      className="py-16 sm:py-24 bg-paper border-y border-sand-300 scroll-mt-[68px]"
      aria-labelledby="journey-heading"
    >
      <div className="landing-container min-w-0 flex flex-col gap-8 sm:gap-10">
        {/* Section Header with Arrows */}
        <div className="flex flex-wrap justify-between items-end gap-6">
          <div className="flex flex-col gap-3.5 max-w-[720px]">
            <span className="font-mono font-semibold text-[13px] tracking-[0.08em] text-amber-700 uppercase">
              {content.eyebrow}
            </span>
            <h2
              id="journey-heading"
              className="m-0 font-display font-extrabold text-[clamp(40px,5vw,64px)] leading-[0.95] text-ink [text-wrap:balance]"
            >
              {content.title}
            </h2>
          </div>

          {/* Prev/Next Buttons */}
          <div className="flex gap-2 select-none" role="group" aria-label={content.trackAriaLabel}>
            <button
              type="button"
              onClick={prevStop}
              aria-label={content.navPrevLabel}
              className="w-12 h-12 rounded-[12px] border-[1.5px] border-ink bg-transparent text-ink hover:bg-ink hover:text-white font-body font-bold text-[20px] grid place-items-center transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
            >
              ←
            </button>
            <button
              type="button"
              onClick={nextStop}
              aria-label={content.navNextLabel}
              className="w-12 h-12 rounded-[12px] border-[1.5px] border-ink bg-ink text-white hover:bg-forest-600 font-body font-bold text-[20px] grid place-items-center transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
            >
              →
            </button>
          </div>
        </div>

        {/* Road Stepper Track */}
        <div
          className="min-w-0"
          role="tablist"
          aria-label={content.trackAriaLabel}
        >
          <div className="relative pt-[58px] pb-2">
            {/* Animated U Marker */}
            <div
              style={{
                left: `${10 + activeStop * 20}%`,
              }}
              className="absolute top-0 -translate-x-1/2 flex flex-col items-center pointer-events-none z-20 transition-[left] duration-[420ms] ease-[cubic-bezier(.2,.8,.2,1)] motion-reduce:transition-none"
              aria-hidden="true"
            >
              <span className="w-0 h-0 border-l-[24px] border-l-transparent border-r-[24px] border-r-transparent border-b-[40px] border-b-sign-red relative block">
                <span className="absolute -left-[15px] top-[9px] w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[26px] border-b-white" />
                <span className="absolute -left-2 top-[18px] w-4 text-center font-display font-extrabold text-[15px] leading-none text-ink">
                  U
                </span>
              </span>
              <span className="w-[2px] h-[10px] bg-ink" />
            </div>

            {/* Road Track (Asphalt) */}
            <div className="absolute inset-x-0 top-[58px] h-16 rounded-[32px] bg-road shadow-[inset_0_-4px_0_rgba(0,0,0,0.25)]" aria-hidden="true">
              {/* Dashed Center Road Line */}
              <div
                className="absolute left-8 right-8 top-[31px] h-[3px] opacity-60 pointer-events-none"
                style={{
                  background:
                    "repeating-linear-gradient(90deg, #F4EFE4 0 26px, transparent 26px 46px)",
                }}
                aria-hidden="true"
              />
            </div>

            <div className="relative grid grid-cols-5">
              {stops.map((s, i) => {
                const isActive = i === activeStop;
                const isPast = i < activeStop;
                const bg = isActive ? "var(--c-amber-500)" : isPast ? "var(--c-sand-100)" : "var(--c-road)";
                const fg = isActive || isPast ? "var(--c-ink)" : "var(--c-sand-100)";
                const ring = isActive ? "var(--c-on-dark-1)" : "var(--c-sand-100)";

                return (
                  <button
                    key={s.n}
                    id={`journey-stop-${i}`}
                    type="button"
                    role="tab"
                    onClick={() => setStop(i)}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                    aria-label={`0${s.n} · ${s.label}`}
                    aria-selected={isActive}
                    aria-controls="journey-stop-panel"
                    tabIndex={isActive ? 0 : -1}
                    className="min-w-0 bg-transparent border-0 px-0.5 pt-2 pb-2 rounded-[12px] cursor-pointer flex flex-col items-center gap-4 text-center group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                  >
                    <span
                      style={{ backgroundColor: bg, color: fg, borderColor: ring }}
                      className="w-12 h-12 shrink-0 rounded-full border-[3px] font-display font-extrabold text-[20px] grid place-items-center transition-colors duration-200"
                    >
                      {s.n}
                    </span>
                    <span className="w-full min-w-0 flex flex-col gap-1 break-words">
                      <span
                        style={{ color: isActive ? "var(--c-ink)" : "var(--c-muted)" }}
                        className="font-display font-bold text-[17px] sm:text-[20px] leading-tight group-hover:text-ink transition-colors"
                      >
                        {s.label}
                      </span>
                      <span className="font-body font-medium text-[12px] sm:text-[13px] leading-snug text-muted">
                        {s.sub}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Stop Contents (Tab Panels) */}
        <div
          id="journey-stop-panel"
          role="tabpanel"
          aria-labelledby={`journey-stop-${activeStop}`}
          tabIndex={0}
          className="grid min-w-0 grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 items-start min-h-[380px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
        >
          {/* Left Column: Dynamic Stop Information from content.stops */}
          <div className="min-w-0 flex flex-col gap-4.5">
            <span className="font-mono font-semibold text-[13px] text-amber-700 uppercase">
              0{currentStop.number} · {currentStop.name}
            </span>
            <h3 className="m-0 font-display font-extrabold text-[44px] leading-none text-ink">
              {currentStop.title}
            </h3>
            <div className="flex flex-col gap-2.5 font-body font-medium text-[17px] text-ink">
              {currentStop.points.map((point) => (
                <div key={point} className="flex items-center gap-2.5">
                  <span className="text-forest-600 font-bold">✓</span>
                  <span>{point}</span>
                </div>
              ))}
            </div>
            {activeStop === 2 && content.interactiveCta && (
              <a
                href="#sinab"
                className="min-h-11 py-2 inline-flex items-center font-body font-bold text-[17px] text-forest-600 hover:text-forest-800 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                {content.interactiveCta}
              </a>
            )}
          </div>

          {/* Right Column: Visual based on activeStop with GSAP entrance */}
          <div ref={previewRef} className="w-full min-w-0">
            {activeStop === 0 && (
              <div className="bg-sand-100 border border-sand-300 rounded-[18px] p-5 sm:p-6 flex flex-col gap-4 shadow-sm">
                <div className="flex flex-wrap justify-between items-center gap-2">
                  <span className="font-mono font-semibold text-[12px] text-muted">
                    TALABA KARTASI
                  </span>
                  <DemoBadge label="NAMUNA" />
                </div>
                <div className="flex items-center gap-3.5">
                  <span className="w-14 h-14 shrink-0 rounded-[14px] bg-ink text-amber-500 grid place-items-center font-display font-extrabold text-[22px]">
                    FS
                  </span>
                  <div className="min-w-0 flex flex-col gap-1">
                    <span className="font-display font-bold text-[24px] leading-none text-ink">
                      Saidova Feruza
                    </span>
                    <span className="font-mono font-medium text-[14px] text-muted">
                      +998 91 000 02 40
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 rounded-[7px] bg-white border border-sand-300 font-body font-semibold text-[14px]">
                    B toifa
                  </span>
                  <span className="px-2.5 py-1 rounded-[7px] bg-white border border-sand-300 font-mono font-semibold text-[14px]">
                    T-25 guruhi
                  </span>
                  <span className="px-2.5 py-1 rounded-[7px] bg-ok-bg border border-[#9FCBB0] text-ok-text font-body font-semibold text-[14px]">
                    083 tibbiy ma’lumotnoma: Bor
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 bg-[#E9E2D2] rounded-[10px] p-1 text-center font-body font-semibold text-[14px]">
                  <span className="flex-1 py-2 px-1 rounded-[7px] bg-white text-ink shadow-xs">
                    To‘lov
                  </span>
                  <span className="flex-1 py-2 px-1 text-muted">Imtihon</span>
                  <span className="flex-1 py-2 px-1 text-muted">Davomat</span>
                  <span className="flex-1 py-2 px-1 text-muted">Guruh tarixi</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="bg-white rounded-[10px] p-3 border border-sand-300">
                    <div className="font-body font-medium text-[13px] text-muted">Marketing va tavsiya</div>
                    <div className="font-body font-bold text-[16px] text-ink">Instagram · 2 ta referral</div>
                  </div>
                  <div className="bg-white rounded-[10px] p-3 border border-sand-300">
                    <div className="font-body font-medium text-[13px] text-muted">Joriy qarz</div>
                    <div className="font-mono font-bold text-[17px] text-err-text">3 500 000 so‘m</div>
                  </div>
                </div>
              </div>
            )}

            {activeStop === 1 && (
              <div className="bg-sand-100 border border-sand-300 rounded-[18px] p-5 sm:p-6 flex flex-col gap-3.5 shadow-sm">
                <div className="flex flex-wrap justify-between items-center gap-2">
                  <span className="font-mono font-semibold text-[12px] text-muted">
                    TO‘LOVLAR RO‘YXATI
                  </span>
                  <DemoBadge label="NAMUNA" />
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 rounded-[8px] border border-sand-400 bg-white font-body font-semibold text-[14px]">
                    Bu oy
                  </span>
                  <span className="px-3 py-1.5 rounded-[8px] border border-sand-400 bg-white font-body font-semibold text-[14px]">
                    Barcha filiallar
                  </span>
                  <span className="px-3 py-1.5 rounded-[8px] bg-ink text-white font-body font-semibold text-[14px]">
                    ✓ Qarzdorlar
                  </span>
                </div>
                <div className="bg-white rounded-[12px] overflow-hidden border border-sand-300">
                  <div className="grid grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)] gap-2 px-2 sm:px-3.5 py-2.5 font-mono font-semibold text-[10px] sm:text-[12px] text-muted border-b border-[#EEE7D8]">
                    <span>TALABA</span>
                    <span className="text-right">UMUMIY</span>
                    <span className="text-right">QOLDIQ</span>
                  </div>
                  <div className="grid grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)] gap-2 px-2 sm:px-3.5 py-3 items-center border-b border-[#EEE7D8] bg-err-bg">
                    <span className="font-body font-semibold text-[14px] sm:text-[16px] text-ink">Saidova Feruza</span>
                    <span className="text-right font-mono font-medium text-[12px] sm:text-[14px]">3 500 000</span>
                    <span className="text-right font-mono font-semibold text-[12px] sm:text-[14px] text-err-text">▲ 3 500 000</span>
                  </div>
                  <div className="grid grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)] gap-2 px-2 sm:px-3.5 py-3 items-center border-b border-[#EEE7D8]">
                    <span className="font-body font-semibold text-[14px] sm:text-[16px] text-ink">Tojiyeva Rustam</span>
                    <span className="text-right font-mono font-medium text-[12px] sm:text-[14px]">2 800 000</span>
                    <span className="text-right font-mono font-semibold text-[12px] sm:text-[14px] text-err-text">▲ 560 000</span>
                  </div>
                  <div className="grid grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)] gap-2 px-2 sm:px-3.5 py-3 items-center">
                    <span className="font-body font-semibold text-[14px] sm:text-[16px] text-muted">Tojiyeva Feruza</span>
                    <span className="text-right font-mono font-medium text-[12px] sm:text-[14px] text-muted">3 500 000</span>
                    <span className="text-right font-mono font-semibold text-[12px] sm:text-[14px] text-ok-text">✓ To‘liq</span>
                  </div>
                </div>
              </div>
            )}

            {activeStop === 2 && (
              <div className="relative rounded-[18px] overflow-hidden border border-sand-300 aspect-[4/3] bg-sand-100 shadow-sm">
                <Image
                  src="/images/demo/davomat.webp"
                  alt="Davomat bo‘limi: dars kartalari (namuna ma’lumotlari)"
                  fill
                  sizes="(max-width: 1024px) 100vw, 560px"
                  style={{ objectFit: "cover", objectPosition: "78% 40%" }}
                />
                <div className="absolute left-3 bottom-3">
                  <DemoBadge label="DEMO MA’LUMOTLARI" />
                </div>
              </div>
            )}

            {activeStop === 3 && (
              <div className="bg-sand-100 border border-sand-300 rounded-[18px] p-5 sm:p-6 flex flex-col gap-4 shadow-sm">
                <div className="flex flex-wrap justify-between items-center gap-2">
                  <span className="font-mono font-semibold text-[12px] text-muted">
                    O‘QISH YOZUVI · SAIDOVA F.
                  </span>
                  <DemoBadge label="NAMUNA" />
                </div>
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="font-display font-extrabold text-[64px] leading-none text-ink">
                    600
                  </span>
                  <span className="font-display font-bold text-[26px] text-muted">
                    / 1200 daqiqa
                  </span>
                </div>
                {/* Progress bar */}
                <div className="h-3.5 rounded-[7px] bg-sand-300 overflow-hidden">
                  <div
                    className="w-1/2 h-full"
                    style={{
                      background:
                        "repeating-linear-gradient(90deg, #14211A 0 18px, #2A3730 18px 22px)",
                    }}
                  />
                </div>
                <div className="flex justify-between font-body font-semibold text-[14px] text-muted">
                  <span>O‘tildi: 600 daq</span>
                  <span>Qoldi: 600 daq</span>
                </div>
                {/* Session list */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center gap-2.5 bg-white rounded-[10px] p-3 border border-sand-300">
                    <span className="font-body font-semibold text-[16px] text-ink">Seans · 90 daq</span>
                    <div className="flex gap-1.5 flex-wrap justify-end">
                      <span className="font-body font-semibold text-[12px] px-2 py-0.5 rounded-[5px] bg-ok-bg text-ok-text">
                        ✓ Instruktor qaydi
                      </span>
                      <span className="font-body font-semibold text-[12px] px-2 py-0.5 rounded-[5px] bg-ok-bg text-ok-text">
                        ✓ Tasdiqlandi
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center gap-2.5 bg-white rounded-[10px] p-3 border border-sand-300">
                    <span className="font-body font-semibold text-[16px] text-ink">Seans · 60 daq</span>
                    <div className="flex gap-1.5 flex-wrap justify-end">
                      <span className="font-body font-semibold text-[12px] px-2 py-0.5 rounded-[5px] bg-ok-bg text-ok-text">
                        ✓ Instruktor qaydi
                      </span>
                      <span className="font-body font-semibold text-[12px] px-2 py-0.5 rounded-[5px] bg-warn-bg text-warn-text">
                        ◷ Tasdiq kutilmoqda
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeStop === 4 && (
              <div className="bg-sand-100 border border-sand-300 rounded-[18px] p-5 sm:p-6 flex flex-col gap-4 shadow-sm">
                <div className="flex flex-wrap justify-between items-center gap-2">
                  <span className="font-mono font-semibold text-[12px] text-muted">
                    YHQ TEST BANKI · 11 TA MAVZU
                  </span>
                  <DemoBadge label="NAMUNA" />
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 rounded-[7px] bg-ink text-white font-body font-semibold text-[13px]">
                    11-mavzu: Chorrahalar
                  </span>
                  <span className="px-2.5 py-1 rounded-[7px] bg-white border border-sand-300 font-mono font-semibold text-[13px] text-amber-700">
                    ◷ 18:40 qoldi
                  </span>
                  <span className="px-2.5 py-1 rounded-[7px] bg-ok-bg border border-[#9FCBB0] text-ok-text font-body font-semibold text-[13px]">
                    90% o‘tish mezoni
                  </span>
                </div>
                <div className="bg-white rounded-[12px] p-4 border border-sand-300 flex flex-col gap-3">
                  <p className="m-0 font-body font-bold text-[16px] text-ink leading-snug">
                    Teng ahamiyatli yo‘llar kesishgan chorrahada qaysi haydovchi yo‘l berishi shart?
                  </p>
                  <div className="flex flex-col gap-2">
                    <div className="p-2.5 rounded-[8px] bg-ok-bg border border-[#9FCBB0] flex flex-wrap items-center justify-between gap-2 font-body font-semibold text-[14px] text-ok-text">
                      <span>A) O‘ng tomondan kelayotgan transportga</span>
                      <span className="font-mono font-bold">✓ To‘g‘ri</span>
                    </div>
                    <div className="p-2.5 rounded-[8px] bg-[#F8F5EE] border border-sand-300 font-body font-normal text-[14px] text-muted">
                      B) Chap tomondan kelayotgan mashinaga
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-white rounded-[10px] p-2 border border-sand-300">
                    <div className="font-display font-extrabold text-[20px] text-ink">11 ta</div>
                    <div className="font-body font-medium text-[12px] text-muted">Rasmiy mavzu</div>
                  </div>
                  <div className="bg-white rounded-[10px] p-2 border border-sand-300">
                    <div className="font-display font-extrabold text-[20px] text-ink">3 ta til</div>
                    <div className="font-body font-medium text-[12px] text-muted">UZ / RU / EN</div>
                  </div>
                  <div className="bg-white rounded-[10px] p-2 border border-sand-300">
                    <div className="font-display font-extrabold text-[20px] text-ok-text">95%</div>
                    <div className="font-body font-medium text-[12px] text-muted">Guruh natijasi</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
