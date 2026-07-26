@AGENTS.md

# automaktab-web

Marketing site for **automaktab.uz** — B2B, selling Auto Maktab CRM to driving schools in Uzbekistan.

This is **not** the CRM. The CRM is `app.automaktab.uz` and lives in the sibling repo `autodrive-frontend`. Until cutover, `autodrive-frontend` still serves the *old* marketing site too — when comparing behaviour, that repo is the thing being replaced, not a reference for how things should be.

Tickets live in the workspace beads tracker as children of `autodrive-qqbq`. Run `bd` from the workspace root (`../`), not from here.

```bash
bd show autodrive-qqbq        # the spec
bd ready                      # what is takeable now
```

## Hard rules

- **Never commit, stage with intent to commit, or push without explicit permission in the current turn.** Editing files locally is fine. A past approval does not carry over — ask again each time.
- **Never run destructive git operations** (`reset --hard`, `push --force`, branch deletion, `checkout --` over local changes) without explicit permission in the current turn.
- **Use comments sparingly.** Only comment complex code.
- **Do not give a summary after finishing a task** unless explicitly asked.

## Verify

```bash
pnpm run typecheck && pnpm run lint && pnpm run build && pnpm test
```

All four must pass before any work is called done. A reviewer's approval does not replace them.

## Design tokens — read this before styling anything

Tokens come from `@autodrive/design-tokens`, pinned to a git SHA and shared with the CRM.

The package ships two entry points. **For colours, spacing and radius: use `tokens.css`, never `tailwind-preset.cjs`** — the preset is a Tailwind v3 `presets: []` artifact and cannot be consumed by this project, despite what the package README says. Verified: the sibling frontend has no `tailwind.config.*` at all and consumes tokens CSS-first.

**Typography is the exception, and it is currently a gap.** The brand fonts (Manrope, IBM Plex Mono) exist *only* inside `tailwind-preset.cjs`; `tokens.css` ships no `--font-*` variables at all. So CSS-first consumption silently falls back to the Tailwind default system stack — verified in the built CSS. Do not reach for the preset to fix this. The correct fix is upstream: add font variables to `tokens.css` and bump the pinned SHA. Until then, brand typography is knowingly absent, not accidentally broken.

```css
@import '@autodrive/design-tokens/tokens.css';
@import 'tailwindcss';
@theme { /* map the HSL component vars onto Tailwind theme keys */ }
```

Tokens are exposed as HSL components (`--primary: 32 95% 44%`), wrapped in the `@theme` block as `hsl(var(--token))`. The `<alpha-value>` placeholder is a Tailwind v3 idiom — omit it in v4, where opacity modifiers go through `color-mix`.

Note the theme block uses `@theme`, not `@theme inline`, so values are substituted at `:root`. That is correct for the `<html class="dark">` convention, since `:root` *is* `<html>` — but a `.dark` container placed deeper in the tree will not re-theme its subtree.

**Known drift:** the token `--primary` is amber ("Night-console" palette), but the live marketing site is cyan. The landing does not currently use the token primary. Do not assume the tokens describe the marketing look — check before treating a token as the brand colour.

## i18n — where this project deliberately differs

Three locales: `uz` (default), `ru`, `en`.

- **Uzbek is unprefixed.** `/` is Uzbek; `ru` and `en` get path prefixes. This is not the usual next-intl default of prefixing everything — it exists to preserve URLs that are already indexed. Changing it silently breaks live search rankings.
- **The locale in the URL always wins over a stored preference.** The old site did the opposite (browser detection first, locale only in client state), which is exactly why only Uzbek was ever indexable. A stored preference applies only at a locale-less entry point.
- Every page emits `hreflang` alternates for all three locales plus `x-default`, and a self-referencing canonical.
- The locale list must stay identical everywhere it appears (the proxy, the server-side messages loader, and the locale layout). Drift between them fails at runtime, not at build.

**Next.js 16 renamed `middleware.ts` to `proxy.ts`.** Locale routing goes there. Guidance written for earlier Next versions — including most of what you remember — will name the wrong file.

`'use client'` is required for any component using `useTranslations`, `useLocale`, or `useTheme`. Server Components use the async `getTranslations()`.

## Content

Marketing copy lives in version-controlled content files under `src/config/` — one set per locale. **Never hardcode copy in components.** Config modules take the translation function and return localized data.

A schema validates every entry at build time: **a missing `uz`, `ru`, or `en` entry fails the build.** No silent fallback to another language.

The blog is the exception — it comes from the backend, not from files.

## Blog data

Read from the CRM backend's public, no-auth endpoints: `GET /blog-posts` (list, paginated) and `GET /blog-posts/:slug` (single). No CMS in this repo. No global route prefix on the backend — these paths are literal.

**Envelope — verified against the actual controller/interceptor code, not assumed:**

```json
// GET /blog-posts
{ "success": true, "data": { "items": [...], "total": 42, "page": 1, "limit": 20 } }
```

`total`/`page`/`limit` are flat siblings of `items` inside `data` — there is no nested `meta` key. `limit` defaults to 20, maxes at 100. No cursor, no `hasNextPage`, no `totalPages` — compute `Math.ceil(total / limit)` yourself. The list is hardcoded to published-only, newest-first; a draft can never surface here regardless of query params.

Single-post response is the same `{ success, data }` wrapper around one object (snake_case fields: `title_uz`, `excerpt_ru`, `body_en`, `published_at`, `cover_image_url`, `view_count`, etc.). Both "no such slug" and "exists but is a draft" return the **same 404** (`{ "error": { "code": "NOT_FOUND", ... } }` — errors use a structurally different envelope than success, no `success` field at all). A typed client can't and shouldn't try to distinguish the two.

`BlogPost` stores all three locales (`title`/`excerpt`/`body` × uz/ru/en) as **non-nullable** columns, enforced at the DB, the migration, and the create-DTO validation. There is no such thing as a partially translated post — if a locale looks empty, that is a bug, not a fallback case.

`findBySlug` increments a view counter server-side, deduped per `(post, hashed IP)` per 24h — repeated ISR revalidation fetches from the same server won't inflate it every time, only once/day.

**No publish webhook, event emitter, or outbound call of any kind exists in the backend.** Publishing a post is a bare DB write with no side channel — confirmed by reading the mutation service, not inferred. On-demand revalidation is therefore not an option without a backend change; **time-based ISR is the only path** until/unless one is added.

Articles must still become indexable HTML **without a redeploy** — the old site prerendered at build time, which meant publishing an article did nothing until someone triggered a build. Time-based revalidation fixes that without needing a webhook.

## Information architecture

The landing is a **single long page** and it is the conversion path — all features and the demo live on it. Pricing, feature, FAQ and similar pages are **SEO entry surfaces**: they exist to rank for queries the landing cannot, and each funnels into the landing's primary CTA. They do not carry their own demo flow and they do not duplicate the landing.

The primary CTA is self-service demo access — "try it without waiting for a callback". Do not replace it with a contact form.

## SEO — what must not regress

The site being replaced already scores well. Before anything ships:

- Every URL indexed today resolves here, directly or by redirect
- Organization, SoftwareApplication, and per-article Article structured data present
- Sitemap covers all three locales and every published article, and stays correct when an article is published without a redeploy
- `www` redirects to the apex domain; existing security headers are preserved

When measuring, be aware that a bot-challenge page in front of the site produces a fake SEO failure — a `noindex` with no description that exists nowhere in the source. Check the delivered page is real before chasing it in code.

## Deploy

Vercel, its own project, separate from the CRM. Do **not** set `output: "standalone"` — that is for container deploys and breaks Vercel's build output.

The domain move to this project is gated behind a parity check and is not part of routine work.

## Blocked on a decision

Do not write or rewrite marketing copy yet. The recorded positioning (practical-lesson scheduling, double-booking, YHXBB compliance) and the live site's copy (payments, debtors) contradict each other, and the workspace glossary is the source of truth for which wins. Porting existing copy unchanged is fine; writing new copy is not, until that is settled.
