"use client";

import React from "react";
import Link from "next/link";
import type { LandingContent } from "@/content/uz";
import { contentUz } from "@/content/uz";
import { contentRu } from "@/content/ru";
import { contentEn } from "@/content/en";
import { buildDemoUrl } from "@/lib/analytics";
import type { Locale } from "@/i18n/config";

export interface SiteHeaderProps {
  content?: LandingContent["header"];
  locale?: Locale | string;
}

export default function SiteHeader({
  locale = "uz",
  content = locale === "ru" ? contentRu.header : locale === "en" ? contentEn.header : contentUz.header,
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
    <header className="site-header z-50 bg-paper border-b-2 border-sand-300">
      <div className="landing-container site-header-inner">
        {/* Brand logo */}
        <a
          href={locale === "uz" ? "/" : `/${locale}`}
          className="site-header-brand min-w-0 min-h-11 flex items-center text-ink no-underline"
          aria-label={locale === "ru" ? "automaktab.uz: главная страница" : locale === "en" ? "automaktab.uz homepage" : "automaktab.uz bosh sahifa"}
        >
          <span className="font-display font-black text-[25px] tracking-[-0.03em] leading-none text-ink">
            {content.logoText}
            <span className="text-forest-600">{content.logoDomain}</span>
          </span>
        </a>

        <details
          className="site-header-menu"
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              event.currentTarget.open = false;
              event.currentTarget.querySelector("summary")?.focus();
            }
          }}
          onClick={(event) => {
            if ((event.target as HTMLElement).closest("a")) event.currentTarget.open = false;
          }}
        >
          <summary>{locale === "ru" ? "Меню" : locale === "en" ? "Menu" : "Menyu"}</summary>
          <nav aria-label={locale === "ru" ? "Навигация" : locale === "en" ? "Navigation" : "Navigatsiya"}>
            {navLinks.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
          </nav>
        </details>

        {/* Navigation links */}
        <nav
          className="site-header-nav min-w-0"
          aria-label={locale === "ru" ? "Основная навигация" : locale === "en" ? "Main navigation" : "Asosiy menyu"}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="min-h-11 flex items-center text-muted hover:text-forest-600 no-underline font-body font-semibold text-sm transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="https://app.automaktab.uz/login"
          className="site-header-login min-h-11 px-3 flex items-center text-ink hover:bg-sand-100 no-underline font-body font-semibold text-sm rounded-[var(--r-s)] transition-colors"
        >
          {content.login}
        </a>

        <div className="site-header-controls min-w-0">
          {/* Language Switcher */}
          <div className="flex shrink-0 items-center border-2 border-sand-300 rounded-[var(--r-s)] p-0.5 font-body text-xs font-bold">
            {languages.map((language) => (
              <Link
                key={language.code}
                href={language.href}
                aria-label={language.label}
                aria-current={locale === language.code ? "page" : undefined}
                className={`min-w-11 min-h-11 flex items-center justify-center rounded-[var(--r-xs)] no-underline transition-colors ${
                  locale === language.code
                    ? "bg-sand-100 text-ink"
                    : "text-muted hover:text-forest-600"
                }`}
              >
                {language.code.toUpperCase()}
              </Link>
            ))}
          </div>

          <a
            href={demoUrl}
            className="action-primary site-header-demo min-w-0 min-h-11 px-4 py-2 flex items-center justify-center text-center bg-amber-500 hover:bg-amber-400 text-forest-800 no-underline font-body font-bold text-sm rounded-[var(--r-s)] transition-colors [overflow-wrap:anywhere]"
          >
            {content.demo}
          </a>
        </div>
      </div>
    </header>
  );
}
