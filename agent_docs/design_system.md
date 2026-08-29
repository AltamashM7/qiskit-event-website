# Design System — Visual Direction V1

## Core visual language

Main subjects:
- flat 2D graphic illustration,
- monochrome / restricted palette,
- bold silhouette,
- halftone / dither / pixel-print texture,
- poster/comic energy,
- intentionally not photorealistic,
- intentionally not glossy 3D.

Pixel/dither treatment is an accent/rendering language, not an excuse to make the entire background large-pixel art.

## Background grammar

Shared conceptual layers:
1. neutral/base field,
2. page-specific accent field,
3. focal subject interacting with the split,
4. sparse ambient/decorative elements,
5. controlled texture/detail layer.

Backgrounds should remain relatively simple.

Avoid:
- generic “futuristic technology wallpaper,”
- dense HUD glyphs,
- excessive quantum icons,
- noisy pixel fields,
- realistic sci-fi environments,
- realistic underwater/world scenes,
- volumetric glow and cinematic 3D lighting.

## Page accents

The system supports different accent families for different pages.

Locked:
- Home: bright electric yellow.

Other page accents remain open/provisional.

Shared constants across pages should provide cohesion:
- monochrome subject treatment,
- typography hierarchy,
- halftone/dither vocabulary,
- Master Navigator behavior,
- Stage construction,
- transition grammar,
- motion philosophy.

## Home background — approved foundation

Concept:
**classical/stable space → Schrödinger subject boundary → quantum/superposition space**

Visual characteristics:
- left region: calm off-white / light gray / black,
- right region: bright electric yellow,
- large flat wave/interference/probability shapes,
- low detail density,
- selective small-scale pixel breakup,
- no realistic gradient lighting,
- no 3D environment,
- no generic tech-HUD decorations.

The old 2–3-frame full-frame A/B/C experiment is retained only as provenance and is superseded for desktop production direction.

The accepted desktop architecture is:
- one static no-wave base;
- eight approved transparent wave assets reused as 20 independently positioned instances;
- a foreground neutral/boundary overlay above the waves;
- CSS-only constant-speed linear horizontal transform motion;
- broad ribbon/halftone underlayers behind thick, thin, and dashed crossing waves;
- actual painted-edge reset positions hidden beneath the irregular overlay boundary.

The USER has visually accepted the current desktop boundary illusion, speed, population, overlap, amplitude, vertical occupancy, broad ribbon, and performance. Do not casually retune this system during unrelated Home polish.

Mobile remains separately art-directed. The current Phase 3 implementation uses a portrait base/overlay and a responsive 44-instance wave field; broad phone and PC visual review passed, while the current correction rejects the blue/cyan experiment, restores the original yellow/orange Wave 03 small-wave family, retains white treatment for the other active mobile wave visuals, applies desktop-like opacity hierarchy, and doubles the thin/dashed small-wave families 03–06 pending final visual re-review.

## Home Stage composition

Desktop:
- Master Navigator: top-center horizontal button selection.
- Event typography / brief information: left.
- Schrödinger's Box: right.
- Box participates in the visual division between neutral and accent regions.
- Sparse limited-frame decorative animation may occupy genuinely empty areas.

Mobile:
- separate art-directed composition.
- likely stack: navigator → event identity/copy → box interaction.
- do not attempt to preserve desktop side-by-side geometry literally.

## Master Navigator

V1 presentation:
- simple stylized horizontal buttons/links,
- real accessible links/routes underneath,
- active state visually distinct,
- upgradeable later without changing route architecture.

Initial entries:
- Home
- About Event
- About Quantum Mechanics

## Schrödinger's Box interaction

### Closed state

- Slightly tilted/floating industrial illustrated box.
- Opaque.
- Includes the label: `SCHRÖDINGER'S BOX`.
- The label serves as the subtle discovery hint; no explicit “Find Out” instructional copy.
- The box wrapper receives subtle smooth idle animation.

### Interaction

Desktop:
- hover/focus → temporary reveal,
- click → lock/unlock reveal.

Mobile:
- tap → toggle reveal.

The box wrapper, not individual state images, should own the idle transform so switching state does not cause motion or geometry jumps.

### Reveal state

The approved reveal reference is now the authoritative visual direction.

Rules:
- same box orientation and general geometry as closed state,
- no large text over the cat,
- directional gradient translucency,
- upper/right region more transparent,
- transparency fades toward the opposite/opaque side,
- no hard rectangular glass-window boundary,
- bottom face fully opaque,
- plain interior volume with minimal depth cues and no decorative interior design,
- cat physically reads as contained inside,
- approved half-skeletal/half-living cat is used,
- standalone asset has no Home background baked into it.

## Cat visual

Approved concept:
- one seated cat,
- viewer-left half skeletal,
- viewer-right half living,
- same underlying pose,
- halftone/dither graphic style,
- intentionally stylized rather than medically realistic,
- skeleton should be structurally sensible and free of obvious anatomical hallucinations.

The final approved working cat is the adjusted composite where the skeletal half was scaled/warped to better match the living-cat proportions.

Minor seam/halftone cleanup is deferred to final site polish.

## Motion system

Environmental:
- choose the cheapest technique that serves the art direction;
- Home desktop uses independently phased CSS transform wave motion over a static layered scene;
- limited stepped 2–3-frame loops remain valid for future page-specific environmental effects when appropriate;
- no heavy continuous JS animation.

Subjects:
- smooth transform-based idle motion;
- movement should be perceptible against the scene but physically restrained;
- the merged PR #8 correction uses a simple two-endpoint `ease-in-out` alternate transform-only path: 3.1s per one-way trip, approximately 0.84rem vertical travel, ±0.04rem horizontal travel, and roughly -0.35deg to +0.45deg rotation; USER accepted and locked this tuning. The prior 13-keyframe path was removed after perceived variable-speed/stutter.

Interaction transitions:
- may be smoother and slightly richer because they occur on user input;
- prefer transform + opacity;
- The merged PR #8 implements a calmer Schrödinger closed↔reveal “phase split”: inner state wrappers animate transform + opacity for 640ms with restrained opposing displacement/scale, the outer box independently owns idle motion, and the reveal image retains its fixed calibration. The USER accepted and locked this reveal transition.

Reduced motion:
- preserve composition;
- remove ambient motion;
- remove phase displacement/scale;
- keep interactions understandable and final states deterministic.

## Branding

Assume eventual requirements for:
- college branding,
- Qiskit branding,
- IBM branding,
- possibly sponsors/partners.

Brand assets must remain separate from generated artwork.

Do not bake official logos into background art.

Design should reserve usable brand-safe zones and preserve official logo clarity.
