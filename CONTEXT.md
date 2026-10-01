# Automaktab Marketing Site

The public localized marketing site for Automaktab.

## Language

**Canonical Uzbek URL**:
Uzbek content uses an unprefixed public URL. A direct `/uz` or `/uz/*` request redirects to the unprefixed canonical path.
_Avoid_: advertising `/uz` URLs; keep public Uzbek paths unprefixed

## Product boundary

This repo is the public B2B marketing site. The authenticated CRM lives in the sibling `autodrive-frontend` repo at `app.automaktab.uz`; until cutover, that repo also serves the old marketing surface. Compare behavior for parity, not as a design source of truth.

The landing is the single conversion path. Pricing, feature, FAQ, and similar pages are SEO entry surfaces that lead back to the landing CTA. The primary CTA is immediate self-service demo access, not a callback form.

## Design tokens

The current user-directed public system is recorded in `DESIGN.md`: Duolingo-inspired rounded Nunito display, Manrope body, Paper/White surfaces, Ink text, Signal Lime actions and restrained System Blue relationships. It replaces the earlier road-signal and liquid-glass visual directions. ADR 0005 still supplies the copy budget; the current visual source is `src/app/globals.css` and `src/app/LocaleDocument.tsx`.

Public product examples are authored HTML/SVG GSAP scenes with localized synthetic labels. The landing renders no CRM screenshots. Finite scene timelines pause offscreen or when the document is hidden, respect live reduced-motion changes, and clean up on unmount or role changes. Student and role chapters advance their GSAP preview during natural scrolling on tall desktop screens. Phones, short screens, reduced motion and no JavaScript retain complete native sequential examples. Sticky enhancement activates only after its scoped controller is ready; focused optional controls keep their selection.

Shared primitives remain in `@autodrive/design-tokens/tokens.css`; local public tokens and `next/font` variables implement this approved visual direction. Do not import the package's Tailwind v3 preset into this Tailwind v4 site.

## Localization

- Locales are `uz`, `ru`, and `en`; Uzbek is unprefixed, while Russian and English use URL prefixes.
- The URL determines the locale. Unprefixed non-root paths are always Uzbek; at `/` only, a valid `NEXT_LOCALE=ru|en` cookie redirects to that locale's prefixed root.
- Every page emits all locale alternates, `x-default`, and a self-referencing canonical.
- `src/i18n/config.ts` is the locale source of truth. Keep derived locale lists in metadata, sitemap, and navigation aligned with it.
- Next.js 16 locale routing lives in `proxy.ts`, not `middleware.ts`.
- Landing copy comes from typed objects in `src/content/`; SEO copy comes from `src/config/` and is selected by the validated route locale; this repo does not use `next-intl` hooks.

## Content and blog contract

Marketing copy lives in version-controlled modules under `src/content/` and `src/config/`, one set per locale. The build schema requires all three locales. Blog content is the exception and comes from the backend's public `GET /blog-posts` and `GET /blog-posts/:slug` endpoints.

The list response is `{ success: true, data: { items, total, page, limit } }`; pagination metadata is flat inside `data`. The single response uses the same success wrapper. Missing and draft slugs intentionally return the same 404 error envelope.

The web client fetches blog data with one-hour revalidation. Preserve time-based regeneration so newly published articles and the sitemap update without a web redeploy.

## SEO and deployment

Before release, verify that existing indexed URLs resolve or redirect, Organization/SoftwareApplication/Article structured data remains present, the sitemap covers every locale and published article, `www` redirects to the apex domain, and security headers remain intact. Confirm the tested response is the real page rather than an edge bot-challenge page.

The site deploys as its own Vercel project. Do not set Next.js `output: "standalone"`; domain cutover remains gated by an explicit parity check and is not part of routine work.
