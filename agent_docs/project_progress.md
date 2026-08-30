# Project Progress

## Current status

**Phase: Phase 4 persistent shared Master Navigator; USER visual acceptance pending**

Repository:

`https://github.com/AltamashM7/qiskit-event-website`

Current verified main baseline:

`003d58e7d328fb539a5690b9e4fa86232e7eab0c`

Branch:

`phase-4/persistent-master-navigator`

PR #9 was accepted and squash-merged. The Phase 4 Draft PR is opened from the current branch after implementation.

PR #8 was accepted and squash-merged into `main`.

## Accepted / merged milestones

### Phase 0A1
- Astro static output.
- TypeScript/npm.
- no UI framework.
- canonical source/assets.

### Asset import
- approved Home backgrounds/box/cat assets.
- A/B/C retained for provenance.

### Phase 0A2
- Node 24.
- `SiteLayout` / `StageShell` / `MasterNavigator`.
- Playwright.
- Axe baseline.
- GitHub Actions.
- reduced motion.

### Home Composition V1
- accepted/merged.
- desktop/mobile Stage.
- generic event copy.
- box interaction.
- separate art-directed mobile composition.

### Layered background Phase A
- PR #7 accepted/merged.
- desktop base/overlay/eight wave masters + WebP deliveries.
- Sharp generator.

## Superseded

PR #6 A→B→C full-frame stepped animation:
- closed;
- unmerged;
- superseded.

## Merged desktop layered Home background

USER accepted:
- boundary illusion;
- final wave speed;
- population;
- overlap;
- depth;
- vertical occupancy;
- amplitude;
- broad ribbon;
- performance.

Current structure:
- 20 instances;
- wave 01/02 one each;
- wave 03–08 three each;
- thick cream full opacity;
- dominant ribbon approx 220%×500%, opacity .5, z0;
- 7.2–16.5s;
- 14.78–23.63 vw/s effective velocity;
- actual alpha/overlay hidden reset tests across four aspect ratios.

Wave system locked.

## Merged PR #8 box-motion correction

Previous application commit:

`007e1e74f4840afc4db393aef9db26c20ef80c4f`

`fix: strengthen box motion and phase reveal`

The previous application commit changed exactly four files relative to the documentation head:
- `src/components/home/SchrodingerBox.astro`
- `src/styles/home.css`
- `tests/e2e/home-composition.spec.ts`
- `tests/e2e/home-visual-preview.spec.ts`

No wave asset/component retuning occurred.

The subsequent USER normal-motion review found that the prior sparse eased float read as move/pause/direction-change phases and that its phase split felt too aggressive. The USER accepted the calmer 640ms reveal; the prior 13-keyframe float remained unresolved because it produced perceived variable-speed/stutter. This correction replaces only the idle float.

### Simple two-endpoint idle
- outer wrapper owns transform;
- 3.1s ease-in-out infinite alternate;
- lower endpoint `translate3d(0.04rem, -0.08rem, 0) rotate(-0.35deg)`;
- upper endpoint `translate3d(-0.04rem, -0.92rem, 0) rotate(0.45deg)`;
- exactly two authored spatial keyframes;
- transform-only.

### Calmer phase split — USER ACCEPTED / LOCKED
- inner state wrappers added;
- 640ms;
- cubic-bezier(0.22, 0.61, 0.36, 1);
- transform + opacity only;
- opposing ±0.65% displacement;
- closed leaving scale .995;
- reveal start scale 1.006;
- final reveal wrapper scale 1.

Reveal image calibration unchanged:
`translate(0.993070%, 1.680001%) scale(0.953033, 0.951307)`

### Reduced motion
- idle none;
- phase transforms none;
- 120ms linear opacity only.

### Interaction
Unchanged:
- hover/focus temporary reveal;
- click lock/unlock;
- keyboard;
- mobile tap;
- ARIA.

## Phase 3 mobile layered Home background — accepted and merged

Source branch:
`phase-3/home-mobile-layered-integration`

Implementation:
- portrait base `public/assets/home/mobile-layered/home-mobile-layered-base-v1.png`;
- transparent foreground overlay `public/assets/home/mobile-layered/home-mobile-layered-overlay-v1.png`;
- 44 mobile wave instances with all eight wave families represented;
- mobile durations halved with corresponding negative delays phase-preserved; approximately doubled speed;
- the original yellow/orange Wave 03 small-wave family is restored; all other active mobile wave visuals are white, using five mobile-only white variants plus shared white dashed deliveries;
- primary thick waves remain strongest, secondary thick waves use reduced opacity, the broad Wave 08 family retains lower atmospheric opacity, and smaller families use graduated opacity;
- thin/dashed small-wave families 03–06 are doubled from four to eight instances each, for 44 mobile instances total;
- mobile-specific percentage/container-relative positioning and depth order;
- the previous warm direction and subsequent blue/cyan experiment are superseded; opacity, scale, depth, count, overlap, and motion now provide mobile hierarchy;
- desktop layered wave behavior and accepted box idle/reveal behavior were not retuned.

Broad phone and PC visual review passed for speed, large-wave concentration, and the portrait composition. The previous warm/yellow-adjacent direction and subsequent blue/cyan experiment were rejected; the final yellow/orange Wave 03 small-wave family and QISKIT readability corrections were accepted. Frame A remains historical fallback/provenance rather than the active mobile layered background.

## Phase 4 persistent shared Master Navigator

- The reviewed Master Navigator visual design is accepted, including its paper/off-white rectangle, compact desktop strip, and current three-column mobile presentation.
- `SiteLayout` renders exactly one shared `MasterNavigator` per route at a fixed position near the existing desktop/mobile top gutter.
- Home, About Event, and About Quantum Mechanics no longer render Stage-owned Navigator copies; `StageShell` retains its generic navigation slot for future flexibility.
- Labels, routes, active state, keyboard behavior, skip-link behavior, and reduced-motion behavior remain unchanged.
- Home reserves the former Navigator row height so the accepted identity/copy/box composition footprint is preserved.
- Phase 4 implementation remains pending USER visual acceptance.

## Previous final-head verification

Actions:

`https://github.com/AltamashM7/qiskit-event-website/actions/runs/33186955589`

Exact tested head:
`007e1e74f4840afc4db393aef9db26c20ef80c4f`

Technical verification:
- success;
- 92 passed;
- 53 skipped;
- 0 failed;
- 0 Astro errors/warnings.

Cloudflare preview and visual QA:
- success.

Artifact:
- `home-visual-qa-pr-8`
- ID `9692181025`
- digest `sha256:35612c1623b6bdda8b2d503edc50643c4b5083c106b585fddbb8d3dd8dc3519b`

Immutable preview:
`https://0a1bd3fa.qiskit-event-website.pages.dev`

No production deployment.

## Remaining for Phase 4 acceptance

Only the Phase 4 exact-head CI/preview verification and subjective persistent-Navigator re-review remain:
- fixed desktop/mobile position and stable scroll behavior;
- Home initial composition footprint and overflow safety;
- exactly one Navigator with correct active state on all three routes;
- skip-link, keyboard, reduced-motion, and accepted Home visual non-regression.

Then:
- final exact-head Orchestrator recheck;
- explicit USER visual acceptance and merge approval;
- squash merge the Phase 4 PR;
- verify main;
- docs refresh.

## Not yet done

- final Home lower content;
- Master Navigator polish;
- About Event visuals;
- About Quantum Mechanics visuals;
- final event content;
- official branding;
- formal performance budgets;
- production hostname/release;
- final SEO/release QA.
