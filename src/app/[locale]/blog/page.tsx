import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "@/components/landing/LandingPage";
import { BLOG_COPY } from "@/config/blog";
import { getBlogPosts, localizeBlogPost } from "@/lib/blog";
import { isLocale, type Locale } from "@/i18n/config";
import { buildLocaleAlternates } from "@/lib/locale-metadata";

const ARTICLE_PATH: Record<Locale, (slug: string) => string> = {
  uz: (slug) => `/blog/${slug}`,
  ru: (slug) => `/ru/blog/${slug}`,
  en: (slug) => `/en/blog/${slug}`,
};

const META: Record<Locale, { title: string; description: string }> = {
  uz: {
    title: "Avtomaktab boshqaruvi bo‘yicha blog | automaktab.uz",
    description:
      "Avtomaktab CRM, to‘lov, qarzdorlik, jadval va davomatni raqamlashtirish bo‘yicha amaliy maqolalar.",
  },
  ru: {
    title: "Блог об управлении автошколой | automaktab.uz",
    description:
      "Практические статьи о CRM для автошколы, оплатах, долгах, расписании и цифровой посещаемости.",
  },
  en: {
    title: "Driving School Operations Blog | automaktab.uz",
    description:
      "Practical guides to driving-school CRM, payments, debt, schedules, and digital attendance.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const meta = META[locale];
  return {
    title: meta.title,
    description: meta.description,
    alternates: buildLocaleAlternates("/blog", locale),
    openGraph: {
      type: "website",
      title: meta.title,
      description: meta.description,
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
  };
}

export default async function BlogIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const copy = BLOG_COPY[locale];
  const posts = await getBlogPosts();

  return (
    <>
      <a href="#main-content" className="skip-link">
        {copy.skipLink}
      </a>
      <SiteHeader locale={locale} />
      <main id="main-content" className="blog-page section-shell">
        <header className="blog-index-header">
          <p className="eyebrow">
            <span className="signal-point" aria-hidden="true" />
            {copy.eyebrow}
          </p>
          <h1>{copy.title}</h1>
          <p>{copy.description}</p>
        </header>

        {posts.length > 0 ? (
          <ol className="blog-index-list">
            {posts.map((post, index) => {
              const localized = localizeBlogPost(post, locale);
              return (
                <li key={post.id}>
                  <span className="blog-index-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="eyebrow">{copy.articleLabel}</p>
                    <h2>
                      <Link href={ARTICLE_PATH[locale](post.slug)}>
                        {localized.title}
                      </Link>
                    </h2>
                    <p>{localized.excerpt}</p>
                  </div>
                  <div className="blog-index-meta">
                    {post.published_at && (
                      <time dateTime={post.published_at}>
                        {formatDate(post.published_at, locale)}
                      </time>
                    )}
                    <Link
                      href={ARTICLE_PATH[locale](post.slug)}
                      aria-label={`${copy.readArticle}: ${localized.title}`}
                    >
                      {copy.readArticle}
                      <ArrowUpRight />
                    </Link>
                  </div>
                </li>
              );
            })}
          </ol>
        ) : (
          <div className="blog-empty">
            <span aria-hidden="true">01</span>
            <h2>{copy.emptyTitle}</h2>
            <p>{copy.emptyBody}</p>
          </div>
        )}
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}

function formatDate(value: string, locale: Locale) {
  const languageTag: Record<Locale, string> = {
    uz: "uz-Latn-UZ",
    ru: "ru-RU",
    en: "en-US",
  };
  return new Intl.DateTimeFormat(languageTag[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M6 14 14 6M7 6h7v7" />
    </svg>
  );
}
