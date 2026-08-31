# UI/UX audit research — primary-source findings

Answers to three web-platform questions, verified against primary sources (CSSWG spec, MDN, WHATWG HTML spec, GSAP official docs/skills). No blog or AI-derived summaries used.

---

## 1. `text-wrap: balance` + per-word `inline-block` spans

### Answer

`text-wrap: balance` (longhand `text-wrap-style: balance`) balances **existing** line boxes and **does account for inline content**, so it can redistribute per-word `inline-block` spans. Two hard limits:

- It **does not create** soft-wrap opportunities — it only *chooses among* the ones already present (MDN: "The values have no effect on where a soft wrap opportunity exists, just how the browser selects among them"). So if you put each word in an `inline-block` with **no breakable space between them** (concatenated, or separated by `&nbsp;`), there is nothing to break at and neither wrapping nor balancing happens. You must keep real breakable whitespace between the word spans.
- It only operates on a **small block**: Chromium supports it for ≤6 lines, Firefox ≤10 (MDN), and the spec says it must **not change the line count** for 5 or fewer lines.

The deciding constraint is GSAP's own guidance: **"Avoid `text-wrap: balance`; it can interfere with splitting"** (official GSAP `gsap-plugins` skill). Splitting a heading into per-word animated elements is exactly GSAP's SplitText workflow (`type: "words"`), so combining that with CSS `text-wrap: balance` on the same element is explicitly discouraged.

**Correct way to do both (a) and (b):**
- **(a) Animate each word individually (transform-based):** split with GSAP `SplitText.create(el, { type: "words" })`. Each word becomes an `inline-block`-style unit you can transform (`y`, `rotation`, `scale`, `opacity`/`autoAlpha`), with `stagger`. Keep a real space between word units so wrapping and line breaks still happen.
- **(b) Get balanced/clean wrapping:** *don't* stack `text-wrap: balance` on the split heading. Instead pick one:
  1. If it's a **static** heading (not animated per-word), apply `text-wrap: balance` to the unsplit single text run (best for 2–4 lines).
  2. If it **is** split per-word, control the break length yourself (container `max-width` / manual `<br>`), or split `type: "lines"` and animate line-level reveals, and let SplitText manage wrapping. Use `smartWrap: true` only when splitting chars-only.

### Source
- CSSWG CSS Text 4 § `text-wrap-style`: https://drafts.csswg.org/css-text-4/#valdef-text-wrap-style-balance (also `#text-wrap-style`)
- MDN `text-wrap-style`: https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap-style
- GSAP official `gsap-skills` → `gsap-plugins/SKILL.md` (SplitText section, "Avoid `text-wrap: balance`"): https://github.com/greensock/gsap-skills/blob/main/skills/gsap-plugins/SKILL.md
- SplitText docs: https://gsap.com/docs/v3/Plugins/SplitText/

### Implication for automaktab-web
Hero/display headings animated word-by-word should **not** also get `text-wrap: balance`. Either keep the h1 as an unsplit single run and add `text-wrap: balance` (a clean static hero heading), or split words with SplitText and control the line length via `max-width`/manual breaks. Never separate word spans with `&nbsp;` — use a normal space so the browser can still wrap.

---

## 2. Guaranteeing content is never invisible with GSAP `ScrollTrigger` reveal

### Answer

The failure mode with `gsap.from(el, { opacity: 0, scrollTrigger: { once: true } })` is `immediateRender`. For `from()`/`fromTo()` tweens `immediateRender` defaults to **true**, so the hidden `opacity: 0` start state is applied **the moment the tween is created** (GSAP core skill: "the initial values in the tween will be applied immediately unless `immediateRender: false`"). If the trigger never fires (below-the-fold section never scrolled to, or a crawler/headless screenshot that never scrolls), the element stays invisible.

**GSAP-recommended pattern:**
1. **Hide in JS, never in CSS** (progressive enhancement). Because `from()` applies the start state at runtime, content is fully visible with no JS, in pre-rendered HTML, to crawlers, and to screenshot tools. Don't put `opacity: 0` in your stylesheet.
2. **Animate into the natural visible state** (need a start value that's the real end state). Prefer `autoAlpha` over `opacity` for fades (also hides via `visibility`, so invisible elements don't block clicks).
3. **`start` (default `"top bottom"`)** fires as soon as the section enters the viewport, so reveals trigger on normal scroll. Use `clamp()` around `start`/`end` (v3.12+) so bottom-of-page triggers don't leak past the scroll bounds.
4. **`once: true`** kills the ScrollTrigger after it fires once and sets `toggleActions` to `"play none none none"`, so the animation plays forward and **never reverses back to hidden** after being shown.
5. **`gsap.matchMedia()` + `(prefers-reduced-motion: reduce)`**: wrap the reveal in `gsap.matchMedia()`; when reduced motion is active use `duration: 0` or skip the animation entirely, leaving content at its natural visible state. `matchMedia` also auto-reverts tweens/ScrollTriggers it created when the query stops matching.
6. **Close the "JS runs but scroll never happens" hole** on critical content: set `immediateRender: false` so content stays visible until the exact moment it animates in (tradeoff: a brief moment of full visibility before the fade), **or** don't start critical content from `opacity`/`autoAlpha: 0` and reveal it unconditionally on load.

### Source
- GSAP ScrollTrigger docs (`start`, `once`, `toggleActions`): https://gsap.com/docs/v3/Plugins/ScrollTrigger/ (anchors `#start`, `#once`, `#toggleActions`)
- GSAP `gsap.matchMedia()` docs: https://gsap.com/docs/v3/GSAP/gsap.matchMedia()
- GSAP core skill (`immediateRender`, `autoAlpha`, `prefers-reduced-motion` via `matchMedia`): https://github.com/greensock/gsap-skills/blob/main/skills/gsap-core/SKILL.md

### Implication for automaktab-web
For the demo-request landing page, never hide the form or key sections in CSS. Reveal below-the-fold sections via `gsap.matchMedia()` gated on `prefers-reduced-motion`, use `once: true` + default `start`, and on the request form itself (must always be reachable/visible) avoid starting from `opacity: 0` — reveal it unconditionally so a JS-run-but-never-scrolled viewer or a screenshot still sees it.

---

## 3. `autocomplete` tokens for the demo-request form

### Answer

Per the WHATWG HTML spec **autofill field names** table:

| Field | Token | Specification source meaning |
| --- | --- | --- |
| Full name | `name` | "Full name"; free-form text, no newlines; control group **Text**. Use the single broad field (spec explicitly encourages broader fields over `given-name`/`family-name` to avoid Western-name bias). |
| Telephone (+998) | `tel` | "Full telephone number, including country code"; canonical format `+`+digits+spaces (e.g. `+998 90 123 45 67`). Use `type="tel"`/`inputmode="tel"`. Prefer the broad `tel`; split fields (`tel-country-code`=+998, `tel-national`) are the narrowed alternative the spec says to avoid unless separate inputs are required. |
| Region / city | `address-level1` (region/viloyat) + `address-level2` (city/shahar/tuman) | `address-level1` = "broadest administrative level … the province within which the locality is found" (state/canton/region). `address-level2` = "the second administrative level … the city, town, village, or other locality". Both are **Text**. Add `country` (ISO 3166-1-alpha-2, e.g. `UZ`) if the country must be captured. |
| Organization / company | `organization` | "Company name corresponding to the person, address, or contact information in the other fields associated with this field"; **Text**. |

These names are from the spec's "Autofill detail tokens" list and each field's table row (its "Control group" column determines which controls it's appropriate for — all four above are **Text**).

### Source
- WHATWG HTML standard, Autofill (the `autocomplete` attribute + autofill field-name table): https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill (field-name list at `#autofill-detail-tokens`)

### Implication for automaktab-web
Mark the demo-request inputs so browsers autofill correctly for Uzbekistan: full name → `name`; phone → `tel` (single field, `type="tel"`/`inputmode="tel"`), not split country-code; region → `address-level1`, city → `address-level2`; company → `organization`. Skip the narrowed `given-name`/`family-name` and `tel-country-code`+`tel-national` splits — the spec advises the broad tokens.
