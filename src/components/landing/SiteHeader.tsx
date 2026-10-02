"use client";

import React, { useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { switchLocalePath, preserveLocaleSuffix } from "@/lib/locale-metadata";
import type { LandingContent } from "@/content/uz";
import { contentUz } from "@/content/uz";
import { contentRu } from "@/content/ru";
import { contentEn } from "@/content/en";
import { buildDemoUrl } from "@/lib/analytics";
import type { Locale } from "@/i18n/config";

export interface SiteHeaderProps {
  content?: LandingContent["header"];
  locale?: Locale | string;
  availableLocales?: readonly Locale[];
}

export default function SiteHeader({
  locale = "uz",
  availableLocales,
  content = locale === "ru" ? contentRu.header : locale === "en" ? contentEn.header : contentUz.header,
}: SiteHeaderProps) {
  const header = useRef<HTMLElement>(null);
  const pathname = usePathname() || (locale === "uz" ? "/" : `/${locale}`);
  const home = locale === "uz" ? "/" : `/${locale}`;
  const demoUrl = buildDemoUrl("header");
  const menuDemoUrl = buildDemoUrl("header_menu");
  const navLinks = [
    { href: `${home}#yol`, label: content.nav.capabilities },
    { href: `${home}#rollar`, label: content.nav.roles },
    { href: `${home}#qanday`, label: content.nav.howItWorks },
    { href: `${home}#tariflar`, label: content.nav.pricing },
    { href: `${home}#savollar`, label: content.nav.faq },
  ];
  const languages = [
    { code: "uz", href: switchLocalePath(pathname, "uz", availableLocales), label: "O‘zbekcha" },
    { code: "ru", href: switchLocalePath(pathname, "ru", availableLocales), label: "Русский" },
    { code: "en", href: switchLocalePath(pathname, "en", availableLocales), label: "English" },
  ];

  useEffect(() => {
    const element = header.current;
    const brand = element?.querySelector<HTMLElement>(".site-header-brand");
    const controls = element?.querySelector<HTMLElement>(".site-header-controls");
    if (!element || !brand || !controls) return;
    let frame = 0;
    // Layout offsets ignore transforms, so the compact distance stays correct while scrolled.
    const measure = () => element.style.setProperty("--site-header-compact", `${Math.max(0, controls.offsetTop + controls.offsetHeight - brand.offsetTop - brand.offsetHeight)}px`);
    const update = () => {
      frame = 0;
      element.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const resize = new ResizeObserver(measure);
    resize.observe(element);
    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header ref={header} className="site-header z-50">
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

        {/* Login and language stay together; on narrow screens they form the second row that hides once scrolled. */}
        <div className="site-header-controls min-w-0">
          <a
            href="https://app.automaktab.uz/login"
            className="site-header-login min-h-11 px-3 flex items-center text-ink hover:bg-sand-100 no-underline font-body font-semibold text-sm rounded-[var(--r-s)] transition-colors"
          >
            {content.login}
          </a>
          {/* Language Switcher */}
          <div className="flex shrink-0 items-center border-2 border-sand-300 rounded-[var(--r-s)] p-0.5 font-body text-xs font-bold">
            {languages.map((language) => (
              <a
                onClick={preserveLocaleSuffix}
                onAuxClick={preserveLocaleSuffix}
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
              </a>
            ))}
          </div>
        </div>

        <a
          href={demoUrl}
          aria-label={content.demo}
          className="action-primary site-header-demo min-w-0 min-h-11 px-4 py-2 flex items-center justify-center text-center bg-amber-500 hover:bg-amber-400 text-forest-800 no-underline font-body font-bold text-sm rounded-[var(--r-s)] transition-colors [overflow-wrap:anywhere]"
        >
          <span className="site-header-demo-full">{content.demo}</span>
          <span className="site-header-demo-short" aria-hidden="true">{content.demoShort}</span>
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
          <summary>
            <Menu className="site-header-menu-open" size={22} aria-hidden="true" />
            <X className="site-header-menu-close" size={22} aria-hidden="true" />
            <span className="sr-only">{locale === "ru" ? "Меню" : locale === "en" ? "Menu" : "Menyu"}</span>
          </summary>
          <nav aria-label={locale === "ru" ? "Навигация" : locale === "en" ? "Navigation" : "Navigatsiya"}>
            {navLinks.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
            <div className="site-header-menu-actions">
              <a href="https://app.automaktab.uz/login">{content.login}</a>
              <a href={menuDemoUrl} className="action-primary">{content.demo}</a>
            </div>
            <div className="site-header-menu-languages" aria-label={locale === "ru" ? "Язык" : locale === "en" ? "Language" : "Til"} role="group">
              {languages.map((language) => (
                <a key={language.code} href={language.href} onClick={preserveLocaleSuffix} onAuxClick={preserveLocaleSuffix} aria-label={language.label} aria-current={locale === language.code ? "page" : undefined}>{language.code.toUpperCase()}</a>
              ))}
            </div>
          </nav>
        </details>
      </div>
    </header>
  );
}
