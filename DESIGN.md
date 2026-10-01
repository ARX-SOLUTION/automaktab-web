---
name: AutoMaktab
description: Calm, approachable school control on light surfaces
colors:
  signal-lime: "#C6FF3D"
  ink: "#0B1720"
  paper: "#F5F7F2"
  white: "#FFFFFF"
  slate: "#52606D"
  body: "#374954"
  system-blue: "#2F6BFF"
  blue-text: "#2458D9"
  border: "#DDE4D9"
  error: "#B3301A"
typography:
  display:
    fontFamily: "Nunito, sans-serif"
    fontSize: "clamp(36px, 3.8vw, 54px)"
    fontWeight: 900
    lineHeight: 1.08
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Nunito, sans-serif"
    fontSize: "clamp(30px, 3.5vw, 46px)"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
  control:
    fontFamily: "Manrope, sans-serif"
    fontSize: "16px"
    fontWeight: 700
  caption:
    fontFamily: "Manrope, sans-serif"
    fontSize: "11px"
    fontWeight: 700
  mono:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "12px"
    fontWeight: 500
rounded:
  field: "10px"
  control: "14px"
  scene: "16px"
  role-tab: "18px"
  panel: "24px"
spacing:
  cluster: "8px"
  control-inline: "20px"
  gutter: "24px"
  section: "clamp(56px, 7vw, 104px)"
components:
  button-primary:
    backgroundColor: "{colors.signal-lime}"
    textColor: "{colors.ink}"
    typography: "{typography.control}"
    rounded: "{rounded.control}"
    padding: "12px 20px"
  button-secondary:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    typography: "{typography.control}"
    rounded: "{rounded.control}"
    padding: "12px 20px"
  role-tab:
    backgroundColor: "{colors.signal-lime}"
    textColor: "{colors.ink}"
    rounded: "{rounded.role-tab}"
    padding: "8px 20px"
  field:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "0 14px"
    height: "50px"
  example-scene:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.scene}"
    padding: "clamp(20px, 3vw, 32px)"
---

# Design System: AutoMaktab

## Overview

**Creative North Star: "Clear school control"**

The user-directed public system combines Duolingo-inspired rounded typography and tactile controls with Notion's verified brand palette. It replaces the earlier glass and road-signal visual directions. The presentation stays calm and outcome-oriented: clear hierarchy, generous space and concrete school workflows.

**Key Characteristics:**
- White and Paper surfaces with Ink text.
- One Signal Lime action accent; blue marks relationships and secondary states.
- Authored HTML/SVG examples with explicit synthetic-data labels.

## Colors

Signal Lime identifies primary actions and selected roles. Ink carries hierarchy; Slate and Body support longer reading. System Blue is an accent for vector routes and icons; Blue Text is the darker readable text variant. Existing success, warning and error colors retain their semantic jobs. Normal text uses at least 4.5:1 contrast.

## Typography

Nunito carries display and section headings; Manrope carries body copy and controls. Both include Latin and Cyrillic through `next/font`. JetBrains Mono is reserved for data and identifiers. Body copy varies from 16–19px with 1.55–1.7 line height. Headings wrap at words and use balanced lines.

## Layout

Content is bounded to 1240px with 16–24px gutters. Sections use the documented fluid spacing. The hero stacks below 1280px, with actions before the diagram; at wider sizes it shares a two-column grid with the diagram. Other content uses its existing 640/768/1024px responsive steps. Let text and native controls determine height.

## Elevation & Depth

Controls use soft offset shadows and stable thick borders. Press feedback translates the control and reduces its shadow without changing border dimensions. Product examples use an ambient proof shadow or a Paper surface; depth does not use gradients or glass. Exact shadows and motion are recorded in the sidecar.

## Shapes

Controls have gently rounded corners. Fields use the smaller field radius, scenes the middle radius, role tabs the larger control radius and broad panels the panel radius. Synthetic labels are small neutral tags. The consolidation diagram has three sources and one continuous platform frame containing its module rows. Its user-requested automatic sequence activates the sources, traces packets into the platform and confirms the outcomes, then holds quietly before replaying. Text stays visible; hover, keyboard focus, offscreen and hidden-document states pause it, while reduced motion shows the complete static diagram. Lead stages, vehicle maintenance and lessons with internal tests use separate authored proofs; expense, branch and planned work remain compact support. The footer extends the convergence into geometric road linework and a large Nunito wordmark.

## Components

Primary controls have Lime fill and Ink text; secondary controls keep the light surface. Both provide visible focus and at least 44px targets. Fields retain labels, linked errors and native input behavior.

Student and role narratives pair readable chapters with one sticky preview at 1024px or wider and 800px or taller. GSAP ScrollTrigger advances every stage in both directions and traces the reading rail; optional tabs have roving keyboard focus and retain their selection while focused. Controller readiness gates this enhancement. Phones, short screens, reduced motion and no JavaScript show complete native sequential examples. Sample scenes use finite scoped GSAP sequences, pause outside the viewport or on hidden documents, and revert fully when reduced motion changes. Their complete text and data render statically. Keep these scene decisions scoped to the public landing brief.

## Do's and Don'ts

- **Do** keep the neutral surface dominant and reserve Lime for an action or meaningful state.
- **Do** preserve word wrapping, keyboard focus, localized labels and complete static examples.
- **Do** use authored SVG geometry to explain real product relationships.
- **Don't** render CRM captures on this public landing or imply that synthetic examples are live records.
- **Don't** add gradients, stock decoration, autoplay loops, scroll jacking or new integrations without a new brief.
- **Don't** turn legacy glyphs or redundant category eyebrows into reusable design primitives.
