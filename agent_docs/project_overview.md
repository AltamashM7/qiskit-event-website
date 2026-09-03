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
│   └── page identity / brief copy
├── PERSISTENT SITE-LEVEL MASTER NAVIGATOR
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

Home's representative visual system is stabilized and USER accepted.

Merged milestones include:
- PR #8: accepted desktop layered probability field, two-endpoint box float, and 640ms phase-split reveal;
- PR #9: accepted separately art-directed mobile layered Home composition, 44-wave field, restored Wave 03 accent family, and QISKIT readability backing;
- PR #10: accepted persistent shared Master Navigator rendered once by `SiteLayout` across Home, About Event, and About Quantum Mechanics.

Current verified `main`:

`5dcffb25ac7253ddacc0101e7b63212c30dd01ce`

The USER has now received the official website content plus website rules/guidelines. Those materials are intentionally NOT encoded here yet because they have not been supplied in this orchestrator conversation. The next Web Orchestrator must ingest them first, reconcile them with the current prototype page model/architecture, and only then propose the next bounded phase.

Production remains unestablished.

Primary continuation docs:
- `agent_docs/orchestrator_handoff.md`
- `agent_docs/current_scene.md`
- `agent_docs/next_steps.md`
- `agent_docs/roadmap.md`
