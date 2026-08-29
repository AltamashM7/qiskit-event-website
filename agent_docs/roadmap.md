# Project Roadmap

## Roadmap philosophy

Use bounded gates:

`bounded phase → CI/preview → Orchestrator verification → USER visual QA → explicit acceptance → merge → next phase`

GitHub is authoritative.

## Current gate — Phase 3 mobile layered-background visual acceptance

PR #8 has been accepted and squash-merged into `main`.

Current verified `main` baseline:

`6f515d7ffd238519b9b44117942316874469142e`

Desktop layered background:
- USER accepted.

Two-endpoint box float:
- USER accepted and locked.

Phase-split reveal:
- implemented;
- technically verified;
- USER accepted and locked.

Mobile layered background:
- portrait base and transparent foreground overlay supplied and verified by USER;
- 14 responsive mobile wave instances reusing the eight shared wave deliveries;
- implementation is on `phase-3/home-mobile-layered-integration`;
- final-head CI/preview and USER visual QA remain pending.

If USER passes the mobile composition:
- re-check exact PR head/CI;
- require explicit merge authorization;
- squash merge the Phase 3 PR;
- verify new main;
- refresh docs.

## After Phase 3 — Home stabilization/polish

New bounded phase after the mobile layered background is accepted and merged.

Candidate work:
- Master Navigator visual refinement;
- Home identity typography/copy polish if needed;
- decide whether the accepted phase-split transition becomes part of broader site transition grammar;
- establish below-the-fold Home content requirements;
- broader accessibility/performance review after visual stabilization.

Do not reopen accepted layered-wave behavior casually.

## About Event Stage

Current route is a neutral shell.

Provisional direction:
- stylized qubit or another event-oriented quantum subject.

Before implementation:
- choose accent;
- approve art;
- define desktop/mobile composition;
- preserve reusable Stage/Nav architecture.

## About Quantum Mechanics Stage

Current route is a neutral shell.

Provisional ideas:
- Schrödinger-cat wanted poster;
- qubit/measurement feature;
- superposition/measurement interaction.

Not locked.

Choose one coherent Stage concept before implementation.

## Lower-page information architecture

After representative Stages stabilize, create calmer reusable information sections as actual content requires.

Possible modules:
- overview;
- schedule/program;
- speakers/mentors;
- hackathon/competition;
- organizers;
- FAQ/resources;
- venue/travel;
- registration;
- partners/sponsors;
- contact.

Stage = spectacle.
Lower content = readability.

## Branding phase

Potential future brands:
- college;
- Qiskit;
- IBM;
- sponsors/partners.

Rules:
- keep official logos separate from generated scene art;
- preserve official proportions/clear space;
- do not bake marks into background imagery.

## Content finalization

Do not invent event facts.

When authoritative content arrives:
- integrate only verified dates/venue/registration/sponsors/speakers/schedule;
- update metadata/SEO/canonical at same time.

## Performance hardening

Before production:
- measure transfer/decoded image costs;
- test representative weak hardware;
- inspect Core Web Vitals where practical;
- verify no eager loading of future-page art;
- verify reduced motion;
- verify mobile resource isolation;
- establish explicit budgets.

## Production / release

Production is not established.

Future:
- choose hostname;
- establish production Cloudflare Direct Upload path;
- canonical metadata;
- robots/sitemap/SEO;
- final accessibility;
- final cross-device QA;
- deploy only after explicit authorization.

A successful PR preview is not production readiness.

## Open decisions

- final page count;
- event content;
- non-Home accents;
- About-page subjects;
- lower-page structure;
- official branding;
- performance budgets;
- analytics;
- production hostname;
- production release process.
