import React from "react";
import Link from "next/link";
import type { LandingContent } from "@/content/uz";
import { contentUz } from "@/content/uz";
import type { Locale } from "@/i18n/config";

export interface SiteFooterProps {
  content?: LandingContent["footer"];
  locale?: Locale | string;
}

export default function SiteFooter({
  content = contentUz.footer,
  locale = "uz",
}: SiteFooterProps) {
  return (
    <footer className="bg-[#07201A] text-[#B9C9BF] py-9 px-6 border-t border-[rgba(255,255,255,0.06)]">
      <div className="max-w-[1240px] mx-auto flex flex-wrap justify-between items-center gap-5">
        {/* Brand */}
        <span className="font-['Barlow_Condensed'] font-bold text-[20px] text-white">
          automaktab<span className="text-[#E8A317]">.uz</span>
        </span>

        {/* Links */}
        <nav
          className="flex flex-wrap gap-x-5 gap-y-1.5 font-['Barlow'] font-medium text-[15px]"
          aria-label="Pastki navigatsiya"
        >
          {content.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[#B9C9BF] hover:text-white no-underline transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Languages */}
        <div className="flex items-center gap-1.5 font-['JetBrains_Mono'] text-[13px] font-semibold">
          <Link
            href="/"
            aria-label="O‘zbekcha"
            className={`px-2.5 py-1 rounded-[6px] transition-colors no-underline ${
              locale === "uz"
                ? "bg-[rgba(255,255,255,0.15)] text-white font-bold"
                : "text-[#7E8F86] hover:text-white"
            }`}
          >
            UZ
          </Link>
          <Link
            href="/ru"
            aria-label="Русский"
            className={`px-2.5 py-1 rounded-[6px] transition-colors no-underline ${
              locale === "ru"
                ? "bg-[rgba(255,255,255,0.15)] text-white font-bold"
                : "text-[#7E8F86] hover:text-white"
            }`}
          >
            RU
          </Link>
          <Link
            href="/en"
            aria-label="English"
            className={`px-2.5 py-1 rounded-[6px] transition-colors no-underline ${
              locale === "en"
                ? "bg-[rgba(255,255,255,0.15)] text-white font-bold"
                : "text-[#7E8F86] hover:text-white"
            }`}
          >
            EN
          </Link>
        </div>
      </div>

      {/* Copyright */}
      {content.copyright && (
        <div className="max-w-[1240px] mx-auto mt-6 pt-5 border-t border-[rgba(255,255,255,0.06)] text-center sm:text-left">
          <p className="m-0 font-['Barlow'] text-[13px] text-[#7E8F86]">
            {content.copyright}
          </p>
        </div>
      )}
    </footer>
  );
}
