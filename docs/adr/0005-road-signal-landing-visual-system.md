# Use the road-signal system as the public visual system

The marketing site’s visual baseline is the road-signal system: a driving-school road with stops, traffic lights, and signs. It supersedes the visual part of [ADR 0004](./0004-liquid-glass-public-visual-system.md). [ADR 0001](./0001-public-brand-and-control-center-direction.md) still governs the public name `automaktab.uz`, the story from operational disorder to a control center, real synthetic-demo proof, the immediate demo as the primary action, and the ban on unsupported claims.

The page alternates two grounds. Forest `#0B2B1F` carries the hero, the proof frame, and the final call to action, with white reading text. Sand `#F4EFE4` carries the working sections, with ink `#14211A` reading text and `#5A6660` muted text. Amber `#E8A317` is the only action and signal accent, with forest text on the amber fill. Sign green `#0E6B43` is reserved for the hero direction sign. These tokens live in `src/app/globals.css`; components use them instead of inventing new hues.

Type is Barlow Condensed for uppercase display headings, Barlow for body and controls, and JetBrains Mono for eyebrows, stop codes, and product figures. Fonts load through `next/font` in the locale layout.

The road motif carries the story: the hero sign lists the stops, the journey section is a stepper along one road, and the how-it-works steps are traffic lights. The motif is not repeated as decoration inside every card.

Copy stays short so the motif does not compete with text:

- A section title is at most eight words; a description at most twenty.
- A card has at most three bullets of about six words each.
- An eyebrow is at most four words, and not every section needs one.
- There are only two call-to-action wordings per locale: open the demo and request the trial.
- Badges and captions appear only when they carry a fact the title does not.

Screenshot dimensions stay reserved and lower proofs stay lazy. The hero proof loads eagerly. Production targets remain LCP ≤2.5s, INP ≤200ms, and CLS ≤0.1 at the 75th percentile.

This decision applies to `automaktab-web` only.
