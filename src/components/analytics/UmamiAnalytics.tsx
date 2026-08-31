"use client";

import Script from "next/script";
import { flushUmamiQueue } from "@/lib/umami";

const WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID?.trim();

export default function UmamiAnalytics() {
  if (!WEBSITE_ID) return null;

  return (
    <Script
      src="https://cloud.umami.is/script.js"
      strategy="afterInteractive"
      data-website-id={WEBSITE_ID}
      data-domains="automaktab.uz,www.automaktab.uz"
      data-exclude-search="true"
      data-do-not-track="true"
      data-performance="true"
      onReady={flushUmamiQueue}
    />
  );
}
