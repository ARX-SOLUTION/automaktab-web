import { contentEn } from "@/content/en";
import { contentRu } from "@/content/ru";
import { contentUz, type LandingContent } from "@/content/uz";
import {
  getSeoPagePath,
  SEO_DETAIL_PAGE_IDS,
  SEO_LEGAL_PAGE_IDS,
  SEO_PAGES,
  SEO_RELATED_PAGE_IDS,
  type SeoPageId,
} from "@/config/seo-pages";
import { SUPPORTED_LOCALES, type Locale } from "@/i18n/config";
import { localePath } from "@/lib/locale-metadata";

// llms.txt (https://llmstxt.org) summaries for AI search engines. Everything
// here is assembled from the copy that already ships on the site, so the
// files can never promise more than the pages themselves.

const SITE_URL = "https://automaktab.uz";

const CONTENT: Record<Locale, LandingContent> = {
  uz: contentUz,
  ru: contentRu,
  en: contentEn,
};

const LANGUAGE_NAME: Record<Locale, string> = {
  uz: "O‘zbekcha",
  ru: "Русский",
  en: "English",
};

// Curated from claims the site already makes (landing journey, modules,
// morning report, pricing and FAQ copy); see the SEO/GEO research report.
const SUMMARY =
  "automaktab.uz is a CRM and management system for driving schools (avtomaktab) in Uzbekistan. One system for branches, students, payments and debt, groups and lesson schedules, attendance, practical driving lessons, internal theory tests, fleet, leads and owner reports. Interface in Uzbek, Russian and English. Not affiliated with avtomaktab.com, a separate exam-prep site.";

const FEATURE_PAGES: ReadonlyArray<readonly [SeoPageId, string, string]> = [
  ["payments", "Payments and debt", "payment history on the student card; debtors filtered by branch and group."],
  ["schedule", "Schedules and groups", "groups, theory and practical lessons by teacher and room."],
  ["attendance", "Digital attendance", "present / late / absent / excused per lesson."],
  ["branches", "Branch management", "revenue and debt per branch on the owner dashboard."],
];

const OTHER_FEATURES = [
  "Practical driving: minutes completed and remaining, instructor confirmation.",
  "Internal theory test: road-rules (YHQ) questions by topic (11 topics), time limit, pass mark. Internal school test, not the state exam.",
  "Leads: source, stage, responsible staff member, next follow-up.",
  "Fleet: vehicle status, instructor, maintenance, insurance, fuel records; expenses paid / unpaid.",
  "Daily Telegram report at 08:00 (Tashkent): yesterday's revenue and new students.",
];

// Uzbek FAQ answers for AI search, written only from facts the site states.
const FAQ_UZ: ReadonlyArray<readonly [string, string]> = [
  ["automaktab.uz nima?", "O‘zbekistondagi avtomaktablar uchun CRM. Filiallar, o‘quvchilar, to‘lov va qarzdorlik, guruh va jadval, davomat, amaliy haydash va hisobotlar bitta tizimda yuritiladi."],
  ["Avtomaktab CRM narxi qancha?", "Narx filiallar va o‘quvchilar soniga qarab yozma taklifda beriladi. Maktabingiz ma’lumotlari bilan 30 kunlik sinov bor. Demoni telefon raqamisiz ochish mumkin."],
  ["O‘quvchilarning qarzdorligini qanday ko‘raman?", "Har bir o‘quvchi kartasida to‘lov tarixi va qolgan qarz turadi. Qarzdorlarni filial va guruh bo‘yicha topish mumkin."],
  ["Amaliy haydash soatlari hisoblanadimi?", "Ha. O‘tilgan va qolgan daqiqalar hamda instruktor tasdig‘i qayd etiladi."],
  ["Bir nechta filialni boshqarsa bo‘ladimi?", "Ha. Rahbar barcha filiallar tushumi va qarzdorligini bir panelda solishtiradi."],
  ["Kunlik hisobot keladimi?", "Ha. Har kuni soat 08:00 da (Toshkent vaqti) kechagi tushum va yangi o‘quvchilar soni Telegram’ga yuboriladi."],
  ["Ichki test bormi?", "Ha. YHQ savollari 11 mavzu bo‘yicha, vaqt chegarasi va o‘tish bali bilan. Bu maktabning ichki testi, davlat imtihoni emas."],
];

// Product wording: Uzbek copy says "o‘quvchi", not "talaba". The site-wide
// copy change is separate; generated AI-facing text already uses it.
function uzWording(text: string, locale: Locale) {
  return locale === "uz"
    ? text.replace(/talaba/g, "o‘quvchi").replace(/Talaba/g, "O‘quvchi")
    : text;
}

function homeUrl(locale: Locale) {
  return `${SITE_URL}${localePath("/", locale)}`;
}

function seoUrl(id: SeoPageId, locale: Locale) {
  return `${SITE_URL}${getSeoPagePath(id, locale)}`;
}

function pageLinks(ids: readonly SeoPageId[], locale: Locale) {
  return ids.map((id) => {
    const page = SEO_PAGES[id][locale];
    return uzWording(`- [${page.heading}](${seoUrl(id, locale)}): ${page.description}`, locale);
  });
}

function featureLines() {
  return [
    ...FEATURE_PAGES.map(([id, label, text]) => `- [${label}](${seoUrl(id, "en")}): ${text}`),
    ...OTHER_FEATURES.map((text) => `- ${text}`),
  ];
}

export function buildLlmsTxt(): string {
  const lines = [
    "# automaktab.uz",
    "",
    `> ${SUMMARY}`,
    "",
    "## Features",
    "",
    ...featureLines(),
    "",
    "## Pricing and trial",
    "",
    `- [Pricing](${seoUrl("pricing", "en")}): ${SEO_PAGES.pricing.en.description} Demo with sample data, no phone number required.`,
    "",
  ];

  for (const locale of SUPPORTED_LOCALES) {
    const content = CONTENT[locale];
    lines.push(
      `## ${LANGUAGE_NAME[locale]}`,
      "",
      uzWording(`- [${content.meta.title}](${homeUrl(locale)}): ${content.meta.description}`, locale),
      ...pageLinks([...SEO_RELATED_PAGE_IDS, ...SEO_DETAIL_PAGE_IDS], locale),
      "",
    );
  }

  lines.push(
    "## Optional",
    "",
    `- [Full text](${SITE_URL}/llms-full.txt)`,
    `- [Changelog](${SITE_URL}/changelog)`,
    ...pageLinks(SEO_LEGAL_PAGE_IDS, "en"),
    "",
  );

  return lines.join("\n");
}

export function buildLlmsFullTxt(): string {
  const lines = [`# automaktab.uz`, "", `> ${SUMMARY}`, "", "## Features", "", ...featureLines(), ""];

  for (const locale of SUPPORTED_LOCALES) {
    const content = CONTENT[locale];
    const start = lines.length;
    lines.push(
      `## ${LANGUAGE_NAME[locale]}: ${content.hero.title}${content.hero.titleAccent}`,
      "",
      `URL: ${homeUrl(locale)}`,
      "",
      content.hero.description,
      "",
      `### ${content.faq.title}`,
      "",
    );
    for (const item of content.faq.items) {
      lines.push(`**${item.question}**`, "", item.answerLogin, "");
    }
    if (locale === "uz") {
      for (const [question, answer] of FAQ_UZ) lines.push(`**${question}**`, "", answer, "");
    }

    for (const id of [...SEO_RELATED_PAGE_IDS, ...SEO_DETAIL_PAGE_IDS, ...SEO_LEGAL_PAGE_IDS]) {
      const page = SEO_PAGES[id][locale];
      lines.push(
        `### ${page.heading}`,
        "",
        `URL: ${seoUrl(id, locale)}`,
        `Updated: ${page.updatedAt}`,
        "",
        ...(page.definition ? [page.definition, ""] : []),
        page.intro,
        "",
      );
      for (const section of page.sections) {
        lines.push(`#### ${section.title}`, "", section.body, "");
      }
      for (const item of page.faq ?? []) {
        lines.push(`**${item.question}**`, "", item.answer, "");
      }
    }
    lines.splice(start, lines.length - start, ...lines.slice(start).map((line) => uzWording(line, locale)));
  }

  return lines.join("\n");
}
