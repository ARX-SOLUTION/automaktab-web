import Link from "next/link";
import { DEFAULT_LOCALE, type Locale } from "@/i18n/config";
import DemoLink from "@/components/landing/DemoLink";

type NotFoundCopy = { title: string; body: string; home: string; demo: string };

const COPY: Record<Locale, NotFoundCopy> = {
  uz: {
    title: "Sahifa topilmadi",
    body: "Siz izlagan sahifa mavjud emas yoki ko'chirilgan.",
    home: "Bosh sahifaga qaytish",
    demo: "Demo bilan sinab ko'ring",
  },
  ru: {
    title: "Страница не найдена",
    body: "Запрошенная страница не существует или была перемещена.",
    home: "Вернуться на главную",
    demo: "Попробовать демо",
  },
  en: {
    title: "Page not found",
    body: "The page you're looking for doesn't exist or has moved.",
    home: "Back to homepage",
    demo: "Try the demo",
  },
};

// not-found.js doesn't receive params (see Next's file-conventions/not-found
// docs). Reading the locale via cookies() would work, but it's a dynamic API
// -- and because this file sits inside the [locale] segment (the same
// segment page.tsx calls notFound() from), Next ties the whole segment's
// rendering mode to this file's dependencies. cookies() here silently
// downgraded the entire site from static (SSG) to per-request dynamic
// rendering, defeating the zero-JS/static-first design this port is built
// on. Defaulting to DEFAULT_LOCALE keeps this file (and therefore the whole
// [locale] segment) static -- a 404 page always showing Uzbek is a much
// smaller cost than losing static generation sitewide.
export default function NotFound() {
  const locale: Locale = DEFAULT_LOCALE;
  const copy = COPY[locale];

  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center gap-4 bg-background px-4 text-center text-foreground">
      <span className="signal-point" aria-hidden="true" />
      <h1 className="text-3xl font-bold tracking-[-0.04em] sm:text-5xl">{copy.title}</h1>
      <p className="max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
        {copy.body}
      </p>
      <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row">
        <Link
          href="/"
          className="button button-primary"
        >
          {copy.home}
        </Link>
        <DemoLink locale={locale} className="button button-secondary">
          {copy.demo}
        </DemoLink>
      </div>
    </main>
  );
}
