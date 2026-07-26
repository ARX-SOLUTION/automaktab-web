import type { JSX } from "react";
import Link from "next/link";
import { SUPPORTED_LOCALES, type Locale } from "@/i18n/config";
import ThemeToggle from "./ThemeToggle";

// Cross-app / external targets -- ported from autodrive-frontend LandingPage.tsx.
const CRM_LOGIN_URL = "https://app.automaktab.uz/login";
const TELEGRAM_LINK = "https://t.me/Xamidullo_xudoyberdiyev";
const PHONE_LINK = "tel:+998946110066";
const PHONE_DISPLAY = "+998 94 611 00 66";

// ponytail: no pathname prop on this component (signature is fixed to { locale }),
// and HeroSection only ever renders on the landing root, so the language switcher
// targets each locale's homepage rather than doing generic path-rewriting.
const LOCALE_HOME_PATH: Record<Locale, string> = { uz: "/", ru: "/ru", en: "/en" };

type LandingCopy = {
  navBlog: string;
  navCta: string;
  themeToggleLabel: string;
  heroBadge: string;
  heroTitle: string;
  heroTitleAccent: string;
  heroSub: string;
  ctaDemo: string;
  ctaFree: string;
  mockSubtitle: string;
  mockLive: string;
  mockIncome: string;
  mockStudents: string;
  mockDebt: string;
  mockGraduates: string;
  mockChartTitle: string;
  mockChartSub: string;
  mockChartPeriod: string;
  mockDebtorsTitle: string;
  mockDebtor1: string;
  mockDebtor2: string;
  mockDebtor3: string;
};

const COPY: Record<Locale, LandingCopy> = {
  uz: {
    navBlog: "Blog",
    navCta: "Kirish",
    themeToggleLabel: "Mavzuni almashtirish",
    heroBadge: "Avtomaktablar uchun CRM",
    heroTitle: "Avtomaktabingizning har bir so’mi nazoratda",
    heroTitleAccent: "nazoratda",
    heroSub:
      "Qarzdorlar ro’yxati, kunlik tushum, filial hisoboti — telefoningizda.",
    ctaDemo: "Demo bilan sinab ko’ring",
    ctaFree: "Bepul sinovni boshlang",
    mockSubtitle: "Maktabingiz bugun qanday ko'rsatkichlar bilan",
    mockLive: "Jonli",
    mockIncome: "Bugungi tushum",
    mockStudents: "Faol talabalar",
    mockDebt: "Jami qarz",
    mockGraduates: "Bitiruvchilar",
    mockChartTitle: "Daromad trendi",
    mockChartSub: "So’nggi 12 oy",
    mockChartPeriod: "Joriy davr",
    mockDebtorsTitle: "Qarzdorlar",
    mockDebtor1: "A. Karimov",
    mockDebtor2: "S. Toshmatov",
    mockDebtor3: "N. Yusupova",
  },
  ru: {
    navBlog: "Блог",
    navCta: "Войти",
    themeToggleLabel: "Переключить тему",
    heroBadge: "CRM для автошкол",
    heroTitle: "Каждый сум вашей автошколы под контролем",
    heroTitleAccent: "контролем",
    heroSub:
      "Список должников, дневная выручка, отчёт по филиалам — в вашем телефоне.",
    ctaDemo: "Попробовать демо",
    ctaFree: "Начать бесплатно",
    mockSubtitle: "Как идут дела в вашей школе сегодня",
    mockLive: "Онлайн",
    mockIncome: "Выручка сегодня",
    mockStudents: "Активные студенты",
    mockDebt: "Общий долг",
    mockGraduates: "Выпускники",
    mockChartTitle: "Тренд выручки",
    mockChartSub: "Последние 12 месяцев",
    mockChartPeriod: "Текущий период",
    mockDebtorsTitle: "Должники",
    mockDebtor1: "А. Каримов",
    mockDebtor2: "С. Тошматов",
    mockDebtor3: "Н. Юсупова",
  },
  en: {
    navBlog: "Blog",
    navCta: "Sign in",
    themeToggleLabel: "Toggle theme",
    heroBadge: "CRM for driving schools",
    heroTitle: "Every sum in your driving school, under control",
    heroTitleAccent: "under control",
    heroSub: "Debtor list, daily revenue, branch report — right in your phone.",
    ctaDemo: "Try the demo",
    ctaFree: "Start your free trial",
    mockSubtitle: "Here's how your school is doing today",
    mockLive: "Live",
    mockIncome: "Today's revenue",
    mockStudents: "Active students",
    mockDebt: "Total debt",
    mockGraduates: "Graduates",
    mockChartTitle: "Revenue trend",
    mockChartSub: "Last 12 months",
    mockChartPeriod: "Current period",
    mockDebtorsTitle: "Debtors",
    mockDebtor1: "A. Karimov",
    mockDebtor2: "S. Toshmatov",
    mockDebtor3: "N. Yusupova",
  },
};

// Only true literals stay hardcoded Uzbek regardless of locale -- greeting,
// currency unit, and delta strings are never routed through t() in source
// (LandingPage.tsx). Everything else in the mock (KPI labels, chart copy,
// debtor names) does have real per-locale translations in source, so those
// live in COPY/LandingCopy instead -- see buildKpiCards/buildDebtors below.
const MOCK = {
  greeting: "Xayrli kun, Mansur",
};

function buildKpiCards(copy: LandingCopy) {
  return [
    {
      label: copy.mockIncome,
      value: "4 800 000",
      unit: "so'm",
      delta: "+12.4%",
      deltaUp: true,
      Icon: IconWallet,
      iconBg: "bg-cyan-400/10 text-cyan-600 dark:text-cyan-300",
      tone: "text-cyan-600 dark:text-cyan-300",
    },
    {
      label: copy.mockStudents,
      value: "147",
      unit: "",
      delta: "+8 yangi",
      deltaUp: true,
      Icon: IconUsers,
      iconBg: "bg-blue-400/10 text-blue-600 dark:text-blue-300",
      tone: "text-blue-600 dark:text-blue-300",
    },
    {
      label: copy.mockDebt,
      value: "1 250 000",
      unit: "so'm",
      delta: "3 ta talaba",
      deltaUp: false,
      Icon: IconWarning,
      iconBg: "bg-amber-400/10 text-amber-600 dark:text-amber-300",
      tone: "text-amber-600 dark:text-amber-300",
    },
    {
      label: copy.mockGraduates,
      value: "38",
      unit: "",
      delta: "94% o'tish",
      deltaUp: true,
      Icon: IconBadgeCheck,
      iconBg: "bg-emerald-400/10 text-emerald-600 dark:text-emerald-300",
      tone: "text-emerald-600 dark:text-emerald-300",
    },
  ];
}

function buildDebtors(copy: LandingCopy) {
  return [
    { name: copy.mockDebtor1, amount: "450 000", days: 12 },
    { name: copy.mockDebtor2, amount: "280 000", days: 7 },
    { name: copy.mockDebtor3, amount: "520 000", days: 21 },
  ];
}

// ── Minimal inline icons (no icon-library dependency) ──────────────────────

function IconShieldCheck({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function IconPhone({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v4c0 1-1 2-2 2C10 21 3 14 3 7c0-1 1-2 2-2z" />
    </svg>
  );
}

function IconArrowRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function IconSend({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M21 3L3 10.5l7 2.5m11-10l-4 17-7-6.5m11-10.5L10 13" />
    </svg>
  );
}

function IconWallet({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M3 10h18M16 14h2" />
    </svg>
  );
}

function IconUsers({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="9" cy="8" r="3" />
      <path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6M16 8a3 3 0 1 1 0 6M22 20c0-2.8-2-5-5-5.6" />
    </svg>
  );
}

function IconWarning({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 3l10 18H2L12 3z" />
      <path d="M12 10v4M12 17h.01" />
    </svg>
  );
}

function IconBadgeCheck({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 12.5l2.5 2.5 5-5" />
    </svg>
  );
}

function IconTrendUp({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 17l6-6 4 4 8-8M15 7h6v6" />
    </svg>
  );
}

// Static SVG revenue sparkline (no chart library on the landing bundle).
// currentColor stroke. DESIGN.md scopes cyan to CTAs/accent word/KPI values,
// but a neutral currentColor here measured near-invisible (2.28:1 dark-mode
// contrast, gradient fill under 7% opacity) -- a data viz that can't be seen
// defeats DESIGN.md's "read as evidence" goal for DashboardMock, so this one
// keeps the same cyan tone as the KPI values it sits next to.
function MiniRevenueChart() {
  return (
    <svg
      viewBox="0 0 240 56"
      preserveAspectRatio="none"
      className="h-full w-full text-cyan-600 dark:text-cyan-300"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="mlg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.28" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0,52 C20,48 32,42 48,38 C64,34 76,30 92,24 C108,18 120,16 136,13 C152,10 168,8 184,6 C200,4 220,3 240,2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M0,52 C20,48 32,42 48,38 C64,34 76,30 92,24 C108,18 120,16 136,13 C152,10 168,8 184,6 C200,4 220,3 240,2 L240,56 L0,56 Z"
        fill="url(#mlg)"
      />
    </svg>
  );
}

function Nav({ locale, copy }: { locale: Locale; copy: LandingCopy }) {
  return (
    // ponytail: static bg+blur instead of source's scroll-triggered .nav-scrolled
    // class swap (GSAP ScrollTrigger toggling it on/off) -- that needs client JS
    // this Server Component doesn't have. Always-on still fixes the real bug
    // (content scrolling under an invisible nav); port the scroll trigger later if wanted.
    <header className="sticky top-0 z-30 bg-background/90 backdrop-blur-[20px]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 dark:border-white/10 dark:bg-white/5">
            <IconShieldCheck className="size-4 text-slate-600 dark:text-white/70" />
          </div>
          <span className="text-sm font-semibold tracking-tight text-slate-800 dark:text-white/85">
            Auto Maktab{" "}
            <span className="font-normal text-slate-400 dark:text-white/35">
              CRM
            </span>
          </span>
        </div>
        <nav className="flex items-center gap-3">
          <Link
            href="/blog"
            className="hidden items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-700 dark:text-white/40 dark:hover:text-white/70 lg:flex"
          >
            {copy.navBlog}
          </Link>
          <a
            href={PHONE_LINK}
            className="hidden items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-700 dark:text-white/40 dark:hover:text-white/70 lg:flex"
          >
            <IconPhone className="size-3.5" />
            {PHONE_DISPLAY}
          </a>
          <div className="flex items-center gap-1 rounded-full border border-slate-200 px-1 py-0.5 dark:border-white/10">
            {SUPPORTED_LOCALES.map((lang) => (
              <Link
                key={lang}
                href={LOCALE_HOME_PATH[lang]}
                className={`rounded-full px-2 py-1 text-xs uppercase transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-700 ${
                  lang === locale
                    ? "bg-slate-200 text-slate-900 dark:bg-white/15 dark:text-white"
                    : "text-slate-500 hover:text-slate-800 dark:text-white/60 dark:hover:text-white"
                }`}
              >
                {lang.toUpperCase()}
              </Link>
            ))}
          </div>
          <ThemeToggle
            label={copy.themeToggleLabel}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:text-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-700 dark:border-white/10 dark:text-white/50 dark:hover:text-white"
          />
          <a
            href={CRM_LOGIN_URL}
            className="active:scale-[0.96] inline-flex h-9 items-center gap-1.5 rounded-md text-sm font-medium text-slate-700 ring-1 ring-inset ring-slate-200 transition-all hover:bg-slate-100 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-700 focus-visible:outline-offset-2 dark:text-white/80 dark:ring-white/10 dark:hover:bg-white/10 dark:hover:text-white px-5"
          >
            {copy.navCta}
            <IconArrowRight className="size-3.5" />
          </a>
        </nav>
      </div>
    </header>
  );
}

function Hero({ copy }: { copy: LandingCopy }) {
  const accentIdx = copy.heroTitle.lastIndexOf(copy.heroTitleAccent);
  const titleBefore =
    accentIdx >= 0 ? copy.heroTitle.slice(0, accentIdx) : copy.heroTitle;
  const titleAfter =
    accentIdx >= 0
      ? copy.heroTitle.slice(accentIdx + copy.heroTitleAccent.length)
      : "";

  return (
    <section className="relative z-20 mx-auto max-w-7xl px-4 pb-12 pt-12 sm:px-6 sm:pt-20 lg:px-8 lg:pt-28">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-1.5 text-xs font-medium text-slate-600 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-white/70">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-400 dark:bg-white/40" />
          {copy.heroBadge}
        </div>

        <h1 className="mb-5 text-balance font-heading text-4xl font-bold leading-[1.1] tracking-tighter sm:text-5xl lg:text-6xl">
          {titleBefore}
          <span className="relative inline-block">
            <span className="relative z-10 bg-gradient-to-r from-cyan-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent dark:from-cyan-300 dark:via-cyan-200 dark:to-blue-300">
              {copy.heroTitleAccent}
            </span>
            <span
              aria-hidden="true"
              className="absolute inset-x-2 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-cyan-400/0 via-cyan-400/60 to-cyan-400/0"
            />
          </span>
          {titleAfter}
        </h1>

        <p className="mx-auto mb-8 max-w-lg text-base leading-relaxed text-slate-500 dark:text-white/50 sm:text-lg">
          {copy.heroSub}
        </p>

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href={CRM_LOGIN_URL}
            className="active:scale-[0.96] inline-flex h-12 items-center gap-2 rounded-md bg-cyan-400 px-8 text-slate-950 transition-all hover:bg-cyan-300 hover:shadow-[0_0_32px_rgba(34,211,238,0.30)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-700 focus-visible:outline-offset-2"
          >
            {copy.ctaDemo}
            <IconArrowRight className="size-4" />
          </a>
          <a
            href={TELEGRAM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="active:scale-[0.96] inline-flex h-12 items-center gap-2 rounded-md border border-slate-300 bg-slate-100 px-8 text-slate-700 transition-all hover:bg-slate-200 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-700 focus-visible:outline-offset-2 dark:border-white/[12%] dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
          >
            <IconSend className="size-4" />
            {copy.ctaFree}
          </a>
        </div>
      </div>
    </section>
  );
}

function DashboardMock({ copy }: { copy: LandingCopy }) {
  const kpiCards = buildKpiCards(copy);
  const debtors = buildDebtors(copy);

  return (
    <section className="relative z-10 mx-auto max-w-6xl px-4 pb-20 sm:-mt-16 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white/90 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.2),0_70px_140px_-30px_rgba(0,0,0,0.22)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70 dark:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7),0_70px_140px_-30px_rgba(0,0,0,0.8)]">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-5 py-3 dark:border-white/[8%] dark:bg-white/[0.015]">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          <div className="mx-auto flex h-5 w-52 items-center justify-center rounded-full bg-slate-200 text-[10px] tracking-wide text-slate-400 dark:bg-white/[0.06] dark:text-white/25">
            app.automaktab.uz
          </div>
        </div>

        <div className="p-4 sm:p-6">
          {/* Dashboard header */}
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-slate-800 dark:text-white/90">
                {MOCK.greeting}
              </p>
              <p className="mt-0.5 text-[11px] text-slate-400 dark:text-white/35">
                {copy.mockSubtitle}
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              {copy.mockLive}
            </span>
          </div>

          {/* KPI row */}
          <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {kpiCards.map((card) => (
              <div
                key={card.label}
                className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-white/[8%] dark:bg-white/[0.035]"
              >
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-white/35">
                    {card.label}
                  </p>
                  <div
                    className={`grid h-6 w-6 place-items-center rounded-md ${card.iconBg}`}
                  >
                    <card.Icon className="size-3" />
                  </div>
                </div>
                <p
                  className={`tabular-nums text-base font-bold leading-tight sm:text-lg ${card.tone}`}
                >
                  {card.value}
                  {card.unit && (
                    <span className="ml-0.5 text-[10px] font-normal text-slate-400 dark:text-white/30">
                      {card.unit}
                    </span>
                  )}
                </p>
                <p
                  className={`mt-1 text-[10px] font-semibold ${card.deltaUp ? "text-emerald-400" : "text-rose-400"}`}
                >
                  {card.delta}
                </p>
              </div>
            ))}
          </div>

          {/* Revenue trend + debtors */}
          <div className="grid gap-3 sm:grid-cols-5">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/[8%] dark:bg-white/[0.02] sm:col-span-3">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-600 dark:text-white/65">
                    {copy.mockChartTitle}
                  </p>
                  <p className="mt-0.5 text-[10px] text-slate-400 dark:text-white/30">
                    {copy.mockChartSub}
                  </p>
                </div>
                <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-300">
                  <IconTrendUp className="size-3" />
                  +18%
                </span>
              </div>
              <div className="h-14">
                <MiniRevenueChart />
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-[10px] text-slate-400 dark:text-white/25">
                <span className="inline-block h-1.5 w-4 rounded-full bg-slate-400/60 dark:bg-white/25" />
                {copy.mockChartPeriod}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/[8%] dark:bg-white/[0.02] sm:col-span-2">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-600 dark:text-white/65">
                  {copy.mockDebtorsTitle}
                </span>
                <span className="rounded-full border border-rose-400/25 bg-rose-400/10 px-2 py-0.5 text-[10px] font-semibold text-rose-600 dark:text-rose-300">
                  {debtors.length}
                </span>
              </div>
              <div className="space-y-1.5">
                {debtors.map((d) => (
                  <div
                    key={d.name}
                    className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 dark:border-white/5 dark:bg-white/[0.02]"
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-400/15 text-[10px] font-semibold text-rose-600 dark:text-rose-300">
                        {d.name[0]}
                      </div>
                      <span className="text-xs text-slate-600 dark:text-white/60">
                        {d.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="tabular-nums whitespace-nowrap text-xs font-semibold text-rose-600 dark:text-rose-300">
                        {d.amount}
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-white/25">
                        {d.days}k
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Exported separately from HeroSection so page.tsx can render it as a sibling
// above all three landing sections. `sticky` clamps to its containing block --
// nested inside HeroSection's own wrapper div, it would stop sticking the
// moment that div's box scrolled past (i.e. as soon as MidPageSections
// begins), instead of staying pinned for the whole page.
export function LandingNav({ locale }: { locale: Locale }): JSX.Element {
  return <Nav locale={locale} copy={COPY[locale]} />;
}

export default function HeroSection({ locale }: { locale: Locale }): JSX.Element {
  const copy = COPY[locale];

  return (
    <div className="bg-background text-foreground">
      <Hero copy={copy} />
      <DashboardMock copy={copy} />
    </div>
  );
}
