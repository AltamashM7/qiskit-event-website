# Web Orchestrator Handoff

## Purpose
This is the primary restart document for a fresh Web ChatGPT Orchestrator session. It exists so the project can continue without relying on the long conversation that produced the current implementation.

Always re-read live GitHub state before mutation. This file records the state as of 2026-08-28, but GitHub remains authoritative if the branch has advanced.

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

Then inspect the current PR/branch, current source, tests, CI, preview, and changed files before giving implementation instructions.

## Repository and authority
Repository: `https://github.com/AltamashM7/qiskit-event-website`

GitHub is the authoritative shared state.

Default branch: `main`

Main baseline before the current Phase B work:
`67f3094599dbd7af6fd1772e486ff250677d5e22`

Current working branch:
`phase-2/home-layered-background-integration`

Current pull request:
`https://github.com/AltamashM7/qiskit-event-website/pull/8`

PR #8 must remain Draft and unmerged until the USER explicitly approves it.

Last application/visual head before this documentation-only handoff work:
`25cf7117e0f44da99534d9372a85f25291325034`

Commit:
`fix: restore wave velocity and boundary emergence`

Documentation commits will advance the branch head without changing application behavior. A new orchestrator must therefore re-read PR #8 and not assume `25cf711...` is still the literal tip.

## Current milestone state
Completed and merged into `main`:
- Phase 0A1 Astro/static scaffold.
- Approved Home asset import.
- Phase 0A2 reusable technical foundation.
- Home Composition V1.
- Home background continuation assets B/C for provenance.
- Phase A layered Home background asset foundation (PR #7), merged as main `67f3094599dbd7af6fd1772e486ff250677d5e22`.

Superseded:
- PR #6 full-frame A→B→C stepped background experiment.
- PR #6 is closed/unmerged and must not be revived unless the architecture decision is intentionally reopened.

Current:
- PR #8 integrates the Phase A desktop layered background.
- The desktop layered-wave visual system has passed USER visual QA.
- PR #8 is not yet accepted because two final Schrödinger-box motion refinements remain.

## Product intent
This is a new Qiskit event website.

It should feel like:
**expressive game-menu energy + artistic scene composition + clear information design + carefully controlled performance**

It must not look like a conventional university event template, generic futuristic HUD, glossy sci-fi UI, or realistic 3D environment.

The 2025 site at `https://qiskit.cs.uwindsor.ca/` is an information/content-architecture reference only, never a UI clone.

Initial routes:
- Home
- About Event
- About Quantum Mechanics

Final event facts are not yet confirmed. Do not invent dates, venue, speakers, sponsors, registration facts, or branding requirements.

## Technical architecture
Locked/current stack:
- Astro static output.
- TypeScript.
- npm.
- Node 24 LTS requirement (`>=24 <25`).
- Semantic HTML + CSS + minimal native browser JavaScript.
- No React/Vue/Svelte.
- No Tailwind.
- No GSAP or animation framework.
- No general UI framework.
- Playwright Chromium browser QA.
- Axe serious/critical accessibility baseline.
- Sharp `0.35.3` as a dev-only asset/test dependency.
- Cloudflare Pages Direct Upload from GitHub Actions for PR previews.
- No Cloudflare Git integration.
- Production deployment is not established.

Core reusable boundaries:
- `SiteLayout`
- `StageShell`
- `MasterNavigator`
- `HomeStage`
- `HomeLayeredBackground`
- `SchrodingerBox`

## Current Home desktop scene — visually accepted background
The USER explicitly passed all current desktop layered-background visual checks at application head `25cf711...`.

Accepted behavior:
- boundary illusion works;
- waves visibly emerge from the irregular neutral/yellow boundary;
- speed feels correct;
- wave population/occupancy is satisfactory;
- overlap works;
- larger waves sit behind smaller waves;
- vertical occupancy is satisfactory;
- crest/trough amplitude is satisfactory;
- broad translucent ribbon works;
- overall performance feels good.

The wave system is LOCKED for the next correction.

Do not casually retune wave speed, spawn, count, amplitude, opacity, vertical placement, ribbon geometry, or depth while working on the box.

See `agent_docs/current_scene.md` for exact details.

## Current Home mobile scene
Mobile intentionally does NOT use the desktop layered system yet.

Current mobile:
- uses Frame A;
- keeps the accepted separate mobile composition;
- does not request desktop layered base/overlay/wave files;
- box is approximately `66vw` with the current stacked layout;
- normal, compact, short, and tall mobile Playwright variants exist;
- real Android QA previously passed Home V1.

Mobile layered art/integration is a separate future phase and must not be smuggled into PR #8.

## Schrödinger box — current accepted geometry
Closed asset:
`public/assets/home/schrodinger/box-closed-v1.png`

Reveal asset:
`public/assets/home/schrodinger/box-reveal-v1.png`

The reveal image contains the approved adjusted half-skeletal / half-living cat and is the authoritative visible reveal state.

Critical reveal alignment calibration:
`translate(0.993070%, 1.680001%) scale(0.953033, 0.951307)`

Do not alter this calibration without objective evidence of a regression.

Current interaction state machine:

Desktop fine pointer:
- hover → temporary reveal;
- focus → temporary reveal;
- click → lock/unlock.

Mobile/coarse pointer:
- tap/click → toggle locked reveal.

`aria-pressed` represents lock state.

Do not redesign the interaction state machine during visual transition polish.

## Immediate work still required before PR #8 acceptance

### 1. Strengthen idle float
The current float is too subtle against the dynamic waves.

Current approximate idle:
- duration: `6.5s`;
- vertical travel: about `0.45rem`;
- rotation: roughly `-0.35deg ↔ +0.35deg`.

Desired:
- clearly perceptible but still heavy/natural;
- approximately `0.8–1.0rem` vertical travel;
- approximately `±0.55–0.75deg` rotation;
- optional tiny `0.1–0.2rem` horizontal drift;
- approximately `5.5–6.2s`;
- no bounce/spring/orbit/scale breathing.

### 2. Replace plain crossfade with a lightweight phase-split reveal
Recommended direction: a restrained “quantum phase-split” transition.

Architecture:
outer `.schrodinger-box` → idle float only
inner state wrappers → reveal-state transform + opacity only
actual PNG images → fixed artwork geometry/calibration

Desired phase transition:
- closed state shifts slightly one direction and fades out;
- revealed state begins slightly displaced in the opposite direction, fades in, and settles;
- movement around 1–2%;
- optional scale change only around 1–1.5%;
- target duration roughly 280–420ms;
- transform + opacity only;
- reversible;
- no positional jump;
- reduced motion removes phase displacement.

Forbidden:
- blur/filter/backdrop-filter;
- SVG filters;
- animated masks/clip-path;
- canvas/WebGL;
- JS animation loops;
- animation dependencies.

See `agent_docs/next_steps.md` for the exact acceptance checklist.

## Last independently verified application CI/preview
Application head:
`25cf7117e0f44da99534d9372a85f25291325034`

Actions run:
`https://github.com/AltamashM7/qiskit-event-website/actions/runs/33178114740`

Jobs:
- Technical verification — success.
- Cloudflare preview and visual QA — success.

Artifact:
- name: `home-visual-qa-pr-8`
- ID: `9688571773`
- digest: `sha256:3296492e2b5e58059fba9353d553633bcf1bf739cae2004017d432f17bd25ae8`
- exactly six PNG screenshots.

Preview alias:
`https://pr-8.qiskit-event-website.pages.dev/`

Immutable preview for `25cf711...`:
`https://277fd989.qiskit-event-website.pages.dev/`

No production deployment occurred.

The reduced-motion screenshots do NOT validate normal-motion wave or box animation. Human preview QA remains necessary for motion.

## Critical wave implementation facts
Current desktop wave composition has 20 DOM instances while reusing only eight image assets:
- wave 01 thick cream upper: 1;
- wave 02 thick cream lower: 1;
- waves 03–08: 3 each.

Thick cream waves are full opacity.

Dominant translucent ribbon:
- approx width `220%`;
- approx height `500%`;
- opacity `0.5`;
- `z-index: 0`.

Effective tested velocity range:
`14.78–23.63 vw/s`

Broad underlayers are slower. Thin/dashed crossing waves are faster.

Spawn logic is not a simple magic x coordinate. Tests measure:
- meaningful wave alpha at threshold `>=16`;
- opaque overlay boundary by row at alpha `>=250`;
- cover + overlay scale geometry;
- painted leading edge against the actual irregular boundary.

Representative spawn viewports:
- `1024×768`
- `1280×720`
- `1440×900`
- `1920×1080`

The reset must remain hidden beneath the neutral overlay with a safety margin.

Do not regress this into raw duration-only tests or a single flat boundary assumption.

## Important lessons from regressions

### Speed
Animation duration alone is NOT a speed guarantee.

A previous correction shortened travel distance while keeping old durations, making the waves visibly slower.

Correct metric:
`abs(endTranslation - startTranslation) / duration / stageWidth`

The test now enforces actual velocity.

### Boundary spawn
A previous correction used a generic `54cqw + offset` model and allowed painted content to start visibly in the yellow field.

Correct model:
- use actual asset alpha bounds;
- account for rendered element width;
- compare painted rows to the actual irregular overlay boundary;
- verify multiple aspect ratios.

### Screenshots
The six visual QA screenshots intentionally use reduced motion for deterministic comparison.

They cannot prove:
- normal wave cadence;
- loop behavior;
- hover animation quality;
- box idle float visibility;
- phase-split transition quality.

The USER must visually review normal motion.

## GitHub/Builder workflow
Preferred flow:
1. Orchestrator re-reads repository/PR state.
2. Produce one bounded Builder prompt.
3. Builder modifies the existing intended branch/PR.
4. Builder runs local verification and pushes.
5. Orchestrator independently verifies exact final head, changed files, tests, CI, artifact, and preview.
6. USER performs manual/visual QA.
7. Correct on the same PR when the correction belongs to the same bounded phase.
8. Merge only after explicit USER authorization.

Builder reports are evidence to inspect, not proof.

Do not create a new PR for the remaining box polish. It belongs on existing Draft PR #8.

## Merge rule
Never merge PR #8 merely because CI is green or because a Builder says it is ready.

Required before merge:
- final box float visual QA passes;
- final phase-split reveal visual QA passes;
- no jump/regression;
- performance feels good;
- final-head CI passes;
- Orchestrator verifies exact final head;
- USER explicitly approves/authorizes merge.

Expected merge style: squash merge, consistent with prior accepted phases.

## After PR #8
The next phases are intentionally separate and are described in `agent_docs/roadmap.md`.

Do not automatically begin them in the same PR.

High-level future areas:
- Home remaining polish and lower-page content architecture;
- Master Navigator visual refinement;
- optional mobile layered-background art/integration as its own art-directed phase;
- About Event Stage;
- About Quantum Mechanics Stage;
- final event content;
- official branding;
- performance budgets;
- production domain/release process.
