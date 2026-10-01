'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import type { Locale } from '@/i18n/config';
import { GlassPanel } from '@/components/ui/GlassPanel';
import {
  CHANGELOG_COPY,
  CHANGELOG_ITEMS,
  type ChangelogCategory,
  type ProductPillar,
} from '@/config/changelog';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ChangelogViewProps {
  locale: Locale;
}

export default function ChangelogView({ locale }: ChangelogViewProps) {
  const copy = CHANGELOG_COPY[locale] || CHANGELOG_COPY.uz;
  const containerRef = useRef<HTMLDivElement>(null);

  const [selectedCategory, setSelectedCategory] = useState<ChangelogCategory>('all');
  const [selectedPillar, setSelectedPillar] = useState<ProductPillar | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeReleaseId, setActiveReleaseId] = useState<string>(CHANGELOG_ITEMS[0]?.id || '');

  const pillarLabels: Record<ProductPillar, string> = {
    fleet: copy.pillarFleet,
    finance: copy.pillarFinance,
    attendance: copy.pillarAttendance,
    schedule: copy.pillarSchedule,
    compliance: copy.pillarCompliance,
    crm: copy.pillarCrm,
  };

  const filteredItems = useMemo(() => {
    return CHANGELOG_ITEMS.filter((item) => {
      const matchPillar = selectedPillar === 'all' || item.pillar === selectedPillar;

      const title = item.title[locale] || '';
      const version = item.version;
      const excerpt = item.excerpt[locale] || '';
      const query = searchQuery.toLowerCase().trim();

      const matchQuery =
        !query ||
        title.toLowerCase().includes(query) ||
        version.toLowerCase().includes(query) ||
        excerpt.toLowerCase().includes(query);

      const featuresCount = item.highlights.features[locale]?.length || 0;
      const improvementsCount = item.highlights.improvements[locale]?.length || 0;
      const fixesCount = item.highlights.fixes[locale]?.length || 0;

      const matchCategory =
        selectedCategory === 'all'
          ? true
          : selectedCategory === 'feature'
            ? featuresCount > 0
            : selectedCategory === 'improvement'
              ? improvementsCount > 0
              : fixesCount > 0;

      return matchPillar && matchQuery && matchCategory;
    });
  }, [selectedPillar, searchQuery, selectedCategory, locale]);

  // Copy release permalink to clipboard
  const handleCopyLink = (id: string) => {
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}${window.location.pathname}#${id}`;
      navigator.clipboard.writeText(url).then(() => {
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
      });
    }
  };

  // Scroll spy effect to highlight active release in right Table of Contents
  useEffect(() => {
    const handleScroll = () => {
      const articles = document.querySelectorAll('.changelog-article');
      let currentId = activeReleaseId;
      articles.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 220 && rect.bottom >= 220) {
          currentId = el.id;
        }
      });
      if (currentId !== activeReleaseId) {
        setActiveReleaseId(currentId);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeReleaseId]);

  // GSAP Smooth Entrance & Stagger with prefers-reduced-motion support
  useGSAP(
    () => {
      if (!containerRef.current) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          reduceMotion: '(prefers-reduced-motion: reduce)',
          animate: '(prefers-reduced-motion: no-preference)',
        },
        (context) => {
          const { reduceMotion } = context.conditions!;

          // Entrance animation for hero header
          gsap.fromTo(
            '.changelog-header',
            { autoAlpha: 0, y: reduceMotion ? 0 : -10 },
            {
              autoAlpha: 1,
              y: 0,
              duration: reduceMotion ? 0.01 : 0.35,
              ease: 'power2.out',
            },
          );

          // Staggered cards entrance
          gsap.fromTo(
            '.changelog-article',
            { autoAlpha: 0, y: reduceMotion ? 0 : 14 },
            {
              autoAlpha: 1,
              y: 0,
              duration: reduceMotion ? 0.01 : 0.35,
              stagger: reduceMotion ? 0 : 0.04,
              ease: 'power2.out',
              clearProps: 'transform,opacity,visibility',
            },
          );
        },
      );

      return () => mm.revert();
    },
    { dependencies: [selectedCategory, selectedPillar, searchQuery], scope: containerRef },
  );

  return (
    <div ref={containerRef} className="changelog-container space-y-10">
      {/* Header & Filter Controls */}
      <header className="changelog-header space-y-4 max-w-4xl">
        <p className="eyebrow flex items-center gap-2">
          <span className="signal-point" aria-hidden="true" />
          <span>{copy.eyebrow}</span>
        </p>

        <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl text-[#0B2B1F] dark:text-white font-['Barlow_Condensed'] uppercase">
          {copy.title}
        </h1>

        <p className="text-base text-[#36453D] dark:text-[#B9C9BF] leading-relaxed max-w-2xl font-['Barlow']">
          {copy.description}
        </p>

        {/* Demo Data Notice (Audit compliance: C-5 & R-17) */}
        <div className="flex items-center gap-2 text-xs font-['Barlow'] text-[#36453D] dark:text-[#B9C9BF] bg-[rgba(0,0,0,0.03)] dark:bg-[rgba(255,255,255,0.03)] border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] rounded-[6px] px-3 py-1.5 w-fit">
          <span className="text-[#E8A317] font-bold" aria-hidden="true">i</span>
          <span>{copy.demoNotice}</span>
        </div>

        {/* Filter Bar */}
        <div className="pt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] pb-4">
          {/* Category Tabs: R-06 (Barlow font instead of generic mono) */}
          <div className="flex flex-wrap items-center gap-1.5" role="tablist" aria-label={copy.title}>
            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === 'all'}
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-[6px] text-xs font-semibold font-['Barlow'] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A317] ${
                selectedCategory === 'all'
                  ? 'bg-[#E8A317] text-[#0B2B1F] shadow-sm'
                  : 'bg-[rgba(0,0,0,0.04)] dark:bg-[rgba(255,255,255,0.06)] text-[#36453D] dark:text-[#B9C9BF] hover:bg-[rgba(0,0,0,0.08)]'
              }`}
            >
              {copy.filterAll}
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === 'feature'}
              onClick={() => setSelectedCategory('feature')}
              className={`px-3 py-1.5 rounded-[6px] text-xs font-semibold font-['Barlow'] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A317] ${
                selectedCategory === 'feature'
                  ? 'bg-[#E8A317] text-[#0B2B1F] shadow-sm'
                  : 'bg-[rgba(0,0,0,0.04)] dark:bg-[rgba(255,255,255,0.06)] text-[#36453D] dark:text-[#B9C9BF] hover:bg-[rgba(0,0,0,0.08)]'
              }`}
            >
              {copy.filterFeatures}
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === 'improvement'}
              onClick={() => setSelectedCategory('improvement')}
              className={`px-3 py-1.5 rounded-[6px] text-xs font-semibold font-['Barlow'] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A317] ${
                selectedCategory === 'improvement'
                  ? 'bg-[#E8A317] text-[#0B2B1F] shadow-sm'
                  : 'bg-[rgba(0,0,0,0.04)] dark:bg-[rgba(255,255,255,0.06)] text-[#36453D] dark:text-[#B9C9BF] hover:bg-[rgba(0,0,0,0.08)]'
              }`}
            >
              {copy.filterImprovements}
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === 'fix'}
              onClick={() => setSelectedCategory('fix')}
              className={`px-3 py-1.5 rounded-[6px] text-xs font-semibold font-['Barlow'] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A317] ${
                selectedCategory === 'fix'
                  ? 'bg-[#E8A317] text-[#0B2B1F] shadow-sm'
                  : 'bg-[rgba(0,0,0,0.04)] dark:bg-[rgba(255,255,255,0.06)] text-[#36453D] dark:text-[#B9C9BF] hover:bg-[rgba(0,0,0,0.08)]'
              }`}
            >
              {copy.filterFixes}
            </button>
          </div>

          {/* Search Input & Pillar Dropdown */}
          <div className="flex min-w-0 max-w-full flex-wrap items-center gap-2">
            <div className="relative min-w-0 max-w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={copy.searchPlaceholder}
                className="h-8 w-44 sm:w-52 rounded-[6px] border border-[rgba(0,0,0,0.12)] dark:border-[rgba(255,255,255,0.12)] bg-transparent px-3 text-xs placeholder:text-[#5A6660] dark:placeholder:text-[#B9C9BF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A317] text-[#14211A] dark:text-white font-['Barlow']"
              />
            </div>

            <select
              value={selectedPillar}
              aria-label={copy.allPillars}
              onChange={(e) => setSelectedPillar(e.target.value as ProductPillar | 'all')}
              className="h-8 min-w-0 max-w-full rounded-[6px] border border-[rgba(0,0,0,0.12)] dark:border-[rgba(255,255,255,0.12)] bg-transparent px-2.5 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A317] text-[#14211A] dark:text-white font-['Barlow']"
            >
              <option value="all" className="bg-[#0B2B1F] text-white">
                {copy.allPillars}
              </option>
              <option value="fleet" className="bg-[#0B2B1F] text-white">
                {pillarLabels.fleet}
              </option>
              <option value="finance" className="bg-[#0B2B1F] text-white">
                {pillarLabels.finance}
              </option>
              <option value="schedule" className="bg-[#0B2B1F] text-white">
                {pillarLabels.schedule}
              </option>
              <option value="attendance" className="bg-[#0B2B1F] text-white">
                {pillarLabels.attendance}
              </option>
              <option value="compliance" className="bg-[#0B2B1F] text-white">
                {pillarLabels.compliance}
              </option>
              <option value="crm" className="bg-[#0B2B1F] text-white">
                {pillarLabels.crm}
              </option>
            </select>
          </div>
        </div>
      </header>

      {/* Main Content Layout with Linear Right Table of Contents */}
      <div className="flex gap-10 xl:gap-14 items-start">
        {/* Left Timeline Section (Mobile: left-3 spine; Desktop: left-[13.5rem]) */}
        <div className="flex-1 min-w-0 relative space-y-14 pl-6 md:pl-0 before:block before:absolute before:left-2 md:before:left-[13.5rem] before:top-4 before:bottom-4 before:w-[2px] before:bg-gradient-to-b before:from-[#E8A317] before:via-[rgba(0,0,0,0.1)] dark:before:via-[rgba(255,255,255,0.1)] before:to-transparent">
          {filteredItems.map((item) => {
            const itemTitle = item.title[locale];
            const itemExcerpt = item.excerpt[locale];
            const itemFeatures = item.highlights.features[locale] || [];
            const itemImprovements = item.highlights.improvements[locale] || [];
            const itemFixes = item.highlights.fixes[locale] || [];
            const authorRole = item.author.role[locale];
            const isCopied = copiedId === item.id;
            const isLatest = !item.isPlanned && filteredItems.find((i) => !i.isPlanned)?.id === item.id;

            return (
              <article
                key={item.id}
                id={item.id}
                className="changelog-article group relative flex flex-col gap-5 md:flex-row md:gap-10 scroll-mt-28"
              >
                {/* Left Column: Sticky Version, Date, and Linear Spine Node */}
                <div className="md:w-52 shrink-0 relative">
                  {/* Linear Spine Node: Desktop */}
                  <div
                    aria-hidden="true"
                    className="hidden md:flex absolute -right-[1.9rem] top-2 z-10 h-4 w-4 items-center justify-center rounded-full border-2 border-[#E8A317] bg-[#FFFCF6] dark:bg-[#07201A] shadow-sm"
                  >
                    {isLatest ? (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8A317] opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E8A317]" />
                      </span>
                    ) : (
                      <div className="h-1.5 w-1.5 rounded-full bg-[#E8A317]" />
                    )}
                  </div>

                  {/* Spine Node: Mobile */}
                  <div
                    aria-hidden="true"
                    className="md:hidden absolute -left-[1.85rem] top-1 z-10 h-3 w-3 rounded-full border-2 border-[#E8A317] bg-[#FFFCF6] dark:bg-[#07201A]"
                  />

                  <div className="md:sticky md:top-28 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-['JetBrains_Mono'] text-sm font-bold text-[#0B2B1F] dark:text-white bg-[#E8A317]/15 border border-[#E8A317]/30 px-2.5 py-0.5 rounded-[6px]">
                        {item.version}
                      </span>
                      {item.isPlanned ? (
                        <span className="text-[10px] font-semibold uppercase tracking-wider font-['Barlow'] bg-[#3B82F6]/20 text-[#2563EB] dark:text-[#60A5FA] border border-[#3B82F6]/30 px-2 py-0.5 rounded-[4px]">
                          {copy.plannedBadge}
                        </span>
                      ) : isLatest ? (
                        <span className="text-[10px] font-semibold uppercase tracking-wider font-['Barlow'] bg-[#0E6B43]/20 text-[#0E6B43] dark:text-[#C6FF3D] border border-[#0E6B43]/30 px-2 py-0.5 rounded-[4px]">
                          {copy.latestBadge}
                        </span>
                      ) : null}
                    </div>

                    <div className="text-xs text-[#36453D] dark:text-[#B9C9BF] font-['JetBrains_Mono']">
                      <time dateTime={item.releaseDate}>{item.releaseDate}</time>
                    </div>

                    <div className="text-xs text-[#36453D] dark:text-[#B9C9BF] font-['Barlow']">
                      <span>{authorRole}</span>
                    </div>

                    <div className="flex items-center gap-2 pt-0.5">
                      <span className="inline-block text-[11px] font-medium font-['Barlow'] text-[#36453D] dark:text-[#B9C9BF] border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] px-2 py-0.5 rounded-[4px]">
                        {pillarLabels[item.pillar]}
                      </span>

                      {/* Copy Link Button with Accessible Tap Target */}
                      <button
                        type="button"
                        onClick={() => handleCopyLink(item.id)}
                        title={copy.copyLink}
                        aria-label={`${copy.copyLink}: ${item.version}`}
                        className="h-6 w-6 flex items-center justify-center rounded text-xs text-[#36453D] hover:text-[#E8A317] dark:text-[#9DB5A7] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A317]"
                      >
                        {isCopied ? (
                          <span className="text-[10px] text-[#0E6B43] font-mono">{copy.linkCopied}</span>
                        ) : (
                          <span className="font-mono text-xs text-[#5A6660] dark:text-[#9DB5A7]">#</span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Column: Glass Content Body */}
                <div className="flex-1 min-w-0">
                  <GlassPanel className="p-5 sm:p-7 space-y-5 transition-all duration-200 group-hover:border-[#E8A317]/40 shadow-sm">
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight text-[#0B2B1F] dark:text-white font-['Barlow_Condensed'] uppercase [overflow-wrap:anywhere]">
                        {itemTitle}
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-[#2F3B35] dark:text-[#B9C9BF] font-['Barlow']">
                        {itemExcerpt}
                      </p>
                    </div>

                    {/* Authentic Application Route Slice Frame (No toy OS dots, clean route breadcrumb) */}
                    <div className="overflow-hidden rounded-[8px] border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] bg-[rgba(0,0,0,0.02)] dark:bg-[rgba(255,255,255,0.02)]">
                      {/* Application Route Bar */}
                      <div className="flex min-w-0 flex-wrap items-center justify-between gap-x-3 gap-y-1 border-b border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] px-3 py-2 bg-[rgba(0,0,0,0.02)] dark:bg-[rgba(255,255,255,0.03)]">
                        <div className="flex min-w-0 max-w-full items-center gap-2">
                          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#0E6B43] dark:bg-[#C6FF3D]" aria-hidden="true" />
                          <span className="min-w-0 [overflow-wrap:anywhere] font-['JetBrains_Mono'] text-[11px] text-[#36453D] dark:text-[#9DB5A7]">
                            {item.routeHint}
                          </span>
                        </div>
                        <span className="min-w-0 [overflow-wrap:anywhere] font-['Barlow'] text-[11px] font-medium text-[#0E6B43] dark:text-[#C6FF3D]">
                          {copy.testedBadge}
                        </span>
                      </div>

                      {/* Component Slice Representation */}
                      <div className="p-4 space-y-3 [overflow-wrap:anywhere] font-['Barlow']">
                        <div className="flex min-w-0 flex-wrap items-center justify-between gap-2">
                          <span className="min-w-0 text-xs font-semibold text-[#0B2B1F] dark:text-white flex items-center gap-1.5">
                            <span className="text-[#0E6B43] dark:text-[#C6FF3D]" aria-hidden="true">✓</span>
                            <span>{itemFeatures[0] || itemTitle}</span>
                          </span>
                          <span className="text-[10px] font-mono text-[#5A6660] dark:text-[#9DB5A7]">
                            {item.version}
                          </span>
                        </div>

                        {/* Domain-Grounded UI Slices */}
                        {item.id === 'release-2-4-0' && (
                          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono bg-[rgba(0,0,0,0.03)] dark:bg-[rgba(255,255,255,0.03)] p-2.5 rounded-[6px] border border-[rgba(0,0,0,0.06)]">
                            <div>{locale === 'ru' ? "01 A 001 AA: Бензин 42 л (483 000 сум)" : locale === 'en' ? "01 A 001 AA: Petrol 42 l (483 000 UZS)" : "01 A 001 AA: Benzin 42 l (483 000 so‘m)"}</div>
                            <div>{locale === 'ru' ? "01 A 002 AA: Метан 18 м³ (72 000 сум)" : locale === 'en' ? "01 A 002 AA: Methane 18 m³ (72 000 UZS)" : "01 A 002 AA: Metan 18 m³ (72 000 so‘m)"}</div>
                            <div className="col-span-2 text-[#0E6B43] dark:text-[#C6FF3D]">{locale === 'ru' ? "Вождение: 1200 / 1200 минут" : locale === 'en' ? "Driving: 1200 / 1200 minutes" : "Haydash: 1200 / 1200 daqiqa"}</div>
                          </div>
                        )}

                        {item.id === 'release-2-3-1' && (
                          <div className="grid grid-cols-3 gap-2 text-[11px] font-mono bg-[rgba(0,0,0,0.03)] dark:bg-[rgba(255,255,255,0.03)] p-2.5 rounded-[6px] border border-[rgba(0,0,0,0.06)]">
                            <div>{locale === 'ru' ? "Аренда: Оплачено" : locale === 'en' ? "Rent: Paid" : "Ijara: To‘langan"}</div>
                            <div>{locale === 'ru' ? "Коммунальные: Скоро" : locale === 'en' ? "Utilities: Due soon" : "Kommunal: To‘lov yaqin"}</div>
                            <div>{locale === 'ru' ? "Транспорт: Ожидается" : locale === 'en' ? "Transport: Pending" : "Transport: Kutilmoqda"}</div>
                          </div>
                        )}

                        {item.id === 'release-2-3-0' && (
                          <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
                            <span className="bg-[#0E6B43]/20 text-[#0E6B43] dark:text-[#C6FF3D] px-2 py-0.5 rounded">{locale === 'ru' ? "Пришёл (18)" : locale === 'en' ? "Present (18)" : "Keldi (18)"}</span>
                            <span className="bg-[#E8A317]/20 text-[#E8A317] px-2 py-0.5 rounded">{locale === 'ru' ? "Опоздал (2)" : locale === 'en' ? "Late (2)" : "Kechikdi (2)"}</span>
                            <span className="bg-[#C93B2B]/20 text-[#C93B2B] px-2 py-0.5 rounded">{locale === 'ru' ? "Не пришёл (2)" : locale === 'en' ? "Absent (2)" : "Kelmadi (2)"}</span>
                            <span className="bg-[rgba(0,0,0,0.08)] dark:bg-[rgba(255,255,255,0.1)] px-2 py-0.5 rounded">{locale === 'ru' ? "Уваж. причина (1)" : locale === 'en' ? "Excused (1)" : "Uzrli (1)"}</span>
                          </div>
                        )}

                        {item.id === 'release-2-2-0' && (
                          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono bg-[rgba(0,0,0,0.03)] dark:bg-[rgba(255,255,255,0.03)] p-2.5 rounded-[6px] border border-[rgba(0,0,0,0.06)]">
                            <div>{locale === 'ru' ? "09:00 Теория: Аудитория 2" : locale === 'en' ? "09:00 Theory: Room 2" : "09:00 Nazariya: 2-xona"}</div>
                            <div>{locale === 'ru' ? "11:00 Вождение: Cobalt #01" : locale === 'en' ? "11:00 Driving: Cobalt #01" : "11:00 Haydash: Cobalt #01"}</div>
                          </div>
                        )}

                        {item.id === 'release-2-1-2' && (
                          <div className="flex min-w-0 flex-wrap items-center gap-2 text-[11px] font-mono border-t border-[rgba(0,0,0,0.06)] pt-2 text-[#5A6660] dark:text-[#9DB5A7]">
                            <span>{locale === 'ru' ? "[Оплаты]" : locale === 'en' ? "[Payments]" : "[To‘lovlar]"}</span>
                            <span>{locale === 'ru' ? "[Посещаемость]" : locale === 'en' ? "[Attendance]" : "[Davomat]"}</span>
                            <span>{locale === 'ru' ? "[Экзамены]" : locale === 'en' ? "[Exams]" : "[Imtihonlar]"}</span>
                            <span>{locale === 'ru' ? "[Скачать Excel]" : locale === 'en' ? "[Download Excel]" : "[Excelni yuklab olish]"}</span>
                          </div>
                        )}

                        {item.id === 'release-2-1-0' && (
                          <div className="flex items-center justify-between text-[11px] font-mono bg-[rgba(0,0,0,0.03)] dark:bg-[rgba(255,255,255,0.03)] p-2 rounded-[6px]">
                            <span>{locale === 'ru' ? "Оплата: 3 500 000 сум" : locale === 'en' ? "Payment: 3 500 000 UZS" : "To‘lov: 3 500 000 so‘m"}</span>
                            <span className="text-[#0E6B43] dark:text-[#C6FF3D]">{locale === 'ru' ? "Долг: 0 сум (Оплачено)" : locale === 'en' ? "Debt: 0 UZS (Paid in full)" : "Qarz: 0 so‘m (To‘langan)"}</span>
                          </div>
                        )}

                        {item.id === 'release-2-0-0' && (
                          <div className="flex items-center gap-2 text-[11px] font-mono text-[#5A6660] dark:text-[#9DB5A7]">
                            <span>{locale === 'ru' ? "3 филиала: Ташкент · Самарканд · Бухара" : locale === 'en' ? "3 branches: Tashkent · Samarkand · Bukhara" : "3 filial: Toshkent · Samarqand · Buxoro"}</span>
                          </div>
                        )}

                        {item.id === 'release-1-9-0' && (
                          <div className="flex items-center justify-between text-[11px] font-mono">
                            <span>{locale === 'ru' ? "Страховка: 36 машин" : locale === 'en' ? "Insurance: 36 vehicles" : "Sug‘urta: 36 ta mashina"}</span>
                            <span className="text-[#0E6B43] dark:text-[#C6FF3D]">{locale === 'ru' ? "Действует" : locale === 'en' ? "Valid" : "Amal qiladi"}</span>
                          </div>
                        )}

                        {item.id === 'release-1-8-0' && (
                          <div className="flex items-center gap-2 text-[11px] font-mono">
                            <span>{locale === 'ru' ? "Заправочные станции: Бензин и газ" : locale === 'en' ? "Fuel stations: Petrol and gas" : "Yoqilg‘i shoxobchalari: Benzin va gaz"}</span>
                          </div>
                        )}

                        {item.id === 'release-1-7-0' && (
                          <div className="flex items-center justify-between text-[11px] font-mono">
                            <span>{locale === 'ru' ? "Внутренние тесты ПДД: Вопросы" : locale === 'en' ? "Internal road rules tests: Questions" : "Ichki YHQ testlari: Savollar"}</span>
                            <span className="text-[#0E6B43] dark:text-[#C6FF3D]">{locale === 'ru' ? "Результаты в карточке" : locale === 'en' ? "Results in student record" : "Natijalar talaba kartasida"}</span>
                          </div>
                        )}

                        {item.id === 'release-1-6-0' && (
                          <div className="flex items-center gap-2 text-[11px] font-mono">
                            <span>{locale === 'ru' ? "Учебные программы: Категории B, BC, C" : locale === 'en' ? "Training programmes: Categories B, BC, C" : "O‘quv dasturlari: B, BC, C toifalari"}</span>
                          </div>
                        )}

                        {item.id === 'release-1-5-0' && (
                          <div className="flex items-center gap-2 text-[11px] font-mono">
                            <span>{locale === 'ru' ? "Сотрудники: Преподаватели и приёмная" : locale === 'en' ? "Staff: Teachers and admissions" : "Xodimlar: O‘qituvchilar va qabul jamoasi"}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Highlights Sections */}
                    <div className="space-y-4 pt-1">
                      {/* Features */}
                      {itemFeatures.length > 0 && (
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider font-['Barlow'] text-[#0E6B43] dark:text-[#C6FF3D]">
                            <span>•</span>
                            <span>{copy.labelFeatures}</span>
                          </div>
                          <ul className="space-y-1.5 pl-4 text-xs text-[#14211A] dark:text-[#F3F6EE] list-disc marker:text-[#0E6B43] dark:marker:text-[#C6FF3D] font-['Barlow']">
                            {itemFeatures.map((feat, i) => (
                              <li key={i} className="leading-relaxed">
                                {feat}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Improvements */}
                      {itemImprovements.length > 0 && (
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider font-['Barlow'] text-[#E8A317]">
                            <span>•</span>
                            <span>{copy.labelImprovements}</span>
                          </div>
                          <ul className="space-y-1.5 pl-4 text-xs text-[#14211A] dark:text-[#F3F6EE] list-disc marker:text-[#E8A317] font-['Barlow']">
                            {itemImprovements.map((imp, i) => (
                              <li key={i} className="leading-relaxed">
                                {imp}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Fixes */}
                      {itemFixes.length > 0 && (
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider font-['Barlow'] text-[#36453D] dark:text-[#9DB5A7]">
                            <span>•</span>
                            <span>{copy.labelFixes}</span>
                          </div>
                          <ul className="space-y-1.5 pl-4 text-xs text-[#14211A] dark:text-[#F3F6EE] list-disc marker:text-[#36453D] dark:marker:text-[#9DB5A7] font-['Barlow']">
                            {itemFixes.map((fix, i) => (
                              <li key={i} className="leading-relaxed">
                                {fix}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </GlassPanel>
                </div>
              </article>
            );
          })}

          {filteredItems.length === 0 && (
            <GlassPanel className="p-12 text-center space-y-3">
              <h2 className="text-xl font-bold text-[#0B2B1F] dark:text-white font-['Barlow_Condensed']">
                {copy.emptyTitle}
              </h2>
              <p className="text-sm text-[#36453D] dark:text-[#B9C9BF] max-w-md mx-auto font-['Barlow']">
                {copy.emptyBody}
              </p>
            </GlassPanel>
          )}
        </div>

        {/* Right Sticky Sidebar: Linear-Grade Table of Contents */}
        <aside className="hidden lg:block w-48 shrink-0 sticky top-28 space-y-2 text-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#36453D] dark:text-[#B9C9BF] pb-1 border-b border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] font-['Barlow']">
            {copy.tableOfContents}
          </div>
          <nav aria-label={copy.tableOfContents} className="space-y-0.5">
            {CHANGELOG_ITEMS.map((item) => {
              const isActive = activeReleaseId === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-current={isActive ? 'location' : undefined}
                  className={`group flex items-center justify-between px-2.5 py-1.5 rounded-[4px] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A317] ${
                    isActive
                      ? 'bg-[#E8A317]/15 text-[#E8A317] font-bold border-l-2 border-[#E8A317]'
                      : 'text-[#36453D] dark:text-[#B9C9BF] hover:text-[#0B2B1F] dark:hover:text-white hover:bg-[rgba(0,0,0,0.03)]'
                  }`}
                >
                  <span className="font-['JetBrains_Mono']">{item.version}</span>
                  <span className="text-[10px] font-['Barlow'] text-[#36453D]/70 dark:text-[#B9C9BF]/70 font-normal">
                    {item.releaseDate.slice(5)}
                  </span>
                </a>
              );
            })}
          </nav>
        </aside>
      </div>
    </div>
  );
}
