"use client";

import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { LandingContent } from "@/content/uz";
import { track } from "@/lib/analytics";
import ProductScene from "./ProductScene";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface RoleTabsProps {
  content: LandingContent["roles"];
  scenes: LandingContent["scenes"];
}

export default function RoleTabs({ content, scenes }: RoleTabsProps) {
  const root = useRef<HTMLElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);

  useGSAP(() => {
    const element = root.current;
    if (!element) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", (_context, childSafe) => {
      if (!childSafe) return;
      const safe = childSafe as ReturnType<typeof useGSAP>["contextSafe"];
      let active = true;
      const select = safe((index: number) => {
        if (active && window.matchMedia("(prefers-reduced-motion: no-preference)").matches && element.closest("main")?.dataset.motionChanging !== "true" && !element.querySelector(".story-preview")?.contains(document.activeElement)) setActiveTab(index);
      });
      element.querySelectorAll<HTMLElement>("[data-role-chapter]").forEach((chapter, index) => ScrollTrigger.create({
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
    if (!preview.current) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(preview.current, { clipPath: "inset(0 0 8% 0 round 16px)", y: 8 }, {
        clipPath: "inset(0 0 0% 0 round 16px)", y: 0, duration: 0.45, ease: "power3.out", clearProps: "clipPath,transform",
      });
    });
    return () => media.revert();
  }, { scope: preview, dependencies: [activeTab], revertOnUpdate: true });

  const handleSelectTab = (index: number) => {
    setActiveTab(index);
    track("role_tab_select", { role: content.tabs[index]?.label });
  };
  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    const next = event.key === "ArrowLeft" ? (index + 3) % 4 : event.key === "ArrowRight" ? (index + 1) % 4 : event.key === "Home" ? 0 : event.key === "End" ? 3 : null;
    if (next === null) return;
    event.preventDefault();
    handleSelectTab(next);
    root.current?.querySelector<HTMLButtonElement>(`#role-tab-${next}`)?.focus();
  };
  const currentRole = content.tabs[activeTab];

  return (
    <section ref={root} id="rollar" data-screen-label="06 Kimlar uchun" data-active-role={activeTab} className="scroll-story role-story" aria-labelledby="roles-heading">
      <div className="landing-container">
        <h2 id="roles-heading" className="story-heading">{content.title}</h2>
        <div className="story-layout">
          <div className="role-static-examples story-chapters">
            <span className="story-rail" aria-hidden="true"><i data-story-progress /></span>
            {content.tabs.map((role, index) => (
              <details key={role.label} open data-role-chapter={index} data-current={index === activeTab} className="story-chapter">
                <summary>{role.label}</summary>
                <h3>{role.question}</h3>
                <p>{role.answer}</p>
                <ul className="story-modules">{role.modules.map((module) => <li key={module}>{module}</li>)}</ul>
                <div className="story-inline-preview"><ProductScene kind={role.scene} content={scenes} /></div>
              </details>
            ))}
          </div>
          <div className="story-preview">
            <div role="tablist" aria-labelledby="roles-heading" className="role-controls">
              {content.tabs.map((tab, index) => <button key={tab.label} id={`role-tab-${index}`} type="button" role="tab" aria-selected={index === activeTab} aria-controls="role-panel" tabIndex={index === activeTab ? 0 : -1} onClick={() => handleSelectTab(index)} onKeyDown={(event) => handleKeyDown(event, index)} className="role-tab">{tab.label}</button>)}
            </div>
            <div ref={preview} id="role-panel" role="tabpanel" aria-labelledby={`role-tab-${activeTab}`} tabIndex={0}>
              <ProductScene kind={currentRole.scene} content={scenes} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
