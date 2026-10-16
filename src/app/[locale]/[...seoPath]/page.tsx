import { buildHomeMetadata } from "../../home-metadata";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import DemoLink from "@/components/landing/DemoLink";
import { SiteFooter, SiteHeader } from "@/components/landing/LandingPage";
import SeoVisual from "@/components/seo/SeoVisual";
import { GlassPanel } from "@/components/ui/GlassPanel";
import {
  getSeoPage,
  getSeoPagePaths,
  getSeoPageStaticParams,
  getSeoPagePath,
  SEO_LEGAL_PAGE_IDS,
  SEO_PAGES,
  SEO_RELATED_PAGE_IDS,
  type SeoPageCopy,
  type SeoPageId,
} from "@/config/seo-pages";
import { LANDING_COPY } from "@/config/landing";
import { isLocale, type Locale } from "@/i18n/config";
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

  const sharedMetadata = buildHomeMetadata(candidate);

  return {
    title: page.copy.title,
    description: page.copy.description,
    alternates,
    openGraph: {
      ...sharedMetadata.openGraph,
      type: "website",
      title: page.copy.title,
      description: page.copy.description,
      url: canonical,
    },
    twitter: {
      ...sharedMetadata.twitter,
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
  const labels = TEMPLATE_LABELS[candidate];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(buildStructuredData(candidate, id, copy)) }}
      />
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
          {copy.definition && <p className="seo-definition">{copy.definition}</p>}
          <p>{copy.intro}</p>
        </header>

        {copy.visual && <SeoVisual id={copy.visual} locale={candidate} />}

        {copy.comparison && (
          <div className="seo-compare" role="region" aria-label={copy.comparison.caption} tabIndex={0}>
            <table>
              <caption>{copy.comparison.caption}</caption>
              <thead>
                <tr>
                  {copy.comparison.columns.map((column) => (
                    <th key={column} scope="col">{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {copy.comparison.rows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    {row.cells.map((cell, index) => (
                      <td key={index}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="seo-compare-legend">{copy.comparison.legend}</p>
          </div>
        )}

        <article className="article-prose">
          {copy.sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </section>
          ))}
          {copy.faq && (
            <section className="seo-faq">
              <h2>{labels.faq}</h2>
              {copy.faq.map((item) => (
                <details key={item.question}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </section>
          )}
          {copy.sources && (
            <section>
              <h2>{labels.sources}</h2>
              <ul>
                {copy.sources.map((source) => (
                  <li key={source.url}>
                    <a href={source.url} rel="nofollow noopener" target="_blank">{source.label}</a>
                    {` (${labels.checked}: ${source.checkedAt})`}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>

        <nav aria-label={copy.relatedLabel}>
          <ul className="article-tags">
            {(copy.related ?? relatedPageIds(id)).map((candidateId) => (
              <GlassPanel as="li" tier="inset" key={candidateId}>
                <Link href={getSeoPagePath(candidateId, candidate)}>
                  {SEO_PAGES[candidateId][candidate].eyebrow}
                </Link>
              </GlassPanel>
            ))}
          </ul>
        </nav>

        <GlassPanel as="aside" className="article-cta">
          <div>
            <h2>{copy.cta.title}</h2>
            <p>{copy.cta.body}</p>
          </div>
          <DemoLink locale={candidate} className="button button-primary">
            {copy.cta.label}
            <ArrowUpRight aria-hidden="true" />
          </DemoLink>
        </GlassPanel>
      </main>
      <SiteFooter locale={candidate} />
    </>
  );
}

function relatedPageIds(id: SeoPageId): readonly SeoPageId[] {
  if ((SEO_LEGAL_PAGE_IDS as readonly SeoPageId[]).includes(id)) {
    return SEO_LEGAL_PAGE_IDS.filter((candidateId) => candidateId !== id);
  }
  return SEO_RELATED_PAGE_IDS.filter((candidateId) => candidateId !== id);
}

const SITE_URL = "https://automaktab.uz";

const TEMPLATE_LABELS: Record<Locale, { home: string; faq: string; sources: string; checked: string }> = {
  uz: { home: "Bosh sahifa", faq: "Ko‘p beriladigan savollar", sources: "Manbalar", checked: "tekshirilgan" },
  ru: { home: "Главная", faq: "Частые вопросы", sources: "Источники", checked: "проверено" },
  en: { home: "Home", faq: "Frequently asked questions", sources: "Sources", checked: "checked" },
};

/** WebPage + BreadcrumbList (Home › page), plus FAQPage when the page has visible FAQ. */
function buildStructuredData(locale: Locale, id: SeoPageId, copy: SeoPageCopy) {
  const url = `${SITE_URL}${getSeoPagePath(id, locale)}`;
  const home = `${SITE_URL}${locale === "uz" ? "/" : `/${locale}`}`;
  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: copy.title,
      description: copy.description,
      inLanguage: locale,
      dateModified: copy.updatedAt,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      breadcrumb: { "@id": `${url}#breadcrumb` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: TEMPLATE_LABELS[locale].home, item: home },
        { "@type": "ListItem", position: 2, name: copy.eyebrow, item: url },
      ],
    },
  ];
  if (copy.faq?.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: copy.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}

function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
