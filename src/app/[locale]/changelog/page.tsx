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
    title: 'AutoDrive Mahsulot Yangiliklari va Relizlar | automaktab.uz',
    description:
      'AutoDrive tizimidagi eng so‘nggi yangilanishlar, yangi imkoniyatlar, avtopark va to‘lovlar nazorati bo‘yicha yaxshilanishlar jurnali.',
  },
  ru: {
    title: 'Новости продукта и релизы AutoDrive | automaktab.uz',
    description:
      'Журнал последних обновлений AutoDrive: новые функции, улучшения учёта автопарка, оплат и расписания занятий.',
  },
  en: {
    title: 'AutoDrive Product Changelog & Release Notes | automaktab.uz',
    description:
      'Weekly log of updates, new features, fleet fuel tracking improvements, and driving school operations in AutoDrive.',
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
    alternates: buildLocaleAlternates('/changelog', locale),
    openGraph: {
      type: 'website',
      title: meta.title,
      description: meta.description,
    },
    twitter: {
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
    name: 'AutoDrive CRM',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web, Android, iOS',
    releaseNotes: CHANGELOG_ITEMS.map((item) => ({
      '@type': 'ReleaseNotes',
      softwareVersion: item.version,
      datePublished: item.releaseDate,
      name: item.title[locale],
      description: item.excerpt[locale],
    })),
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
