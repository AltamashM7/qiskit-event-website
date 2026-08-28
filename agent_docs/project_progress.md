# Project Progress

## Current status

**Phase: Draft PR #8 technically complete; final USER visual QA of box motion pending**

Repository:

`https://github.com/AltamashM7/qiskit-event-website`

Main baseline before PR #8:

`67f3094599dbd7af6fd1772e486ff250677d5e22`

Branch:

`phase-2/home-layered-background-integration`

PR:

`https://github.com/AltamashM7/qiskit-event-website/pull/8`

Current application head before this documentation refresh:

`007e1e74f4840afc4db393aef9db26c20ef80c4f`

PR #8 remains Draft/open/unmerged.

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
- Frame A mobile.

### Layered background Phase A
- PR #7 accepted/merged.
- desktop base/overlay/eight wave masters + WebP deliveries.
- Sharp generator.

## Superseded

PR #6 A→B→C full-frame stepped animation:
- closed;
- unmerged;
- superseded.

## PR #8 layered desktop background

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

## PR #8 box-motion refinement

Commit:

`007e1e74f4840afc4db393aef9db26c20ef80c4f`

`fix: strengthen box motion and phase reveal`

Changed exactly four files relative to the documentation head:
- `src/components/home/SchrodingerBox.astro`
- `src/styles/home.css`
- `tests/e2e/home-composition.spec.ts`
- `tests/e2e/home-visual-preview.spec.ts`

No wave asset/component retuning.

### Idle
- outer wrapper owns transform;
- 5.9s ease-in-out;
- high point -0.95rem;
- horizontal drift ±~0.14rem;
- rotation -0.55deg to +0.70deg;
- transform-only.

### Phase split
- inner state wrappers added;
- 360ms;
- cubic-bezier(0.22, 0.8, 0.26, 1);
- transform + opacity only;
- small opposing ±1.25% displacement;
- closed leaving scale .99;
- reveal start scale 1.012;
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

## Final-head verification

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

## Remaining before PR #8 merge

Only subjective live normal-motion QA:
- float visibility/naturalness;
- phase-split quality;
- no perceived jump;
- performance;
- wave non-regression.

Then:
- final exact-head Orchestrator recheck;
- explicit USER merge approval;
- squash merge;
- verify main;
- docs refresh.

## Not yet done

- mobile layered art/integration;
- final Home lower content;
- Master Navigator polish;
- About Event visuals;
- About Quantum Mechanics visuals;
- final event content;
- official branding;
- formal performance budgets;
- production hostname/release;
- final SEO/release QA.
