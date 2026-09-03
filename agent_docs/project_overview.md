# Project Overview

## Project

Frontend-first website for a Qiskit Fall Fest event.

The website is being completed first with realistic dummy data in the final intended content format so its visual system and information architecture can be reviewed before real event logistics are inserted.

## Product intent

The site combines:

**game-menu energy + artistic scene composition + clear formal event information + carefully controlled performance**

The Home visual foundation is already USER accepted.

The separately approved associate template `Vishwesh-Bhilare/fallfest` is used only as a reference for useful event-information types and formal content structure. Its placeholder facts and visual design are not authoritative for this project.

## Current approved target site map

1. Home
2. Schedule
3. Speakers

The existing About Event and About Quantum Mechanics route shells are legacy prototype routes pending a bounded replacement phase.

An additional informational/educational route may be considered later only if the USER chooses to add one.

## Major page structure

Each major page follows:

```text
PAGE
├── UNIQUE ART-DIRECTED HERO / STAGE
├── PERSISTENT SITE-LEVEL MASTER NAVIGATOR
└── MOSTLY-STATIC FORMAL CONTENT
    └── SITE FOOTER
```

Hero visual assets remain page-specific.

Formal sections use reusable layout/typography/divider/CTA patterns and do not require newly generated visual assets.

## Home formal architecture

1. Event Snapshot
2. About the Event
3. What You'll Do / What to Expect
4. Program Preview
5. Speakers Preview
6. Organizers + Registration
7. Footer

## Schedule formal architecture

After its unique hero:
- concise program context;
- day/date selection where needed;
- full schedule/timeline;
- participation CTA;
- footer.

## Speakers formal architecture

After its unique hero:
- concise speakers introduction;
- full speaker directory;
- participation CTA;
- footer.

## Responsive philosophy

Desktop and mobile remain separately considered first-class experiences.

The formal system should collapse predictably on mobile while preserving the shared editorial hierarchy and avoiding heavy effects.

## Current phase

Home's representative visual system and persistent Master Navigator are stabilized and USER accepted.

The official website/rules material has now been ingested. The revised three-route site map and formal content architecture are USER approved at the planning level.

The remaining pre-implementation task is to decide the exact formal visual grammar: Stage-to-content transition, surface/background treatment, grid, headers/numbering, dividers, accent usage, CTAs, spacing, mobile collapse, and footer.

No Luna implementation prompt should be created before that discussion is approved.

Production remains unestablished.

Primary continuation docs:
- `agent_docs/official_requirements.md`
- `agent_docs/content_architecture.md`
- `agent_docs/orchestrator_handoff.md`
- `agent_docs/current_scene.md`
- `agent_docs/next_steps.md`
- `agent_docs/roadmap.md`
