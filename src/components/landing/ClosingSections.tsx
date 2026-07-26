import type { JSX } from "react";
import Link from "next/link";
import type { Locale } from "@/i18n/config";

const TELEGRAM_LINK = "https://t.me/Xamidullo_xudoyberdiyev";
const PHONE_LINK = "tel:+998946110066";
const PHONE_DISPLAY = "+998 94 611 00 66";
const LOGIN_LINK = "https://app.automaktab.uz/login";

interface FaqEntry {
  q: string;
  a: string;
}

interface ClosingSectionsCopy {
  blog: {
    title: string;
    sub: string;
    viewAll: string;
    comingSoon: string;
  };
  faq: {
    title: string;
    items: FaqEntry[];
  };
  demo: {
    eyebrow: string;
    title: string;
    sub: string;
    placeholder: string;
  };
  cta: {
    title: string;
    sub: string;
    free: string;
    call: string;
    risk: string;
  };
  footer: {
    login: string;
    copyright: string;
  };
}

const COPY: Record<Locale, ClosingSectionsCopy> = {
  uz: {
    blog: {
      title: "Blogdan so’nggi maqolalar",
      sub: "Avtomaktab egalari uchun maslahatlar va yangiliklar",
      viewAll: "Hammasini ko’rish",
      comingSoon: "Tez orada",
    },
    faq: {
      title: "Ko’p so‘raladigan savollar",
      items: [
        {
          q: "Avtomaktab CRM qanday ishlaydi?",
          a: "Avtomaktabingiz uchun CRM — talabalar, guruhlar, davomat va to’lovlarni bitta paneldan boshqarish. O‘rnatishsiz: brauzer va telefon orqali ishlaydi.",
        },
        {
          q: "Nechta filial ulash mumkin?",
          a: "Cheksiz. Har bir filialning alohida hisoboti, davomat va to’lov ma‘lumotlari ko’rinadi.",
        },
        {
          q: "Ma‘lumotlarim xavfsizmi?",
          a: "Ha. Ma‘lumotlar shifrlangan serverda saqlanadi, faqat siz va xodimlaringiz kirishi mumkin.",
        },
        {
          q: "Narx qancha?",
          a: "Narx uchun Telegram orqali bog‘laning. Sinov muddatida bepul.",
        },
        {
          q: "Guruhsiz talaba qabul qilish mumkinmi?",
          a: "Ha. Avtomaktab CRM guruhsiz oqimni ham yuritadi — to‘g‘ridan-to‘g‘ri talabani ro‘yxatdan o‘tkazib, davomat va to‘lovni guruhsiz boshqarish mumkin.",
        },
        {
          q: "Telefonda ishlaydi?",
          a: "Ha, to’liq brauzerda — iPhone, Android, planshet. Hech qanday ilova o’rnatilmaydi.",
        },
        {
          q: "Birinchi oy to’lovsizmi?",
          a: "Ha, birinchi oy mutlaqo bepul. Undan keyin maktabingiz hajmiga mos tarif — to’liq ma’lumot uchun bog’laning.",
        },
        {
          q: "Bir maktab ma’lumotlari boshqasiga ko’rinadimi?",
          a: "Yo’q. Har bir maktab ma’lumotlari to’liq izolyatsiyalangan — kunlik zaxira nusxa olinadi.",
        },
      ],
    },
    demo: {
      eyebrow: "Demo so’rov",
      title: "Demo qoldiring",
      sub: "Ma’lumotlaringizni qoldiring — biz siz bilan bog’lanamiz",
      placeholder: "Demo forma shu yerga keladi",
    },
    cta: {
      title: "Maktabingizni bugundan nazoratga oling",
      sub: "Demo versiyasi bilan boshlang — o’rnatish shart emas.",
      free: "Bepul sinovni boshlang",
      call: "Qo’ng’iroq qiling",
      risk: "Birinchi oy bepul · o’rnatishsiz · istalgan vaqt bekor qilinadi",
    },
    footer: {
      login: "Kirish",
      copyright: "© 2026 Auto Maktab CRM",
    },
  },
  ru: {
    blog: {
      title: "Последние статьи блога",
      sub: "Советы и новости для владельцев автошкол",
      viewAll: "Смотреть все",
      comingSoon: "Скоро",
    },
    faq: {
      title: "Часто задаваемые вопросы",
      items: [
        {
          q: "Как работает Avtomaktab CRM?",
          a: "CRM для вашей автошколы — управляйте студентами, группами, посещаемостью и платежами из одной панели. Без установки: работает в браузере и телефоне.",
        },
        {
          q: "Сколько филиалов можно подключить?",
          a: "Без ограничений. Для каждого филиала отдельные отчёты, посещаемость и данные о платежах.",
        },
        {
          q: "Мои данные в безопасности?",
          a: "Да. Данные хранятся на зашифрованных серверах, доступ только у вас и ваших сотрудников.",
        },
        {
          q: "Какая цена?",
          a: "Свяжитесь с нами через Telegram для уточнения цены. В пробный период — бесплатно.",
        },
        {
          q: "Можно ли принимать студентов без группы?",
          a: "Да. Avtomaktab CRM поддерживает поток без групп — можно зачислить студента напрямую и управлять посещаемостью и оплатой без группы.",
        },
        {
          q: "Работает на телефоне?",
          a: "Да, полностью в браузере — iPhone, Android, планшет. Ничего устанавливать не нужно.",
        },
        {
          q: "Первый месяц бесплатно?",
          a: "Да, первый месяц абсолютно бесплатно. Затем тариф по размеру вашей школы — свяжитесь для деталей.",
        },
        {
          q: "Данные одной школы видны другой?",
          a: "Нет. Данные каждой школы полностью изолированы — ежедневные резервные копии создаются автоматически.",
        },
      ],
    },
    demo: {
      eyebrow: "Запрос демо",
      title: "Оставьте заявку",
      sub: "Расскажите о вашей школе — мы свяжемся с вами",
      placeholder: "Форма демо-заявки появится здесь",
    },
    cta: {
      title: "Возьмите школу под контроль — с сегодняшнего дня",
      sub: "Начните с демо-версии — установка не требуется.",
      free: "Начать бесплатно",
      call: "Позвонить",
      risk: "Первый месяц бесплатно · без установки · отмените в любое время",
    },
    footer: {
      login: "Войти",
      copyright: "© 2026 Auto Maktab CRM",
    },
  },
  en: {
    blog: {
      title: "Latest from the blog",
      sub: "Tips and news for driving school owners",
      viewAll: "View all",
      comingSoon: "Coming soon",
    },
    faq: {
      title: "Frequently asked questions",
      items: [
        {
          q: "How does Avtomaktab CRM work?",
          a: "A CRM for your driving school — manage students, groups, attendance and payments from one panel. No install: works in browser and phone.",
        },
        {
          q: "How many branches can I connect?",
          a: "Unlimited. Each branch has separate reports, attendance and payment data.",
        },
        {
          q: "Is my data secure?",
          a: "Yes. Data is stored on encrypted servers, accessible only by you and your staff.",
        },
        {
          q: "What's the price?",
          a: "Contact us via Telegram for pricing. The trial period is free.",
        },
        {
          q: "Can I enroll students without a group?",
          a: "Yes. Avtomaktab CRM handles groupless flow too — enroll a student directly and manage attendance and payments without a group.",
        },
        {
          q: "Does it work on a phone?",
          a: "Yes, fully in the browser — iPhone, Android, tablet. Nothing to install.",
        },
        {
          q: "Is the first month really free?",
          a: "Yes, the first month is completely free. After that, a plan sized to your school — contact us for details.",
        },
        {
          q: "Can one school see another school's data?",
          a: "No. Each school's data is fully isolated — daily backups run automatically.",
        },
      ],
    },
    demo: {
      eyebrow: "Request a demo",
      title: "Leave your details",
      sub: "Tell us about your school and we'll get back to you",
      placeholder: "Demo request form goes here",
    },
    cta: {
      title: "Put your school under control — starting today",
      sub: "Start with the demo — no installation needed.",
      free: "Start your free trial",
      call: "Call us",
      risk: "First month free · no install · cancel any time",
    },
    footer: {
      login: "Sign in",
      copyright: "© 2026 Auto Maktab CRM",
    },
  },
};

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-3.5" aria-hidden="true">
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
      aria-hidden="true"
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ClosingSections({
  locale,
}: {
  locale: Locale;
}): JSX.Element {
  const copy = COPY[locale];

  // FAQPage structured data generated from the same `copy.faq.items` array the
  // visible accordion below renders — the two can never drift apart.
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: copy.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <div className="bg-background text-foreground">
      {/* Blog teaser */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="mb-3 font-heading text-2xl font-bold text-foreground sm:text-3xl">
            {copy.blog.title}
          </h2>
          <p className="text-sm text-muted-foreground">{copy.blog.sub}</p>
        </div>
        {/* ponytail: static placeholder, no fetch. Wire the real posts grid in autodrive-qqbq.9. */}
        <p className="text-center text-sm text-muted-foreground">
          {copy.blog.comingSoon}
        </p>
        <div className="mt-8 flex justify-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-700"
          >
            {copy.blog.viewAll}
            <ArrowRightIcon />
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-2xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="mb-10 text-center font-heading text-2xl font-bold text-foreground sm:text-3xl">
          {copy.faq.title}
        </h2>
        <script
          type="application/ld+json"
          // i18n strings are trusted; escape `<` anyway so a translation can
          // never break out of the <script> tag.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <div className="space-y-2">
          {copy.faq.items.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-border bg-card px-5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-sm font-semibold text-foreground [&::-webkit-details-marker]:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-700 sm:text-base">
                {item.q}
                <ChevronDownIcon />
              </summary>
              <div className="invisible block max-h-0 overflow-hidden transition-[max-height] duration-200 motion-reduce:transition-none group-open:visible group-open:max-h-96">
                <p className="pb-4 text-sm leading-relaxed text-muted-foreground">
                  {item.a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Demo section shell */}
      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            {copy.demo.eyebrow}
          </p>
          <h2 className="mb-3 font-heading text-2xl font-bold text-foreground sm:text-3xl">
            {copy.demo.title}
          </h2>
          <p className="text-sm text-muted-foreground">{copy.demo.sub}</p>
        </div>
        {/* ponytail: chrome only. The real form + submission lands in autodrive-qqbq.8. */}
        <div className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
          {copy.demo.placeholder}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-border bg-card p-10 text-center sm:p-16">
          <h2 className="mb-4 font-heading text-2xl font-bold text-foreground sm:text-4xl">
            {copy.cta.title}
          </h2>
          <p className="mb-8 text-sm text-muted-foreground sm:text-base">
            {copy.cta.sub}
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href={TELEGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-lg border-2 border-muted-foreground px-8 text-sm font-semibold text-foreground transition-colors hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-700"
            >
              {copy.cta.free}
            </a>
            <a
              href={PHONE_LINK}
              className="inline-flex h-12 items-center justify-center rounded-lg border-2 border-muted-foreground px-8 text-sm font-semibold text-foreground transition-colors hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-700"
            >
              {copy.cta.call}
            </a>
          </div>
          <p className="mt-5 text-xs text-muted-foreground">{copy.cta.risk}</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <span className="font-semibold text-foreground">Auto Maktab CRM</span>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <a
              href={LOGIN_LINK}
              className="transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-700"
            >
              {copy.footer.login}
            </a>
            <a
              href={TELEGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-700"
            >
              Telegram
            </a>
            <a
              href={PHONE_LINK}
              className="transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-700"
            >
              {PHONE_DISPLAY}
            </a>
            <span>{copy.footer.copyright}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Social-proof slots (DESIGN.md, "Social proof"): built and styled so real
// data can drop in later without a redesign. Deliberately not rendered
// anywhere -- no real testimonials or activity events exist yet, and a
// fabricated one is worse than an absent one.
// ---------------------------------------------------------------------------

interface TestimonialCardProps {
  quote: string;
  authorName: string;
  authorRole: string;
  locale: Locale;
}

// uz/en have no sourced case for guillemets over curly quotes, so both keep
// the safe curly-quote default; ru gets the Russian typographic convention
// (guillemets) -- same locale-aware approach as every other string in this file.
const QUOTE_MARKS: Record<Locale, { open: string; close: string }> = {
  uz: { open: "“", close: "”" },
  ru: { open: "«", close: "»" },
  en: { open: "“", close: "”" },
};

// Slots in as its own section directly above the Bottom CTA once real
// testimonials exist -- social proof reads best right before the final ask.
export function TestimonialCard({
  quote,
  authorName,
  authorRole,
  locale,
}: TestimonialCardProps) {
  const { open, close } = QUOTE_MARKS[locale];
  return (
    <figure className="rounded-2xl border border-border bg-card p-6 sm:p-8">
      <blockquote className="text-sm leading-relaxed text-foreground sm:text-base">
        {open}{quote}{close}
      </blockquote>
      <figcaption className="mt-5 text-sm">
        <span className="font-semibold text-foreground">{authorName}</span>
        <span className="text-muted-foreground"> — {authorRole}</span>
      </figcaption>
    </figure>
  );
}

interface LiveActivityCardProps {
  actorName: string;
  action: string;
  timeAgo: string;
}

// Once real event data exists, this renders as a small fixed-position toast
// (e.g. bottom-left, near the Hero) rather than inline in a content section
// -- that's the reference site's pattern for this card type.
export function LiveActivityCard({
  actorName,
  action,
  timeAgo,
}: LiveActivityCardProps) {
  return (
    <div
      aria-live="polite"
      className="flex items-center gap-3 rounded-full border border-border bg-card px-4 py-2.5 text-sm shadow-sm"
    >
      <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-emerald-400" />
      <p className="text-foreground">
        <span className="font-semibold">{actorName}</span> {action}
      </p>
      <span className="ml-auto shrink-0 text-xs text-muted-foreground">
        {timeAgo}
      </span>
    </div>
  );
}
