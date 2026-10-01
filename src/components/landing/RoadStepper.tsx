"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import type { LandingContent } from "@/content/uz";
import { track } from "@/lib/analytics";
import DemoBadge from "./DemoBadge";
import ProductScene from "./ProductScene";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface RoadStepperProps {
  content: LandingContent["journey"];
  scenes: LandingContent["scenes"];
}

export default function RoadStepper({ content, scenes }: RoadStepperProps) {
  const root = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [activeStop, setActiveStop] = useState(0);
  const preview = content.previews;

  useGSAP(() => {
    const element = root.current;
    if (!element) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", (_context, childSafe) => {
      if (!childSafe) return;
      const safe = childSafe as ReturnType<typeof useGSAP>["contextSafe"];
      let active = true;
      const chapters = element.querySelectorAll<HTMLElement>("[data-journey-chapter]");
      const select = safe((index: number) => {
        if (active && window.matchMedia("(prefers-reduced-motion: no-preference)").matches && element.closest("main")?.dataset.motionChanging !== "true" && !element.querySelector(".story-preview")?.contains(document.activeElement)) setActiveStop(index);
      });
      chapters.forEach((chapter, index) => ScrollTrigger.create({
        trigger: chapter, start: "top 45%", end: "bottom 45%",
        onEnter: () => select(index), onEnterBack: () => select(index),
      }));
      gsap.fromTo(element.querySelector("[data-story-progress]"), { scaleY: 0 }, {
        scaleY: 1, transformOrigin: "top", ease: "none",
        scrollTrigger: { trigger: element.querySelector(".story-chapters"), start: "top 45%", end: "bottom 45%", scrub: 0.35 },
      });
      element.dataset.storyReady = "true";
      ScrollTrigger.refresh();
      let frame = 0;
      const refresh = safe(() => {
        if (!active) return;
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(safe(() => { if (active) ScrollTrigger.refresh(); }));
      });
      const resize = new ResizeObserver(refresh);
      resize.observe(element);
      void document.fonts.ready.then(refresh);
      return () => { active = false; delete element.dataset.storyReady; resize.disconnect(); cancelAnimationFrame(frame); };
    });
    return () => media.revert();
  }, { scope: root, dependencies: [content], revertOnUpdate: true });

  useGSAP(() => {
    if (!previewRef.current) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(previewRef.current, { clipPath: "inset(0 0 7% 0 round 16px)", x: 8 }, {
        clipPath: "inset(0 0 0% 0 round 16px)", x: 0, duration: 0.45, ease: "power3.out", clearProps: "clipPath,transform",
      });
    });
    return () => media.revert();
  }, { dependencies: [activeStop], scope: previewRef, revertOnUpdate: true });

  useEffect(() => {
    const handleGoto = (event: Event) => {
      const index = (event as CustomEvent<{ stop: number }>).detail?.stop;
      if (Number.isInteger(index) && index >= 0 && index < content.stops.length) setActiveStop(index);
    };
    window.addEventListener("automaktab_goto_stop", handleGoto);
    return () => window.removeEventListener("automaktab_goto_stop", handleGoto);
  }, [content.stops.length]);

  const selectStop = (index: number, method: "click" | "arrow" = "click") => {
    setActiveStop(index);
    track("journey_stop_view", { stop: index + 1, method });
  };
  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    const next = event.key === "ArrowLeft" ? (index + 4) % 5 : event.key === "ArrowRight" ? (index + 1) % 5 : event.key === "Home" ? 0 : event.key === "End" ? 4 : null;
    if (next === null) return;
    event.preventDefault();
    selectStop(next, "arrow");
    root.current?.querySelector<HTMLButtonElement>(`#journey-stop-${next}`)?.focus();
  };

  const renderPreview = (index: number) => <>
            {index === 0 && (
              <div className="bg-sand-100 border border-sand-300 rounded-[18px] p-5 sm:p-6 flex flex-col gap-4 shadow-sm">
                <div className="flex flex-wrap justify-between items-center gap-2">
                  <span className="font-mono font-semibold text-[12px] text-muted">
                    {preview.student.title}
                  </span>
                  <DemoBadge label={scenes.sampleLabel} />
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
                    {preview.student.category}
                  </span>
                  <span className="px-2.5 py-1 rounded-[7px] bg-white border border-sand-300 font-mono font-semibold text-[14px]">
                    {preview.student.group}
                  </span>
                  <span className="px-2.5 py-1 rounded-[7px] bg-ok-bg border border-[#9FCBB0] text-ok-text font-body font-semibold text-[14px]">
                    {preview.student.certificate}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 bg-[#E9E2D2] rounded-[10px] p-1 text-center font-body font-semibold text-[14px]">
                  <span className="flex-1 py-2 px-1 rounded-[7px] bg-white text-ink shadow-xs">
                    {preview.student.tabs[0]}
                  </span>
                  <span className="flex-1 py-2 px-1 text-muted">{preview.student.tabs[1]}</span>
                  <span className="flex-1 py-2 px-1 text-muted">{preview.student.tabs[2]}</span>
                  <span className="flex-1 py-2 px-1 text-muted">{preview.student.tabs[3]}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="bg-white rounded-[10px] p-3 border border-sand-300">
                    <div className="font-body font-medium text-[13px] text-muted">{preview.student.sourceLabel}</div>
                    <div className="font-body font-bold text-[16px] text-ink">{preview.student.sourceValue}</div>
                  </div>
                  <div className="bg-white rounded-[10px] p-3 border border-sand-300">
                    <div className="font-body font-medium text-[13px] text-muted">{preview.student.debtLabel}</div>
                    <div className="font-mono font-bold text-[17px] text-err-text">3 500 000 {scenes.currency}</div>
                  </div>
                </div>
              </div>
            )}

            {index === 1 && (
              <div className="bg-sand-100 border border-sand-300 rounded-[18px] p-5 sm:p-6 flex flex-col gap-3.5 shadow-sm">
                <div className="flex flex-wrap justify-between items-center gap-2">
                  <span className="font-mono font-semibold text-[12px] text-muted">
                    {preview.payments.title}
                  </span>
                  <DemoBadge label={scenes.sampleLabel} />
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 rounded-[8px] border border-sand-400 bg-white font-body font-semibold text-[14px]">
                    {preview.payments.period}
                  </span>
                  <span className="px-3 py-1.5 rounded-[8px] border border-sand-400 bg-white font-body font-semibold text-[14px]">
                    {preview.payments.branches}
                  </span>
                  <span className="px-3 py-1.5 rounded-[8px] bg-ink text-white font-body font-semibold text-[14px]">
                    ✓ {preview.payments.debtors}
                  </span>
                </div>
                <div className="bg-white rounded-[12px] overflow-hidden border border-sand-300">
                  <div className="grid grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)] gap-2 px-2 sm:px-3.5 py-2.5 font-mono font-semibold text-[10px] sm:text-[12px] text-muted border-b border-[#EEE7D8]">
                    <span>{preview.payments.columns[0]}</span>
                    <span className="text-right">{preview.payments.columns[1]}</span>
                    <span className="text-right">{preview.payments.columns[2]}</span>
                  </div>
                  <div className="grid grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)] gap-2 px-2 sm:px-3.5 py-3 items-center border-b border-[#EEE7D8] bg-err-bg">
                    <span className="font-body font-semibold text-[14px] sm:text-[16px] text-ink">Saidova Feruza</span>
                    <span className="text-right font-mono font-medium text-[12px] sm:text-[14px]">{"3\u00A0500\u00A0000"}</span>
                    <span className="text-right font-mono font-semibold text-[12px] sm:text-[14px] text-err-text">▲ {"3\u00A0500\u00A0000"}</span>
                  </div>
                  <div className="grid grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)] gap-2 px-2 sm:px-3.5 py-3 items-center border-b border-[#EEE7D8]">
                    <span className="font-body font-semibold text-[14px] sm:text-[16px] text-ink">Tojiyeva Rustam</span>
                    <span className="text-right font-mono font-medium text-[12px] sm:text-[14px]">{"2\u00A0800\u00A0000"}</span>
                    <span className="text-right font-mono font-semibold text-[12px] sm:text-[14px] text-err-text">▲ {"560\u00A0000"}</span>
                  </div>
                  <div className="grid grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)] gap-2 px-2 sm:px-3.5 py-3 items-center">
                    <span className="font-body font-semibold text-[14px] sm:text-[16px] text-muted">Tojiyeva Feruza</span>
                    <span className="text-right font-mono font-medium text-[12px] sm:text-[14px] text-muted">{"3\u00A0500\u00A0000"}</span>
                    <span className="text-right font-mono font-semibold text-[12px] sm:text-[14px] text-ok-text">✓ {preview.payments.paidInFull}</span>
                  </div>
                </div>
              </div>
            )}

            {index === 2 && (
              <ProductScene kind="teacher" content={scenes} />
            )}

            {index === 3 && (
              <div className="bg-sand-100 border border-sand-300 rounded-[18px] p-5 sm:p-6 flex flex-col gap-4 shadow-sm">
                <div className="flex flex-wrap justify-between items-center gap-2">
                  <span className="font-mono font-semibold text-[12px] text-muted">
                    {preview.driving.title}
                  </span>
                  <DemoBadge label={scenes.sampleLabel} />
                </div>
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="font-display font-extrabold text-[64px] leading-none text-ink">
                    600
                  </span>
                  <span className="font-display font-bold text-[26px] text-muted">
                    {preview.driving.quota}
                  </span>
                </div>
                {/* Progress bar */}
                <div className="h-3.5 rounded-[7px] bg-sand-300 overflow-hidden">
                  <div
                    className="w-1/2 h-full"
                    style={{
                      background:
                        "var(--c-amber-500)",
                    }}
                  />
                </div>
                <div className="flex justify-between font-body font-semibold text-[14px] text-muted">
                  <span>{preview.driving.completed}</span>
                  <span>{preview.driving.remaining}</span>
                </div>
                {/* Session list */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center gap-2.5 bg-white rounded-[10px] p-3 border border-sand-300">
                    <span className="font-body font-semibold text-[16px] text-ink">{preview.driving.sessions[0]}</span>
                    <div className="flex gap-1.5 flex-wrap justify-end">
                      <span className="font-body font-semibold text-[12px] px-2 py-0.5 rounded-[5px] bg-ok-bg text-ok-text">
                        ✓ {preview.driving.instructorNote}
                      </span>
                      <span className="font-body font-semibold text-[12px] px-2 py-0.5 rounded-[5px] bg-ok-bg text-ok-text">
                        ✓ {preview.driving.confirmed}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center gap-2.5 bg-white rounded-[10px] p-3 border border-sand-300">
                    <span className="font-body font-semibold text-[16px] text-ink">{preview.driving.sessions[1]}</span>
                    <div className="flex gap-1.5 flex-wrap justify-end">
                      <span className="font-body font-semibold text-[12px] px-2 py-0.5 rounded-[5px] bg-ok-bg text-ok-text">
                        ✓ {preview.driving.instructorNote}
                      </span>
                      <span className="font-body font-semibold text-[12px] px-2 py-0.5 rounded-[5px] bg-warn-bg text-warn-text">
                        ◷ {preview.driving.pending}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {index === 4 && (
              <div className="bg-sand-100 border border-sand-300 rounded-[18px] p-5 sm:p-6 flex flex-col gap-4 shadow-sm">
                <div className="flex flex-wrap justify-between items-center gap-2">
                  <span className="font-mono font-semibold text-[12px] text-muted">
                    {preview.exam.title}
                  </span>
                  <DemoBadge label={scenes.sampleLabel} />
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 rounded-[7px] bg-ink text-white font-body font-semibold text-[13px]">
                    {preview.exam.topic}
                  </span>
                  <span className="px-2.5 py-1 rounded-[7px] bg-white border border-sand-300 font-mono font-semibold text-[13px] text-amber-700">
                    ◷ {preview.exam.remaining}
                  </span>
                  <span className="px-2.5 py-1 rounded-[7px] bg-ok-bg border border-[#9FCBB0] text-ok-text font-body font-semibold text-[13px]">
                    {preview.exam.threshold}
                  </span>
                </div>
                <div className="bg-white rounded-[12px] p-4 border border-sand-300 flex flex-col gap-3">
                  <p className="m-0 font-body font-bold text-[16px] text-ink leading-snug">
                    {preview.exam.question}
                  </p>
                  <div className="flex flex-col gap-2">
                    <div className="p-2.5 rounded-[8px] bg-ok-bg border border-[#9FCBB0] flex flex-wrap items-center justify-between gap-2 font-body font-semibold text-[14px] text-ok-text">
                      <span>{preview.exam.correctAnswer}</span>
                      <span className="font-mono font-bold">✓ {preview.exam.correctLabel}</span>
                    </div>
                    <div className="p-2.5 rounded-[8px] bg-[#F8F5EE] border border-sand-300 font-body font-normal text-[14px] text-muted">
                      {preview.exam.alternativeAnswer}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-white rounded-[10px] p-2 border border-sand-300">
                    <div className="font-display font-extrabold text-[20px] text-ink">{preview.exam.topicCount}</div>
                    <div className="font-body font-medium text-[12px] text-muted">{preview.exam.topicLabel}</div>
                  </div>
                  <div className="bg-white rounded-[10px] p-2 border border-sand-300">
                    <div className="font-display font-extrabold text-[20px] text-ink">{preview.exam.languageCount}</div>
                    <div className="font-body font-medium text-[12px] text-muted">UZ / RU / EN</div>
                  </div>
                  <div className="bg-white rounded-[10px] p-2 border border-sand-300">
                    <div className="font-display font-extrabold text-[20px] text-ok-text">95%</div>
                    <div className="font-body font-medium text-[12px] text-muted">{preview.exam.resultLabel}</div>
                  </div>
                </div>
                <p className="scene-note">{scenes.education.internalNote}</p>
              </div>
            )}

  </>;

  return (
    <section ref={root} id="yol" data-screen-label="04 Talaba yo‘li" data-active-stop={activeStop} className="scroll-story journey-story bg-paper border-y border-sand-300" aria-labelledby="journey-heading">
      <div className="landing-container">
        <h2 id="journey-heading" className="story-heading">{content.title}</h2>
        <div className="story-layout">
          <div className="story-chapters">
            <span className="story-rail" aria-hidden="true"><i data-story-progress /></span>
            {content.stops.map((stop, index) => (
              <details key={stop.number} open data-journey-chapter={index} data-current={index === activeStop} className="story-chapter">
                <summary><span className="story-marker" aria-hidden="true">{stop.number}</span>{stop.name}</summary>
                <h3>{stop.title}</h3>
                <ul className="story-points">{stop.points.map((point) => <li key={point}><Check size={18} aria-hidden="true" />{point}</li>)}</ul>
                {index === 2 && <a className="story-attendance-link" href="#sinab">{content.interactiveCta}</a>}
                <div className="story-inline-preview">{renderPreview(index)}</div>
              </details>
            ))}
          </div>
          <div className="story-preview">
            <div className="story-controls">
              <div role="tablist" aria-label={content.trackAriaLabel} className="journey-controls">
                {content.stops.map((stop, index) => <button key={stop.number} type="button" role="tab" id={`journey-stop-${index}`} aria-label={`${stop.number} · ${stop.name}`} aria-selected={index === activeStop} aria-controls="journey-stop-panel" tabIndex={index === activeStop ? 0 : -1} onClick={() => selectStop(index)} onKeyDown={(event) => handleKeyDown(event, index)}><span>{stop.number}</span>{stop.name}</button>)}
              </div>
              <div className="story-arrows">
                <button type="button" aria-label={content.navPrevLabel} onClick={() => selectStop((activeStop + 4) % 5, "arrow")}><ChevronLeft size={19} aria-hidden="true" /></button>
                <button type="button" aria-label={content.navNextLabel} onClick={() => selectStop((activeStop + 1) % 5, "arrow")}><ChevronRight size={19} aria-hidden="true" /></button>
              </div>
            </div>
            <div ref={previewRef} id="journey-stop-panel" role="tabpanel" aria-labelledby={`journey-stop-${activeStop}`} tabIndex={0}>{renderPreview(activeStop)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
