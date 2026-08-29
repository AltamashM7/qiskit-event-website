# Current Scene Specification

## Status

This file records the current Home Stage scene on PR #8.

Desktop layered-background visuals are USER accepted.

The prior Schrödinger-box stronger idle motion and phase-split reveal were implemented and technically verified at the previous application head:

`007e1e74f4840afc4db393aef9db26c20ef80c4f`

The prior normal-motion review found two bounded issues: the float read as move/pause/direction-change phases, and the phase split felt too aggressive. The USER accepted the calmer 640ms reveal; the prior 13-keyframe float remained unresolved because it produced perceived variable-speed/stutter. The correction below replaces only the idle float; renewed USER normal-motion acceptance of that float remains pending.

## Desktop Home composition

- Master Navigator top-center.
- Event identity/copy left.
- Schrödinger box right.
- Neutral/off-white field left.
- Electric-yellow probability field right.
- Irregular foreground neutral/boundary overlay above moving waves.
- Box visually participates in the split.

## Mobile Home composition

Mobile remains separately art-directed:
- Frame A background;
- stacked navigation → identity/copy → box;
- no desktop layered resource downloads.

## Current identity copy

Kicker:
`QUANTUM / EVENT`

Title:
`QISKIT EVENT`

Lede:
`Explore quantum computing through ideas, interaction, and experimentation.`

This is generic provisional copy, not confirmed event information.

## Typography

Local title font:

`public/fonts/archivo-black/archivo-black-latin.woff2`

Desktop:
- `clamp(4rem, 8.2vw, 7.5rem)`
- line-height `0.98`

Mobile:
- `clamp(3.4rem, 16.5vw, 6.5rem)`
- line-height `0.88`

“EVENT” uses yellow fill with dark stroke/shadow.

## Desktop layered background — LOCKED

Component:

`src/components/home/HomeLayeredBackground.astro`

Styles:

`src/styles/home.css`

Focused tests:

`tests/e2e/home-layered-background.spec.ts`

### Base

`public/assets/home/background/layered/web/desktop/base/home-probability-field-base-desktop.webp`

Dimensions:
`1672 × 941`

Behavior:
- cover;
- centered;
- approximate scale `1.04`.

### Foreground overlay

`public/assets/home/background/layered/web/desktop/overlay/home-probability-field-overlay-desktop.webp`

Contains real alpha.

Purpose:
- restore neutral foreground;
- create irregular boundary;
- conceal wave resets.

Background-stack z-index:
`20`

Do not replace with a straight flat mask.

## Wave assets

Under:

`public/assets/home/background/layered/web/desktop/waves/`

Families:
1. `wave-01-thick-cream-upper.webp`
2. `wave-02-thick-cream-lower.webp`
3. `wave-03-thin-yellow.webp`
4. `wave-04-thin-ivory.webp`
5. `wave-05-dashed-white-upper.webp`
6. `wave-06-dashed-white-lower.webp`
7. `wave-07-halftone-yellow-band.webp`
8. `wave-08-translucent-cream-ribbon.webp`

## Wave instance counts

Total:
`20`

Counts:
- 01: 1
- 02: 1
- 03: 3
- 04: 3
- 05: 3
- 06: 3
- 07: 3
- 08: 3

Thick cream waves:
`opacity: 1`

## Wave depth

Bottom → top:

dominant translucent ribbon
→ other broad ribbon/halftone underlayers
→ thick cream waves
→ thin yellow/ivory
→ dashed crossing waves
→ foreground boundary overlay

Larger/broader waves remain behind smaller/sharper waves.

## Dominant ribbon

Primary wave-08:
- width approx `220%`;
- height approx `500%`;
- top approx `-205%`;
- opacity `0.5`;
- z-index `0`.

“Broad” is intentionally vertical.

## Wave amplitude / occupancy

Accepted:
- stronger crest/trough amplitude;
- upper/middle/lower distribution;
- enough simultaneous yellow-field occupancy;
- intentional overlap.

Do not collapse the composition back toward the central band.

## Wave motion

- CSS only.
- left → right.
- two-keyframe horizontal `translate3d`.
- `linear`.
- infinite.
- independent durations/delays.
- no animated rotation.
- no animated scale.
- no vertical drift animation.
- no opacity animation.

Duration range:
`7.2–16.5s`

Tested effective velocity:
`14.78–23.63 vw/s`

Broad underlayers slower; thin/dashed crossings faster.

## Boundary emergence

Required lifecycle:

reset hidden beneath neutral overlay
→ painted wave emerges through irregular seam
→ crosses yellow field
→ exits right
→ reset hidden again

Do not allow visible pop-in inside yellow.

Tests use real alpha geometry:
- wave threshold `>=16`;
- overlay opaque threshold `>=250`;
- safety fraction `0.02`.

Representative viewports:
- `1024×768`
- `1280×720`
- `1440×900`
- `1920×1080`

## Mobile resource isolation

Below `48rem`:
- desktop wave layers hidden;
- overlay hidden;
- desktop layered CSS URLs not fetched;
- Frame A selected.

Frame A:

`public/assets/home/background/home-probability-field-frame-a-v1.png`

Current mobile object-position:

`55% center`

## Schrödinger box placement

Desktop:
- right side;
- width `clamp(19rem, 32vw, 31rem)`;
- max-width `43vw`.

Mobile:
- stacked relative placement;
- about `min(66vw, 18rem)`.

## Box assets

Closed:

`public/assets/home/schrodinger/box-closed-v1.png`

Reveal:

`public/assets/home/schrodinger/box-reveal-v1.png`

Reveal asset contains approved adjusted split cat.

## Reveal calibration — LOCKED

Authored CSS:

`translate(0.993070%, 1.680001%) scale(0.953033, 0.951307)`

Browser test serialization:

`translate(0.99307%, 1.68%) scale(0.953033, 0.951307)`

These represent the same authored calibration.

Do not move this calibration to an animated wrapper.

## Current box markup architecture

`button.schrodinger-box`
- owns idle animation.

`span.schrodinger-box__art`
- fixed art container.

`span.schrodinger-box__state--closed`
- closed state transition wrapper.

`span.schrodinger-box__state--reveal`
- reveal state transition wrapper.

Actual images:
- own fixed artwork geometry;
- reveal image retains fixed calibration.

## Simple two-endpoint idle float correction — IMPLEMENTED / USER QA PENDING

Animation:

`home-box-float 3.1s ease-in-out infinite alternate`

Keyframes:
- 0% lower endpoint: `translate3d(0.04rem, -0.08rem, 0) rotate(-0.35deg)`
- 100% upper endpoint: `translate3d(-0.04rem, -0.92rem, 0) rotate(0.45deg)`

Only transform is animated.

Intent:
- one smooth upward trip and the same path downward through `alternate`;
- vertical movement remains dominant;
- horizontal drift and rotation remain subtle;
- no intermediate spatial keyframes or multi-direction path.

## Calmer phase-split reveal correction — IMPLEMENTED / USER ACCEPTED / LOCKED

The USER accepted this calmer 640ms reveal. Preserve it while the new idle float is reviewed.

State wrappers transition:

`transform 640ms cubic-bezier(0.22, 0.61, 0.36, 1)`

`opacity 640ms cubic-bezier(0.22, 0.61, 0.36, 1)`

Closed normal:
- opacity 1;
- `translate3d(0, 0, 0) scale(1)`.

Closed revealed/leaving:
- opacity 0;
- `translate3d(-0.65%, 0.65%, 0) scale(0.995)`.

Reveal hidden/start:
- opacity 0;
- `translate3d(0.65%, -0.65%, 0) scale(1.006)`.

Reveal final:
- opacity 1;
- `translate3d(0, 0, 0) scale(1)`.

Animated properties are only:
- transform;
- opacity.

No heavy visual effect system exists.

## Interaction state machine

Script:

`src/scripts/schrodinger-box.ts`

The box-motion commit did not modify this file.

Fine pointer:
- pointer enter → temporary reveal;
- pointer leave → remove temporary hover reveal unless locked/focused.

Focus:
- focus in → reveal;
- focus out → remove temporary focus reveal unless another state keeps it.

Click:
- toggles lock.
- `aria-pressed` mirrors lock state.

Coarse pointer:
- tap/click toggles locked reveal.

## No-jump regression guard

`tests/e2e/home-composition.spec.ts` compares the box button bounding geometry before and after focus reveal.

Closed/revealed outer wrapper geometry must remain exactly equal.

The phase motion happens inside fixed wrappers, while the outer idle animation remains independent.

## Reduced motion

Under `prefers-reduced-motion: reduce`:
- wave animation disabled;
- box idle animation disabled;
- state transform displacement disabled;
- state wrappers transition only opacity for `120ms linear`.

## Visual acceptance ledger

USER accepted desktop background:
- boundary illusion;
- wave speed;
- population;
- overlap;
- depth;
- broad ribbon;
- amplitude;
- vertical occupancy;
- performance.

Implemented and awaiting final-head verification plus USER visual acceptance of the idle float:
- simple two-endpoint 3.1s alternate box float;
- subjective naturalness;
- perceived performance during normal motion.

The 640ms phase-split reveal is USER accepted and locked. Desktop layered waves remain USER accepted and locked.

The exact-head preview for this correction must be re-read from the final GitHub Actions run before USER review.
