import { Fragment, type JSX } from "react";
import Link from "next/link";
import { SUPPORTED_LOCALES, type Locale } from "@/i18n/config";
import { DEMO_FORM_COPY } from "./demo-copy";
import DemoRequestDialog from "./DemoRequestDialog";
import CapabilityMarquee from "./CapabilityMarquee";
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
  navAnchors: { href: string; label: string }[];
  themeToggleLabel: string;
  heroBadge: string;
  heroTitle: string;
  heroTitleAccent: string;
  heroSub: string;
  ctaDemo: string;
  ctaContact: string;
  marquee: string[];
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
    navAnchors: [
      { href: "#imkoniyatlar", label: "Imkoniyatlar" },
      { href: "#faq", label: "FAQ" },
      { href: "#demo", label: "Demo" },
    ],
    themeToggleLabel: "Mavzuni almashtirish",
    heroBadge: "Avtomaktablar uchun CRM",
    heroTitle: "Avtomaktabingizning har bir so'mi nazoratda",
    heroTitleAccent: "nazoratda",
    heroSub:
      "Qarzdorlar ro'yxati, kunlik tushum, filial hisoboti — telefoningizda.",
    ctaDemo: "Demo bilan sinab ko'ring",
    ctaContact: "Savol berish",
    marquee: [
      "Qarz nazorati",
      "Davomat",
      "Jadval",
      "Qarzdorlar",
      "Filiallar",
      "Hisobotlar",
      "O'qituvchilar",
      "To'lovlar",
    ],
    mockGreeting: "Xayrli kun, Mansur",
    mockSubtitle: "Maktabingiz bugun qanday ko'rsatkichlar bilan",
    mockLive: "Jonli",
    mockIncome: "Bugungi tushum",
    mockStudents: "Faol talabalar",
    mockDebt: "Jami qarz",
    mockGraduates: "Bitiruvchilar",
    mockChartTitle: "Daromad trendi",
    mockChartSub: "So'nggi 12 oy",
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
    navAnchors: [
      { href: "#imkoniyatlar", label: "Возможности" },
      { href: "#faq", label: "FAQ" },
      { href: "#demo", label: "Демо" },
    ],
    themeToggleLabel: "Переключить тему",
    heroBadge: "CRM для автошкол",
    heroTitle: "Каждый сум вашей автошколы под контролем",
    heroTitleAccent: "контролем",
    heroSub:
      "Список должников, дневная выручка, отчёт по филиалам — в вашем телефоне.",
    ctaDemo: "Попробовать демо",
    ctaContact: "Задать вопрос",
    marquee: [
      "Контроль долгов",
      "Посещаемость",
      "Расписание",
      "Должники",
      "Филиалы",
      "Отчёты",
      "Преподаватели",
      "Платежи",
    ],
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
    navAnchors: [
      { href: "#imkoniyatlar", label: "Features" },
      { href: "#faq", label: "FAQ" },
      { href: "#demo", label: "Demo" },
    ],
    themeToggleLabel: "Toggle theme",
    heroBadge: "CRM for driving schools",
    heroTitle: "Every sum in your driving school, under control",
    heroTitleAccent: "under control",
    heroSub: "Debtor list, daily revenue, branch report — right in your phone.",
    ctaDemo: "Try the demo",
    ctaContact: "Ask a question",
    marquee: [
      "Debt tracking",
      "Attendance",
      "Schedule",
      "Debtors",
      "Branches",
      "Reports",
      "Teachers",
      "Payments",
    ],
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
      countTo: 4_800_000,
      unit: copy.mockCurrency,
      delta: "+12.4%",
      deltaUp: true,
      Icon: IconWallet,
      iconBg: "bg-primary/15 text-[hsl(var(--warning-strong))] dark:text-primary",
      tone: "tone-signal",
    },
    {
      label: copy.mockStudents,
      value: "147",
      countTo: 147,
      unit: "",
      delta: copy.mockNewStudents,
      deltaUp: true,
      Icon: IconUsers,
      iconBg: "bg-info/15 text-info",
      tone: "text-info",
    },
    {
      label: copy.mockDebt,
      value: "1 250 000",
      countTo: 1_250_000,
      unit: copy.mockCurrency,
      delta: copy.mockDebtorStudents,
      deltaUp: false,
      Icon: IconWarning,
      iconBg: "bg-destructive/15 text-destructive",
      tone: "text-destructive",
    },
    {
      label: copy.mockGraduates,
      value: "38",
      countTo: 38,
      unit: "",
      delta: copy.mockPassRate,
      deltaUp: true,
      Icon: IconBadgeCheck,
      iconBg: "bg-success/15 text-success",
      tone: "text-success",
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
// trail path carries data-chart-line so PageMotion can draw it once the mock
// lands; the filled area stays behind it.
function MiniRevenueChart() {
  return (
    <svg
      viewBox="0 0 240 56"
      preserveAspectRatio="none"
      className="h-full w-full text-info"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="mlg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0,52 C20,48 32,42 48,38 C64,34 76,30 92,24 C108,18 120,16 136,13 C152,10 168,8 184,6 C200,4 220,3 240,2 L240,56 L0,56 Z"
        fill="url(#mlg)"
      />
      <path
        data-chart-line
        pathLength={1}
        strokeDasharray="1"
        strokeDashoffset="0"
        d="M0,52 C20,48 32,42 48,38 C64,34 76,30 92,24 C108,18 120,16 136,13 C152,10 168,8 184,6 C200,4 220,3 240,2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

// The "road to the dashboard": a route line that PageMotion draws on load and
// a little car that drives along it. Decorative, aria-hidden, desktop-only.
const ROAD_PATH =
  "M 40 306 C 250 300 370 214 515 180 C 655 146 760 138 880 166 C 950 180 1010 202 1064 238";

function RoadToDashboard() {
  return (
    <svg
      viewBox="0 0 1200 340"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-60 w-full lg:block"
    >
      {/* faint parallel routes, for depth */}
      <path
        d="M -20 322 C 240 318 380 228 520 196 C 660 164 775 156 900 184 C 980 200 1030 220 1100 244"
        fill="none"
        stroke="hsl(var(--primary) / 0.14)"
        strokeWidth="2"
        strokeDasharray="2 11"
      />
      <path
        d="M 720 172 C 860 132 1000 128 1230 102"
        fill="none"
        stroke="hsl(var(--primary) / 0.1)"
        strokeWidth="2"
        strokeDasharray="2 11"
      />
      {/* route bed (drawn in) */}
      <path
        data-road-bed
        d={ROAD_PATH}
        pathLength={1}
        strokeDasharray="1"
        strokeDashoffset="0"
        fill="none"
        stroke="hsl(var(--primary) / 0.3)"
        strokeWidth="7"
        strokeLinecap="round"
      />
      {/* travelling centre-line dashes */}
      <path
        data-road-dash
        d={ROAD_PATH}
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="2.25"
        strokeDasharray="16 18"
        strokeLinecap="round"
      />
      {/* car (opacity 0 until GSAP puts it on the road) */}
      <g data-road-car opacity="0">
        <path
          d="M -23 3 C -23 -1 -19 -4 -12 -5 L -6 -12 C -4 -14 0 -14 4 -12 L 10 -6 C 16 -6 20 -4 21 -1 L 22 2 C 22 4 20 5 18 5 L -20 5 C -21.5 5 -23 4.5 -23 3 Z"
          fill="hsl(var(--foreground))"
        />
        <path
          d="M -5 -11 L -1 -5 L 7 -5 L 3.5 -11 Z"
          fill="hsl(var(--background))"
        />
        <circle cx="-11" cy="4" r="3.4" fill="hsl(var(--background))" />
        <circle cx="11" cy="4" r="3.4" fill="hsl(var(--background))" />
        <circle cx="-11" cy="4" r="1.3" fill="hsl(var(--primary))" />
        <circle cx="11" cy="4" r="1.3" fill="hsl(var(--primary))" />
        <circle cx="22.5" cy="-1" r="1.2" fill="hsl(var(--primary))" />
      </g>
    </svg>
  );
}

function Nav({ locale, copy }: { locale: Locale; copy: LandingCopy }) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex shrink-0 items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <IconShieldCheck className="size-4" />
          </div>
          <span className="font-heading hidden text-sm font-bold tracking-tight text-foreground sm:inline sm:text-base">
            Auto Maktab{" "}
            <span className="font-medium text-muted-foreground">CRM</span>
          </span>
        </div>
        <nav
          aria-label="Sections"
          className="hidden items-center gap-6 xl:flex"
        >
          {copy.navAnchors.map((anchor) => (
            <a
              key={anchor.href}
              href={anchor.href}
              className="py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
            >
              {anchor.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2 max-[420px]:gap-1">
          <a
            href={PHONE_LINK}
            className="hidden items-center gap-1.5 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring lg:flex"
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
                className={`flex min-h-9 min-w-9 items-center justify-center rounded-full px-2 text-xs uppercase transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring max-[380px]:px-1.5 ${
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
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
          />
          <a
            href={CRM_LOGIN_URL}
            aria-label={copy.navCta}
            className="inline-flex h-11 items-center gap-1.5 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-[background-color,transform] hover:bg-primary/90 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 max-[420px]:px-3"
          >
            <span className="max-[420px]:sr-only">{copy.navCta}</span>
            <IconArrowRight className="size-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero({
  copy,
  locale,
}: {
  copy: LandingCopy;
  locale: Locale;
}) {
  const accentIdx = copy.heroTitle.lastIndexOf(copy.heroTitleAccent);
  const titleBefore =
    accentIdx >= 0 ? copy.heroTitle.slice(0, accentIdx) : copy.heroTitle;
  const titleAfter =
    accentIdx >= 0
      ? copy.heroTitle.slice(accentIdx + copy.heroTitleAccent.length)
      : "";

  // Each word gets its own span so PageMotion can roll the title in word by
  // word. Static markup stays a plain readable headline (no JS needed).
  const words = (text: string) => {
    const parts = text.trim().split(" ");
    return parts.map((word, i) => (
      <Fragment key={`${word}-${i}`}>
        {i > 0 && " "}
        <span data-hero-word className="inline-block will-change-transform">
          {word}
        </span>
      </Fragment>
    ));
  };

  return (
    <div className="max-w-2xl lg:py-8">
      <div className="text-left">
        <div data-hero-item className="signal-plaque mb-7">
          <span className="signal-dot h-1.5 w-1.5" />
          {copy.heroBadge}
        </div>

        <h1 className="mb-6 max-w-[14ch] font-heading text-4xl font-extrabold leading-[0.98] tracking-[-0.045em] max-[359px]:text-3xl sm:text-5xl lg:text-6xl">
          {words(titleBefore)}{" "}
          <span
            data-hero-word
            className="relative inline-block will-change-transform"
          >
            <span className="relative z-10 text-foreground">
              {copy.heroTitleAccent}
            </span>
            <span
              aria-hidden="true"
              className="absolute inset-x-0 -bottom-1 h-1 rounded-full bg-primary"
            />
          </span>
          {titleAfter.trim() && (
            <>
              {" "}
              {words(titleAfter)}
            </>
          )}
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
          <DemoRequestDialog
            copy={DEMO_FORM_COPY[locale]}
            triggerLabel={copy.ctaDemo}
            triggerClassName="inline-flex h-12 items-center gap-2 rounded-lg bg-primary px-7 text-sm font-bold text-primary-foreground transition-[background-color,transform] hover:bg-primary/90 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
          />
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
    <div data-mock className="relative z-10 min-w-0">
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_32px_96px_-28px_hsl(var(--foreground)/0.45)]">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-5 py-3">
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
              <p className="text-sm font-bold text-foreground">
                {copy.mockGreeting}
              </p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                {copy.mockSubtitle}
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-[11px] font-semibold text-success">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success motion-reduce:animate-none" />
              {copy.mockLive}
            </span>
          </div>

          {/* KPI row */}
          <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {kpiCards.map((card) => (
              <div
                key={card.label}
                className="relative overflow-hidden rounded-xl border border-border bg-muted/50 p-3 dark:bg-white/[0.03]"
              >
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
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
                  <span data-count-to={card.countTo}>{card.value}</span>
                  {card.unit && (
                    <span className="ml-0.5 text-[10px] font-normal text-muted-foreground">
                      {card.unit}
                    </span>
                  )}
                </p>
                <p
                  className={`mt-1 text-[10px] font-semibold ${card.deltaUp ? "text-success" : "text-destructive"}`}
                >
                  {card.delta}
                </p>
              </div>
            ))}
          </div>

          {/* Revenue trend + debtors */}
          <div className="grid gap-3 sm:grid-cols-5">
            <div className="rounded-xl border border-border bg-muted/40 p-4 dark:bg-white/[0.02] sm:col-span-3">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-foreground">
                    {copy.mockChartTitle}
                  </p>
                  <p className="mt-0.5 text-[10px] text-muted-foreground">
                    {copy.mockChartSub}
                  </p>
                </div>
                <span className="flex items-center gap-1 text-[10px] font-semibold text-success">
                  <IconTrendUp className="size-3" />
                  +18%
                </span>
              </div>
              <div className="h-14">
                <MiniRevenueChart />
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-[10px] text-muted-foreground">
                <span className="inline-block h-1.5 w-4 rounded-full bg-muted-foreground/50" />
                {copy.mockChartPeriod}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-muted/40 p-4 dark:bg-white/[0.02] sm:col-span-2">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold text-foreground">
                  {copy.mockDebtorsTitle}
                </span>
                <span className="rounded-full border border-destructive/25 bg-destructive/10 px-2 py-0.5 text-[10px] font-semibold text-destructive">
                  {debtors.length}
                </span>
              </div>
              <div className="space-y-1.5">
                {debtors.map((d) => (
                  <div
                    key={d.name}
                    className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2 dark:bg-white/[0.02]"
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-destructive/15 text-[10px] font-semibold text-destructive">
                        {d.name[0]}
                      </div>
                      <span className="text-xs text-foreground">{d.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono tabular-nums whitespace-nowrap text-xs font-semibold text-destructive">
                        {d.amount}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
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
        className="relative isolate overflow-hidden px-4 pb-12 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pb-24 lg:pt-20"
      >
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 -z-10 h-px bg-primary"
        />
        <RoadToDashboard />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <Hero copy={copy} locale={locale} />
          <DashboardMock copy={copy} />
        </div>
      </section>
      <CapabilityMarquee items={copy.marquee} />
    </div>
  );
}
