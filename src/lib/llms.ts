import { contentEn } from "@/content/en";
import { contentRu } from "@/content/ru";
import { contentUz, type LandingContent } from "@/content/uz";
import {
  getSeoPagePath,
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

function homeUrl(locale: Locale) {
  return `${SITE_URL}${localePath("/", locale)}`;
}

function seoUrl(id: SeoPageId, locale: Locale) {
  return `${SITE_URL}${getSeoPagePath(id, locale)}`;
}

function pageLinks(ids: readonly SeoPageId[], locale: Locale) {
  return ids.map((id) => {
    const page = SEO_PAGES[id][locale];
    return `- [${page.heading}](${seoUrl(id, locale)}): ${page.description}`;
  });
}

export function buildLlmsTxt(): string {
  const en = CONTENT.en;
  const lines = [
    "# automaktab.uz",
    "",
    `> ${en.meta.description}`,
    "",
    en.hero.description,
    "",
  ];

  for (const locale of SUPPORTED_LOCALES) {
    const content = CONTENT[locale];
    lines.push(
      `## ${LANGUAGE_NAME[locale]}`,
      "",
      `- [${content.meta.title}](${homeUrl(locale)}): ${content.meta.description}`,
      ...pageLinks(SEO_RELATED_PAGE_IDS, locale),
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
  const lines = [`# automaktab.uz`, "", `> ${CONTENT.en.meta.description}`, ""];

  for (const locale of SUPPORTED_LOCALES) {
    const content = CONTENT[locale];
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

    for (const id of [...SEO_RELATED_PAGE_IDS, ...SEO_LEGAL_PAGE_IDS]) {
      const page = SEO_PAGES[id][locale];
      lines.push(
        `### ${page.heading}`,
        "",
        `URL: ${seoUrl(id, locale)}`,
        `Updated: ${page.updatedAt}`,
        "",
        page.intro,
        "",
      );
      for (const section of page.sections) {
        lines.push(`#### ${section.title}`, "", section.body, "");
      }
    }
  }

  return lines.join("\n");
}
