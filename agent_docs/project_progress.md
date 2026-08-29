# Project Progress

## Current status

**Phase: Phase 3 mobile layered Home background speed/concentration correction; final-head verification and USER re-review pending**

Repository:

`https://github.com/AltamashM7/qiskit-event-website`

Current verified main baseline:

`6f515d7ffd238519b9b44117942316874469142e`

Branch:

`phase-3/home-mobile-layered-integration`

PR: [Draft PR #9](https://github.com/AltamashM7/qiskit-event-website/pull/9).

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

## Phase 3 mobile layered Home background

Current branch:
`phase-3/home-mobile-layered-integration`

Implementation:
- portrait base `public/assets/home/mobile-layered/home-mobile-layered-base-v1.png`;
- transparent foreground overlay `public/assets/home/mobile-layered/home-mobile-layered-overlay-v1.png`;
- 28 mobile wave instances with all eight shared wave families represented;
- mobile durations halved with corresponding negative delays phase-preserved; approximately doubled speed;
- mobile-specific percentage/container-relative positioning and depth order;
- no duplicated mobile wave binaries;
- desktop layered wave behavior and accepted box idle/reveal behavior were not retuned.

USER mobile QA passed all aspects except initial wave speed/population. The current correction doubles mobile speed and increases the population from 14 to 28; final-head CI/preview verification and USER re-review remain pending across the existing portrait variants. Frame A remains historical fallback/provenance rather than the active mobile layered background on this branch.

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

## Remaining for Phase 3 acceptance

Only the current Phase 3 correction verification and subjective mobile re-review remain:
- mobile wave density, portrait balance, and boundary emergence;
- normal/compact/short/tall portrait layout safety;
- reduced-motion composition and performance;
- desktop non-regression.

Then:
- final exact-head Orchestrator recheck;
- explicit USER merge approval;
- squash merge the Phase 3 PR;
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
