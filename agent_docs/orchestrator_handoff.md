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
- uses no newly generated visual assets in the formal sections.

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

## Phase 5 builder handoff — pending audit

Feature branch:
`phase-5/home-formal-content-system`

Phase 5 implements the target route migration to Home (`/`), Schedule (`/schedule/`), and Speakers (`/speakers/`). The legacy About Event and About Quantum Mechanics route files are removed, and Schedule/Speakers are intentionally minimal neutral technical shells.

The Home formal layer is composed from typed static data in `src/data/event.ts`, reusable primitives in `src/components/formal/`, and `src/components/home/HomeFormalContent.astro`. Structural geometry is isolated in `src/styles/formal-system.css`; the replaceable research-editorial skin is isolated in `src/styles/formal-theme-research.css` and selected with `data-formal-theme="research-editorial"` plus the `--formal-accent` token.

The exact Home order is Event Snapshot → About the Event → What You'll Do → Program Preview → Speakers Preview → Organizers & Registration → Footer. It uses the brief's dummy data and centralized `https://example.com/registration` placeholder. No formal visual assets were added and the accepted Home hero/Navigator systems were not modified.

Focused local checks and nine screenshot captures pass. Draft PR #14 is open at `https://github.com/AltamashM7/qiskit-event-website/pull/14` and remains Draft. The implementation head is `d676deda2921d0ee4c72a31536c6d9c09a854ee4`. Actions run `33833826312` passed Technical verification and Cloudflare preview/visual QA. The immutable preview is `https://85465dca.qiskit-event-website.pages.dev`; the PR alias is `https://pr-14.qiskit-event-website.pages.dev`; artifact `home-visual-qa-pr-14` (ID `9922730351`, digest `sha256:5dc0f10c897d327e7bb0d59b49f63c0919d4de9d32a84317b5f5dfa05c876ead`) contains the exact nine screenshot files. No merge, production deployment, or USER acceptance is implied.

## Workflow

Use:
`bounded phase → Draft PR → CI/preview → Orchestrator independent audit → USER visual/manual QA → explicit merge authorization → squash merge`

Never merge without explicit USER authorization.
