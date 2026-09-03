# Project Roadmap

## Roadmap philosophy

Use bounded gates:

`requirements/content intake → discussion → bounded phase → Draft PR → CI/preview → Orchestrator verification → USER QA → explicit merge → next phase`

GitHub is authoritative.

## Completed representative visual foundation

USER accepted and merged:
- Astro/static technical foundation;
- Home Composition V1;
- layered desktop Home probability field;
- accepted Schrödinger box idle/reveal interaction;
- separately art-directed mobile layered Home composition;
- persistent shared Master Navigator.

Current implementation baseline before the next content phase:
`2b62d90b127e5987f6c284373efde476d73b2a4a`

## Requirements/content reconciliation — completed at planning level

The official kickoff material and approved associate template have been reviewed.

USER-approved target:
- Home;
- Schedule;
- Speakers;
- realistic dummy data for review;
- unique hero/Stage per route;
- mostly-static formal content;
- no newly generated visual assets for formal sections.

See:
- `agent_docs/official_requirements.md`
- `agent_docs/content_architecture.md`

## Current gate — formal visual grammar

Discuss and lock:
- Stage-to-formal transition;
- formal surface/background;
- grid/max-width;
- section headings/numbering;
- dividers/borders;
- accent usage;
- CTA treatment;
- spacing/rhythm;
- mobile collapse;
- footer.

No Luna prompt before USER approval of this grammar.

## Likely bounded implementation sequence after approval

Exact sequencing still requires USER approval, but the current likely path is:

1. shared formal-content primitives + Home below-the-fold dummy-content architecture;
2. route/navigation migration from legacy About shells to Schedule/Speakers;
3. Schedule hero + formal schedule page;
4. Speakers hero + formal speaker page;
5. branding/registration-content integration as permitted;
6. content/SEO/accessibility/performance hardening;
7. production hostname/release path and final launch QA.

Do not treat this ordering as authorization to implement.

## Pre-production

Still required before release:
- approved final visual review;
- real authoritative event content;
- approved branding assets/usage;
- real registration destination and required eligibility/photo-release handling;
- explicit performance budgets/checks;
- final accessibility and cross-device QA;
- SEO/canonical/robots/sitemap as appropriate;
- production hostname and Cloudflare release path;
- explicit USER production authorization.

A successful PR preview is not production readiness.
