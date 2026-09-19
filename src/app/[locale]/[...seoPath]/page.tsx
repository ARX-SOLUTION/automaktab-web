import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import DemoLink from "@/components/landing/DemoLink";
import { SiteFooter, SiteHeader } from "@/components/landing/LandingPage";
import {
  getSeoPage,
  getSeoPagePaths,
  getSeoPageStaticParams,
  getSeoPagePath,
  SEO_PAGE_IDS,
  SEO_PAGES,
} from "@/config/seo-pages";
import { LANDING_COPY } from "@/config/landing";
import { isLocale } from "@/i18n/config";
import { buildLocalizedAlternates } from "@/lib/locale-metadata";

type SeoPageProps = {
  params: Promise<{ locale: string; seoPath: string[] }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getSeoPageStaticParams();
}

export async function generateMetadata({
  params,
}: SeoPageProps): Promise<Metadata> {
  const { locale: candidate, seoPath } = await params;
  if (!isLocale(candidate)) notFound();

  const page = getSeoPage(candidate, seoPath);
  if (!page) notFound();

  const alternates = buildLocalizedAlternates(
    getSeoPagePaths(page.id),
    candidate,
  );
  const canonical = alternates?.canonical as string;

  return {
    title: page.copy.title,
    description: page.copy.description,
    keywords: [...page.copy.keywords],
    alternates,
    openGraph: {
      type: "website",
      title: page.copy.title,
      description: page.copy.description,
      url: canonical,
    },
    twitter: {
      card: "summary_large_image",
      title: page.copy.title,
      description: page.copy.description,
    },
  };
}

export default async function SeoPage({
  params,
}: SeoPageProps) {
  const { locale: candidate, seoPath } = await params;
  if (!isLocale(candidate)) notFound();

  const page = getSeoPage(candidate, seoPath);
  if (!page) notFound();

  const { copy, id } = page;

  return (
    <>
      <a href="#main-content" className="skip-link">
        {LANDING_COPY[candidate].skipLink}
      </a>
      <SiteHeader locale={candidate} />
      <main id="main-content" className="article-page section-shell">
        <header className="article-header">
          <p className="eyebrow">
            <span className="signal-point" aria-hidden="true" />
            {copy.eyebrow}
          </p>
          <h1>{copy.heading}</h1>
          <p>{copy.intro}</p>
        </header>

        <article className="article-prose">
          {copy.sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </section>
          ))}
        </article>

        <nav className="article-tags" aria-label={copy.relatedLabel}>
          {SEO_PAGE_IDS.filter((candidateId) => candidateId !== id).map(
            (candidateId) => (
              <li key={candidateId}>
                <Link href={getSeoPagePath(candidateId, candidate)}>
                  {SEO_PAGES[candidateId][candidate].eyebrow}
                </Link>
              </li>
            ),
          )}
        </nav>

        <aside className="article-cta">
          <div>
            <h2>{copy.cta.title}</h2>
            <p>{copy.cta.body}</p>
          </div>
          <DemoLink locale={candidate} className="button button-primary">
            {copy.cta.label}
            <ArrowUpRight aria-hidden="true" />
          </DemoLink>
        </aside>
      </main>
      <SiteFooter locale={candidate} />
    </>
  );
}
