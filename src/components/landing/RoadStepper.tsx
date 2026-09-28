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

  // Keyboard navigation on the track container
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevStop();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      nextStop();
    }
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
      className="py-24 px-6 bg-[#FFFCF6] border-y border-[#E2D9C6] scroll-mt-[68px]"
      aria-labelledby="journey-heading"
    >
      <div className="max-w-[1240px] mx-auto flex flex-col gap-10">
        {/* Section Header with Arrows */}
        <div className="flex flex-wrap justify-between items-end gap-6">
          <div className="flex flex-col gap-3.5 max-w-[720px]">
            <span className="font-['JetBrains_Mono'] font-semibold text-[13px] tracking-[0.08em] text-[#9A6400] uppercase">
              {content.eyebrow}
            </span>
            <h2
              id="journey-heading"
              className="m-0 font-['Barlow_Condensed'] font-extrabold text-[clamp(40px,5vw,64px)] leading-[0.95] text-[#14211A] [text-wrap:balance]"
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
              className="w-12 h-12 rounded-[12px] border-[1.5px] border-[#14211A] bg-transparent text-[#14211A] hover:bg-[#14211A] hover:text-white font-['Barlow'] font-bold text-[20px] grid place-items-center transition-colors cursor-pointer"
            >
              ←
            </button>
            <button
              type="button"
              onClick={nextStop}
              aria-label={content.navNextLabel}
              className="w-12 h-12 rounded-[12px] border-[1.5px] border-[#14211A] bg-[#14211A] text-white hover:bg-[#0E6B43] font-['Barlow'] font-bold text-[20px] grid place-items-center transition-colors cursor-pointer"
            >
              →
            </button>
          </div>
        </div>

        {/* Road Stepper Track */}
        <div
          className="overflow-x-auto -mx-6 px-6 focus-visible:outline-none"
          role="region"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          aria-label={content.trackAriaLabel}
        >
          <div className="min-w-[680px] relative pt-[58px] pb-2">
            {/* Animated U Marker */}
            <div
              style={{
                left: `${10 + activeStop * 20}%`,
                transition: "left 420ms cubic-bezier(.2,.8,.2,1)",
              }}
              className="absolute top-0 -translate-x-1/2 flex flex-col items-center pointer-events-none z-20"
              aria-hidden="true"
            >
              <span className="w-0 h-0 border-l-[24px] border-l-transparent border-r-[24px] border-r-transparent border-b-[40px] border-b-[#D7261E] relative block">
                <span className="absolute -left-[15px] top-[9px] w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[26px] border-b-white" />
                <span className="absolute -left-2 top-[18px] w-4 text-center font-['Barlow_Condensed'] font-extrabold text-[15px] leading-none text-[#14211A]">
                  U
                </span>
              </span>
              <span className="w-[2px] h-[10px] bg-[#14211A]" />
            </div>

            {/* Road Track (Asphalt) */}
            <div className="h-16 rounded-[32px] bg-[#252B28] relative shadow-[inset_0_-4px_0_rgba(0,0,0,0.25)] flex items-center">
              {/* Dashed Center Road Line */}
              <div
                className="absolute left-8 right-8 top-[31px] h-[3px] opacity-60 pointer-events-none"
                style={{
                  background:
                    "repeating-linear-gradient(90deg, #F4EFE4 0 26px, transparent 26px 46px)",
                }}
                aria-hidden="true"
              />

              {/* 5 Stop Circles */}
              {stops.map((s, i) => {
                const isActive = i === activeStop;
                const isPast = i < activeStop;
                const bg = isActive ? "#E8A317" : isPast ? "#F4EFE4" : "#252B28";
                const fg = isActive || isPast ? "#14211A" : "#F4EFE4";
                const ring = isActive ? "#FFFFFF" : "#F4EFE4";

                return (
                  <button
                    key={s.n}
                    type="button"
                    onClick={() => setStop(i)}
                    aria-label={`0${s.n} · ${s.label}`}
                    aria-current={isActive ? "step" : undefined}
                    style={{
                      left: `${10 + i * 20}%`,
                      backgroundColor: bg,
                      color: fg,
                      borderColor: ring,
                    }}
                    className="absolute top-2 -translate-x-1/2 w-12 h-12 rounded-full border-[3px] font-['Barlow_Condensed'] font-extrabold text-[20px] grid place-items-center cursor-pointer transition-colors duration-200 z-10"
                  >
                    {s.n}
                  </button>
                );
              })}
            </div>

            {/* Labels below Road */}
            <div className="grid grid-cols-5 mt-3.5" aria-hidden="true">
              {stops.map((s, i) => {
                const isActive = i === activeStop;
                return (
                  <button
                    key={s.n}
                    type="button"
                    tabIndex={-1}
                    onClick={() => setStop(i)}
                    className="bg-transparent border-0 p-1.5 cursor-pointer flex flex-col items-center gap-0.5 text-center group"
                  >
                    <span
                      style={{ color: isActive ? "#14211A" : "#5A6660" }}
                      className="font-['Barlow_Condensed'] font-bold text-[20px] leading-tight group-hover:text-[#14211A] transition-colors"
                    >
                      {s.label}
                    </span>
                    <span className="font-['Barlow'] font-medium text-[13px] text-[#5A6660]">
                      {s.sub}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Stop Contents (Tab Panels) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start min-h-[380px]">
          {/* Left Column: Dynamic Stop Information from content.stops */}
          <div className="flex flex-col gap-4.5">
            <span className="font-['JetBrains_Mono'] font-semibold text-[13px] text-[#9A6400] uppercase">
              0{currentStop.number} · {currentStop.name}
            </span>
            <h3 className="m-0 font-['Barlow_Condensed'] font-extrabold text-[44px] leading-none text-[#14211A]">
              {currentStop.title}
            </h3>
            <div className="flex flex-col gap-2.5 font-['Barlow'] font-medium text-[17px] text-[#14211A]">
              {currentStop.points.map((point) => (
                <div key={point} className="flex items-center gap-2.5">
                  <span className="text-[#0E6B43] font-bold">✓</span>
                  <span>{point}</span>
                </div>
              ))}
            </div>
            {activeStop === 2 && content.interactiveCta && (
              <a
                href="#sinab"
                className="font-['Barlow'] font-bold text-[17px] text-[#0E6B43] hover:text-[#0B2B1F] underline underline-offset-4"
              >
                {content.interactiveCta}
              </a>
            )}
          </div>

          {/* Right Column: Visual based on activeStop with GSAP entrance */}
          <div ref={previewRef} className="w-full">
            {activeStop === 0 && (
              <div className="bg-[#F4EFE4] border border-[#E2D9C6] rounded-[18px] p-5 sm:p-6 flex flex-col gap-4 shadow-sm">
                <div className="flex justify-between items-center">
                  <span className="font-['JetBrains_Mono'] font-semibold text-[12px] text-[#5A6660]">
                    TALABA KARTASI
                  </span>
                  <DemoBadge label="NAMUNA" />
                </div>
                <div className="flex items-center gap-3.5">
                  <span className="w-14 h-14 rounded-[14px] bg-[#14211A] text-[#E8A317] grid place-items-center font-['Barlow_Condensed'] font-extrabold text-[22px]">
                    FS
                  </span>
                  <div className="flex flex-col gap-1">
                    <span className="font-['Barlow_Condensed'] font-bold text-[24px] leading-none text-[#14211A]">
                      Saidova Feruza
                    </span>
                    <span className="font-['JetBrains_Mono'] font-medium text-[14px] text-[#5A6660]">
                      +998 91 000 02 40
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 rounded-[7px] bg-white border border-[#E2D9C6] font-['Barlow'] font-semibold text-[14px]">
                    B toifa
                  </span>
                  <span className="px-2.5 py-1 rounded-[7px] bg-white border border-[#E2D9C6] font-['JetBrains_Mono'] font-semibold text-[14px]">
                    T-25 guruhi
                  </span>
                  <span className="px-2.5 py-1 rounded-[7px] bg-[#E3F1E8] border border-[#9FCBB0] text-[#1B5E3A] font-['Barlow'] font-semibold text-[14px]">
                    083 tibbiy ma’lumotnoma: Bor
                  </span>
                </div>
                <div className="flex gap-1 bg-[#E9E2D2] rounded-[10px] p-1 text-center font-['Barlow'] font-semibold text-[14px]">
                  <span className="flex-1 py-2 px-1 rounded-[7px] bg-white text-[#14211A] shadow-xs">
                    To‘lov
                  </span>
                  <span className="flex-1 py-2 px-1 text-[#5A6660]">Imtihon</span>
                  <span className="flex-1 py-2 px-1 text-[#5A6660]">Davomat</span>
                  <span className="flex-1 py-2 px-1 text-[#5A6660]">Guruh tarixi</span>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="bg-white rounded-[10px] p-3 border border-[#E2D9C6]">
                    <div className="font-['Barlow'] font-medium text-[13px] text-[#5A6660]">Marketing va tavsiya</div>
                    <div className="font-['Barlow'] font-bold text-[16px] text-[#14211A]">Instagram · 2 ta referral</div>
                  </div>
                  <div className="bg-white rounded-[10px] p-3 border border-[#E2D9C6]">
                    <div className="font-['Barlow'] font-medium text-[13px] text-[#5A6660]">Joriy qarz</div>
                    <div className="font-['JetBrains_Mono'] font-bold text-[17px] text-[#B3301A]">3 500 000 so‘m</div>
                  </div>
                </div>
              </div>
            )}

            {activeStop === 1 && (
              <div className="bg-[#F4EFE4] border border-[#E2D9C6] rounded-[18px] p-5 sm:p-6 flex flex-col gap-3.5 shadow-sm">
                <div className="flex justify-between items-center">
                  <span className="font-['JetBrains_Mono'] font-semibold text-[12px] text-[#5A6660]">
                    TO‘LOVLAR RO‘YXATI
                  </span>
                  <DemoBadge label="NAMUNA" />
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 rounded-[8px] border border-[#CFC6B3] bg-white font-['Barlow'] font-semibold text-[14px]">
                    Bu oy
                  </span>
                  <span className="px-3 py-1.5 rounded-[8px] border border-[#CFC6B3] bg-white font-['Barlow'] font-semibold text-[14px]">
                    Barcha filiallar
                  </span>
                  <span className="px-3 py-1.5 rounded-[8px] bg-[#14211A] text-white font-['Barlow'] font-semibold text-[14px]">
                    ✓ Qarzdorlar
                  </span>
                </div>
                <div className="bg-white rounded-[12px] overflow-hidden border border-[#E2D9C6]">
                  <div className="grid grid-cols-[1.4fr_1fr_1fr] px-3.5 py-2.5 font-['JetBrains_Mono'] font-semibold text-[12px] text-[#5A6660] border-b border-[#EEE7D8]">
                    <span>TALABA</span>
                    <span className="text-right">UMUMIY</span>
                    <span className="text-right">QOLDIQ</span>
                  </div>
                  <div className="grid grid-cols-[1.4fr_1fr_1fr] px-3.5 py-3 items-center border-b border-[#EEE7D8] bg-[#FFF6F3]">
                    <span className="font-['Barlow'] font-semibold text-[16px] text-[#14211A]">Saidova Feruza</span>
                    <span className="text-right font-['JetBrains_Mono'] font-medium text-[14px]">3 500 000</span>
                    <span className="text-right font-['JetBrains_Mono'] font-semibold text-[14px] text-[#B3301A]">▲ 3 500 000</span>
                  </div>
                  <div className="grid grid-cols-[1.4fr_1fr_1fr] px-3.5 py-3 items-center border-b border-[#EEE7D8]">
                    <span className="font-['Barlow'] font-semibold text-[16px] text-[#14211A]">Tojiyeva Rustam</span>
                    <span className="text-right font-['JetBrains_Mono'] font-medium text-[14px]">2 800 000</span>
                    <span className="text-right font-['JetBrains_Mono'] font-semibold text-[14px] text-[#B3301A]">▲ 560 000</span>
                  </div>
                  <div className="grid grid-cols-[1.4fr_1fr_1fr] px-3.5 py-3 items-center">
                    <span className="font-['Barlow'] font-semibold text-[16px] text-[#5A6660]">Tojiyeva Feruza</span>
                    <span className="text-right font-['JetBrains_Mono'] font-medium text-[14px] text-[#5A6660]">3 500 000</span>
                    <span className="text-right font-['JetBrains_Mono'] font-semibold text-[14px] text-[#1B5E3A]">✓ To‘liq</span>
                  </div>
                </div>
              </div>
            )}

            {activeStop === 2 && (
              <div className="relative rounded-[18px] overflow-hidden border border-[#E2D9C6] aspect-[4/3] bg-[#F4EFE4] shadow-sm">
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
              <div className="bg-[#F4EFE4] border border-[#E2D9C6] rounded-[18px] p-5 sm:p-6 flex flex-col gap-4 shadow-sm">
                <div className="flex justify-between items-center">
                  <span className="font-['JetBrains_Mono'] font-semibold text-[12px] text-[#5A6660]">
                    O‘QISH YOZUVI · SAIDOVA F.
                  </span>
                  <DemoBadge label="NAMUNA" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-['Barlow_Condensed'] font-extrabold text-[64px] leading-none text-[#14211A]">
                    600
                  </span>
                  <span className="font-['Barlow_Condensed'] font-bold text-[26px] text-[#5A6660]">
                    / 1200 daqiqa
                  </span>
                </div>
                {/* Progress bar */}
                <div className="h-3.5 rounded-[7px] bg-[#E2D9C6] overflow-hidden">
                  <div
                    className="w-1/2 h-full"
                    style={{
                      background:
                        "repeating-linear-gradient(90deg, #14211A 0 18px, #2A3730 18px 22px)",
                    }}
                  />
                </div>
                <div className="flex justify-between font-['Barlow'] font-semibold text-[14px] text-[#5A6660]">
                  <span>O‘tildi: 600 daq</span>
                  <span>Qoldi: 600 daq</span>
                </div>
                {/* Session list */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center gap-2.5 bg-white rounded-[10px] p-3 border border-[#E2D9C6]">
                    <span className="font-['Barlow'] font-semibold text-[16px] text-[#14211A]">Seans · 90 daq</span>
                    <div className="flex gap-1.5 flex-wrap justify-end">
                      <span className="font-['Barlow'] font-semibold text-[12px] px-2 py-0.5 rounded-[5px] bg-[#E3F1E8] text-[#1B5E3A]">
                        ✓ Instruktor qaydi
                      </span>
                      <span className="font-['Barlow'] font-semibold text-[12px] px-2 py-0.5 rounded-[5px] bg-[#E3F1E8] text-[#1B5E3A]">
                        ✓ Tasdiqlandi
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center gap-2.5 bg-white rounded-[10px] p-3 border border-[#E2D9C6]">
                    <span className="font-['Barlow'] font-semibold text-[16px] text-[#14211A]">Seans · 60 daq</span>
                    <div className="flex gap-1.5 flex-wrap justify-end">
                      <span className="font-['Barlow'] font-semibold text-[12px] px-2 py-0.5 rounded-[5px] bg-[#E3F1E8] text-[#1B5E3A]">
                        ✓ Instruktor qaydi
                      </span>
                      <span className="font-['Barlow'] font-semibold text-[12px] px-2 py-0.5 rounded-[5px] bg-[#FBEFD5] text-[#7A4E00]">
                        ◷ Tasdiq kutilmoqda
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeStop === 4 && (
              <div className="bg-[#F4EFE4] border border-[#E2D9C6] rounded-[18px] p-5 sm:p-6 flex flex-col gap-4 shadow-sm">
                <div className="flex justify-between items-center">
                  <span className="font-['JetBrains_Mono'] font-semibold text-[12px] text-[#5A6660]">
                    YHQ TEST BANKI · 11 TA MAVZU
                  </span>
                  <DemoBadge label="NAMUNA" />
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 rounded-[7px] bg-[#14211A] text-white font-['Barlow'] font-semibold text-[13px]">
                    11-mavzu: Chorrahalar
                  </span>
                  <span className="px-2.5 py-1 rounded-[7px] bg-white border border-[#E2D9C6] font-['JetBrains_Mono'] font-semibold text-[13px] text-[#9A6400]">
                    ◷ 18:40 qoldi
                  </span>
                  <span className="px-2.5 py-1 rounded-[7px] bg-[#E3F1E8] border border-[#9FCBB0] text-[#1B5E3A] font-['Barlow'] font-semibold text-[13px]">
                    90% o‘tish mezoni
                  </span>
                </div>
                <div className="bg-white rounded-[12px] p-4 border border-[#E2D9C6] flex flex-col gap-3">
                  <p className="m-0 font-['Barlow'] font-bold text-[16px] text-[#14211A] leading-snug">
                    Teng ahamiyatli yo‘llar kesishgan chorrahada qaysi haydovchi yo‘l berishi shart?
                  </p>
                  <div className="flex flex-col gap-2">
                    <div className="p-2.5 rounded-[8px] bg-[#E3F1E8] border border-[#9FCBB0] flex items-center justify-between font-['Barlow'] font-semibold text-[14px] text-[#1B5E3A]">
                      <span>A) O‘ng tomondan kelayotgan transportga</span>
                      <span className="font-['JetBrains_Mono'] font-bold">✓ To‘g‘ri</span>
                    </div>
                    <div className="p-2.5 rounded-[8px] bg-[#F8F5EE] border border-[#E2D9C6] font-['Barlow'] font-normal text-[14px] text-[#5A6660]">
                      B) Chap tomondan kelayotgan mashinaga
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-white rounded-[10px] p-2 border border-[#E2D9C6]">
                    <div className="font-['Barlow_Condensed'] font-extrabold text-[20px] text-[#14211A]">11 ta</div>
                    <div className="font-['Barlow'] font-medium text-[12px] text-[#5A6660]">Rasmiy mavzu</div>
                  </div>
                  <div className="bg-white rounded-[10px] p-2 border border-[#E2D9C6]">
                    <div className="font-['Barlow_Condensed'] font-extrabold text-[20px] text-[#14211A]">3 ta til</div>
                    <div className="font-['Barlow'] font-medium text-[12px] text-[#5A6660]">UZ / RU / EN</div>
                  </div>
                  <div className="bg-white rounded-[10px] p-2 border border-[#E2D9C6]">
                    <div className="font-['Barlow_Condensed'] font-extrabold text-[20px] text-[#1B5E3A]">95%</div>
                    <div className="font-['Barlow'] font-medium text-[12px] text-[#5A6660]">Guruh natijasi</div>
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
