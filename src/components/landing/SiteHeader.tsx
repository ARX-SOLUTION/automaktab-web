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
  const navLinks = [
    { href: "#yol", label: content.nav.capabilities },
    { href: "#rollar", label: content.nav.roles },
    { href: "#qanday", label: content.nav.howItWorks },
    { href: "#tariflar", label: content.nav.pricing },
    { href: "#savollar", label: content.nav.faq },
  ];
  const languages = [
    { code: "uz", href: "/", label: "O‘zbekcha" },
    { code: "ru", href: "/ru", label: "Русский" },
    { code: "en", href: "/en", label: "English" },
  ];

  return (
    <header className="site-header z-50 bg-forest-800 border-b border-white/10">
      <div className="landing-container site-header-inner">
        {/* Brand logo */}
        <a
          href="#"
          className="site-header-brand min-w-0 min-h-11 flex items-center gap-2.5 text-white no-underline group"
          aria-label="automaktab.uz bosh sahifa"
        >
          <span className="w-[30px] h-[30px] shrink-0 rounded-[var(--r-xs)] border border-white/20 text-amber-500 grid place-items-center font-display font-extrabold text-lg leading-none select-none group-hover:border-amber-500 transition-colors">
            A
          </span>
          <span className="font-display font-bold text-[22px] tracking-[0.01em] leading-none text-white">
            {content.logoText}
            <span className="text-amber-500">{content.logoDomain}</span>
          </span>
        </a>

        {/* Navigation links */}
        <nav
          className="site-header-nav min-w-0"
          aria-label="Asosiy navigatsiya"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="min-h-11 flex items-center text-on-dark-2 hover:text-white no-underline font-body font-medium text-sm transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="https://app.automaktab.uz/login"
          className="site-header-login min-h-11 px-3 flex items-center text-white hover:bg-white/10 no-underline font-body font-semibold text-sm rounded-[var(--r-s)] transition-colors"
        >
          {content.login}
        </a>

        <div className="site-header-controls min-w-0">
          {/* Language Switcher */}
          <div className="flex shrink-0 items-center border border-white/15 rounded-[var(--r-s)] p-0.5 font-mono text-xs font-semibold">
            {languages.map((language) => (
              <Link
                key={language.code}
                href={language.href}
                aria-label={language.label}
                aria-current={locale === language.code ? "page" : undefined}
                className={`min-w-11 min-h-11 flex items-center justify-center rounded-[var(--r-xs)] no-underline transition-colors ${
                  locale === language.code
                    ? "bg-white/10 text-white"
                    : "text-on-dark-2 hover:text-white"
                }`}
              >
                {language.code.toUpperCase()}
              </Link>
            ))}
          </div>

          <a
            href={demoUrl}
            className="site-header-demo min-w-0 min-h-11 px-4 py-2 flex items-center justify-center text-center bg-amber-500 hover:bg-amber-400 text-forest-800 no-underline font-body font-bold text-sm rounded-[var(--r-s)] transition-colors [overflow-wrap:anywhere]"
          >
            {content.demo}
          </a>
        </div>
      </div>
    </header>
  );
}
