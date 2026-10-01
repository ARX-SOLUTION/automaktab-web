"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { switchLocalePath, preserveLocaleSuffix } from "@/lib/locale-metadata";
import type { LandingContent } from "@/content/uz";
import { contentUz } from "@/content/uz";
import { contentRu } from "@/content/ru";
import { contentEn } from "@/content/en";
import { isLocale, type Locale } from "@/i18n/config";
import { SEO_RELATED_PAGE_IDS, SEO_LEGAL_PAGE_IDS, SEO_PAGES, getSeoPagePath } from "@/config/seo-pages";

export interface SiteFooterProps {
  content?: LandingContent["footer"];
  locale?: Locale | string;
  availableLocales?: readonly Locale[];
}

export default function SiteFooter({
  locale = "uz",
  availableLocales,
  content = locale === "ru" ? contentRu.footer : locale === "en" ? contentEn.footer : contentUz.footer,
}: SiteFooterProps) {
  const pathname = usePathname() || (locale === "uz" ? "/" : `/${locale}`);
  const home = locale === "uz" ? "/" : `/${locale}`;
  const pageLocale = isLocale(locale) ? locale : "uz";

  return (
    <footer className="site-footer">
      <div className="landing-container">
        <div className="footer-landmark">
          <p>{content.tagline}</p>
          <svg className="footer-roads" viewBox="0 0 720 190" fill="none" aria-hidden="true">
            <path d="M10 24 H164 Q216 24 216 76 V104 Q216 144 264 144 H710" />
            <path d="M10 42 H146 Q198 42 198 94 V122 Q198 162 264 162 H710" />
            <path d="M10 112 H142 Q178 112 210 128 L258 152 H710" className="footer-road-center" />
            <path d="M10 170 H146 Q198 170 228 156 L254 144" />
            <path d="M10 188 H164 Q216 188 246 172 L272 162" />
            <circle cx="10" cy="33" r="5" /><circle cx="10" cy="112" r="5" /><circle cx="10" cy="179" r="5" />
          </svg>
        </div>
        <a href={pageLocale === "uz" ? "/" : `/${pageLocale}`} className="footer-wordmark">automaktab<span>.uz</span></a>
      <div className="footer-grid">

        <div className="footer-navigation">
          <nav aria-label={content.tagline} className="footer-links">
            <h3>automaktab.uz</h3>
            <Link href={`${home === "/" ? "" : home}/blog`}>{pageLocale === "ru" ? "Блог" : "Blog"}</Link>
            {content.links.map((link) => (
              <a key={link.label} href={link.href.startsWith("#") ? `${home}${link.href}` : link.href}>{link.label}</a>
            ))}
          </nav>
          <nav aria-label={pageLocale === "ru" ? "Возможности" : pageLocale === "en" ? "Features" : "Imkoniyatlar"} className="footer-links">
            <h3>{pageLocale === "ru" ? "Возможности" : pageLocale === "en" ? "Features" : "Imkoniyatlar"}</h3>
            {SEO_RELATED_PAGE_IDS.map((id) => (
              <Link key={id} href={getSeoPagePath(id, pageLocale)}>{SEO_PAGES[id][pageLocale].eyebrow}</Link>
            ))}
          </nav>
          <nav aria-label={pageLocale === "ru" ? "Условия" : pageLocale === "en" ? "Terms" : "Shartlar"} className="footer-links">
            <h3>{pageLocale === "ru" ? "Условия" : pageLocale === "en" ? "Terms" : "Shartlar"}</h3>
            {SEO_LEGAL_PAGE_IDS.map((id) => (
              <Link key={id} href={getSeoPagePath(id, pageLocale)}>{SEO_PAGES[id][pageLocale].eyebrow}</Link>
            ))}
          </nav>
        </div>

        {/* Languages */}
        <div className="flex items-center gap-1.5 font-mono text-[13px] font-semibold">
          <a
            onClick={preserveLocaleSuffix}
            onAuxClick={preserveLocaleSuffix}
            href={switchLocalePath(pathname, "uz", availableLocales)}
            aria-label="O‘zbekcha"
            className={`px-2.5 py-1 rounded-[6px] transition-colors no-underline ${
              locale === "uz"
                ? "bg-[rgba(255,255,255,0.15)] text-white font-bold"
                : "text-on-dark-3 hover:text-white"
            }`}
          >
            UZ
          </a>
          <a
            onClick={preserveLocaleSuffix}
            onAuxClick={preserveLocaleSuffix}
            href={switchLocalePath(pathname, "ru", availableLocales)}
            aria-label="Русский"
            className={`px-2.5 py-1 rounded-[6px] transition-colors no-underline ${
              locale === "ru"
                ? "bg-[rgba(255,255,255,0.15)] text-white font-bold"
                : "text-on-dark-3 hover:text-white"
            }`}
          >
            RU
          </a>
          <a
            onClick={preserveLocaleSuffix}
            onAuxClick={preserveLocaleSuffix}
            href={switchLocalePath(pathname, "en", availableLocales)}
            aria-label="English"
            className={`px-2.5 py-1 rounded-[6px] transition-colors no-underline ${
              locale === "en"
                ? "bg-[rgba(255,255,255,0.15)] text-white font-bold"
                : "text-on-dark-3 hover:text-white"
            }`}
          >
            EN
          </a>
        </div>
      </div>

      {/* Copyright */}
      {content.copyright && (
        <div className="footer-copyright">
          <p>
            {content.copyright}
          </p>
        </div>
      )}
      </div>
    </footer>
  );
}
