# Project Overview

## Project

Frontend-first website for an upcoming Qiskit event.

The exact upcoming event content, final page count, event details, sponsors, venue information, and production branding requirements are not yet finalized.

The website should therefore establish a polished, modular visual/UX system that can accept final content later without requiring structural redesign.

## Product intent

The site should feel more like an expressive game menu or designed visual scene than a standard institutional event site.

The intended combination is:

**game-menu energy + artistic scene composition + clear information design + carefully controlled performance**

The 2025 Qiskit event website may be used as an information-architecture/content reference only:
https://qiskit.cs.uwindsor.ca/

Do not clone its UI or layout.

## Initial page model

Initial prototype pages:
1. Home
2. About Event
3. About Quantum Mechanics

These behave like major tabs/screens through the shared Master Navigator.

This is not the final site map. Future pages may include schedule/program, speakers, hackathon information, organizers, FAQ/resources, venue, registration, partners/sponsors, and contact information if confirmed later.

## Major page structure

Each major page follows the conceptual structure:

```text
PAGE
├── FULL-SCREEN STAGE
│   ├── scenic/animated background
│   ├── main visual subject
│   ├── decorative layers
│   ├── page identity / brief copy
│   └── Master Navigator
└── PAGE CONTENT
    ├── detailed information
    └── page-specific feature sections
```

The Stage provides consistency. Lower content may differ substantially page to page.

Some pages may allow the Stage background/aesthetic to continue through the lower page.

## Tone

Balanced between:
- playful / experimental / curious,
- credible / academic / event-oriented,

with a modest lean toward playful/experimental.

Information-heavy sections should be calmer than the Stage.

Desired rhythm:

**spectacle → clear information → visual accent → clear information**

## Responsive philosophy

Desktop and mobile are equal first-class experiences.

Do not design desktop and merely shrink it.

Mobile may legitimately change:
- subject placement,
- subject crop/scale,
- artwork variant,
- navigation placement,
- title placement,
- decorative density,
- accent boundary,
- content framing.

## Current phase

The Astro implementation architecture is established and Home Composition V1 is merged.

The current bounded phase is the new Phase 3 mobile layered-background integration branch. PR #8 has been accepted and squash-merged into `main` at `6f515d7ffd238519b9b44117942316874469142e`. The accepted desktop layered Home probability field, 640ms phase split, and two-endpoint box float remain locked; USER mobile QA passed the separately art-directed mobile base/overlay and responsive shared-wave configuration except for initial speed/population, now addressed by the current 28-instance speed correction pending final re-review.

Mobile now uses the Phase 3 portrait layered composition on this branch and does not load desktop base/overlay assets. Frame A remains historical fallback/provenance.

After Phase 3 is accepted and merged, continue through separately bounded Home-polish, About-page, content/branding, performance, and production phases.

Primary continuation docs:
- `agent_docs/orchestrator_handoff.md`
- `agent_docs/current_scene.md`
- `agent_docs/next_steps.md`
- `agent_docs/roadmap.md`
