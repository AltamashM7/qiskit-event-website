# Web Orchestrator Handoff

## Purpose

Primary restart document for a fresh Web ChatGPT Orchestrator.

Do not continue from assumptions about the retired conversation. Re-read live GitHub first, then use these durable docs.

## Repository / authoritative state

Repository:

`https://github.com/AltamashM7/qiskit-event-website`

Default branch:

`main`

Current verified main after the Phase 4 squash merge:

`5dcffb25ac7253ddacc0101e7b63212c30dd01ce`

Recently merged:
- PR #8 — desktop layered Home / accepted box motion and reveal.
- PR #9 — mobile layered Home integration and final mobile visual tuning.
- PR #10 — persistent shared Master Navigator.

No implementation PR is currently active.

Production deployment is not established.

## Mandatory restart order

1. Inspect live GitHub `main`.
2. Read:
   - `AGENTS.md`
   - `agent_docs/orchestrator_handoff.md`
   - `agent_docs/current_scene.md`
   - `agent_docs/next_steps.md`
   - `agent_docs/roadmap.md`
   - `agent_docs/decisions.md`
   - `agent_docs/design_system.md`
   - `agent_docs/project_overview.md`
   - `ASSET_REGISTRY.md`
   - `agent_docs/workflow/orchestrator_builder.md`
3. Receive the USER's newly obtained official website content and rules/guidelines.
4. Treat those new materials as the authoritative input for content/site requirements, subject to repository constraints and explicit USER decisions.
5. Reconcile the prototype page model, open roadmap items, and any branding/content assumptions against those materials.
6. Discuss the resulting information architecture and next phase with the USER.
7. Do NOT generate a Luna implementation prompt until the USER has discussed and approved the next direction.

## Accepted / locked Home state

Desktop:
- off-white + electric-yellow layered probability field;
- 20 accepted wave instances over static base + foreground boundary overlay;
- accepted density/speed/depth/reset concealment;
- title/copy left, Schrödinger box right;
- two-endpoint box float: 3.1s ease-in-out alternate;
- accepted 640ms transform+opacity reveal;
- reveal calibration remains `translate(0.993070%, 1.680001%) scale(0.953033, 0.951307)`.

Mobile:
- separately art-directed portrait base/overlay;
- 44 total wave instances;
- small families 03–06 use 8 instances each;
- Wave 03 retains the original yellow/orange accent;
- other active mobile wave visuals use the accepted white/opacity hierarchy;
- current mobile speed, density, boundary emergence, box placement, and QISKIT readability backing are accepted.

Do not reopen these systems casually.

## Persistent Master Navigator — accepted / locked

- One `MasterNavigator` is rendered by `SiteLayout` on every major route.
- Home/About Event/About Quantum Mechanics do not render duplicate Stage-owned copies.
- Fixed viewport position is USER approved: current top-center desktop position and corresponding near-full-width mobile top position.
- Existing visual design is accepted.
- It remains visible during scroll with no morphing, resizing, hide/show, or scroll listeners.
- Labels/routes remain:
  - Home
  - About Event
  - About Quantum Mechanics
- About routes are still neutral shells apart from the shared Navigator.

## Technical architecture

- Astro static output + TypeScript + npm + Node 24.
- Semantic HTML/CSS + minimal native JS.
- No React/Vue/Svelte/Tailwind/GSAP/UI framework.
- Playwright Chromium + Axe baseline.
- GitHub Actions.
- Cloudflare Pages Direct Upload for PR previews.
- GitHub is authoritative; Builder reports are not proof.

## Critical next-context fact

The USER now has the overall event website content and the governing website creation rules/guidelines.

They will provide those materials to the NEW Web Orchestrator.

Do not infer them from older prototype copy, the 2025 reference site, or prior provisional roadmap ideas. Do not begin About-page art direction, Home lower content, branding, or site-map changes before analyzing the new official material with the USER.

## Workflow

Use:

`bounded phase → Draft PR → CI/preview → Orchestrator independent audit → USER visual/manual QA → explicit merge authorization → squash merge`

Never merge without explicit USER authorization.
