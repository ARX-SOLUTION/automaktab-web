# DESIGN.md — automaktab-web visual design system

Scope: visual/aesthetic decisions for automaktab.uz's marketing site. This is not an engineering or content-rules document — those live in `CLAUDE.md`. Where the two could overlap (accessibility baselines, motion), this document is the source of truth for _what the standard is_; `CLAUDE.md` covers _how the codebase enforces it_.

Direction: **"Road Signal"** — one brand shared with `app.automaktab.uz`: warm paper, road-ink typography, and a restrained amber action signal. The public site is more editorial and persuasive; the CRM stays denser and performance-first, but the tokens and product evidence remain visibly related.

## Typography

- Display/heading font: **Manrope**, loaded via `next/font/google`. This is the CRM ecosystem's already-intended brand font (present in `@autodrive/design-tokens`'s dead `tailwind-preset.cjs`, never wired up — tracked as `autodrive-1r14`). Load it directly in this repo rather than waiting on the upstream fix.
  - **Before using it**: confirm Manrope's Google Fonts delivery includes a Cyrillic subset. Russian-locale pages are non-negotiable — if Cyrillic coverage is incomplete or degraded, do not ship it as the Cyrillic body/heading font; fall back to the system stack for `ru` until a font with verified full Cyrillic coverage is chosen.
- Body font: system stack (current behavior). No change — Manrope is for headings/display text, not paragraph copy.
- Headline weight: 700–800. Tight tracking (negative letter-spacing) at display sizes, matching the redesign checklist's "headlines lack presence" guidance.
- Numbers: tabular figures on any KPI/money value (already the convention in `DashboardMock` — keep it, extend it to any new numeric UI).

## Color & Surface

- Light and dark themes are equal product surfaces. Light uses warm paper `#F4F0E7`; dark uses deep road teal (`#092634` family), never pure black.
- Road ink `#132A30` carries hierarchy and product chrome. Signal amber `#E2A42D` is reserved for primary actions, focus rings, and one high-value emphasis per view.
- Semantic success, warning, danger, and info colors remain distinct from the brand accent. Amber must not replace error or success meaning.
- Cards use opaque token surfaces and 1px borders. No CRT overlays, glass blur, decorative glow, or gradient fill.
- The public site and CRM currently mirror one Road Signal token contract locally. Keep both mirrors identical until the shared `@autodrive/design-tokens` package adopts these values; local overrides may change density and layout, not brand meaning.

## Layout

- The five identical `eyebrow → h2 → sub → N-column equal card grid` section shells (Pain, Stats, How It Works, Benefits, Roles) are the strongest generic-template signal on the current page (audit finding #11). Not all five need to change — Benefits and Roles are simple enough that a clean grid is the right choice, not a compromise. Pain and Stats should move to an asymmetric/editorial treatment (unequal column widths, a dominant element instead of N equal cards).
- Features keeps its existing alternating left/right row pattern — it's already the one section that isn't a generic grid.
- `DashboardMock` moves from "flat card" toward "captured screenshot": a device-frame treatment, a more pronounced shadow, and slight overlap with the hero text above it (negative margin) for depth. It's the closest thing this product has to a real product screenshot — it should read as evidence, not decoration.
- Card border-radius: vary it. Tighter radius on nested/inner elements, softer on outer containers — not one uniform value everywhere.

## Motion

- Baseline strength: near-best-case Core Web Vitals from a mostly-static page is the goal. Content stays Server Components; JS motion is the exception, not the norm.
- Allowed: CSS-only transitions on hover/focus/active states (already the pattern for buttons), `scroll-behavior: smooth`, the FAQ disclosure transition.
- GSAP + `@gsap/react` (`useGSAP` + `ScrollTrigger`) drives the motion identity, implemented in `src/components/landing/PageMotion.tsx` (hero + scroll) and `CapabilityMarquee.tsx` (ticker), all gated behind `prefers-reduced-motion: no-preference` (full static fallback when reduced motion is requested or JS is off). The data-attribute contract lives in PageMotion's header comment.
- Approved motion vocabulary (the "Signal" identity): hero title word-roll (per-word `data-hero-word` rise, no clipping), hero item fade-stagger, product-mock settle (tilt→flat), sparkline draw + KPI count-up, the road-to-dashboard route draw + travelling car (`data-road-bed` / `data-road-dash` / `data-road-car`), the capability marquee, the right-edge scroll-signal progress line (`data-scroll-signal`), and direction-aware section reveals (`data-reveal` + `data-reveal-dir`: up/left/right/zoom).
- Still not allowed: parallax, scroll-jacking/pinning, the old site's heavy choreography. Motion accents content; it never hides or gates it — every animated element has a visible static render before JS runs.

## Accessibility baseline

These are not one-off fixes from the review rounds — they are standing requirements for anything added to this site going forward:

- Every interactive element gets a visible `focus-visible` state. No exceptions for "it's just a stub."
- Text contrast meets WCAG AA (4.5:1 normal text, 3:1 large text) in both light and dark mode — verify against the actual rendered color, not the token name.
- Semantic landmarks: exactly one `<main>`, `<nav>` for navigation link clusters, correct heading hierarchy with no level skips.
- A skip-to-content link precedes all other focusable content.
- Any new section-level color-coding (like the schedule legend) must be distinguishable by contrast, not hue alone — check it, don't assume two named colors look different enough.

## Social proof

- No fabricated numbers, testimonials, or usage stats. The current stats strip (∞ branches / 2-minute student add / zero install) is honest specifically because it's true regardless of customer count — keep that discipline.
- Design the _slots_ now (a testimonial card pattern, a live-activity-style card pattern) so real data can drop in later without a redesign — but leave them unpopulated or absent until real data exists. An empty slot is better than a fake one.

## Out of scope for this document

- Copy/positioning — blocked on a separate decision (see `CLAUDE.md`, "Blocked on a decision"). This document governs how things look, not what they say.
- i18n routing, content-file structure, blog data handling — see `CLAUDE.md`.
- New pages (pricing, feature pages, FAQ) inherit this system; they don't get their own design language.
