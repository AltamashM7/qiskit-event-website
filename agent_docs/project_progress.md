# Project Progress

## Current overall status

**Phase: Home Composition V1 accepted and merged; Home background stepped animation implemented on bounded branch; visual acceptance pending; PR preview QA infrastructure established**

Phase 0A2 has been independently accepted and squash-merged into `main`. Home Composition V1 has been independently accepted and squash-merged into `main`. The approved Home background continuation frames B/C are now imported on the dedicated asset-import branch; background animation integration is implemented on the current bounded branch and remains pending visual acceptance.

The current bounded branch implements the approved A/B/C background set as a restrained CSS-driven stepped loop with an initial 3.6-second cycle and approximately 1.2 seconds per frame state. Reduced motion freezes Frame A. Visual acceptance remains pending independent Web Orchestrator and USER review.

The GitHub repository now exists, and the durable project-context documentation has been bootstrapped into it. The Phase 0A1 scaffold is merged into `main`.

Phase 0A1 established the Astro, static-output, TypeScript, npm, no-UI-framework scaffold and canonical source/asset directory structure. The original approved Home binaries have been manually supplied, imported, and merged into their canonical paths on `main`. Phase 0A2 established the reusable technical foundation and is now accepted and merged. Home Composition V1 is the first visual implementation and is intentionally limited to the Home Stage. The canonical approved Home background animation set is now A/B/C; this bounded branch adds only its restrained stepped animation integration without changing the approved PNG bytes.

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
  - future 2–3-frame animation suitability.

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
- Home V1 was accepted with background Frame A static; this bounded branch adds the separate A/B/C stepped animation integration without changing the accepted composition.
- Home-specific visual review was completed for V1; the PR-only preview and generated screenshots remain QA surfaces for future bounded changes.

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

- Independent Web Orchestrator and USER visual acceptance of this Home background stepped-animation phase.
- Production deployment.
- Performance budgets.
- Final branding assets/treatment.
- About Event implementation/assets.
- About Quantum Mechanics implementation/assets.
- Final event content integration.

## Current recommended gate

For the current Home background stepped-animation gate:
1. Verify the committed A/B/C paths, dimensions, hashes, and registry metadata.
2. Obtain independent Web Orchestrator verification of this stepped-animation branch and its final GitHub Actions result.
3. Review the A → B → C → A stepping, initial timing candidate, blank-flash safety, desktop/mobile geometry, and reduced-motion behavior.
4. Keep About Event and About Quantum Mechanics as neutral shells during this gate.

Cloudflare production deployment remains intentionally deferred. Home Composition V1 is accepted and merged. The current bounded implementation is the restrained Home background A/B/C stepped loop; visual acceptance remains pending, and no further page or production work should begin until the Web Orchestrator and USER complete this gate.
