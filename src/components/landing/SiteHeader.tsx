import React from "react";
import Link from "next/link";
import type { LandingContent } from "@/content/uz";
import { contentUz } from "@/content/uz";
import { buildDemoUrl } from "@/lib/analytics";
import type { Locale } from "@/i18n/config";

export interface SiteHeaderProps {
  content?: LandingContent["header"];
  locale?: Locale | string;
}

export default function SiteHeader({
  content = contentUz.header,
  locale = "uz",
}: SiteHeaderProps) {
  const demoUrl = buildDemoUrl("header");

  return (
    <header className="sticky top-0 z-50 bg-[rgba(11,43,31,0.94)] backdrop-blur-[10px] border-b border-[rgba(255,255,255,0.08)]">
      <div className="max-w-[1240px] mx-auto px-6 h-[68px] flex items-center justify-between gap-7">
        {/* Brand logo */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-white no-underline shrink-0 group"
          aria-label="automaktab.uz bosh sahifa"
        >
          <span className="w-[30px] h-[30px] rounded-[7px] bg-[#E8A317] text-[#0B2B1F] grid place-items-center font-['Barlow_Condensed'] font-extrabold text-[18px] leading-none select-none group-hover:bg-[#F2B535] transition-colors">
            A
          </span>
          <span className="font-['Barlow_Condensed'] font-bold text-[22px] tracking-[0.01em] leading-none text-white">
            {content.logoText}
            <span className="text-[#E8A317]">{content.logoDomain}</span>
          </span>
        </a>

        {/* Navigation links */}
        <nav
          className="hidden md:flex flex-1 min-w-0 h-[68px] items-center gap-x-6 overflow-hidden"
          aria-label="Asosiy navigatsiya"
        >
          <a
            href="#yol"
            className="h-[68px] flex items-center text-[#D5E2DA] hover:text-white no-underline font-['Barlow'] font-medium text-[15px] transition-colors"
          >
            {content.nav.capabilities}
          </a>
          <a
            href="#rollar"
            className="h-[68px] flex items-center text-[#D5E2DA] hover:text-white no-underline font-['Barlow'] font-medium text-[15px] transition-colors"
          >
            {content.nav.roles}
          </a>
          <a
            href="#qanday"
            className="h-[68px] flex items-center text-[#D5E2DA] hover:text-white no-underline font-['Barlow'] font-medium text-[15px] transition-colors"
          >
            {content.nav.howItWorks}
          </a>
          <a
            href="#tariflar"
            className="h-[68px] flex items-center text-[#D5E2DA] hover:text-white no-underline font-['Barlow'] font-medium text-[15px] transition-colors"
          >
            {content.nav.pricing}
          </a>
          <a
            href="#savollar"
            className="h-[68px] flex items-center text-[#D5E2DA] hover:text-white no-underline font-['Barlow'] font-medium text-[15px] transition-colors"
          >
            {content.nav.faq}
          </a>
        </nav>

        {/* Action buttons */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Language Switcher */}
          <div className="flex items-center bg-[#07201A] border border-[rgba(255,255,255,0.12)] rounded-[8px] p-0.5 font-['JetBrains_Mono'] text-[12px] font-semibold">
            <Link
              href="/"
              aria-label="O‘zbekcha"
              className={`px-2 py-1 rounded-[6px] no-underline transition-colors ${
                locale === "uz"
                  ? "bg-[#E8A317] text-[#0B2B1F] font-bold shadow-xs"
                  : "text-[#C4D3CA] hover:text-white"
              }`}
            >
              UZ
            </Link>
            <Link
              href="/ru"
              aria-label="Русский"
              className={`px-2 py-1 rounded-[6px] no-underline transition-colors ${
                locale === "ru"
                  ? "bg-[#E8A317] text-[#0B2B1F] font-bold shadow-xs"
                  : "text-[#C4D3CA] hover:text-white"
              }`}
            >
              RU
            </Link>
            <Link
              href="/en"
              aria-label="English"
              className={`px-2 py-1 rounded-[6px] no-underline transition-colors ${
                locale === "en"
                  ? "bg-[#E8A317] text-[#0B2B1F] font-bold shadow-xs"
                  : "text-[#C4D3CA] hover:text-white"
              }`}
            >
              EN
            </Link>
          </div>

          <a
            href="https://app.automaktab.uz/login"
            className="hidden sm:flex h-[44px] px-3.5 items-center text-white hover:bg-[rgba(255,255,255,0.08)] hover:text-white no-underline font-['Barlow'] font-semibold text-[15px] rounded-[10px] transition-colors"
          >
            {content.login}
          </a>
          <a
            href={demoUrl}
            className="h-[44px] px-4 sm:px-5 flex items-center bg-[#E8A317] hover:bg-[#F2B535] text-[#0B2B1F] hover:text-[#0B2B1F] no-underline font-['Barlow'] font-bold text-[15px] rounded-[10px] shadow-sm transition-colors"
          >
            {content.demo}
          </a>
        </div>
      </div>
    </header>
  );
}
