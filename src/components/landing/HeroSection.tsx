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
const LOCALE_HOME_PATH: Record<Locale, string> = {
  uz: "/",
  ru: "/ru",
  en: "/en",
};

type LandingCopy = {
  navBlog: string;
  navCta: string;
  themeToggleLabel: string;
  heroBadge: string;
  heroTitle: string;
  heroTitleAccent: string;
  heroSub: string;
  ctaDemo: string;
  ctaContact: string;
  mockSubtitle: string;
  mockGreeting: string;
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
  mockCurrency: string;
  mockNewStudents: string;
  mockDebtorStudents: string;
  mockPassRate: string;
  mockDaySuffix: string;
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
    ctaContact: "Savol berish",
    mockGreeting: "Xayrli kun, Mansur",
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
    mockCurrency: "so'm",
    mockNewStudents: "+8 yangi",
    mockDebtorStudents: "3 ta talaba",
    mockPassRate: "94% o'tish",
    mockDaySuffix: "k",
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
    ctaContact: "Задать вопрос",
    mockGreeting: "Добрый день, Мансур",
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
    mockCurrency: "сум",
    mockNewStudents: "+8 новых",
    mockDebtorStudents: "3 студента",
    mockPassRate: "94% сдали",
    mockDaySuffix: "д",
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
    ctaContact: "Ask a question",
    mockGreeting: "Good afternoon, Mansur",
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
    mockCurrency: "UZS",
    mockNewStudents: "+8 new",
    mockDebtorStudents: "3 students",
    mockPassRate: "94% passed",
    mockDaySuffix: "d",
  },
};

function buildKpiCards(copy: LandingCopy) {
  return [
    {
      label: copy.mockIncome,
      value: "4 800 000",
      unit: copy.mockCurrency,
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
      delta: copy.mockNewStudents,
      deltaUp: true,
      Icon: IconUsers,
      iconBg: "bg-blue-400/10 text-blue-600 dark:text-blue-300",
      tone: "text-blue-600 dark:text-blue-300",
    },
    {
      label: copy.mockDebt,
      value: "1 250 000",
      unit: copy.mockCurrency,
      delta: copy.mockDebtorStudents,
      deltaUp: false,
      Icon: IconWarning,
      iconBg: "bg-amber-400/10 text-amber-600 dark:text-amber-300",
      tone: "text-amber-600 dark:text-amber-300",
    },
    {
      label: copy.mockGraduates,
      value: "38",
      unit: "",
      delta: copy.mockPassRate,
      deltaUp: true,
      Icon: IconBadgeCheck,
      iconBg: "bg-emerald-400/10 text-emerald-700 dark:text-emerald-300",
      tone: "text-emerald-700 dark:text-emerald-300",
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
    <header className="sticky top-0 z-30 border-b border-border bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex shrink-0 items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <IconShieldCheck className="size-4" />
          </div>
          <span className="font-heading hidden text-sm font-bold tracking-tight text-foreground sm:inline sm:text-base">
            Auto Maktab{" "}
            <span className="font-medium text-muted-foreground">CRM</span>
          </span>
        </div>
        <nav className="flex items-center gap-2 max-[420px]:gap-1">
          <a
            href={PHONE_LINK}
            className="hidden items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring lg:flex"
          >
            <IconPhone className="size-3.5" />
            {PHONE_DISPLAY}
          </a>
          <div className="flex items-center gap-1 rounded-full border border-border bg-card px-1 py-0.5 max-[380px]:gap-0.5 max-[380px]:px-0.5">
            {SUPPORTED_LOCALES.map((lang) => (
              <Link
                key={lang}
                href={LOCALE_HOME_PATH[lang]}
                hrefLang={lang}
                aria-current={lang === locale ? "page" : undefined}
                className={`rounded-full px-2 py-1 text-xs uppercase transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring max-[380px]:px-1.5 ${
                  lang === locale
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {lang.toUpperCase()}
              </Link>
            ))}
          </div>
          <ThemeToggle
            label={copy.themeToggleLabel}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
          />
          <a
            href={CRM_LOGIN_URL}
            aria-label={copy.navCta}
            className="inline-flex h-11 items-center gap-1.5 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-[background-color,transform] hover:bg-primary/90 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 max-[420px]:px-3"
          >
            <span className="max-[420px]:sr-only">{copy.navCta}</span>
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
    <div className="max-w-2xl lg:py-10">
      <div className="text-left">
        <div
          data-hero-item
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          {copy.heroBadge}
        </div>

        <h1
          data-hero-item
          className="mb-6 max-w-[14ch] text-balance font-heading text-4xl font-extrabold leading-[0.98] tracking-[-0.045em] max-[359px]:text-3xl sm:text-5xl lg:text-6xl"
        >
          {titleBefore}
          <span className="relative inline-block">
            <span className="relative z-10 text-foreground">
              {copy.heroTitleAccent}
            </span>
            <span
              aria-hidden="true"
              className="absolute inset-x-0 -bottom-1 h-1 rounded-full bg-primary"
            />
          </span>
          {titleAfter}
        </h1>

        <p
          data-hero-item
          className="mb-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {copy.heroSub}
        </p>

        <div
          data-hero-item
          className="flex flex-col items-start gap-3 sm:flex-row"
        >
          <a
            href={CRM_LOGIN_URL}
            className="inline-flex h-12 items-center gap-2 rounded-lg bg-primary px-7 text-sm font-bold text-primary-foreground transition-[background-color,transform] hover:bg-primary/90 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
          >
            {copy.ctaDemo}
            <IconArrowRight className="size-4" />
          </a>
          <a
            href={TELEGRAM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2 rounded-lg border border-border bg-card px-7 text-sm font-semibold text-foreground transition-[background-color,transform] hover:bg-muted active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
          >
            <IconSend className="size-4" />
            {copy.ctaContact}
          </a>
        </div>
      </div>
    </div>
  );
}

function DashboardMock({ copy }: { copy: LandingCopy }) {
  const kpiCards = buildKpiCards(copy);
  const debtors = buildDebtors(copy);

  return (
    <div data-hero-item className="relative z-10 min-w-0">
      <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-[0_24px_80px_hsl(var(--foreground)/0.12)]">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-5 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          <div className="mx-auto flex h-5 w-52 items-center justify-center rounded-full bg-background text-[10px] tracking-wide text-muted-foreground">
            app.automaktab.uz
          </div>
        </div>

        <div className="p-4 sm:p-6">
          {/* Dashboard header */}
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-slate-800 dark:text-white/90">
                {copy.mockGreeting}
              </p>
              <p className="mt-0.5 text-[11px] text-slate-400 dark:text-white/55">
                {copy.mockSubtitle}
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 motion-reduce:animate-none" />
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
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-white/55">
                    {card.label}
                  </p>
                  <div
                    className={`grid h-6 w-6 place-items-center rounded-md ${card.iconBg}`}
                  >
                    <card.Icon className="size-3" />
                  </div>
                </div>
                <p
                  className={`font-mono tabular-nums text-base font-bold leading-tight whitespace-nowrap max-[380px]:text-[13px] sm:text-lg ${card.tone}`}
                >
                  {card.value}
                  {card.unit && (
                    <span className="ml-0.5 text-[10px] font-normal text-slate-400 dark:text-white/50">
                      {card.unit}
                    </span>
                  )}
                </p>
                <p
                  className={`mt-1 text-[10px] font-semibold ${card.deltaUp ? "text-emerald-700 dark:text-emerald-400" : "text-rose-700 dark:text-rose-400"}`}
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
                  <p className="mt-0.5 text-[10px] text-slate-400 dark:text-white/50">
                    {copy.mockChartSub}
                  </p>
                </div>
                <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-700 dark:text-emerald-300">
                  <IconTrendUp className="size-3" />
                  +18%
                </span>
              </div>
              <div className="h-14">
                <MiniRevenueChart />
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-[10px] text-slate-400 dark:text-white/50">
                <span className="inline-block h-1.5 w-4 rounded-full bg-slate-400/60 dark:bg-white/50" />
                {copy.mockChartPeriod}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/[8%] dark:bg-white/[0.02] sm:col-span-2">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-600 dark:text-white/65">
                  {copy.mockDebtorsTitle}
                </span>
                <span className="rounded-full border border-rose-400/25 bg-rose-400/10 px-2 py-0.5 text-[10px] font-semibold text-rose-700 dark:text-rose-300">
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
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-400/15 text-[10px] font-semibold text-rose-700 dark:text-rose-300">
                        {d.name[0]}
                      </div>
                      <span className="text-xs text-slate-600 dark:text-white/60">
                        {d.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono tabular-nums whitespace-nowrap text-xs font-semibold text-rose-700 dark:text-rose-300">
                        {d.amount}
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-white/50">
                        {d.days}
                        {copy.mockDaySuffix}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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

export default function HeroSection({
  locale,
}: {
  locale: Locale;
}): JSX.Element {
  const copy = COPY[locale];

  return (
    <div className="bg-background text-foreground">
      <section
        data-hero
        className="relative isolate overflow-hidden px-4 pb-20 pt-14 sm:px-6 sm:pt-20 lg:px-8 lg:pb-28 lg:pt-24"
      >
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 -z-10 h-px bg-primary"
        />
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          <Hero copy={copy} />
          <DashboardMock copy={copy} />
        </div>
      </section>
    </div>
  );
}
