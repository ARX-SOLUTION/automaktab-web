import { buildHomeMetadata } from "../../home-metadata";
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SiteFooter, SiteHeader } from '@/components/landing/LandingPage';
import { isLocale, type Locale } from '@/i18n/config';
import { buildLocaleAlternates } from '@/lib/locale-metadata';
import { CHANGELOG_COPY, CHANGELOG_ITEMS } from '@/config/changelog';
import ChangelogView from '@/components/changelog/ChangelogView';

export const revalidate = 3600;

export function generateStaticParams() {
  return [{ locale: 'uz' }, { locale: 'ru' }, { locale: 'en' }];
}

const META: Record<Locale, { title: string; description: string }> = {
  uz: {
    title: 'Tizim yangilanishlari | automaktab.uz',
    description:
      'automaktab.uz yangilanishlari: yangi imkoniyatlar, to‘lovlar, davomat, dars jadvali va avtopark bo‘yicha yaxshilanishlar.',
  },
  ru: {
    title: 'Обновления системы | automaktab.uz',
    description:
      'Обновления automaktab.uz: новые возможности и улучшения учёта оплат, посещаемости, расписания и автопарка.',
  },
  en: {
    title: 'Product updates | automaktab.uz',
    description:
      'Updates to automaktab.uz: new features and improvements to payments, attendance, schedules and fleet records.',
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
  const sharedMetadata = buildHomeMetadata(locale);

  return {
    title: meta.title,
    description: meta.description,
    alternates: buildLocaleAlternates('/changelog', locale),
    openGraph: {
      ...sharedMetadata.openGraph,
      type: 'website',
      url: buildLocaleAlternates("/changelog", locale)?.canonical as string,
      title: meta.title,
      description: meta.description,
    },
    twitter: {
      ...sharedMetadata.twitter,
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
    },
  };
}

export default async function ChangelogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const copy = CHANGELOG_COPY[locale];

  // Structured Data (JSON-LD) for SoftwareApplication Release Notes
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'automaktab.uz',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    releaseNotes: CHANGELOG_ITEMS.filter((item) => !item.isPlanned).map(
      (item) => `${item.version}: ${item.title[locale]}. ${item.excerpt[locale]}`,
    ),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <a href="#main-content" className="skip-link">
        {copy.skipLink}
      </a>
      <SiteHeader locale={locale} />
      <main id="main-content" className="blog-page section-shell">
        <ChangelogView locale={locale} />
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
