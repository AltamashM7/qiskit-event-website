# Project Roadmap

## Roadmap philosophy

Use bounded gates:

`bounded phase → CI/preview → Orchestrator verification → USER visual QA → explicit acceptance → merge → next phase`

GitHub is authoritative.

## Current gate — Phase 4 persistent shared Master Navigator

PR #9 has been accepted and squash-merged into `main`.

Current verified `main` baseline:

`003d58e7d328fb539a5690b9e4fa86232e7eab0c`

Desktop layered background:
- USER accepted.

Two-endpoint box float:
- USER accepted and locked.

Phase-split reveal:
- implemented;
- technically verified;
- USER accepted and locked.

Mobile layered background:
- portrait base and transparent foreground overlay supplied, verified, accepted, and merged;
- 44 responsive mobile wave instances: the existing large/background and halftone presence plus a doubled thin/dashed small-wave population;
- the original yellow/orange Wave 03 small-wave family is restored; all other active mobile wave visuals are white, using five mobile-only white variants plus the shared white dashed deliveries;
- the Phase 3 implementation was accepted and squash-merged from `phase-3/home-mobile-layered-integration`;
- broad phone and PC visual review passed, and the final accent/title correction was accepted. The previous warm direction and blue/cyan experiment remain rejected.

Phase 4 implementation:
- one persistent site-level Master Navigator is rendered by `SiteLayout`;
- Home, About Event, and About Quantum Mechanics no longer render duplicate Stage-owned Navigator instances;
- the reviewed Navigator visual design and exact fixed desktop/mobile position are USER-approved;
- Home reserves the former Navigator row height so the accepted initial composition footprint remains stable;
- Phase 4 remains pending USER visual acceptance.

## After Phase 4 — Home stabilization/polish

New bounded work after the persistent Navigator is accepted and merged.

Candidate work:
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
