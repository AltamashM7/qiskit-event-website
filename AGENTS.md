# Qiskit Event Website — Agent Instructions

## Purpose

This repository is for a new Qiskit event website. It is **not** a continuation of the Private Text Compare codebase.

The site should feel closer to an expressive game menu / animated visual experience than a conventional university event website, while remaining clear, accessible, modular, and performant on weak college computers.

## Source-of-truth priority

When deciding what is currently implemented or approved, use this order:

1. Current repository code, configuration, committed assets, tests, and GitHub state.
2. `agent_docs/decisions.md` for durable product/design decisions.
3. `agent_docs/design_system.md` for the approved visual language.
4. `ASSET_REGISTRY.md` for approved asset identities/status.
5. `agent_docs/orchestrator_handoff.md`, `agent_docs/current_scene.md`, `agent_docs/next_steps.md`, and `agent_docs/roadmap.md` for restart/current-state context.
6. `agent_docs/project_progress.md` and `agent_docs/latest_session_work.md` for milestone/session state.
7. Conversation history only for information not yet captured in the repository.

If conversation history conflicts with the repository or durable docs, prefer the repository and current durable docs.

## Non-negotiable product rules

- Major pages begin with a large visual Stage, approximately viewport-sized.
- Detailed information appears below the Stage.
- Every major Stage contains a reusable Master Navigator.
- Initial prototype pages/tabs:
  - Home
  - About Event
  - About Quantum Mechanics
- Page count and final event content are not finalized; the architecture must support easy addition/removal/reordering.
- Filler copy may be used during development, but it should read like plausible student-academic event copy and must not fabricate confirmed event facts.
- Content structure may take inspiration from the 2025 Qiskit event site, but UI/UX must be original:
  - https://qiskit.cs.uwindsor.ca/

## Visual rules

- Main visual subjects use a flat 2D graphic / halftone / dither / pixel-print visual language.
- Do not reproduce referenced artwork literally; use references only for design principles and style direction.
- The site combines:
  - expressive game-menu energy,
  - artistic scene composition,
  - clear information design,
  - controlled performance.
- Page backgrounds use a monochrome/neutral foundation plus page-specific bright accents.
- A focal subject may participate in or interrupt the boundary between neutral and accent regions.
- Home accent direction is bright electric yellow.
- Desktop and mobile are separate art-directed compositions, not simple scale-downs.

## Motion rules

- Motion must stay deliberately lightweight and art-directed.
- The accepted Home desktop background uses a static base + independent transparent wave layers + foreground boundary overlay with CSS-only linear transform motion.
- Limited 2–3-frame stepped loops remain an available technique for other environmental elements/pages when appropriate, but are no longer the chosen Home desktop probability-field architecture.
- Main subjects may use smooth idle motion using inexpensive transforms/opacity.
- Interaction transitions may be richer than ambient motion, but should still prefer transform/opacity and avoid heavy effects.
- Avoid full-screen video, huge GIFs, large raster frame sequences, expensive JS animation loops, unnecessary canvas/WebGL, animated filters, and heavy particle systems.
- Respect `prefers-reduced-motion`; reduced-motion mode must remain visually intentional.

## Home Stage — approved direction

Desktop:
- Master Navigator: horizontal stylized buttons at top-center.
- Event title / brief event copy: left side.
- Schrödinger's Box: right side.
- The box visually participates in the neutral/accent composition boundary.

Home background:
- calm off-white / monochrome side,
- bright electric-yellow superposition/probability field,
- large flat wave/interference forms,
- selective small-scale pixel/dither breakup,
- low visual density,
- no generic tech-HUD clutter,
- no realistic 3D environment.

Schrödinger interaction:
- No explicit “Find Out” instructional copy.
- Opaque/closed box includes `SCHRÖDINGER'S BOX` as the discovery hint.
- Desktop mouse hover/focus temporarily reveals the inside.
- Click can lock/unlock the reveal.
- Mobile tap toggles the reveal.
- The entire box wrapper may use subtle smooth floating/tilt idle motion.
- Reveal must not change the box orientation.
- Reveal state uses the approved half-skeletal / half-living cat.
- Reveal box has directional gradient translucency; the bottom face remains fully opaque.
- The reveal-state image contains no large text over the cat.

## Architecture rules

Do not build giant page components that tightly couple background, navigator, subject, transitions, content, responsive logic, animation, and all page sections.

Prefer separation along these boundaries:
- site shell,
- Stage/scene system,
- scene background,
- subject,
- decorative layers,
- Master Navigator,
- page identity,
- motion system,
- page transitions,
- lower-page content sections,
- schedule/people/FAQ/venue primitives,
- responsive/art-direction configuration.

Pages should be configuration/data-driven where it meaningfully improves replaceability.

## Accessibility rules

At minimum:
- semantic HTML,
- real links/routes beneath stylized navigation,
- keyboard navigation,
- visible focus states,
- sufficient contrast,
- reduced-motion support,
- sensible heading hierarchy,
- useful alt text,
- readable mobile layouts,
- graceful behavior if enhanced animation is unavailable.

## Performance rules

Performance is a design constraint from the beginning.

Prefer:
- static-first rendering,
- minimal client JavaScript,
- responsive images,
- lazy loading for non-critical art,
- transforms/opacity for smooth motion,
- limited decoded-image memory,
- paused/off-screen decorative animation where useful.

Do not load all expensive page assets eagerly.

Exact budgets are still open and must be established before production acceptance.

## Current technical status

- Astro static output + TypeScript + npm + Node 24 are established.
- Reusable Stage/layout/navigation boundaries, browser QA, accessibility baseline, and GitHub Actions are established.
- Home Composition V1 is implemented and merged.
- The desktop layered Home probability field, 640ms phase-split reveal, and simple two-endpoint alternate box float from merged PR #8 are USER accepted and locked.
- The current Phase 3 branch implements a separate responsive mobile layered probability field using the USER-verified portrait base/overlay and shared wave masters. USER mobile QA accepts the current speed and 28-instance population; the current same-PR correction replaces the low-contrast warm variants with white, sky-blue, and sky-cyan large/background mobile waves, with final-head CI and USER visual re-review pending.
- Cloudflare Pages Direct Upload through GitHub Actions is established for PR previews. Production deployment is not established.
- Codex Luna is the current repository-native Builder for bounded implementation phases; the Web ChatGPT Orchestrator independently verifies and owns acceptance gates.

## Workflow

Before implementation:
1. Read this file.
2. Read:
   - `agent_docs/orchestrator_handoff.md`
   - `agent_docs/current_scene.md`
   - `agent_docs/next_steps.md`
   - `agent_docs/roadmap.md`
   - `agent_docs/project_overview.md`
   - `agent_docs/design_system.md`
   - `agent_docs/decisions.md`
   - `agent_docs/project_progress.md`
   - `agent_docs/latest_session_work.md`
   - `ASSET_REGISTRY.md`
3. Reconcile stale docs against the current repository.
4. Do not implement based only on conversational memory.

During development:
- GitHub becomes authoritative shared state.
- Use feature branches + Draft PRs for bounded phases.
- Builder status reports are not proof; the Orchestrator independently verifies GitHub source of truth, CI, preview, and relevant visual QA.
- Use visual gates. Do not propagate an unapproved visual system across all pages.
- Preserve durable documentation after major milestones.

## Art-asset workflow

Use a separate Art Assets conversation/workstream for iterative image generation.

The development/orchestrator context should only receive:
- final/approved asset,
- asset name/version,
- concise approval note,
- implementation constraints.

Do not copy long art-generation debugging history into repository docs.

Approved assets should be given stable filenames and recorded in `ASSET_REGISTRY.md`.
