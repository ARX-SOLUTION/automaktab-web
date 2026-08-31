import "server-only";

import type { Locale } from "@/i18n/config";

const API_BASE_URL = (
  process.env.CRM_API_BASE_URL || "https://api.automaktab.uz"
).replace(/\/$/, "");

export type BlogListItem = {
  id: string;
  slug: string;
  tags: string[];
  status: "draft" | "published";
  published_at: string | null;
  title_uz: string;
  title_ru: string;
  title_en: string;
  excerpt_uz: string;
  excerpt_ru: string;
  excerpt_en: string;
  cover_image_url: string | null;
  view_count: number;
};

export type BlogPost = BlogListItem & {
  body_uz: string;
  body_ru: string;
  body_en: string;
  created_at: string;
  updated_at: string;
};

type Envelope<T> = { success: true; data: T };
type ListPayload = {
  items: BlogListItem[];
  total: number;
  page: number;
  limit: number;
};

export async function getBlogPosts(): Promise<BlogListItem[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/blog-posts?limit=100`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) return [];

    const envelope = (await response.json()) as Envelope<ListPayload>;
    return Array.isArray(envelope.data?.items) ? envelope.data.items : [];
  } catch {
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/blog-posts/${encodeURIComponent(slug)}`,
      { next: { revalidate: 3600 } },
    );
    if (!response.ok) return null;

    const envelope = (await response.json()) as Envelope<BlogPost>;
    return envelope.data ?? null;
  } catch {
    return null;
  }
}

export function localizeBlogPost(
  post: BlogListItem | BlogPost,
  locale: Locale,
) {
  if (locale === "ru") {
    return {
      title: post.title_ru,
      excerpt: post.excerpt_ru,
    };
  }

  if (locale === "en") {
    return {
      title: post.title_en,
      excerpt: post.excerpt_en,
    };
  }

  return {
    title: post.title_uz,
    excerpt: post.excerpt_uz,
  };
}

export function localizeBlogBody(post: BlogPost, locale: Locale) {
  if (locale === "ru") return post.body_ru;
  if (locale === "en") return post.body_en;
  return post.body_uz;
}

export function estimateReadingMinutes(markdown: string): number {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 190));
}
