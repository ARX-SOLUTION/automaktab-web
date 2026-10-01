import type { Metadata } from "next";
import { LocaleDocument } from "../LocaleDocument";
import { buildHomeMetadata, viewport } from "../home-metadata";
import "../globals.css";

export { viewport };

export function generateMetadata(): Metadata {
  return buildHomeMetadata("uz");
}

export default function DefaultLocaleLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <LocaleDocument locale="uz">{children}</LocaleDocument>;
}
