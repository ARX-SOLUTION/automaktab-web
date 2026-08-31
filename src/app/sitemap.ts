import type { MetadataRoute } from "next";
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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts();
  const locales: Locale[] = ["uz", "ru", "en"];
  const staticPages = [
    { path: "/", priority: 1, changeFrequency: "weekly" as const },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
  ];

  return [
    ...staticPages.flatMap((page) =>
      locales.map((locale) => ({
        url: url(page.path, locale),
        changeFrequency: page.changeFrequency,
        priority: locale === "uz" ? page.priority : page.priority - 0.1,
        alternates: alternates(page.path),
      })),
    ),
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
