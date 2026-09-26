# automaktab.uz — Control Fold v2

`Control Fold` is the production-ready evolution of the supplied folded-ribbon mark. It keeps the recognisable upward fold, but aligns it with the current automaktab.uz brand system: calm control, one clear signal, and no decorative effects.

## Brand rationale

- The blue outer flow represents the system joining daily operations into one controllable view.
- The Ink centre is the control point: the moment fragmented information becomes a decision.
- The single lime point marks the beginning of the control loop. It is never decorative and is never repeated.
- The wordmark is always lowercase `automaktab.uz`. The entire wordmark is Ink so the lime point remains the only signal accent.
- The symbol is abstract. It must not be described or animated as a road, car, wing, speed mark, or generic growth chart.

The design follows the current [Brand markazi](https://app.notion.com/p/3cd9ee20429781deb49ce8d631206457), [brand strategy](https://app.notion.com/p/3cd9ee20429781cb9fe4ddc0f98d678f), [visual identity rules](https://app.notion.com/p/3cd9ee20429781378343daad69009d13), and [export guide](https://app.notion.com/p/3cd9ee204297816791cbd201de2709ef).

## Canonical tokens

| Role | Value |
| --- | --- |
| Control Ink | `#0B1720` |
| Field Paper | `#F5F7F2` |
| Signal Lime | `#C6FF3D` |
| System Blue | `#2F6BFF` |
| White | `#FFFFFF` |

## Master files

- `master/icon.svg` — primary flat colour mark.
- `master/icon-mono.svg` — one-colour mark using `currentColor`; the signal becomes a knockout.
- `master/icon-reverse.svg` — light mark for Ink backgrounds.
- `master/lockup-horizontal.svg` — primary outlined wordmark lockup.
- `master/lockup-stacked.svg` — centred, compact lockup.
- `master/*-reverse.svg` — reverse lockups for Ink backgrounds.

The wordmark is converted to vector paths, so the master lockups do not depend on an installed font. Page UI type is set in `DESIGN.md`: Outfit for Latin display, Manrope for reading text. These master files stay outlined paths.

## Minimum size and clear space

- Full-colour icon: `24 px` minimum.
- Mono/reverse icon: `16 px` minimum.
- Horizontal lockup: `180 px` minimum width.
- Stacked lockup: `120 px` minimum width.
- Keep at least one signal diameter of empty space around every lockup.

At 16 px, use the mono or reverse master. Do not force the two-colour fold into favicon-scale output.

## Usage rules

Do:

- keep the master geometry and exact tokens;
- use exactly one signal point;
- keep all critical geometry inside the Telegram safe circle;
- prefer Field Paper or Control Ink backgrounds;
- use the supplied reverse files rather than recolouring by eye.

Do not:

- add gradients, glows, bevels, blur, or drop shadows;
- colour `.uz` separately;
- move or duplicate the signal point;
- stretch, rotate, outline, or redraw the fold;
- add cars, steering wheels, roads, traffic lights, wings, or speed lines.

## Export naming

Final delivery files follow the brand convention:

`automaktab-[platform]-[topic]-v2.[format]`

The ready-to-use exports are in `exports/`. Source SVGs remain the authority; PNG files are generated derivatives.
