# Decisions Register

This file distinguishes durable decisions from provisional ideas and superseded directions.

## LOCKED

### Product / information architecture

- The project is a new Qiskit event website.
- The current approved target site map is:
  - Home
  - Schedule
  - Speakers
- The previous About Event and About Quantum Mechanics prototype route shells are superseded as the target site map; they remain implemented only until a bounded route/content phase replaces them.
- An additional informational/educational route remains optional and requires later USER discussion.
- Review will use realistic dummy event data in the final intended content format before real event facts are inserted.
- Avoid Lorem ipsum where realistic dummy review copy can show the intended finished content shape.
- Dummy content must not fabricate corporate sponsorship, partnership, official IBM speakers, or other real-world brand relationships.
- Major pages begin with a large visual Stage.
- Detailed content appears below the Stage.
- Every major page participates in the shared reusable Master Navigator architecture.
- Master Navigator V1 uses stylized horizontal buttons/links.
- Filler content may be used during development if it reads like plausible student-academic event copy and is not presented as confirmed event fact.

### Visual language

- Main subjects use a flat 2D graphic, halftone/dither/pixel-print style.
- Subjects should not be realistic 3D renders.
- Backgrounds should remain relatively simple and low-noise.
- Subject/background integration matters; subjects may participate in the division between neutral and accent fields.
- Different pages may use different accent families.
- Home accent: bright electric yellow.
- Desktop and mobile are separate art-directed compositions.

### Home Stage

- Desktop event typography lives on the left.
- Schrödinger's Box lives on the right.
- Master Navigator is a persistent site-level control fixed at the approved top-center desktop position and corresponding mobile top position; it is not Stage-owned.
- No explicit “Find Out” or equivalent instructional prompt.
- Closed box includes `SCHRÖDINGER'S BOX` as the discovery cue.
- Box receives subtle smooth floating/tilt idle animation.
- Desktop hover/focus temporarily reveals the cat.
- Click can lock/unlock reveal.
- Mobile tap toggles reveal.
- Reveal does not change box orientation.
- Reveal-state image contains no large text over the cat.
- Bottom face of reveal box remains opaque.
- Interior is plain/minimal rather than detailed.
- Reveal uses directional gradient translucency rather than a hard glass-window boundary.
- Home background foundation: neutral/off-white side + bright yellow superposition/probability field.
- Desktop Home probability-field architecture is locked to a static no-wave base + independent transparent wave instances + foreground neutral/boundary overlay.
- Current accepted desktop composition renders 20 wave instances while reusing eight approved assets: wave families 01–02 once each and 03–08 three times each.
- Larger/broader wave families remain behind smaller/thinner/dashed waves.
- The dominant translucent ribbon is intentionally vertically broad (currently about 220% width, 500% height, 0.5 opacity, z-index 0).
- Desktop wave reset/spawn must remain hidden beneath the irregular neutral overlay and emerge through the boundary rather than appear inside the yellow region.
- Mobile remains separately art-directed from desktop; Frame A is retained as historical fallback while the accepted Phase 3 portrait layered implementation remains the active mobile background.

### Persistent shared Master Navigator — merged / locked

- `SiteLayout` renders exactly one shared `MasterNavigator` per route; individual Stages do not render duplicate Navigator instances.
- The reviewed Navigator visual design and exact fixed desktop/mobile position are USER-approved: near the existing desktop top-center gutter and near the existing one-rem mobile top gutter.
- The Navigator keeps the current labels, routes, active state, three-column mobile presentation, keyboard behavior, and reduced-motion behavior.
- PR #10 was USER accepted and squash-merged into `main` at `5dcffb25ac7253ddacc0101e7b63212c30dd01ce`.
- Home reserves the former Navigator row height to preserve the accepted initial composition footprint.

### Formal content system

- Every major route keeps a unique art-directed Stage/hero followed by calmer formal information.
- Visual assets are reserved for hero/Stage systems; formal sections do not require newly generated visual assets.
- Formal content is mostly static and prioritizes readability and weak-device performance.
- Shared formal structure should be reusable across Home, Schedule, and Speakers where relevant without making the pages visual clones.
- Home formal architecture is: Event Snapshot → About the Event → What You'll Do → Program Preview → Speakers Preview → Organizers + Registration → Footer.
- Schedule formal architecture is a readable program/timeline after its unique hero.
- Speakers formal architecture is a readable speaker directory after its unique hero.
- The formal visual grammar is locked by USER delegation to the Orchestrator; detailed implementation rules live in `agent_docs/formal_visual_system.md`.
- Formal direction: research-editorial / technical-poster, continuous paper surface, ~1180px editorial grid, print-like rules, restrained accent use, square technical CTAs, mostly static behavior, responsive reflow, dark ink footer.
- Formal sections do not use newly generated visual assets; dummy speaker presentation must not depend on portraits.

### Animation / performance

- Performance on weak college machines is a primary requirement.
- Home desktop wave motion uses CSS-only two-keyframe linear horizontal transforms; actual effective velocity is tested, not inferred from duration alone.
- Home wave boundary reset is tested against real image alpha and overlay geometry at representative desktop aspect ratios.
- Limited 2–3-frame environmental loops remain allowed elsewhere, but the old Home A/B/C full-frame loop is superseded.
- Main subjects use lightweight transform-based idle motion.
- User-triggered transitions should prefer transform + opacity and avoid heavy effects.
- Avoid full-screen looping video, huge GIFs, heavy canvas/WebGL, animated filters, and unnecessary continuous JS animation.
- Reduced-motion support is required.

### Workflow

- GitHub becomes authoritative once a repository exists.
- Builder claims are not proof; Orchestrator independently verifies repository state, CI, preview, and relevant visual behavior.
- Use visual gates before propagating a visual system across all pages.
- Use a separate Art Assets workflow/chat for iterative image generation.
- Only approved assets/results return to the main development/orchestrator context.
- Preserve durable project documentation in the repository.

### Phase 0A1 technical scaffold

- Phase 0A1 establishes Astro with static output, TypeScript, and npm.
- The initial implementation has no React, Vue, Svelte, Tailwind, GSAP, or UI component framework.
- Canonical source directories live under `src/` and reserved visual assets live under `public/assets/`.
- These choices govern the scaffold and technical-foundation phases; deployment and the final visual/application composition remain open for later bounded review.

### Phase 0A2 technical foundation

- The technical foundation uses Astro with static output, TypeScript, npm, and Node.js 24 LTS.
- No frontend UI framework is used; the foundation remains semantic HTML, CSS, and minimal browser-native JavaScript where later bounded work requires it.
- Reusable boundaries are established through `SiteLayout`, `StageShell`, `MasterNavigator`, and data-driven navigation/routes.
- Navigation is implemented as real links and routes beneath the stylized presentation layer.
- Browser QA uses Playwright with Chromium at the defined desktop and mobile viewports.
- Accessibility QA includes an Axe baseline that fails serious and critical violations.
- GitHub Actions verifies dependency installation, Astro checking, the static build, and the Chromium browser suite on pull requests to and pushes to `main`.
- Reduced-motion support is part of the reusable motion-token foundation.

### PR preview and visual QA infrastructure

- Cloudflare Pages Direct Upload through GitHub Actions and `cloudflare/wrangler-action@v4` is the chosen mechanism for same-repository pull-request previews.
- Preview deployment is gated by the existing authoritative Technical verification job and uses a pull-request branch alias rather than the production branch.
- The preview deploy includes six reduced-motion Chromium screenshots of the built Home composition for independent Web Orchestrator visual QA: desktop, normal-mobile, and compact-mobile closed/reveal pairs.
- Localhost production preview remains the rapid development loop; production deployment and Cloudflare Git integration are not established by this decision.

## PROVISIONAL / STRONG PREFERENCE

- Production hosting is likely to remain Cloudflare Pages, but the production release path/hostname is not established.
- Codex Luna is the current preferred repository-native Builder for bounded implementation work.
- PR #8’s restrained transform+opacity Schrödinger “phase split” and simple two-endpoint `ease-in-out` alternate transform-only idle float are accepted and locked by the USER.
- Phase 3 mobile layering uses the USER-created/verified `home-mobile-layered-base-v1.png` and `home-mobile-layered-overlay-v1.png` with its own responsive portrait wave configuration. Broad phone and PC visual review passed; the previous warm direction and subsequent blue/cyan experiment were rejected, and the final correction restores the original yellow/orange Wave 03 small-wave family, retains white treatment for the other active mobile waves, applies desktop-like opacity hierarchy, doubles the thin/dashed small-wave families 03–06 from four to eight instances each, and adds the matching QISKIT title backing. The Phase 3 mobile visual system is accepted and locked.
- A single primary implementation owner should handle the first representative visual composition; specialist agents may review architecture, responsiveness, accessibility, testing, or performance.
- Page-specific accents other than Home remain to be chosen.

## OPEN

- Deployment hostname.
- Final page count.
- Final event content, dates, venue, registration details.
- Exact college/IBM/Qiskit/sponsor branding requirements.
- Final typography.
- Final accent families for non-Home pages.
- Final site-wide transition language beyond the current Home box phase-split experiment.
- Exact performance budgets.
- Analytics.
- Production release process.
- Exact Builder route/workflow.

## SUPERSEDED / DO NOT REVIVE WITHOUT DISCUSSION

- About Event and About Quantum Mechanics as current target navigation destinations; the approved target is Home / Schedule / Speakers.

- Explicit “Find Out” text/CTA for the Schrödinger interaction.
- Hover-only interaction with no tap/click/focus fallback.
- Uniformly transparent reveal box.
- Hard rectangular transparent window/panel.
- Detailed sci-fi box interior.
- Large generic quantum-HUD icon clutter in the Home background.
- Dark magenta Home accent.
- Realistic/3D/volumetric background treatment.
- Treating the cat as a separate kawaii mascot style unrelated to the main site art language.
- Generating every website asset before building the first real page composition.
- Building the entire site before approving one representative Stage.
