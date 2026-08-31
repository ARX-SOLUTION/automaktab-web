import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { LANDING_COPY, type ProductProof } from "@/config/landing";
import DemoLink from "./DemoLink";
import DemoRequestDialog from "./DemoRequestDialog";
import { DEMO_FORM_COPY } from "./demo-copy";
import PageMotion from "./PageMotion";

const LOGIN_URL = "https://app.automaktab.uz/login";

const HOME_PATH: Record<Locale, string> = {
  uz: "/",
  ru: "/ru",
  en: "/en",
};

const BLOG_PATH: Record<Locale, string> = {
  uz: "/blog",
  ru: "/ru/blog",
  en: "/en/blog",
};

export default function LandingPage({ locale }: { locale: Locale }) {
  const copy = LANDING_COPY[locale];

  return (
    <>
      <SiteHeader locale={locale} />

      <PageMotion>
      <section className="hero section-shell" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow" data-hero-eyebrow>
            <span className="signal-point" aria-hidden="true" />
            {copy.hero.eyebrow}
          </p>
          <h1 id="hero-title" data-hero-title>
            {copy.hero.title}
          </h1>
          <p className="hero-lead" data-hero-item>
            {copy.hero.body}
          </p>
          <div className="hero-actions" data-hero-item>
            <DemoLink locale={locale} className="button button-primary">
              {copy.hero.primary}
              <ArrowRight />
            </DemoLink>
            <DemoRequestDialog
              copy={DEMO_FORM_COPY[locale]}
              locale={locale}
              triggerLabel={copy.hero.secondary}
              triggerClassName="button button-secondary"
            />
          </div>
          <ul className="trust-list" data-hero-item>
            {copy.hero.trust.map((item) => (
              <li key={item}>
                <Check />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <figure className="hero-evidence" data-hero-proof>
          <div className="evidence-topline">
            <span>{copy.hero.screenshotCaption}</span>
            <span className="evidence-status">
              <span aria-hidden="true" /> {copy.hero.liveStatus}
            </span>
          </div>
          <div className="hero-image-frame">
            <Image
              src="/images/product/dashboard.webp"
              alt={copy.proof.items[0].imageAlt}
              fill
              preload
              quality={86}
              sizes="(max-width: 767px) 92vw, (max-width: 1199px) 86vw, 58vw"
            />
          </div>
          <figcaption>
            <strong>{copy.proof.items[0].metric}</strong>
            <span>{copy.proof.items[0].metricLabel}</span>
          </figcaption>
        </figure>
      </section>

      <section className="disorder-section section-shell" aria-labelledby="disorder-title">
        <header className="section-heading split-heading">
          <p className="eyebrow">{copy.disorder.eyebrow}</p>
          <h2 id="disorder-title">{copy.disorder.title}</h2>
          <p>{copy.disorder.body}</p>
        </header>
        <ol className="disorder-list">
          {copy.disorder.items.map((item) => (
            <li key={item.index}>
              <span>{item.index}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="product" className="proof-section" aria-labelledby="proof-title">
        <div className="section-shell">
          <header className="section-heading proof-heading">
            <p className="eyebrow">{copy.proof.eyebrow}</p>
            <h2 id="proof-title">{copy.proof.title}</h2>
            <p>{copy.proof.body}</p>
          </header>

          <div className="proof-mobile">
            {copy.proof.items.map((item, index) => (
              <ProofCard
                key={item.id}
                proof={item}
                liveLabel={copy.proof.liveLabel}
                eager={index === 0}
              />
            ))}
          </div>

          <div className="proof-desktop" data-proof-desktop>
            <div className="proof-pin" data-proof-pin>
              <ol className="proof-rail">
                {copy.proof.items.map((item, index) => (
                  <li
                    key={item.id}
                    data-proof-step
                    data-active={index === 0 ? "true" : "false"}
                  >
                    <div className="proof-signal-target" data-proof-target>
                      {index === 0 && (
                        <span data-proof-signal aria-hidden="true" />
                      )}
                    </div>
                    <span className="proof-index">{item.index}</span>
                    <div>
                      <p>{item.eyebrow}</p>
                      <h3>{item.title}</h3>
                      <span>{item.body}</span>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="proof-stage">
                {copy.proof.items.map((item, index) => (
                  <figure
                    key={item.id}
                    className="proof-frame"
                    data-proof-frame
                    data-active={index === 0 ? "true" : "false"}
                  >
                    <div className="evidence-topline">
                      <span>{copy.proof.liveLabel}</span>
                      <span>{item.index} / 03</span>
                    </div>
                    <div className="proof-image-frame">
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        quality={84}
                        sizes="60vw"
                      />
                    </div>
                    <figcaption>
                      <strong>{item.metric}</strong>
                      <span>{item.metricLabel}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="capabilities"
        className="capabilities-section section-shell"
        aria-labelledby="capabilities-title"
      >
        <header className="section-heading split-heading">
          <p className="eyebrow">{copy.capabilities.eyebrow}</p>
          <h2 id="capabilities-title">{copy.capabilities.title}</h2>
          <p>{copy.capabilities.body}</p>
        </header>
        <div className="capability-grid">
          {copy.capabilities.items.map((item, index) => (
            <article key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="trial-section" aria-labelledby="trial-title">
        <div className="section-shell trial-inner">
          <header>
            <p className="eyebrow">{copy.trial.eyebrow}</p>
            <h2 id="trial-title">{copy.trial.title}</h2>
            <p>{copy.trial.body}</p>
            <DemoLink locale={locale} className="button button-primary">
              {copy.hero.primary}
              <ArrowRight />
            </DemoLink>
          </header>
          <ol>
            {copy.trial.steps.map((step) => (
              <li key={step.index}>
                <span>{step.index}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="blog-teaser section-shell" aria-labelledby="blog-teaser-title">
        <p className="eyebrow">{copy.blog.eyebrow}</p>
        <div>
          <h2 id="blog-teaser-title">{copy.blog.title}</h2>
          <p>{copy.blog.body}</p>
        </div>
        <Link href={BLOG_PATH[locale]} className="text-link">
          {copy.blog.link}
          <ArrowUpRight />
        </Link>
      </section>

      <section id="faq" className="faq-section section-shell" aria-labelledby="faq-title">
        <header className="section-heading split-heading">
          <p className="eyebrow">{copy.faq.eyebrow}</p>
          <h2 id="faq-title">{copy.faq.title}</h2>
        </header>
        <div className="faq-list">
          {copy.faq.items.map((item, index) => (
            <details key={item.question}>
              <summary>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {item.question}
                <Chevron />
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="demo" className="closing-section section-shell" aria-labelledby="closing-title">
        <div>
          <p className="eyebrow">{copy.closing.eyebrow}</p>
          <h2 id="closing-title">{copy.closing.title}</h2>
          <p>{copy.closing.body}</p>
        </div>
        <div className="closing-actions">
          <DemoLink locale={locale} className="button button-primary">
            {copy.closing.primary}
            <ArrowRight />
          </DemoLink>
          <DemoRequestDialog
            copy={DEMO_FORM_COPY[locale]}
            locale={locale}
            triggerLabel={copy.closing.secondary}
            triggerClassName="button button-on-dark"
          />
        </div>
      </section>
      </PageMotion>

      <SiteFooter locale={locale} />
    </>
  );
}

export function SiteHeader({ locale }: { locale: Locale }) {
  const copy = LANDING_COPY[locale];

  const navigation = (
    <>
      <a href={`${HOME_PATH[locale]}#product`}>{copy.nav.proof}</a>
      <a href={`${HOME_PATH[locale]}#capabilities`}>{copy.nav.capabilities}</a>
      <a href={`${HOME_PATH[locale]}#faq`}>{copy.nav.faq}</a>
      <Link href={BLOG_PATH[locale]}>{copy.nav.blog}</Link>
    </>
  );

  return (
    <header className="site-header">
      <div className="section-shell header-inner">
        <Link href={HOME_PATH[locale]} className="wordmark" aria-label="automaktab.uz">
          automaktab<span>.uz</span>
        </Link>
        <nav className="desktop-nav" aria-label={copy.nav.mainNavigation}>
          {navigation}
        </nav>
        <div className="header-actions">
          <div className="locale-switcher" aria-label={copy.nav.language}>
            {(["uz", "ru", "en"] as const).map((item) => (
              <Link
                key={item}
                href={HOME_PATH[item]}
                lang={item}
                aria-current={item === locale ? "page" : undefined}
              >
                {item.toUpperCase()}
              </Link>
            ))}
          </div>
          <a href={LOGIN_URL} className="login-link">
            {copy.nav.login}
            <ArrowUpRight />
          </a>
          <details className="mobile-menu">
            <summary aria-label={copy.nav.menu}>
              <span />
              <span />
            </summary>
            <nav aria-label={copy.nav.mobileNavigation}>{navigation}</nav>
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
      <Link href={HOME_PATH[locale]} className="wordmark">
        automaktab<span>.uz</span>
      </Link>
      <p>{copy.footer.descriptor}</p>
      <p>© {new Date().getFullYear()} automaktab.uz · {copy.footer.rights}</p>
    </footer>
  );
}

function ProofCard({
  proof,
  liveLabel,
  eager,
}: {
  proof: ProductProof;
  liveLabel: string;
  eager: boolean;
}) {
  return (
    <article className="proof-card">
      <div className="proof-card-copy">
        <span>{proof.index}</span>
        <p className="eyebrow">{proof.eyebrow}</p>
        <h3>{proof.title}</h3>
        <p>{proof.body}</p>
      </div>
      <figure>
        <div className="evidence-topline">
          <span>{liveLabel}</span>
          <span>{proof.metric}</span>
        </div>
        <div className="proof-image-frame">
          <Image
            src={proof.image}
            alt={proof.imageAlt}
            fill
            quality={84}
            loading={eager ? "eager" : "lazy"}
            sizes="(max-width: 767px) 92vw, (max-width: 1023px) 88vw, 60vw"
          />
        </div>
        <figcaption>{proof.metricLabel}</figcaption>
      </figure>
    </article>
  );
}

function ArrowRight() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M3 10h13M11 5l5 5-5 5" />
    </svg>
  );
}

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M6 14 14 6M7 6h7v7" />
    </svg>
  );
}

function Chevron() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="m5 7 5 5 5-5" />
    </svg>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="m3 8 3 3 7-7" />
    </svg>
  );
}
