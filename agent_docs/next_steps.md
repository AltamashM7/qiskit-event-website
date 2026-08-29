# Immediate Next Steps

## Current gate

PR #8 was accepted and squash-merged into `main` at:

`6f515d7ffd238519b9b44117942316874469142e`

The current bounded phase is `phase-3/home-mobile-layered-integration`. USER mobile QA accepts the layered portrait composition's speed and large-wave concentration; the previous warm direction and subsequent blue/cyan experiment were rejected, so the current correction returns all active mobile waves to white and doubles the thin/dashed small-wave population. Final-head CI/preview verification and USER re-review remain pending.

Do not begin Master Navigator refinement or another page until this mobile visual gate is complete.

## Mobile implementation under review

- Base: `public/assets/home/mobile-layered/home-mobile-layered-base-v1.png`
- Foreground overlay: `public/assets/home/mobile-layered/home-mobile-layered-overlay-v1.png`
- 44 responsive mobile wave instances with the accepted doubled mobile speed;
- all active mobile wave visuals use white assets, with six mobile-only white variants and shared white dashed deliveries;
- all eight approved wave deliveries reused as shared assets;
- the thin/dashed small-wave families 03–06 are doubled from four to eight instances each;
- mobile base/overlay and wave configuration are isolated from desktop resources;
- desktop layered waves and accepted Schrödinger box motion/reveal remain unchanged.

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

## Verification and merge gate

After the final implementation commit:

1. Run `npm run check`.
2. Run `npm run verify`.
3. Run `npm run build`.
4. Push the same Phase 3 branch.
5. Confirm the final-head GitHub Actions run tests the exact PR head.
6. Inspect the immutable Cloudflare preview and PR alias.
7. Require explicit USER acceptance and merge authorization before merging.

Production deployment remains out of scope. A successful PR preview is not production readiness.
