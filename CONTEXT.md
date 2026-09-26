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

The public visual system is liquid glass, specified in `DESIGN.md` and ADR 0004. Marketing surfaces use the CSS variables in `src/app/globals.css`. They do not use the CRM amber primary as the page accent.

Shared color primitives still exist in `@autodrive/design-tokens/tokens.css`. The package's `tailwind-preset.cjs` targets Tailwind v3 and is not consumable here.

Typography is a known upstream gap: the brand fonts exist only in the preset, while `tokens.css` has no font variables. Fix that in the token package and bump the pinned SHA; do not import the preset as a workaround.

Token colors are HSL components and must be wrapped with `hsl(var(--token))` in Tailwind v4. The landing currently does not use the amber `--primary` token, so inspect the shipped design before treating it as the marketing brand color.

## Localization

- Locales are `uz`, `ru`, and `en`; Uzbek is unprefixed, while Russian and English use URL prefixes.
- The URL determines the locale. Unprefixed non-root paths are always Uzbek; at `/` only, a valid `NEXT_LOCALE=ru|en` cookie redirects to that locale's prefixed root.
- Every page emits all locale alternates, `x-default`, and a self-referencing canonical.
- `src/i18n/config.ts` is the locale source of truth. Keep derived locale lists in metadata, sitemap, and navigation aligned with it.
- Next.js 16 locale routing lives in `proxy.ts`, not `middleware.ts`.
- Localized copy comes from typed objects in `src/config/` and is selected by the validated route locale; this repo does not use `next-intl` hooks.

## Content and blog contract

Marketing copy lives in version-controlled modules under `src/config/`, one set per locale. The build schema requires all three locales. Blog content is the exception and comes from the backend's public `GET /blog-posts` and `GET /blog-posts/:slug` endpoints.

The list response is `{ success: true, data: { items, total, page, limit } }`; pagination metadata is flat inside `data`. The single response uses the same success wrapper. Missing and draft slugs intentionally return the same 404 error envelope.

The web client fetches blog data with one-hour revalidation. Preserve time-based regeneration so newly published articles and the sitemap update without a web redeploy.

## SEO and deployment

Before release, verify that existing indexed URLs resolve or redirect, Organization/SoftwareApplication/Article structured data remains present, the sitemap covers every locale and published article, `www` redirects to the apex domain, and security headers remain intact. Confirm the tested response is the real page rather than an edge bot-challenge page.

The site deploys as its own Vercel project. Do not set Next.js `output: "standalone"`; domain cutover remains gated by an explicit parity check and is not part of routine work.
