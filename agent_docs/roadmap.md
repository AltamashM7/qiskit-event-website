# Project Roadmap

## Roadmap philosophy
Build through bounded visual/technical gates.

Preferred rhythm:
`one bounded phase → CI/preview → Orchestrator verification → USER visual QA → explicit acceptance → merge → next phase`

GitHub is authoritative.

## Current phase — finish PR #8
Current PR:
`https://github.com/AltamashM7/qiskit-event-website/pull/8`

Desktop layered-wave visual QA has passed.

Remaining:
1. strengthen Schrödinger-box idle float;
2. replace plain crossfade with lightweight transform+opacity phase-split reveal;
3. verify no state/alignment jump;
4. preserve accessibility/reduced motion;
5. preserve locked wave system;
6. run local verification;
7. run final-head Actions;
8. USER tests live normal motion;
9. Orchestrator independently verifies final head;
10. USER explicitly approves merge;
11. squash merge only after authorization.

## After PR #8 — Home stabilization/polish
New bounded phase after PR #8 merges.

Candidate work:
- Master Navigator visual refinement;
- evaluate Home identity typography/copy polish;
- establish reusable interaction-transition grammar;
- inspect below-the-fold Home content needs;
- keep event facts provisional until supplied;
- broader desktop/mobile accessibility/performance sweep.

Do not change accepted layered background merely because a new phase begins.

## Mobile layered background — separate optional phase
Current mobile uses Frame A.

Do not automatically stretch/port desktop layered art to portrait.

If desired:
1. art-direct separately;
2. decide whether mobile-specific base/overlay masters are required;
3. use Art Assets workflow;
4. set mobile performance budget;
5. integrate in its own Draft PR;
6. verify weak-phone smoothness.

Frame A is a valid fallback until a replacement is accepted.

## About Event Stage
Current route is a neutral shell.

Provisional subject:
- stylized qubit or other event-oriented quantum subject.

Before implementation:
- confirm accent family;
- approve subject/background assets;
- define desktop/mobile Stage composition;
- keep reusable navigation/Stage boundaries;
- do not copy Home geometry mechanically.

## About Quantum Mechanics Stage
Current route is a neutral shell.

Provisional ideas:
- Schrödinger-cat wanted-poster language;
- lower qubit/measurement feature scene;
- measurement/superposition interaction.

These are not final.

Before implementation:
- choose one main Stage concept;
- approve art;
- define interaction/performance model;
- keep explanations understandable to a general student audience.

## Lower-page information architecture
After representative Stages stabilize, build calmer reusable section primitives.

Potential modules only if actual content requires them:
- overview;
- schedule/program;
- speakers/mentors;
- hackathon/competition info;
- organizers;
- FAQ/resources;
- venue/travel;
- registration;
- partners/sponsors;
- contact.

Stage = spectacle; lower content = readability.

## Branding phase
Likely future:
- college;
- Qiskit;
- IBM;
- sponsors/partners.

Rules:
- official logos separate from generated art;
- never bake official marks into scene backgrounds;
- preserve official proportions/clear space;
- establish brand-safe zones after real assets are supplied.

## Content-finalization phase
Do not invent event facts.

When authoritative content arrives:
- integrate supplied wording/data;
- add dates/venue/registration/sponsors/speakers/schedule only when verified;
- update metadata/SEO/canonical at the same time.

## Performance hardening
Before production:
- measure Home transfer/decoded-image cost;
- measure animation smoothness on representative weak hardware;
- check Core Web Vitals where practical;
- verify no accidental eager loading of future-page art;
- confirm reduced motion;
- confirm no desktop decorative asset leakage to mobile;
- establish documented budgets.

## Production/release
Production is intentionally not established.

Future:
- choose/confirm hostname;
- establish production Cloudflare Pages path;
- keep Direct Upload unless deliberately changed;
- canonical metadata;
- robots/sitemap/SEO;
- final accessibility/cross-device QA;
- deploy only after explicit authorization.

A green PR preview is not production readiness.

## Open decisions
- final page count;
- final event content;
- final non-Home accents;
- final About subjects;
- final lower-page structure;
- official branding requirements;
- exact performance budgets;
- analytics;
- production hostname;
- production release process.
