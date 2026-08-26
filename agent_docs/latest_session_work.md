# Latest Session Work

## Session outcome

The long visual-discovery conversation was deliberately stopped before implementation because context was becoming bloated and causing decision drift.

The project now uses durable repository documentation as the intended shared context between:
- Web ChatGPT Orchestrator,
- Codex Luna / repository-native Builder,
- future fresh sessions.

A separate Art Assets conversation/workstream will handle iterative image generation.

Repository bootstrap is now complete. GitHub is the authoritative shared implementation state for the project.

## Phase 0A1 scaffold state

The Astro static-output project scaffold is now established with TypeScript, npm, no frontend UI framework, and the canonical `src/` and `public/assets/` directory structure. The original approved Home binaries have been manually supplied, imported, and merged into `main` at their canonical paths. Approved background continuation frames B/C are now imported on the dedicated asset-import branch; the About route shells remain neutral.

Home Composition V1 was independently accepted and squash-merged into `main`. The canonical approved background set is now A/B/C; this bounded branch adds the separate stepped animation integration while preserving the accepted composition.

## Phase 0A2 technical foundation state

The Phase 0A2 feature branch establishes the reusable technical foundation only. It adds `SiteLayout`, `StageShell`, `MasterNavigator`, data-driven route/navigation boundaries, neutral shells for the three prototype routes, Astro checking, a static build, Playwright Chromium QA at desktop and mobile viewports, a serious/critical Axe baseline, reduced-motion tokens, and GitHub Actions verification.

Phase 0A2 was independently accepted and squash-merged into `main`. Its reusable technical foundation, checking, browser QA, reduced-motion tokens, and GitHub Actions verification remain the basis for Home V1.

## PR preview / visual QA infrastructure state

Cloudflare Pages Direct Upload PR-preview infrastructure is now established on the Home V1 branch through GitHub Actions and `cloudflare/wrangler-action@v4`. The preview job runs only for same-repository pull requests, waits for the authoritative Technical verification job, deploys the built `dist/` output under a pull-request alias, and verifies the live Home/About routes plus six generated reduced-motion Chromium screenshots covering desktop, normal-mobile, and compact-mobile closed/reveal pairs. Localhost production preview remains the rapid development loop. Production deployment and Cloudflare Git integration are not established.

## Home Composition V1 state

Home V1 was independently accepted and squash-merged into `main`. The implementation is limited to the Home Stage:

- the approved static probability-field background is composed across the Stage;
- the approved opaque and authoritative reveal box states share one fixed-aspect-ratio subject wrapper;
- the existing real-link `MasterNavigator` is styled as a restrained top-center desktop menu and usable mobile bar;
- generic event identity/copy is used without inventing dates, venue, sponsors, speakers, or other unconfirmed facts;
- hover/focus reveal, click lock/unlock, coarse-pointer tap toggle, restrained CSS idle motion, and reduced-motion behavior are covered;
- the individual cat masters remain reference assets; the visible reveal uses `box-reveal-v1.png` and does not reconstruct the cat;
- the PR-only Cloudflare preview and generated screenshot artifacts remain QA surfaces; production deployment and About-page visual implementation remain intentionally deferred.

## Latest approved visual state

### Home background
Approved foundational direction:
- off-white/monochrome left side,
- electric-yellow superposition/probability field,
- flat 2D interference/wave forms,
- selective small pixel breakup,
- low noise,
- no generic HUD clutter,
- suitable for 2–3-frame stepped animation.

### Schrödinger's Box
Closed state:
- opaque industrial illustrated box,
- slight tilt,
- floating idle motion,
- `SCHRÖDINGER'S BOX` discovery label.

Reveal state:
- current approved reveal image is the authoritative reveal reference,
- same general box orientation,
- no large label over cat,
- directional gradient translucency,
- upper/right region more transparent,
- opposite region more opaque,
- bottom face fully opaque,
- plain/minimal interior,
- approved adjusted half-skeletal / half-living cat inside.

### Interaction
Desktop:
- hover/focus gives temporary reveal,
- click can lock/unlock reveal.

Mobile:
- tap toggles reveal.

## Important correction

Do not use the older unadjusted split-cat reference.

The correct working cat reference is the **adjusted composite** where the skeletal half was scaled/warped to better match the living cat's height/proportions.

If both adjusted and unadjusted variants exist in the repository, the unadjusted variant must be explicitly marked superseded or removed from production asset paths.

## Current bounded phase / next gate

The current branch implements the approved Home background frames B/C with the canonical `A → B → C → A` CSS-driven stepped loop. The current candidate is a 1.2-second cycle with approximately 0.4 seconds per state; reduced motion disables the loop and freezes Frame A. Mobile now presents the approved landscape artwork as a contained, scaled layer over a simple two-tone neutral/yellow underlay instead of the prior tight portrait cover crop. The approved PNG bytes, Home composition, Schrödinger interaction, and existing six deterministic reduced-motion QA captures remain unchanged in intent.

The next gate is independent Web Orchestrator and USER visual review of the actual loop: stepped readability, timing, blank-flash safety, C → A reset, desktop/mobile geometry, box stability, Android behavior, and reduced-motion Frame A. Do not claim the animation accepted before that review. Keep About Event and About Quantum Mechanics as neutral shells, and do not begin production deployment, Cloudflare Git integration, or additional page work during this gate.
