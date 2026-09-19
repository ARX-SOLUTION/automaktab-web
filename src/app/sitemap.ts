import type { MetadataRoute } from "next";
import {
  getSeoPagePath,
  getSeoPagePaths,
  SEO_PAGE_IDS,
  SEO_PAGES,
} from "@/config/seo-pages";
import { getBlogPosts } from "@/lib/blog";
import type { Locale } from "@/i18n/config";

const BASE_URL = "https://automaktab.uz";

export const revalidate = 3600;

function localizedPath(path: string, locale: Locale) {
  if (locale === "uz") return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

function url(path: string, locale: Locale) {
  return `${BASE_URL}${localizedPath(path, locale)}`;
}

function alternates(path: string) {
  return {
    languages: {
      uz: url(path, "uz"),
      ru: url(path, "ru"),
      en: url(path, "en"),
      "x-default": url(path, "uz"),
    },
  };
}

function seoAlternates(id: (typeof SEO_PAGE_IDS)[number]) {
  const paths = getSeoPagePaths(id);
  return {
    languages: {
      uz: `${BASE_URL}${paths.uz}`,
      ru: `${BASE_URL}${paths.ru}`,
      en: `${BASE_URL}${paths.en}`,
      "x-default": `${BASE_URL}${paths.uz}`,
    },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts();
  const locales: Locale[] = ["uz", "ru", "en"];
  const staticPages = [
    { path: "/", priority: 1, changeFrequency: "weekly" as const },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
  ];
  const seoPages = SEO_PAGE_IDS.flatMap((id) =>
    locales.map((locale) => ({
      url: `${BASE_URL}${getSeoPagePath(id, locale)}`,
      lastModified: new Date(SEO_PAGES[id][locale].updatedAt),
      changeFrequency: "monthly" as const,
      priority: locale === "uz" ? 0.85 : 0.75,
      alternates: seoAlternates(id),
    })),
  );

  return [
    ...staticPages.flatMap((page) =>
      locales.map((locale) => ({
        url: url(page.path, locale),
        changeFrequency: page.changeFrequency,
        priority: locale === "uz" ? page.priority : page.priority - 0.1,
        alternates: alternates(page.path),
      })),
    ),
    ...seoPages,
    ...posts.flatMap((post) => {
      const path = `/blog/${encodeURIComponent(post.slug)}`;
      return locales.map((locale) => ({
        url: url(path, locale),
        lastModified: post.published_at
          ? new Date(post.published_at)
          : undefined,
        changeFrequency: "monthly" as const,
        priority: locale === "uz" ? 0.75 : 0.65,
        alternates: alternates(path),
      }));
    }),
  ];
}
