# DESIGN.md — automaktab-web visual design system

Scope: visual/aesthetic decisions for automaktab.uz's marketing site. This is not an engineering or content-rules document — those live in `CLAUDE.md`. Where the two could overlap (accessibility baselines, motion), this document is the source of truth for *what the standard is*; `CLAUDE.md` covers *how the codebase enforces it*.

Direction: "Bold Operator" — adapted from ferryman.io (confident, high-contrast, minimal-color, product-forward), softened toward trust and restraint for a B2B buyer in a market where CRM adoption is still new. Not a literal copy of any reference site.

## Typography

- Display/heading font: **Manrope**, loaded via `next/font/google`. This is the CRM ecosystem's already-intended brand font (present in `@autodrive/design-tokens`'s dead `tailwind-preset.cjs`, never wired up — tracked as `autodrive-1r14`). Load it directly in this repo rather than waiting on the upstream fix.
  - **Before using it**: confirm Manrope's Google Fonts delivery includes a Cyrillic subset. Russian-locale pages are non-negotiable — if Cyrillic coverage is incomplete or degraded, do not ship it as the Cyrillic body/heading font; fall back to the system stack for `ru` until a font with verified full Cyrillic coverage is chosen.
- Body font: system stack (current behavior). No change — Manrope is for headings/display text, not paragraph copy.
- Headline weight: 700–800. Tight tracking (negative letter-spacing) at display sizes, matching the redesign checklist's "headlines lack presence" guidance.
- Numbers: tabular figures on any KPI/money value (already the convention in `DashboardMock` — keep it, extend it to any new numeric UI).

## Color & Surface

- Dark-mode-first stays. It is already built, reviewed, and tested (`.7`) — reversing it now would discard verified work for a preference, not a defect.
- **Cyan is the primary accent, used sparingly**: CTAs, the hero's accent word, and key numeric emphasis only. Do not apply it to eyebrows, small labels, or icon chips by default — that was correct for the "make three independently-built files consistent" fix, but is not the long-term rule. Sparse use is what makes an accent read as intentional rather than decorative.
- **Amber (`--primary` token) becomes a deliberate secondary accent**, not a mistake to route around. Use it for a genuinely secondary signal — a badge, a distinction between two categories where cyan is already the primary category's color (mirrors how the schedule vignette already needs two distinct hues). Do not use amber and cyan for the same kind of thing on the same screen; each needs a distinct role.
- Background: keep the current near-black (not pure `#000`) — already correct per the existing tokens.
- No new gradients, no glow effects beyond what already exists. Two colors, used with restraint, is the whole palette.

## Layout

- The five identical `eyebrow → h2 → sub → N-column equal card grid` section shells (Pain, Stats, How It Works, Benefits, Roles) are the strongest generic-template signal on the current page (audit finding #11). Not all five need to change — Benefits and Roles are simple enough that a clean grid is the right choice, not a compromise. Pain and Stats should move to an asymmetric/editorial treatment (unequal column widths, a dominant element instead of N equal cards).
- Features keeps its existing alternating left/right row pattern — it's already the one section that isn't a generic grid.
- `DashboardMock` moves from "flat card" toward "captured screenshot": a device-frame treatment, a more pronounced shadow, and slight overlap with the hero text above it (negative margin) for depth. It's the closest thing this product has to a real product screenshot — it should read as evidence, not decoration.
- Card border-radius: vary it. Tighter radius on nested/inner elements, softer on outer containers — not one uniform value everywhere.

## Motion

- Current state — zero client JS, zero animation library — is a deliberate strength (near-best-case Core Web Vitals for a self-serve-demo funnel) and stays the design baseline, not a gap to fill.
- Allowed: CSS-only transitions on hover/focus/active states (already the pattern for buttons), `scroll-behavior: smooth` (already added), the FAQ disclosure transition (already added).
- Not allowed without a separate, explicit decision: a JS animation library (GSAP or otherwise), scroll-triggered reveals, parallax. The old site's heavy GSAP choreography is not something this port inherits by default.

## Accessibility baseline

These are not one-off fixes from the review rounds — they are standing requirements for anything added to this site going forward:

- Every interactive element gets a visible `focus-visible` state. No exceptions for "it's just a stub."
- Text contrast meets WCAG AA (4.5:1 normal text, 3:1 large text) in both light and dark mode — verify against the actual rendered color, not the token name.
- Semantic landmarks: exactly one `<main>`, `<nav>` for navigation link clusters, correct heading hierarchy with no level skips.
- A skip-to-content link precedes all other focusable content.
- Any new section-level color-coding (like the schedule legend) must be distinguishable by contrast, not hue alone — check it, don't assume two named colors look different enough.

## Social proof

- No fabricated numbers, testimonials, or usage stats. The current stats strip (∞ branches / 2-minute student add / zero install) is honest specifically because it's true regardless of customer count — keep that discipline.
- Design the *slots* now (a testimonial card pattern, a live-activity-style card pattern) so real data can drop in later without a redesign — but leave them unpopulated or absent until real data exists. An empty slot is better than a fake one.

## Out of scope for this document

- Copy/positioning — blocked on a separate decision (see `CLAUDE.md`, "Blocked on a decision"). This document governs how things look, not what they say.
- i18n routing, content-file structure, blog data handling — see `CLAUDE.md`.
- New pages (pricing, feature pages, FAQ) inherit this system; they don't get their own design language.
