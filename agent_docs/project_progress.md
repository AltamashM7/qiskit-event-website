# Project Progress

## Current overall status

**Phase: Home Composition V1 accepted and merged; layered Home background asset foundation imported; animation/integration pending; PR preview QA infrastructure established**

Phase 0A2 has been independently accepted and squash-merged into `main`. Home Composition V1 has been independently accepted and squash-merged into `main`. The approved Home background continuation frames B/C remain committed as the earlier full-frame exploration; the old Draft PR #6 frame-swap exploration remains unmerged and is superseded as the chosen direction by the desktop layered-wave architecture. This Phase A branch imports the user-supplied layered masters and generates optimized desktop delivery assets; Home background animation/integration remains pending.

The GitHub repository now exists, and the durable project-context documentation has been bootstrapped into it. The Phase 0A1 scaffold is merged into `main`.

Phase 0A1 established the Astro, static-output, TypeScript, npm, no-UI-framework scaffold and canonical source/asset directory structure. The original approved Home binaries have been manually supplied, imported, and merged into their canonical paths on `main`. Phase 0A2 established the reusable technical foundation and is now accepted and merged. Home Composition V1 is the first visual implementation and is intentionally limited to the Home Stage. The canonical approved full-frame Home set remains A/B/C for provenance, while the layered-wave architecture is now the chosen direction; no layered animation or Home integration has been added in this asset-foundation phase.

Cloudflare Pages Direct Upload PR-preview infrastructure is now established on this branch through GitHub Actions and `cloudflare/wrangler-action@v4`, gated after Technical verification. The preview publishes the built site and six reduced-motion Chromium screenshots for independent Web Orchestrator visual QA: desktop, normal-mobile, and compact-mobile closed/reveal pairs. Production deployment and Cloudflare Git integration are not established.

## Completed / accepted

### Product direction
- Full-screen Stage model accepted.
- Lower information content model accepted.
- Initial page set established:
  - Home
  - About Event
  - About Quantum Mechanics
- V1 Master Navigator direction established.
- Plausible student-academic filler copy approved for development.

### Visual direction
- Main-subject halftone/dither/pixel-print style approved.
- Neutral + bold page-accent system approved.
- Home electric-yellow accent approved.
- Home background foundational concept approved:
  - calm monochrome/off-white area,
  - yellow probability/interference field,
  - simple large 2D wave forms,
  - one static no-wave base background,
  - eight independent transparent wave layers,
  - foreground neutral/boundary overlay above the waves,
  - lightweight independent continuous transform-based wave movement planned for a later phase; not implemented in Phase A.

### Schrödinger interaction
- Closed-box discovery model approved.
- No explicit instruction/CTA text.
- `SCHRÖDINGER'S BOX` label on opaque state approved.
- Hover/focus + click/tap interaction behavior approved.
- Smooth low-cost idle movement approved.
- Half-skeletal / half-living cat direction approved.
- Adjusted cat composite approved as working reference.
- Reveal-state box reference approved.
- Reveal transparency concept approved:
  - directional gradient,
  - more transparent upper/right region,
  - opposite side more opaque,
  - fully opaque bottom,
  - plain/minimal interior,
  - no text over cat.

### Workflow
- Iterative art generation is moved to a dedicated Art Assets chat/workstream.
- Main orchestrator/development context should only receive approved asset outputs and implementation constraints.

### Technical scaffold
- Astro static-output project scaffold established for Phase 0A1.
- TypeScript and npm configured.
- No React, Vue, Svelte, Tailwind, GSAP, or UI component framework added.
- Canonical `src/` and `public/assets/` directory structure established.
- Neutral About route shells and reusable Stage/navigation/layout boundaries now exist; Home Composition V1 is implemented within those boundaries.
- The approved Home binary assets are imported and committed at their canonical paths, including the A/B/C background frame set.

### Phase 0A2 technical foundation (accepted / merged)
- Astro static output, TypeScript, npm, and Node.js 24 LTS baseline established.
- Reusable `SiteLayout`, `StageShell`, `MasterNavigator`, and data-driven route/navigation boundaries established.
- Neutral shells remain in place for About Event and About Quantum Mechanics; Home now uses its bounded visual composition.
- `astro check`, static build, Playwright Chromium browser QA, and serious/critical Axe baseline coverage established.
- GitHub Actions verification established for pull requests to and pushes to `main`.
- Reduced-motion tokens and baseline behavior established.
- The approved binaries remain unchanged and are served from their canonical paths; Home V1 uses only the approved background and closed/reveal box states.

### Home Composition V1 (accepted / merged)
- Home Stage composition is implemented for desktop and mobile using the existing `StageShell` and `MasterNavigator` boundaries.
- The approved static background and approved opaque/reveal box states are integrated without modifying the six source PNGs.
- Hover/focus reveal, click lock/unlock, coarse-pointer tap toggle, restrained idle motion, and reduced-motion behavior are implemented.
- Home Composition V1 was independently accepted and squash-merged into `main`.
- Home currently renders background Frame A only; no B/C animation behavior was added during the asset-import phase.
- Home-specific visual review was completed for V1; the PR-only preview and generated screenshots remain QA surfaces for future bounded changes.

### Home layered background asset foundation (Phase A)
- The earlier full-frame A/B/C frame-swap exploration on Draft PR #6 remains unmerged and is superseded by the layered-wave direction.
- User-supplied desktop layered masters were imported under `public/assets/home/background/layered/masters/desktop/`.
- The chosen production architecture is one static no-wave base background, eight independent transparent wave layers, and a foreground neutral/boundary overlay above the waves.
- Optimized desktop WebP delivery derivatives were generated under `public/assets/home/background/layered/web/desktop/` with the committed `scripts/generate-layered-background-deliveries.mjs` helper.
- The overlay master was verified to contain real alpha transparency; the masters remain immutable and were not resized, cropped, recolored, or rewritten.
- Later bounded integration may give the wave layers lightweight independent continuous transform-based movement; no layered animation or Home integration was implemented in this phase.
- No replacement of the current Frame A rendering was implemented in this phase.
- Mobile-specific layered base/overlay assets are not part of this phase.

### PR preview / visual QA infrastructure (established)
- Same-repository pull requests now receive a Cloudflare Pages Direct Upload preview after the authoritative Technical verification job succeeds.
- The preview uses a `pr-<number>` branch alias and includes these generated, uncommitted QA screenshots:
  - `dist/__qa/home-desktop-closed.png`
  - `dist/__qa/home-desktop-reveal.png`
  - `dist/__qa/home-mobile-closed.png`
  - `dist/__qa/home-mobile-reveal.png`
  - `dist/__qa/home-mobile-compact-closed.png`
  - `dist/__qa/home-mobile-compact-reveal.png`
- Preview HTTP checks cover the Home route, all six generated Home screenshots across desktop, normal-mobile, and compact-mobile closed/reveal pairs, About Event, and About Quantum Mechanics.
- Localhost production preview remains the rapid development loop. Production deployment and Cloudflare Git integration remain unestablished.

## Not yet done

- Independent Web Orchestrator verification and approval of this Home layered background asset-foundation phase.
- Production deployment.
- Performance budgets.
- Layered Home background integration and wave animation.
- Mobile-specific layered Home background assets.
- Final branding assets/treatment.
- About Event implementation/assets.
- About Quantum Mechanics implementation/assets.
- Final event content integration.

## Current recommended gate

For the current Home layered background asset-foundation gate:
1. Verify the committed desktop master and delivery paths, dimensions, alpha status, hashes, and registry metadata.
2. Obtain independent Web Orchestrator verification of this Phase A branch and its final GitHub Actions result.
3. Keep layered Home integration and wave animation as a separate bounded phase after this asset-foundation approval.
4. Keep mobile-specific layered assets, About Event, and About Quantum Mechanics as separate future work.

Cloudflare production deployment remains intentionally deferred. Home Composition V1 is accepted and merged. The old Draft PR #6 full-frame frame-swap exploration remains unmerged and superseded; do not begin layered Home integration or wave animation until this asset-foundation phase is independently verified.
