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

The Astro static-output project scaffold is now established with TypeScript, npm, no frontend UI framework, and the canonical `src/` and `public/assets/` directory structure. The six approved Home binaries have been manually supplied, imported, and merged into `main` at their canonical paths. They are now integrated only into the bounded Home Composition V1; the About route shells remain neutral.

Home Composition V1 is implemented on the current feature branch and remains pending independent Web Orchestrator and user visual acceptance.

## Phase 0A2 technical foundation state

The Phase 0A2 feature branch establishes the reusable technical foundation only. It adds `SiteLayout`, `StageShell`, `MasterNavigator`, data-driven route/navigation boundaries, neutral shells for the three prototype routes, Astro checking, a static build, Playwright Chromium QA at desktop and mobile viewports, a serious/critical Axe baseline, reduced-motion tokens, and GitHub Actions verification.

Phase 0A2 was independently accepted and squash-merged into `main`. Its reusable technical foundation, checking, browser QA, reduced-motion tokens, and GitHub Actions verification remain the basis for Home V1.

## Home Composition V1 state

Home V1 is implemented locally on the bounded `phase-1/home-composition-v1` branch and is pending independent Web Orchestrator verification and user visual acceptance. The implementation is limited to the Home Stage:

- the approved static probability-field background is composed across the Stage;
- the approved opaque and authoritative reveal box states share one fixed-aspect-ratio subject wrapper;
- the existing real-link `MasterNavigator` is styled as a restrained top-center desktop menu and usable mobile bar;
- generic event identity/copy is used without inventing dates, venue, sponsors, speakers, or other unconfirmed facts;
- hover/focus reveal, click lock/unlock, coarse-pointer tap toggle, restrained CSS idle motion, and reduced-motion behavior are covered;
- the individual cat masters remain reference assets; the visible reveal uses `box-reveal-v1.png` and does not reconstruct the cat;
- visual review is local-first. Cloudflare, deployment, and About-page visual implementation remain intentionally deferred.

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

## Immediate next step

Do **not** generate more unrelated assets yet.

Review the Home V1 local production preview at desktop and mobile sizes, including background crop, navigator placement, typography, subject integration, hover/focus/click/tap behavior, idle motion, reduced motion, and weak-device performance. The next Orchestrator step is independent verification of this bounded Home V1 branch and its final GitHub Actions result.

Do not begin deployment, Cloudflare work, About-page visual implementation, background animation frames B/C, or additional page work before Home V1 receives the next acceptance decision. Preview deployment is not established, and user visual approval remains a required gate.

The first in-browser visual gate should validate:
- desktop composition,
- mobile composition,
- background/subject integration,
- navigator,
- typography,
- Schrödinger interaction,
- idle motion,
- reduced motion,
- weak-device performance.

Do not expand all pages until Home V1 is visually approved.
