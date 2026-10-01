import { Barlow_Condensed, Barlow, JetBrains_Mono } from "next/font/google";
import UmamiAnalytics from "@/components/analytics/UmamiAnalytics";
import type { Locale } from "@/i18n/config";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const JS_ENHANCEMENT_SCRIPT =
  "document.documentElement.classList.add('js')";

export function LocaleDocument({
  children,
  locale,
}: Readonly<{
  children: React.ReactNode;
  locale: Locale;
}>) {
  return (
    <html
      lang={locale}
      className={`${barlowCondensed.variable} ${barlow.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          id="js-enhancement"
          dangerouslySetInnerHTML={{ __html: JS_ENHANCEMENT_SCRIPT }}
        />
      </head>
      <body>
        {children}
        <UmamiAnalytics />
      </body>
    </html>
  );
}
