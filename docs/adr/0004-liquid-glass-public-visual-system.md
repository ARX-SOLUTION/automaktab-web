# Use liquid glass as the public visual system

The marketing site’s visual baseline is liquid glass. [ADR 0001](./0001-public-brand-and-control-center-direction.md) still governs the public name `automaktab.uz`, the story from operational disorder to a control center, real synthetic-demo proof, the immediate demo as the primary action, and the ban on unsupported claims. Its light editorial canvas, the ban on glass, and the ban on a single hero WebGL scene are superseded here.

Liquid glass is the material the page is built from. The hero is one slow liquid field. Navigation, proof frames, capability cards, objection panels, the introduction form, and shared article chrome are glass surfaces defined by tokens. A frosted rectangle added on top of the previous canvas is not this system.

The field is mineral ink `#08140F`. Reading text is paper `#F3F6EE`. Muted reading text is `#C5D1C2`. Signal Lime `#C6FF3D` remains the primary action and the control accent, with ink text `#102008` on the lime fill. Those pairs stay above the WCAG AA contrast bar for body text and large controls. System blue from the logo masters is not a second marketing accent. Logo SVG exports keep their own ink, paper, lime, and blue paths. This decision does not redraw them.

Glass has five tiers, all backed by the same refraction border and a dark translucent fill:

- `nav` is the sticky wordmark bar.
- `panel` is a content surface: capabilities, disorder, trial, FAQ, and article lists.
- `proof` is a heavier bezel around a real product screenshot. The screenshot stays opaque.
- `form` is the introduction dialog.
- `inset` is a small control that sits on the field, not inside another blurred surface.

Primary actions stay solid lime. Secondary actions use a glass shell. Nested `backdrop-filter` is avoided: a control inside an existing glass surface uses the border and fill only.

The hero liquid is one canvas. It starts after idle time, renders below the text and the call to action, pauses off-screen and in hidden tabs, and is removed on unmount. `prefers-reduced-motion`, save-data, and a missing WebGL context leave the static ink-and-lime gradient in place. Without JavaScript the same gradient and the full HTML story remain. The liquid is not a video, not a scroll-jacked scene, and not repeated down the page.

GSAP keeps two signature moments: the hero text and proof settle, and the desktop disorder stack. The hero settle does not fade the headline or the primary action to zero opacity, so the first paint can stay the LCP text. There is no second pinned section, no smooth-scroll replacement, and no site-wide decorative timeline.

Screenshot dimensions stay reserved. Lower proofs stay lazy. The canvas is not the LCP element. Production targets remain LCP ≤2.5s, INP ≤200ms, and CLS ≤0.1 at the 75th percentile.

Campaign video storyboards are a separate artifact. They are not the website visual system, and this decision does not reopen them.

This decision applies to `automaktab-web` only.
