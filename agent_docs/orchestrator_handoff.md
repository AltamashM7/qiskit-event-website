# Web Orchestrator Handoff

## Purpose

This is the primary restart document for a fresh Web ChatGPT Orchestrator session.

The previous long Orchestrator conversation can be retired. A new Orchestrator should continue from live GitHub state plus these durable documents, not from assumed conversation memory.

Always re-read GitHub before mutation. This file records the project state as of 2026-08-29.

## Mandatory read order

1. `AGENTS.md`
2. `agent_docs/orchestrator_handoff.md`
3. `agent_docs/current_scene.md`
4. `agent_docs/next_steps.md`
5. `agent_docs/roadmap.md`
6. `agent_docs/decisions.md`
7. `agent_docs/design_system.md`
8. `agent_docs/project_progress.md`
9. `agent_docs/latest_session_work.md`
10. `ASSET_REGISTRY.md`
11. `agent_docs/workflow/orchestrator_builder.md`

Then inspect the live PR, branch head, changed files, tests, Actions run, artifact, and preview before taking action.

## Repository / authoritative state

Repository:

`https://github.com/AltamashM7/qiskit-event-website`

Default branch:

`main`

Current verified main baseline:

`6f515d7ffd238519b9b44117942316874469142e`

Current branch:

`phase-3/home-mobile-layered-integration`

A new Draft PR for the Phase 3 branch is opened after the implementation commit; re-read the live PR URL/head from GitHub.

PR #8 was accepted and squash-merged into `main`.

Never merge without explicit USER authorization.

## Current milestone state

Accepted and merged into `main`:
- Phase 0A1 Astro/static scaffold.
- Approved Home asset import.
- Phase 0A2 reusable technical foundation.
- Home Composition V1.
- Home background B/C continuation assets for provenance.
- Phase A layered Home background asset foundation (PR #7).

Superseded:
- PR #6 full-frame A→B→C stepped background animation.
- PR #6 is closed/unmerged and must not be revived unless the architecture decision is deliberately reopened.

Current:
- the accepted desktop layered Home probability field, 640ms reveal, and two-endpoint box float are locked from merged PR #8;
- the Phase 3 branch integrates the USER-created/verified portrait mobile base and transparent overlay;
- mobile uses its own responsive 14-instance wave configuration while reusing the eight shared wave deliveries;
- final-head CI/preview verification and USER visual QA for the mobile composition remain pending.

## Product intent

This is a new Qiskit event website.

Target character:

**expressive game-menu energy + artistic scene composition + clear information design + carefully controlled performance**

Avoid:
- conventional university-event template styling;
- generic futuristic HUDs;
- glossy sci-fi UI;
- realistic 3D environments;
- excessive animation technology for its own sake.

The 2025 site at `https://qiskit.cs.uwindsor.ca/` is an information/content-architecture reference only.

Initial routes:
- Home
- About Event
- About Quantum Mechanics

Final event facts are not confirmed. Do not invent:
- dates;
- venue;
- speakers;
- sponsors;
- registration details;
- official branding requirements.

## Technical architecture

Current stack:
- Astro static output.
- TypeScript.
- npm.
- Node 24 LTS (`>=24 <25`).
- Semantic HTML + CSS + minimal native JavaScript.
- No React/Vue/Svelte.
- No Tailwind.
- No GSAP.
- No UI framework.
- Playwright Chromium.
- Axe serious/critical accessibility baseline.
- Sharp `0.35.3` dev-only for asset generation/test image analysis.
- GitHub Actions.
- Cloudflare Pages Direct Upload for PR previews.
- No Cloudflare Git integration.
- No production deployment yet.

Core boundaries:
- `SiteLayout`
- `StageShell`
- `MasterNavigator`
- `HomeStage`
- `HomeLayeredBackground`
- `SchrodingerBox`

## Home desktop background — USER accepted / LOCKED

At application head `25cf7117e0f44da99534d9372a85f25291325034`, the USER explicitly passed all desktop layered-background visual checks.

Accepted:
- boundary illusion;
- waves emerge through the irregular boundary;
- wave speed;
- occupancy/population;
- overlap;
- bigger waves behind smaller waves;
- vertical occupancy;
- crest/trough amplitude;
- dominant broad ribbon;
- performance.

No later application commit modified the wave implementation. The box-motion commit `007e1e…` changed only:
- `src/components/home/SchrodingerBox.astro`
- box-related portions of `src/styles/home.css`
- `tests/e2e/home-composition.spec.ts`
- `tests/e2e/home-visual-preview.spec.ts`

Do not reopen accepted desktop wave tuning during the Phase 3 mobile review unless an objective regression is observed.

See `agent_docs/current_scene.md` for exact wave mechanics.

## Home mobile

Mobile is separately art-directed from desktop and is now layered on the Phase 3 branch.

Current behavior:
- uses `public/assets/home/mobile-layered/home-mobile-layered-base-v1.png`;
- uses the real-transparent `public/assets/home/mobile-layered/home-mobile-layered-overlay-v1.png`;
- renders 14 responsive mobile instances from the existing shared wave deliveries;
- does not request desktop base/overlay assets;
- maintains accepted stacked Home composition;
- box remains interactive via tap;
- normal, compact, short, and tall mobile Playwright variants exist.

The mobile layered result remains pending USER visual QA. Frame A is retained as historical fallback/provenance and is superseded for the active mobile background by this implementation once the phase is accepted.

## Schrödinger box — current implementation

Closed asset:

`public/assets/home/schrodinger/box-closed-v1.png`

Reveal asset:

`public/assets/home/schrodinger/box-reveal-v1.png`

Reveal calibration remains exactly authored as:

`translate(0.993070%, 1.680001%) scale(0.953033, 0.951307)`

Browser CSS serialization in tests normalizes the percentage literals to:
`translate(0.99307%, 1.68%) scale(0.953033, 0.951307)`

Do not treat that serialization normalization as a calibration change.

### Transform ownership

Current markup now has two inner state wrappers:

`.schrodinger-box__state--closed`

`.schrodinger-box__state--reveal`

Responsibilities:
- outer `.schrodinger-box` owns idle floating transform;
- state wrappers own phase-split transform + opacity;
- actual images own fixed artwork geometry/calibration.

This separation is intentional and prevents idle/reveal transforms from fighting.

### Simple two-endpoint idle float correction — USER ACCEPTED / LOCKED

Current animation:

`home-box-float 3.1s ease-in-out infinite alternate`

Keyframes:
- 0% lower endpoint: `translate3d(0.04rem, -0.08rem, 0) rotate(-0.35deg)`
- 100% upper endpoint: `translate3d(-0.04rem, -0.92rem, 0) rotate(0.45deg)`

Only transform is animated.

There are exactly two authored spatial endpoints and no intermediate spatial keyframes. `alternate` traverses the same path in both directions with smooth endpoint easing.

### Calmer quantum phase-split reveal correction — IMPLEMENTED, USER ACCEPTED / LOCKED

The USER accepted this calmer reveal. Preserve the existing 640ms transform+opacity implementation exactly during the mobile review.

State transition:
- duration: `640ms`;
- easing: `cubic-bezier(0.22, 0.61, 0.36, 1)`;
- properties: transform + opacity only.

Closed resting wrapper:
`translate3d(0, 0, 0) scale(1)`, opacity 1.

Closed leaving:
`translate3d(-0.65%, 0.65%, 0) scale(0.995)`, opacity 0.

Reveal hidden/start:
`translate3d(0.65%, -0.65%, 0) scale(1.006)`, opacity 0.

Reveal settled:
`translate3d(0, 0, 0) scale(1)`, opacity 1.

No:
- blur/filter;
- backdrop-filter;
- animated masks;
- clip-path animation;
- canvas;
- WebGL;
- JS animation loop;
- animation dependency.

### Interaction state machine — unchanged

Desktop fine pointer:
- hover temporary reveal;
- focus temporary reveal;
- click lock/unlock.

Mobile/coarse:
- tap/click toggle locked reveal.

`aria-pressed` still represents lock state.

`src/scripts/schrodinger-box.ts` was NOT changed by the box-motion commit.

### Reduced motion

Under `prefers-reduced-motion: reduce`:
- box idle animation disabled;
- phase transforms disabled;
- state wrappers use only `opacity 120ms linear`;
- final state remains controlled by the same interaction state machine.

## Independent Orchestrator verification of the previous box-motion head

Application head:

`007e1e74f4840afc4db393aef9db26c20ef80c4f`

Compared to documentation head `83c9cc49a565ad5832e76c51fc5164d589895583`, exactly four files changed:
- `src/components/home/SchrodingerBox.astro`
- `src/styles/home.css`
- `tests/e2e/home-composition.spec.ts`
- `tests/e2e/home-visual-preview.spec.ts`

The commit patch confirms the wave CSS was not retuned.

Tests verify:
- wrapper geometry unchanged between closed/revealed states;
- stronger idle keyframes are transform-only;
- transform-only continuous idle path and 640ms transform+opacity state transitions are the values under current correction;
- reveal calibration preserved;
- hover/focus behavior;
- click lock/unlock;
- keyboard activation;
- mobile tap;
- reduced-motion no-idle/no-phase-transform behavior;
- viewport/mobile composition still valid.

GitHub Actions run:

`https://github.com/AltamashM7/qiskit-event-website/actions/runs/33186955589`

Exact tested head:

`007e1e74f4840afc4db393aef9db26c20ef80c4f`

Jobs:
- Technical verification — success.
- Cloudflare preview and visual QA — success.

CI test result:
- 92 passed;
- 53 skipped;
- 0 failed;
- Astro check 0 errors / 0 warnings.

Artifact:
- name: `home-visual-qa-pr-8`
- ID: `9692181025`
- digest: `sha256:35612c1623b6bdda8b2d503edc50643c4b5083c106b585fddbb8d3dd8dc3519b`
- exactly six PNGs.

Preview alias:

`https://pr-8.qiskit-event-website.pages.dev`

Immutable preview:

`https://0a1bd3fa.qiskit-event-website.pages.dev`

No production deployment.

Luna reported that the local Windows aggregate `npm run verify` process did not exit cleanly after starting the full matrix. This is not a known application failure: the equivalent separated matrix completed 92 passed / 53 skipped, and authoritative final-head GitHub verification completed successfully.

## Why screenshot sameness does not accept the motion

The screenshot pipeline deliberately emulates reduced motion.

Therefore deterministic screenshots can prove final closed/revealed composition remains stable, but cannot validate:
- normal-motion float feel;
- perceived performance during the transition.

The accepted desktop layered wave system, 640ms phase-split reveal, and two-endpoint idle float are locked. The current mobile layered composition remains USER visual QA.

## Immediate next action for Phase 3

First re-read the live Phase 3 PR head, final-head CI, and immutable preview, then have the USER inspect the mobile composition across the existing portrait variants:

The final preview URL must be taken from the new exact-head Actions run.

USER should judge:
1. does mobile feel like the same probability-field system as desktop while remaining portrait-specific?
2. do waves emerge from and disappear beneath the irregular boundary naturally?
3. are density, depth, vertical coverage, speed, and reset concealment appropriate?
4. do normal, compact, short, and tall portrait layouts remain readable and overflow-free?
5. do hover/focus/click/tap and the accepted box alignment remain correct?
6. does reduced motion leave an intentional static composition?
7. are the accepted desktop waves and box motion unchanged?

If the USER finds a problem:
- translate only that problem into one bounded correction on the same Phase 3 PR;
- preserve the accepted desktop wave and box locks;
- verify the new final head again.

If all visual checks pass:
- Orchestrator re-checks exact live PR head and final-head CI;
- USER must explicitly approve/authorize merge;
- squash-merge the Phase 3 PR only then;
- verify new `main` SHA;
- update durable docs for the merged state.

## Important regression lessons

### Wave speed
Duration alone is not speed.

Regression guard measures:
`abs(endTranslation - startTranslation) / duration / stageWidth`

### Boundary spawn
Do not replace actual alpha/overlay geometry with a flat guessed boundary.

Tests use:
- meaningful wave alpha threshold `>=16`;
- overlay opaque threshold `>=250`;
- row-by-row boundary;
- cover/scale geometry;
- multiple aspect ratios.

### Motion screenshots
Reduced-motion screenshots are deterministic QA surfaces, not normal-motion acceptance evidence.

## Merge rule

Never merge because:
- Builder says ready;
- CI is green;
- screenshots are stable.

Merge requires explicit USER authorization after live visual QA.
