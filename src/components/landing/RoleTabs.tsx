"use client";

import React, { useState } from "react";
import Image from "next/image";
import type { LandingContent } from "@/content/uz";
import { track } from "@/lib/analytics";
import DemoBadge from "./DemoBadge";

interface RoleTabsProps {
  content: LandingContent["roles"];
}

export default function RoleTabs({ content }: RoleTabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  const handleSelectTab = (index: number) => {
    setActiveTab(index);
    track("role_tab_select", { role: content.tabs[index]?.label });
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;
    if (e.key === "ArrowLeft") {
      nextIndex = (index + content.tabs.length - 1) % content.tabs.length;
    } else if (e.key === "ArrowRight") {
      nextIndex = (index + 1) % content.tabs.length;
    } else if (e.key === "Home") {
      nextIndex = 0;
    } else if (e.key === "End") {
      nextIndex = content.tabs.length - 1;
    } else {
      return;
    }
    e.preventDefault();
    handleSelectTab(nextIndex);
    // Focus the new tab
    const tabEl = document.getElementById(`role-tab-${nextIndex}`);
    tabEl?.focus();
  };

  const currentRole = content.tabs[activeTab];

  return (
    <section
      id="rollar"
      data-screen-label="06 Kimlar uchun"
      className="py-16 sm:py-28 scroll-mt-[68px]"
      aria-labelledby="roles-heading"
    >
      <div className="landing-container min-w-0 flex flex-col gap-8 sm:gap-9">
        {/* Section Header */}
        <div className="flex flex-col gap-3.5 max-w-[760px]">
          <span className="font-mono font-semibold text-[13px] tracking-[0.08em] text-amber-700 uppercase">
            {content.eyebrow}
          </span>
          <h2
            id="roles-heading"
            className="m-0 font-display font-extrabold text-[clamp(40px,5vw,64px)] leading-[0.95] text-ink [text-wrap:balance]"
          >
            {content.title}
          </h2>
        </div>

        {/* Tab List */}
        <div
          role="tablist"
          aria-labelledby="roles-heading"
          className="flex flex-wrap gap-2 select-none"
        >
          {content.tabs.map((tab, idx) => {
            const isActive = idx === activeTab;
            return (
              <button
                key={tab.label}
                id={`role-tab-${idx}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`role-panel-${idx}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => handleSelectTab(idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                style={{
                  backgroundColor: isActive ? "var(--c-ink)" : "transparent",
                  color: isActive ? "var(--c-on-dark-1)" : "var(--c-ink)",
                }}
                className="min-h-12 max-w-full px-4 sm:px-5 py-2 rounded-[var(--r-pill)] border-[1.5px] border-ink font-body font-semibold text-[16px] cursor-pointer transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Panel */}
        {currentRole && (
          <div
            id={`role-panel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`role-tab-${activeTab}`}
            tabIndex={0}
            className="grid min-w-0 grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 items-center bg-paper border border-sand-300 rounded-[var(--r-xl)] p-5 sm:p-10 shadow-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
          >
            {/* Left Content */}
            <div className="min-w-0 flex flex-col gap-5">
              <span className="font-mono font-semibold text-[13px] text-muted tracking-wider uppercase">
                {content.questionEyebrow}
              </span>
              <p className="m-0 font-display font-bold text-[clamp(30px,3.4vw,42px)] leading-[1.05] text-ink [text-wrap:balance]">
                {currentRole.question}
              </p>
              <div className="h-0.5 w-14 bg-amber-500" aria-hidden="true" />
              <p className="m-0 font-body font-normal text-[18px] leading-[1.6] text-body-2">
                {currentRole.answer}
              </p>
              {/* Modules chips */}
              <div className="flex flex-wrap gap-2 mt-1">
                {currentRole.modules.map((mod) => (
                  <span
                    key={mod}
                    className="max-w-full px-3 py-1.5 rounded-[8px] bg-sand-100 border border-sand-300 font-body font-semibold text-[14px] text-ink break-words"
                  >
                    {mod}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Crop Screenshot */}
            <div className="relative min-w-0 rounded-[16px] overflow-hidden border border-sand-300 aspect-[4/3] bg-sand-100 shadow-xs">
              <Image
                src={currentRole.image}
                alt={currentRole.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 560px"
                style={{ objectFit: "cover", objectPosition: currentRole.objectPosition }}
              />
              <div className="absolute left-3 bottom-3">
                <DemoBadge label={content.badge} />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
