# Current Scene Specification

## Status

This file records the current accepted Home Stage scene and persistent site-level Navigator boundary.

Current verified GitHub `main` at the start of Phase 5:

`dc9ccd5dc7cd8f940d40d35f578ae52d904b20bb`

Phase 5 implementation branch:

`phase-5/home-formal-content-system`

Desktop layered background, the 640ms reveal, the two-endpoint box float, the Phase 3 mobile layered composition, the restored Wave 03 accent, QISKIT readability backing, and the Phase 4 persistent shared Master Navigator are USER accepted and locked.

PR #9 and PR #10 are merged. No visual acceptance gate is currently open. The next implementation phase must not be chosen until the USER's newly received official website content and rules/guidelines are ingested and reconciled against the current architecture.

## Desktop Home composition

- Master Navigator top-center.
- Event identity/copy left.
- Schrödinger box right.
- Neutral/off-white field left.
- Electric-yellow probability field right.
- Irregular foreground neutral/boundary overlay above moving waves.
- Box visually participates in the split.

## Mobile Home composition

Mobile remains separately art-directed with:
- portrait layered base and transparent foreground overlay;
- responsive mobile wave instances reusing the shared approved wave deliveries;
- stacked navigation → identity/copy → box;
- no desktop base/overlay resource downloads.

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

“QISKIT” uses the matching paper-colored stroke/shadow backing so its black fill remains readable across the dark boundary.

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
- desktop wave instance layer hidden;
- mobile wave instance layer and mobile overlay shown;
- mobile base/overlay URLs selected;
- desktop base/overlay CSS URLs not fetched;
- shared white wave delivery URLs remain reused for families 05 and 06; six purposeful mobile-only white variants supply families 01, 02, 03, 04, 07, and 08.

Mobile base:

`public/assets/home/mobile-layered/home-mobile-layered-base-v1.png`

Mobile overlay:

`public/assets/home/mobile-layered/home-mobile-layered-overlay-v1.png`

The base and overlay are the same `841 × 1870` portrait composition and use responsive `cover` sizing within the Stage.

## Mobile layered probability field — Phase 3 / accepted and locked

- 44 mobile instances are configured independently from the accepted 20-instance desktop layout.
- Mobile wave durations are halved and corresponding negative delays are phase-preserved; the current duration range is approximately `4.05–7.8s`.
- All eight wave families remain represented: the original yellow/orange Wave 03 small-wave family is restored, while the other active mobile wave visuals remain white across thick, thin, dashed, halftone, and translucent ribbon families.
- Large/background mobile families 01, 02, and 08 retain their current presence; primary thick waves use full opacity, secondary thick waves use `0.72`, and the broad Wave 08 ribbon retains lower atmospheric opacity.
- Thin/dashed small-wave families 03–06 increase from four to eight instances each, with staggered portrait positions, delays, and graduated opacities.
- Broad ribbon and halftone instances use lower z-order underlayers; thick, thin, and dashed waves sit above them; the mobile foreground overlay is z-index `20`.
- Wave placement uses percentages and container-relative boundary references rather than phone-specific pixel coordinates.
- Motion remains CSS-only linear transform travel with per-instance phase offsets; reduced motion disables decorative wave animation while leaving the layered composition visible.

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

## Simple two-endpoint idle float correction — USER ACCEPTED / LOCKED

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

The 640ms phase-split reveal, simple two-endpoint 3.1s alternate box float, and desktop layered waves are USER accepted and locked.

The Phase 3 mobile layered composition is implemented and accepted. Broad phone and PC visual review passed, including the original yellow/orange Wave 03 small-wave family and QISKIT readability correction. Speed, large-wave concentration, and desktop behavior remain accepted. The exact Phase 3 result is merged into `main`.

## Persistent shared Master Navigator — USER ACCEPTED / LOCKED

- `SiteLayout` renders exactly one `MasterNavigator` per route.
- Home, About Event, and About Quantum Mechanics no longer render Stage-owned Navigator copies; `StageShell` retains its generic empty navigation slot for future flexibility.
- The Navigator keeps its current paper/off-white rectangle, compact desktop strip, three-column mobile presentation, labels, routes, active state, keyboard behavior, and reduced-motion behavior.
- It is fixed near the reviewed top-center desktop gutter and near the reviewed one-rem mobile gutter on portrait layouts, without scroll morphing or scroll listeners.
- Home reserves the former Navigator row height so the accepted identity/copy/box composition does not shift.

## Phase 5 formal-content implementation — acceptance pending

The Phase 5 branch adds a reusable formal-content layer below HomeStage without changing the accepted Home Stage or Master Navigator visual systems.

Implemented boundaries:
- typed static event content lives in `src/data/event.ts`;
- reusable structural primitives live in `src/components/formal/`;
- Home-specific composition lives in `src/components/home/HomeFormalContent.astro`;
- shared formal geometry lives in `src/styles/formal-system.css`;
- the current research-editorial cosmetic theme lives in `src/styles/formal-theme-research.css` and is selected with `data-formal-theme="research-editorial"`;
- Home uses the page accent token `--formal-accent: #ffe51a`.

Home formal order is fixed as Event Snapshot → About the Event → What You'll Do → Program Preview → Speakers Preview → Organizers & Registration → Site Footer. The review build uses the exact dummy content from the Phase 5 brief and the placeholder registration destination `https://example.com/registration`.

The target navigation is Home (`/`), Schedule (`/schedule/`), and Speakers (`/speakers/`). The legacy About Event and About Quantum Mechanics route files are removed; Schedule and Speakers are neutral technical shells only.

No new formal visual assets were added, and existing accepted Home hero assets remain untouched. Draft PR #14 is open at `https://github.com/AltamashM7/qiskit-event-website/pull/14` with implementation head `d676deda2921d0ee4c72a31536c6d9c09a854ee4`. Actions run `33833826312` passed both Technical verification and Cloudflare preview/visual QA. The immutable preview is `https://85465dca.qiskit-event-website.pages.dev`, the PR alias is `https://pr-14.qiskit-event-website.pages.dev`, and artifact `home-visual-qa-pr-14` (ID `9922730351`, digest `sha256:5dc0f10c897d327e7bb0d59b49f63c0919d4de9d32a84317b5f5dfa05c876ead`) contains the nine expected screenshots. Phase 5 remains pending Web Orchestrator audit and USER visual acceptance.
