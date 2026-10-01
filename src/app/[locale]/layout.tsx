import type { Metadata } from "next";
import { LocaleDocument } from "../LocaleDocument";
import { buildHomeMetadata, viewport } from "../home-metadata";
import { DEFAULT_LOCALE, isLocale, SUPPORTED_LOCALES } from "@/i18n/config";
import "../globals.css";

type LocaleLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

type LocaleMetadataProps = Readonly<{
  params: Promise<{ locale: string }>;
}>;

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export { viewport };

export async function generateMetadata({
  params,
}: LocaleMetadataProps): Promise<Metadata> {
  const { locale } = await params;
  return buildHomeMetadata(isLocale(locale) ? locale : DEFAULT_LOCALE);
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  return (
    <LocaleDocument locale={isLocale(locale) ? locale : DEFAULT_LOCALE}>
      {children}
    </LocaleDocument>
  );
}
