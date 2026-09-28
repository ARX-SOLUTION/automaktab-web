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
      className="py-24 sm:py-28 px-6 scroll-mt-[68px]"
      aria-labelledby="roles-heading"
    >
      <div className="max-w-[1240px] mx-auto flex flex-col gap-9">
        {/* Section Header */}
        <div className="flex flex-col gap-3.5 max-w-[760px]">
          <span className="font-['JetBrains_Mono'] font-semibold text-[13px] tracking-[0.08em] text-[#9A6400] uppercase">
            {content.eyebrow}
          </span>
          <h2
            id="roles-heading"
            className="m-0 font-['Barlow_Condensed'] font-extrabold text-[clamp(40px,5vw,64px)] leading-[0.95] text-[#14211A] [text-wrap:balance]"
          >
            {content.title}
          </h2>
        </div>

        {/* Tab List */}
        <div
          role="tablist"
          aria-label="Foydalanuvchi rollari"
          className="flex flex-wrap gap-2 select-none"
        >
          {content.tabs.map((tab, idx) => {
            const isActive = idx === activeTab;
            return (
              <button
                key={tab.label}
                id={`role-tab-${idx}`}
                role="tab"
                aria-selected={isActive}
                aria-controls={`role-panel-${idx}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => handleSelectTab(idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                style={{
                  backgroundColor: isActive ? "#14211A" : "transparent",
                  color: isActive ? "#FFFFFF" : "#14211A",
                }}
                className="h-12 px-5 rounded-[24px] border-[1.5px] border-[#14211A] font-['Barlow'] font-semibold text-[16px] cursor-pointer transition-colors duration-200"
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
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-[#FFFCF6] border border-[#E2D9C6] rounded-[24px] p-6 sm:p-10 shadow-sm"
          >
            {/* Left Content */}
            <div className="flex flex-col gap-5">
              <span className="font-['JetBrains_Mono'] font-semibold text-[13px] text-[#5A6660] tracking-wider uppercase">
                {content.questionEyebrow}
              </span>
              <p className="m-0 font-['Barlow_Condensed'] font-bold text-[clamp(30px,3.4vw,42px)] leading-[1.05] text-[#14211A] [text-wrap:balance]">
                {currentRole.question}
              </p>
              <div className="h-0.5 w-14 bg-[#E8A317]" aria-hidden="true" />
              <p className="m-0 font-['Barlow'] font-normal text-[18px] leading-[1.6] text-[#2F3B35]">
                {currentRole.answer}
              </p>
              {/* Modules chips */}
              <div className="flex flex-wrap gap-2 mt-1">
                {currentRole.modules.map((mod) => (
                  <span
                    key={mod}
                    className="px-3 py-1.5 rounded-[8px] bg-[#F4EFE4] border border-[#E2D9C6] font-['Barlow'] font-semibold text-[14px] text-[#14211A]"
                  >
                    {mod}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Crop Screenshot */}
            <div className="relative rounded-[16px] overflow-hidden border border-[#E2D9C6] aspect-[4/3] bg-[#F4EFE4] shadow-xs">
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
