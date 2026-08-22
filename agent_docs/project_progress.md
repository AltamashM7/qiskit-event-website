# Project Progress

## Current overall status

**Phase: Home Composition V1 implemented / pending Web Orchestrator + user visual acceptance**

Phase 0A2 has been independently accepted and squash-merged into `main`. Home Composition V1 is implemented on the current feature branch using the approved Home binaries and remains pending independent Web Orchestrator verification and user visual acceptance.

The GitHub repository now exists, and the durable project-context documentation has been bootstrapped into it. The Phase 0A1 scaffold is merged into `main`.

Phase 0A1 established the Astro, static-output, TypeScript, npm, no-UI-framework scaffold and canonical source/asset directory structure. The six approved Home binaries have been manually supplied, imported, and merged into their canonical paths on `main`. Phase 0A2 established the reusable technical foundation and is now accepted and merged. Home Composition V1 is the first visual implementation and is intentionally limited to the Home Stage.

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
- The six approved Home binary assets are imported and committed at their canonical paths.

### Phase 0A2 technical foundation (accepted / merged)
- Astro static output, TypeScript, npm, and Node.js 24 LTS baseline established.
- Reusable `SiteLayout`, `StageShell`, `MasterNavigator`, and data-driven route/navigation boundaries established.
- Neutral shells remain in place for About Event and About Quantum Mechanics; Home now uses its bounded visual composition.
- `astro check`, static build, Playwright Chromium browser QA, and serious/critical Axe baseline coverage established.
- GitHub Actions verification established for pull requests to and pushes to `main`.
- Reduced-motion tokens and baseline behavior established.
- The approved binaries remain unchanged and are served from their canonical paths; Home V1 uses only the approved background and closed/reveal box states.

### Home Composition V1 (implemented / pending Web Orchestrator + user visual acceptance)
- Home Stage composition is implemented for desktop and mobile using the existing `StageShell` and `MasterNavigator` boundaries.
- The approved static background and approved opaque/reveal box states are integrated without modifying the six source PNGs.
- Hover/focus reveal, click lock/unlock, coarse-pointer tap toggle, restrained idle motion, and reduced-motion behavior are implemented.
- Home-specific visual review is local-first; no deployment preview has been established.

## Not yet done

- Web Orchestrator and user visual acceptance of Home Composition V1.
- Preview deployment.
- Performance budgets.
- Home background 2–3-frame production animation set.
- Final branding assets/treatment.
- About Event implementation/assets.
- About Quantum Mechanics implementation/assets.
- Final event content integration.

## Current recommended gate

For the current Home visual gate:
1. Review the local production preview at desktop and mobile sizes, including the background crop, navigator, box states, interaction, and reduced motion.
2. Obtain independent Web Orchestrator verification of the Home V1 branch and final GitHub Actions result.
3. Obtain user visual approval in-browser before expanding the rest of the site.
4. Keep About Event and About Quantum Mechanics as neutral shells until that approval.

Cloudflare/deployment remains intentionally deferred. Home Composition V1 is implemented and pending Web Orchestrator + user visual acceptance; it is not approved yet.
