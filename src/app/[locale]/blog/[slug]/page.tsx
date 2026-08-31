import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SiteFooter, SiteHeader } from "@/components/landing/LandingPage";
import DemoLink from "@/components/landing/DemoLink";
import { BLOG_COPY } from "@/config/blog";
import {
  estimateReadingMinutes,
  getBlogPost,
  localizeBlogBody,
  localizeBlogPost,
} from "@/lib/blog";
import { isLocale, type Locale } from "@/i18n/config";
import { buildLocaleAlternates } from "@/lib/locale-metadata";

const BLOG_PATH: Record<Locale, string> = {
  uz: "/blog",
  ru: "/ru/blog",
  en: "/en/blog",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const post = await getBlogPost(slug);
  if (!post) notFound();

  const localized = localizeBlogPost(post, locale);
  const path = `/blog/${post.slug}`;

  return {
    title: localized.title,
    description: localized.excerpt,
    keywords: post.tags,
    alternates: buildLocaleAlternates(path, locale),
    openGraph: {
      type: "article",
      title: localized.title,
      description: localized.excerpt,
      publishedTime: post.published_at ?? undefined,
      modifiedTime: post.updated_at,
      tags: post.tags,
      images: [
        {
          url: "/images/product/dashboard.webp",
          width: 1430,
          height: 894,
          alt: localized.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: localized.title,
      description: localized.excerpt,
      images: ["/images/product/dashboard.webp"],
    },
  };
}

export default async function BlogArticle({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const post = await getBlogPost(slug);
  if (!post) notFound();

  const copy = BLOG_COPY[locale];
  const localized = localizeBlogPost(post, locale);
  const body = localizeBlogBody(post, locale);
  if (!body) notFound();

  const readingMinutes = estimateReadingMinutes(body);
  const articleUrl = buildLocaleAlternates(`/blog/${post.slug}`, locale)
    ?.canonical as string;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: localized.title,
    description: localized.excerpt,
    mainEntityOfPage: articleUrl,
    image: "https://automaktab.uz/images/product/dashboard.webp",
    datePublished: post.published_at,
    dateModified: post.updated_at,
    inLanguage: locale,
    keywords: post.tags.join(", "),
    author: {
      "@type": "Organization",
      name: "automaktab.uz",
      url: "https://automaktab.uz/",
    },
    publisher: {
      "@type": "Organization",
      name: "automaktab.uz",
      logo: {
        "@type": "ImageObject",
        url: "https://automaktab.uz/icon.svg",
      },
    },
  };

  return (
    <>
      <a href="#main-content" className="skip-link">
        {copy.skipLink}
      </a>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <SiteHeader locale={locale} />
      <main id="main-content" className="article-page section-shell">
        <Link href={BLOG_PATH[locale]} className="article-back">
          <ArrowLeft />
          {copy.backToBlog}
        </Link>

        <header className="article-header">
          <p className="eyebrow">
            <span className="signal-point" aria-hidden="true" />
            {copy.articleLabel}
          </p>
          <h1>{localized.title}</h1>
          <p>{localized.excerpt}</p>
          <div className="article-meta">
            {post.published_at && (
              <time dateTime={post.published_at}>
                {formatDate(post.published_at, locale)}
              </time>
            )}
            <span>
              {readingMinutes} {copy.minutes}
            </span>
          </div>
        </header>

        <figure className="article-evidence">
          <div className="evidence-topline">
            <span>{copy.evidenceLabel}</span>
            <span>01 / 01</span>
          </div>
          <div>
            <Image
              src="/images/product/dashboard.webp"
              alt={copy.evidenceImageAlt}
              fill
              preload
              quality={86}
              sizes="(max-width: 767px) 92vw, 78vw"
            />
          </div>
        </figure>

        <article className="article-prose">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{ h1: "h2" }}
          >
            {body}
          </ReactMarkdown>
        </article>

        {post.tags.length > 0 && (
          <ul className="article-tags" aria-label={copy.tagsLabel}>
            {post.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        )}

        <aside className="article-cta">
          <div>
            <h2>{copy.closingTitle}</h2>
            <p>{copy.closingBody}</p>
          </div>
          <DemoLink locale={locale} className="button button-primary">
            {copy.closingCta}
            <ArrowRight />
          </DemoLink>
        </aside>
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

function ArrowLeft() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M17 10H4M9 5l-5 5 5 5" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M3 10h13M11 5l5 5-5 5" />
    </svg>
  );
}
