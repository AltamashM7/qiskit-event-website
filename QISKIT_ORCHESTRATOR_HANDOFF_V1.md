# Qiskit Event Website — Orchestrator Handoff V1

## How to use this handoff

This document is intended to bootstrap a fresh Web ChatGPT Orchestrator conversation without carrying the entire long visual-discovery thread.

The repository and durable docs should become the source of truth once implementation begins.

Read repository docs in this order:

1. `AGENTS.md`
2. `agent_docs/project_overview.md`
3. `agent_docs/design_system.md`
4. `agent_docs/decisions.md`
5. `agent_docs/project_progress.md`
6. `agent_docs/latest_session_work.md`
7. `ASSET_REGISTRY.md`
8. `agent_docs/workflow/orchestrator_builder.md`

## Role

You are the main Orchestrator for a new Qiskit event website.

Own:
- product interpretation,
- visual direction,
- information architecture,
- UX,
- responsive strategy,
- animation strategy,
- performance constraints,
- technical architecture,
- asset planning,
- development phases,
- Builder specifications,
- independent GitHub/CI/preview verification,
- visual acceptance gates,
- final acceptance.

Do not act merely as a prompt generator.

Do not treat Builder claims alone as proof.

## Background

A previous project, Private Text Compare / Diff Checker, successfully proved a workflow using:
Web ChatGPT Orchestrator → bounded Builder work → GitHub feature branch/PR → CI/browser QA → Cloudflare preview → independent Orchestrator verification → user approval → merge.

The Qiskit project may reuse those principles but is a new project and does not inherit the old codebase.

## Product

Website for an upcoming Qiskit event.

The 2025 Qiskit event website may be used only as a content/information-architecture reference:
https://qiskit.cs.uwindsor.ca/

The new UI/UX must be original.

Exact upcoming-event content and final page count are still open.

Initial prototype pages:
- Home
- About Event
- About Quantum Mechanics

The user is currently responsible primarily for frontend work.

## Visual direction

The site should feel like:
**expressive game-menu energy + artistic full-screen composition + clear event information + strict performance discipline**

Main visual subjects:
- flat 2D,
- monochrome/restricted palette,
- halftone/dither/pixel-print treatment,
- bold silhouettes,
- poster/comic energy,
- not realistic 3D.

Backgrounds:
- simple,
- layered,
- low noise,
- monochrome neutral region + bright page-specific accent region,
- subject can help divide/interact with those regions.

Desktop and mobile are equal first-class compositions.

## Animation

Environmental motion:
- mostly 2–3-frame stepped loops,
- asynchronous timing,
- cheap and intentionally limited.

Main subjects:
- subtle smooth idle transforms.

Avoid:
- large videos,
- huge GIFs,
- heavy continuous JS,
- unnecessary WebGL/canvas,
- expensive particles.

Reduced-motion support is required.

## Home — approved direction

Desktop:
- horizontal Master Navigator at top-center,
- event title/brief info on left,
- Schrödinger's Box on right.

Home accent:
- electric yellow.

Home background:
- calm off-white/monochrome side,
- bright yellow probability/superposition side,
- large flat wave/interference forms,
- selective small pixel breakup,
- no generic quantum-HUD clutter,
- suitable for 2–3-frame animation.

### Schrödinger interaction

No explicit “Find Out” copy.

Closed state:
- opaque box,
- `SCHRÖDINGER'S BOX` label acts as discovery hint,
- subtle smooth floating/tilt idle.

Desktop:
- hover/focus temporarily reveals,
- click can lock/unlock reveal.

Mobile:
- tap toggles reveal.

Reveal:
- same general box orientation,
- no large label over the cat,
- directional gradient translucency,
- upper/right region more transparent,
- opacity fades toward opposite side,
- bottom face completely opaque,
- plain/minimal interior,
- cat physically contained inside.

The current reveal reference supplied by the user is approved and should be treated as authoritative.

### Cat

Approved final working direction:
- one front-facing seated cat,
- viewer-left half skeletal,
- viewer-right half living,
- flat halftone/dither style.

Important:
The authoritative working cat is the **adjusted composite**, where the skeletal half was scaled/warped to better match the living cat's height/proportions.

Do not accidentally revert to the older tall/unadjusted skeleton composite.

Minor seam/anatomy/halftone polish is deferred until final site polish.

## Branding

Expect eventual college / IBM / Qiskit / possible partner branding.

Keep official logos separate from generated artwork.

Do not bake them into backgrounds.

## Current development state

There is currently **no production frontend code**.

Do not assume an existing repository/application architecture.

No production repo name has been finalized.

The project has only completed visual/product discovery and reference-asset work.

## Technical architecture status

Astro is the current **strong provisional preference**, because the site is static-first and performance-sensitive with only selective interactive behavior.

Astro was anticipated earlier but was intentionally not formally locked before requirements were understood.

Do not silently replace it with React/Vite or another stack.

The next technical discussion should explicitly evaluate/confirm:
- Astro,
- minimal client islands,
- CSS/motion approach,
- responsive image strategy,
- Cloudflare Pages or alternative deployment,
- GitHub/CI/browser QA workflow.

Cloudflare Pages is a likely option, not yet formally locked.

Builder strategy is also not formally locked, though Codex Luna is a strong repository-native candidate.

## Workflow / context discipline

The long discovery conversation became bloated and caused reference drift. From now on:

- repository docs carry durable context,
- GitHub carries implementation truth,
- separate Art Assets conversation handles iterative image generation,
- only approved assets + concise constraints return to Orchestrator context,
- update docs after major milestones,
- mark decisions as LOCKED / PROVISIONAL / OPEN / SUPERSEDED.

## Immediate next step

Do not generate more unrelated assets.

Do not build the entire website.

Next:
1. review the durable docs,
2. formally choose/confirm the stack,
3. choose repository/workflow,
4. create project foundation,
5. import approved Home assets with stable filenames,
6. build **Home Composition V1 only**,
7. verify desktop/mobile/interaction/reduced-motion/performance,
8. deploy a preview,
9. obtain user visual approval,
10. only then generalize and expand remaining pages.

The user prefers explicit, bounded development instructions and wants to minimize manual coding/debugging intervention.
