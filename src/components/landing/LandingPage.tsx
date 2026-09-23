import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  CheckCheck,
  Layers3,
  LockKeyhole,
  Plus,
  Users,
  Wallet,
} from "lucide-react";
import type { Locale } from "@/i18n/config";
import { LANDING_COPY, PILLAR_ARTICLE_SLUG } from "@/config/landing";
import { getSeoPagePath } from "@/config/seo-pages";
import { HeroSection } from "@/components/ui/hero-section-dark";
import DemoLink from "./DemoLink";
import DemoRequestDialog from "./DemoRequestDialog";
import { DEMO_FORM_COPY } from "./demo-copy";
import {
  ProductAccordion,
  TrialCarousel,
  WorkflowMarquee,
} from "./LandingInteractions";
import PageMotion from "./PageMotion";

const LOGIN_URL = "https://app.automaktab.uz/login";
const HOME_PATH: Record<Locale, string> = { uz: "/", ru: "/ru", en: "/en" };
const BLOG_PATH: Record<Locale, string> = {
  uz: "/blog",
  ru: "/ru/blog",
  en: "/en/blog",
};

function pillarArticlePath(locale: Locale) {
  const path = `/blog/${PILLAR_ARTICLE_SLUG}`;
  return locale === "uz" ? path : `/${locale}${path}`;
}

export default function LandingPage({ locale }: { locale: Locale }) {
  const copy = LANDING_COPY[locale];
  const features = copy.capabilities.items;
  const [payments, students, schedule, attendance, branches, roles] = features;

  return (
    <>
      <SiteHeader locale={locale} />
      <PageMotion>
        <HeroSection
          title={copy.hero.eyebrow}
          subtitle={{ regular: copy.hero.title, gradient: copy.hero.accent }}
          description={copy.hero.body}
          bottomImage={{
            light: "/images/product/dashboard.webp",
            dark: "/images/product/dashboard.webp",
            alt: copy.proof.items[0].imageAlt,
            caption: copy.hero.screenshotCaption,
            width: 1430,
            height: 894,
          }}
          actions={
            <>
              <DemoLink locale={locale} className="button button-primary">
                {copy.hero.primary}
                <ArrowUpRight aria-hidden="true" />
              </DemoLink>
              <DemoRequestDialog
                copy={DEMO_FORM_COPY[locale]}
                locale={locale}
                triggerLabel={copy.hero.secondary}
                triggerClassName="button button-secondary"
              />
            </>
          }
        />

        <div className="hero-footnote section-shell">
          <ul className="trust-list">
            {copy.hero.trust.map((item) => (
              <li key={item}>
                <Check aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <a className="explore-link" href="#capabilities">
            {copy.nav.capabilities}
            <ArrowDown aria-hidden="true" />
          </a>
        </div>

        <section
          id="capabilities"
          className="capabilities-section section-shell chapter"
          aria-labelledby="capabilities-title"
        >
          <header className="section-heading">
            <p className="eyebrow">{copy.capabilities.eyebrow}</p>
            <h2 id="capabilities-title">{copy.capabilities.title}</h2>
            <p>{copy.capabilities.body}</p>
          </header>
          <div className="capability-grid grid-flow-dense">
            <article className="feature-card feature-finance group">
              <div className="feature-copy">
                <Wallet className="feature-icon" aria-hidden="true" />
                <h3>
                  <Link href={getSeoPagePath("payments", locale)}>
                    {payments.title}
                  </Link>
                </h3>
                <p>{payments.body}</p>
              </div>
              <div className="feature-image overflow-hidden">
                <Image
                  src="/images/product/dashboard.webp"
                  alt={copy.proof.items[0].imageAlt}
                  width={1430}
                  height={894}
                  sizes="(max-width: 767px) 90vw, 45vw"
                  className="transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="feature-bottom">
                <span>{copy.proof.items[0].eyebrow}</span>
                <ArrowUpRight aria-hidden="true" />
              </div>
            </article>
            <article className="feature-card feature-schedule group">
              <div className="feature-copy">
                <CalendarDays className="feature-icon" aria-hidden="true" />
                <h3>
                  <Link href={getSeoPagePath("schedule", locale)}>
                    {schedule.title}
                  </Link>
                </h3>
                <p>{schedule.body}</p>
              </div>
              <div className="schedule-crop overflow-hidden">
                <Image
                  src="/images/product/schedule.webp"
                  alt={copy.proof.items[1].imageAlt}
                  width={1430}
                  height={894}
                  sizes="(max-width: 767px) 70vw, 30vw"
                  className="transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </article>
            <article className="feature-card feature-attendance">
              <CheckCheck className="feature-icon" aria-hidden="true" />
              <h3>
                <Link href={getSeoPagePath("attendance", locale)}>
                  {attendance.title}
                </Link>
              </h3>
              <p>{attendance.body}</p>
              <div className="attendance-marks" aria-hidden="true">
                <Check />
                <Check />
                <Check />
                <span>—</span>
                <Check />
              </div>
              <div className="feature-detail">
                <Users aria-hidden="true" />
                <div>
                  <h4>{students.title}</h4>
                  <p>{students.body}</p>
                </div>
              </div>
            </article>
            <article className="feature-card feature-access">
              <Layers3 className="feature-icon" aria-hidden="true" />
              <h3>
                <Link href={getSeoPagePath("branches", locale)}>
                  {branches.title}
                </Link>
              </h3>
              <p>{branches.body}</p>
              <div className="branch-orbit" aria-hidden="true">
                <span />
                <span />
                <span />
                <Layers3 />
              </div>
              <div className="feature-detail">
                <LockKeyhole aria-hidden="true" />
                <div>
                  <h4>{roles.title}</h4>
                  <p>{roles.body}</p>
                </div>
              </div>
            </article>
          </div>
        </section>

        <WorkflowMarquee
          items={features.map((item) => item.title)}
          pauseLabel={copy.pauseMotion}
        />

        <section
          id="product"
          className="proof-section section-shell chapter"
          aria-labelledby="proof-title"
        >
          <header className="section-heading split-heading">
            <div>
              <p className="eyebrow">{copy.proof.eyebrow}</p>
              <h2 id="proof-title">{copy.proof.title}</h2>
            </div>
            <p>{copy.proof.body}</p>
          </header>
          <ProductAccordion
            items={copy.proof.items}
            label={copy.proof.liveLabel}
          />
        </section>

        <section
          className="disorder-section section-shell chapter"
          aria-labelledby="disorder-title"
        >
          <header className="section-heading">
            <p className="eyebrow">{copy.disorder.eyebrow}</p>
            <h2 id="disorder-title">{copy.disorder.title}</h2>
            <p>{copy.disorder.body}</p>
          </header>
          <ol className="disorder-list" data-card-stack>
            {copy.disorder.items.map((item, index) => (
              <li key={item.index} data-stack-card>
                <span className="story-symbol" aria-hidden="true">
                  {index === 0 ? (
                    <Wallet />
                  ) : index === 1 ? (
                    <CheckCheck />
                  ) : (
                    <CalendarDays />
                  )}
                </span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section
          className="trial-section chapter"
          aria-labelledby="trial-title"
        >
          <div className="section-shell trial-inner">
            <header className="section-heading">
              <p className="eyebrow">{copy.trial.eyebrow}</p>
              <h2 id="trial-title">{copy.trial.title}</h2>
              <p>{copy.trial.body}</p>
              <DemoLink locale={locale} className="button button-primary">
                {copy.hero.primary}
                <ArrowUpRight aria-hidden="true" />
              </DemoLink>
            </header>
            <TrialCarousel copy={copy.trial} />
          </div>
        </section>

        <section
          className="blog-teaser section-shell"
          aria-labelledby="blog-teaser-title"
        >
          <div className="blog-teaser-icon" aria-hidden="true">
            <Layers3 />
          </div>
          <div>
            <p className="eyebrow">{copy.blog.eyebrow}</p>
            <h2 id="blog-teaser-title">{copy.blog.title}</h2>
            <p>{copy.blog.body}</p>
          </div>
          <Link href={pillarArticlePath(locale)} className="text-link">
            {copy.blog.link}
            <ArrowUpRight aria-hidden="true" />
          </Link>
        </section>

        <section
          id="faq"
          className="faq-section section-shell chapter"
          aria-labelledby="faq-title"
        >
          <header className="section-heading">
            <p className="eyebrow">{copy.faq.eyebrow}</p>
            <h2 id="faq-title">{copy.faq.title}</h2>
          </header>
          <div className="faq-list">
            {copy.faq.items.map((item) => (
              <details key={item.question}>
                <summary>
                  {item.question}
                  <Plus aria-hidden="true" />
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section
          id="demo"
          className="closing-section"
          aria-labelledby="closing-title"
        >
          <div className="section-shell">
            <p className="eyebrow">{copy.closing.eyebrow}</p>
            <h2 id="closing-title">{copy.closing.title}</h2>
            <p>{copy.closing.body}</p>
            <div className="closing-actions">
              <DemoLink locale={locale} className="button button-primary">
                {copy.closing.primary}
                <ArrowUpRight aria-hidden="true" />
              </DemoLink>
              <DemoRequestDialog
                copy={DEMO_FORM_COPY[locale]}
                locale={locale}
                triggerLabel={copy.closing.secondary}
                triggerClassName="button button-secondary"
              />
            </div>
          </div>
        </section>
      </PageMotion>
      <SiteFooter locale={locale} />
    </>
  );
}

export function SiteHeader({ locale }: { locale: Locale }) {
  const copy = LANDING_COPY[locale];
  const localeLinks = (["uz", "ru", "en"] as const).map((item) => (
    <Link
      key={item}
      href={HOME_PATH[item]}
      lang={item}
      aria-current={item === locale ? "page" : undefined}
    >
      {item.toUpperCase()}
    </Link>
  ));
  const navigation = (
    <>
      <a href={`${HOME_PATH[locale]}#product`}>{copy.nav.proof}</a>
      <a href={`${HOME_PATH[locale]}#capabilities`}>{copy.nav.capabilities}</a>
      <a href={`${HOME_PATH[locale]}#faq`}>{copy.nav.faq}</a>
      <Link href={getSeoPagePath("pricing", locale)}>{copy.nav.pricing}</Link>
      <Link href={BLOG_PATH[locale]}>{copy.nav.blog}</Link>
    </>
  );

  return (
    <header className="site-header">
      <div className="section-shell header-inner">
        <Link
          href={HOME_PATH[locale]}
          className="wordmark"
          aria-label="automaktab.uz"
        >
          <Image src="/icon.svg" alt="" width={30} height={30} />
          <span>
            automaktab<span className="wordmark-domain">.uz</span>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label={copy.nav.mainNavigation}>
          {navigation}
        </nav>
        <div className="header-actions">
          <div
            className="locale-switcher"
            role="group"
            aria-label={copy.nav.language}
          >
            {localeLinks}
          </div>
          <details className="mobile-locale-menu" name="header-menu">
            <summary
              aria-label={`${copy.nav.language}: ${locale.toUpperCase()}`}
            >
              {locale.toUpperCase()}
            </summary>
            <div
              className="locale-switcher"
              role="group"
              aria-label={copy.nav.language}
            >
              {localeLinks}
            </div>
          </details>
          <a href={LOGIN_URL} className="login-link">
            {copy.nav.login}
            <ArrowUpRight aria-hidden="true" />
          </a>
          <details className="mobile-menu" name="header-menu">
            <summary aria-label={copy.nav.menu}>
              <span />
              <span />
            </summary>
            <nav aria-label={copy.nav.mobileNavigation}>
              {navigation}
              <a href={LOGIN_URL}>
                {copy.nav.login}
                <ArrowRight aria-hidden="true" />
              </a>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter({ locale }: { locale: Locale }) {
  const copy = LANDING_COPY[locale];
  return (
    <footer className="site-footer section-shell">
      <div className="footer-top">
        <Link href={HOME_PATH[locale]} className="wordmark">
          <Image src="/icon.svg" alt="" width={30} height={30} />
          <span>
            automaktab<span className="wordmark-domain">.uz</span>
          </span>
        </Link>
        <p>{copy.footer.descriptor}</p>
        <Link href={BLOG_PATH[locale]} className="text-link">
          {copy.nav.blog}
          <ArrowUpRight aria-hidden="true" />
        </Link>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} automaktab.uz</p>
        <nav className="footer-legal" aria-label={copy.footer.legalNav}>
          <Link href={getSeoPagePath("privacy", locale)}>
            {copy.footer.privacy}
          </Link>
          <Link href={getSeoPagePath("terms", locale)}>{copy.footer.terms}</Link>
        </nav>
        <p>{copy.footer.rights}</p>
      </div>
    </footer>
  );
}
