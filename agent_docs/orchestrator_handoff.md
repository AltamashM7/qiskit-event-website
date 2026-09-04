# Web Orchestrator Handoff

## Purpose

Primary restart document for a fresh Web ChatGPT Orchestrator.

GitHub and durable docs are authoritative. Do not continue from assumptions about retired conversations.

## Repository / authoritative state

Repository:
`https://github.com/AltamashM7/qiskit-event-website`

Default branch:
`main`

Verified GitHub `main` at the start of Phase 5:
`dc9ccd5dc7cd8f940d40d35f578ae52d904b20bb`

Accepted implementation milestones:
- PR #8 — desktop layered Home / accepted box motion and reveal;
- PR #9 — mobile layered Home integration;
- PR #10 — persistent shared Master Navigator;
- PR #11 — post-Phase-4 documentation handoff.

Production deployment is not established.

## Mandatory restart order

1. Inspect live GitHub `main`.
2. Read:
   - `AGENTS.md`
   - `agent_docs/official_requirements.md`
   - `agent_docs/content_architecture.md`
   - `agent_docs/formal_visual_system.md`
   - `agent_docs/orchestrator_handoff.md`
   - `agent_docs/current_scene.md`
   - `agent_docs/next_steps.md`
   - `agent_docs/roadmap.md`
   - `agent_docs/decisions.md`
   - `agent_docs/design_system.md`
   - `agent_docs/project_overview.md`
   - `ASSET_REGISTRY.md`
   - `agent_docs/workflow/orchestrator_builder.md`
3. Reconcile docs against current code.
4. Do not generate a Luna implementation prompt until the USER has approved the current design gate.

## Accepted / locked Home state

Desktop/mobile Home probability fields, Schrödinger box placement, idle motion, 640ms reveal, interaction state machine, title treatment, and persistent Navigator positioning remain accepted.

Do not reopen those systems casually.

## New USER-approved site/content direction

Target major routes:
- Home;
- Schedule;
- Speakers.

The current About Event and About Quantum Mechanics shells are superseded as the target route model but remain in code until a bounded implementation phase changes them.

Review strategy:
- use realistic dummy data in the final intended format;
- replace it with real data after structural/visual approval;
- do not fabricate corporate relationships or official IBM/Qiskit claims.

Every major page:
- has its own unique art-directed hero/Stage;
- transitions into mostly-static formal information;
- uses no newly generated visual assets in the formal sections; explicitly approved supplied decorative assets may be used selectively with provenance.

Home formal architecture:
1. Event Snapshot
2. About the Event
3. What You'll Do
4. Program Preview
5. Speakers Preview
6. Organizers + Registration
7. Footer

Schedule and Speakers reuse relevant formal grammar, not Home's exact content.

## Formal visual system — resolved

The USER delegated the remaining formal visual decisions to the Orchestrator.

The selected system is locked in `agent_docs/formal_visual_system.md`.

High-level direction:
- research-editorial / technical-poster tone;
- hard non-overlapping Stage→formal transition;
- paper/off-white formal canvas;
- ~1180px / 12-column editorial grid;
- clean sans-serif + monospace hierarchy;
- restrained print-like rules and page accent;
- square technical CTAs;
- mostly static formal content;
- responsive reflow;
- dark ink footer.

The next bounded phase may now be specified after this documentation is merged.

## Phase 5 builder handoff and visual correction — pending audit

Feature branch:
`phase-5/home-formal-content-system`

Phase 5 implements the target route migration to Home (`/`), Schedule (`/schedule/`), and Speakers (`/speakers/`). The legacy About Event and About Quantum Mechanics route files are removed, and Schedule/Speakers are intentionally minimal neutral technical shells.

The Home formal layer is composed from typed static data in `src/data/event.ts`, reusable primitives in `src/components/formal/`, and `src/components/home/HomeFormalContent.astro`. Structural geometry is isolated in `src/styles/formal-system.css`; the replaceable Fall Fest editorial skin is isolated in `src/styles/formal-theme-fallfest-editorial.css` and selected with `data-formal-theme="fallfest-editorial"` plus the `--formal-accent` token.

The exact Home order is Event Snapshot → About the Event → What You'll Do → Program Preview → Speakers Preview → Organizers & Registration → Footer. It uses the brief's dummy data and centralized `https://example.com/registration` placeholder. The original formal visual execution was rejected by the USER and corrected on the same PR with exactly three supplied, licensed, non-logo decorative SVGs below the hero; the accepted Home hero/Navigator systems were not modified.

The correction remains in progress on Draft PR #14. Final corrected-head local checks, Actions, preview, artifact, and commit metadata will be recorded at closeout. No merge, production deployment, or USER acceptance is implied.

## Phase 5 visual correction — pending acceptance

- The rejected implementation proved the architecture but not the visual execution; the correction replaces the sparse repeated rule/row grammar with varied editorial compositions.
- The required sequence is dossier snapshot → asymmetric illustrated About spread → dark 2×2 feature field → program timeline → typographic profile grid → credits strip → purple participation finale → compact ink footer.
- Only `Sticker 04.svg`, `Sticker 08.svg`, and `Sticker 09.svg` from `materials-resources-main.zip` are imported, unchanged, into `public/assets/formal/fall-fest/`. The exact supplied MIT license is shipped at `public/licenses/qiskit-fall-fest-materials.txt` and recorded in `ASSET_REGISTRY.md`.
- No logo, wordmark, badge, IBM, IBM Quantum, or Qiskit branding asset is used. No correction asset is added to HomeStage or its probability field.
- The corrected visual result remains pending independent Web Orchestrator audit and explicit USER visual acceptance.

## Workflow

Use:
`bounded phase → Draft PR → CI/preview → Orchestrator independent audit → USER visual/manual QA → explicit merge authorization → squash merge`

Never merge without explicit USER authorization.
