# Immediate Next Steps

## Current gate

PR #9 was accepted and squash-merged into `main` at:

`003d58e7d328fb539a5690b9e4fa86232e7eab0c`

The current bounded phase is `phase-4/persistent-master-navigator`. The Phase 3 mobile layered composition, including the original yellow/orange Wave 03 small-wave family and QISKIT readability correction, is accepted and locked. Phase 4 makes the reviewed Master Navigator visual design persistent at site level with the USER-approved fixed desktop/mobile position; implementation remains pending USER visual acceptance.

Do not begin About-page art direction or another unrelated phase until the Phase 4 visual gate is complete.

## Accepted mobile implementation

- Base: `public/assets/home/mobile-layered/home-mobile-layered-base-v1.png`
- Foreground overlay: `public/assets/home/mobile-layered/home-mobile-layered-overlay-v1.png`
- 44 responsive mobile wave instances with the accepted doubled mobile speed;
- the original yellow/orange Wave 03 small-wave family is restored; all other active mobile wave visuals use white assets, with five mobile-only white variants and shared white dashed deliveries;
- all eight approved wave deliveries reused as shared assets;
- the thin/dashed small-wave families 03–06 are doubled from four to eight instances each;
- mobile base/overlay and wave configuration are isolated from desktop resources;
- desktop layered waves and accepted Schrödinger box motion/reveal remain unchanged.

## Phase 4 implementation under review

- one site-level `MasterNavigator` is rendered by `SiteLayout` on all three routes;
- Stage-owned Navigator copies are removed while the generic `StageShell` navigation slot remains available;
- the existing Navigator appearance, labels, routes, active state, keyboard behavior, and reduced-motion behavior are preserved;
- the Navigator is fixed near the existing desktop/mobile top gutter without scroll morphing or scroll listeners;
- Home reserves the former Navigator row height to preserve its accepted initial composition footprint.

## USER visual QA checklist

Review the exact deployed preview on normal, compact, short, and tall portrait variants:

- same probability-field language as desktop, art-directed for portrait;
- waves emerge from and disappear beneath the irregular boundary naturally;
- useful broad-underlayer, thick, thin, dashed, halftone, and ribbon depth;
- activity is distributed through the portrait height without becoming noisy;
- motion feels continuous and close in character to desktop;
- no exposed reset/pop, horizontal overflow, or content/readability regression;
- box interaction and accepted reveal alignment remain intact;
- reduced motion leaves an intentional static layered composition;
- performance remains appropriate for ordinary phones and weak college computers.

## Phase 4 verification and merge gate

After the final Phase 4 implementation commit:

1. Run `npm run check`.
2. Run `npm run verify`.
3. Run `npm run build`.
4. Push the Phase 4 branch.
5. Confirm the final-head GitHub Actions run tests the exact PR head.
6. Inspect the immutable Cloudflare preview and PR alias for desktop and portrait top/scrolled states.
7. Require explicit USER visual acceptance and merge authorization before merging.

Production deployment remains out of scope. A successful PR preview is not production readiness.
