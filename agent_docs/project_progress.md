# Project Progress

## Current overall status
**Phase: Draft PR #8 — desktop layered Home background visually accepted; final Schrödinger-box motion polish pending**

Repository: `https://github.com/AltamashM7/qiskit-event-website`

Main baseline before PR #8:
`67f3094599dbd7af6fd1772e486ff250677d5e22`

Branch:
`phase-2/home-layered-background-integration`

PR:
`https://github.com/AltamashM7/qiskit-event-website/pull/8`

Last application/visual head before documentation handoff commits:
`25cf7117e0f44da99534d9372a85f25291325034`

PR #8 remains Draft/open/unmerged.

## Accepted / merged milestones
### Phase 0A1
- Astro static-output scaffold.
- TypeScript + npm.
- canonical `src/` and `public/assets/` structure.
- no frontend UI framework.

### Approved Home asset import
- canonical Home background and Schrödinger assets committed.
- A/B/C frame set preserved for provenance.

### Phase 0A2
- Node 24 baseline.
- `SiteLayout`, `StageShell`, `MasterNavigator`.
- data-driven routes/navigation.
- Playwright Chromium QA.
- Axe serious/critical accessibility baseline.
- reduced-motion foundation.
- GitHub Actions verification.

### Home Composition V1
- accepted and squash-merged.
- desktop/mobile Home Stage composition.
- generic non-fabricated event identity copy.
- closed/reveal box states.
- hover/focus temporary reveal.
- click lock/unlock.
- mobile tap toggle.
- initial low-cost box idle motion.
- Frame A mobile composition.

### Home layered background Phase A
- accepted and merged in PR #7.
- main advanced to `67f3094599dbd7af6fd1772e486ff250677d5e22`.
- static desktop base, transparent overlay, eight wave masters/deliveries.
- deterministic Sharp delivery generator.
- no asset-byte mutation after approval.

## Superseded
PR #6:
- old full-frame A→B→C stepped-animation experiment.
- closed/unmerged.
- superseded by layered desktop architecture.

## PR #8 — accepted background state
Desktop uses:
- layered WebP base;
- 20 wave elements reusing 8 assets;
- foreground neutral/boundary overlay;
- CSS-only independent linear horizontal transform motion.

Family counts:
- 01 thick cream upper: 1;
- 02 thick cream lower: 1;
- 03 thin yellow: 3;
- 04 thin ivory: 3;
- 05 dashed white upper: 3;
- 06 dashed white lower: 3;
- 07 halftone yellow band: 3;
- 08 translucent cream ribbon: 3.

Accepted rules:
- thick cream waves full opacity;
- large/broad layers behind smaller ones;
- dominant ribbon roughly 220% × 500%, opacity 0.5, z-index 0;
- upper/middle/lower distribution;
- stronger crest/trough amplitude.

Accepted motion:
- constant linear left→right;
- about 7.2–16.5s duration;
- tested effective velocity about 14.78–23.63 vw/s;
- broad underlayers slower, crossing thin/dashed layers faster.

Accepted boundary:
- reset hidden beneath neutral overlay;
- meaningful alpha starts on masked side;
- visible wave emerges through irregular boundary;
- no pop-in inside yellow.

Regression tests measure real alpha/overlay geometry across:
- 1024×768;
- 1280×720;
- 1440×900;
- 1920×1080.

USER explicitly passed:
- boundary illusion;
- speed;
- occupancy;
- overlap;
- depth;
- amplitude;
- vertical filling;
- broad ribbon;
- performance.

Wave system is locked for remaining box-only polish.

## Mobile
Mobile continues using Frame A.

Tests prove mobile does not request desktop layered base, overlay, or wave deliveries.

Mobile layered integration is not part of PR #8.

## Current box state
Accepted interaction:
- desktop hover/focus temporary reveal;
- click lock/unlock;
- mobile tap toggle.

Locked reveal alignment:
`translate(0.993070%, 1.680001%) scale(0.953033, 0.951307)`

Remaining:
1. idle float too subtle against moving waves;
2. reveal reads as plain crossfade.

Planned:
- stronger natural idle;
- separate state wrappers;
- transform+opacity phase split;
- no heavy effects/dependencies;
- preserve calibration and interaction state machine.

See `agent_docs/next_steps.md`.

## Last verified application CI
Run:
`https://github.com/AltamashM7/qiskit-event-website/actions/runs/33178114740`

Head:
`25cf7117e0f44da99534d9372a85f25291325034`

Jobs:
- Technical verification: success.
- Cloudflare preview and visual QA: success.

Artifact:
- `home-visual-qa-pr-8`
- ID `9688571773`
- digest `sha256:3296492e2b5e58059fba9353d553633bcf1bf739cae2004017d432f17bd25ae8`
- six PNGs.

Immutable preview:
`https://277fd989.qiskit-event-website.pages.dev/`

No production deployment.

## Outstanding before PR #8 merge
- stronger box float;
- performant reveal phase split;
- no-jump verification;
- final normal-motion USER QA;
- final exact-head Orchestrator verification;
- final-head CI success;
- explicit USER merge approval.

## Not yet done
- mobile layered background/art direction;
- final Home lower content;
- final Master Navigator polish;
- About Event visual implementation;
- About Quantum Mechanics visual implementation;
- final event facts/content;
- official branding;
- formal performance budgets;
- production hostname/deployment/release;
- final SEO/release QA.

See `agent_docs/roadmap.md`.
