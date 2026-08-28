# Current Scene Specification

## Scope
This document records the currently accepted Home Stage scene and exact visual/technical constraints that should survive future changes.

The desktop layered background described here passed USER visual QA at application head `25cf7117e0f44da99534d9372a85f25291325034`.

Remaining pre-PR-#8 work is box motion/reveal polish, not background redesign.

## Desktop Home composition
- Master Navigator: top-center.
- Event identity/copy: left.
- Schrödinger box: right, visually participating in the neutral/yellow boundary.
- Neutral/off-white field on the left.
- Electric-yellow probability field on the right.
- Foreground irregular neutral/boundary overlay conceals wave reset and creates the boundary illusion.

## Mobile Home composition
Mobile is separately art-directed and intentionally does not use the desktop layered background yet.

Current stack is approximately:
Master Navigator → event identity/copy → Schrödinger box.

Frame A remains the mobile background source.

## Event identity currently implemented
Kicker: `QUANTUM / EVENT`

Title: `QISKIT EVENT`

Lede: `Explore quantum computing through ideas, interaction, and experimentation.`

The lede is explicitly split into three mobile lines with a light backing, yellow edge, and subtle shadow.

This copy is generic/provisional and is not confirmed event information.

## Typography
Home title uses local Archivo Black:
`public/fonts/archivo-black/archivo-black-latin.woff2`

Desktop:
- `font-size: clamp(4rem, 8.2vw, 7.5rem)`
- `line-height: 0.98`

Mobile:
- `font-size: clamp(3.4rem, 16.5vw, 6.5rem)`
- `line-height: 0.88`

“EVENT” uses yellow fill with dark stroke/shadow.

## Desktop layered background
Component:
`src/components/home/HomeLayeredBackground.astro`

Styles:
`src/styles/home.css`

Focused tests:
`tests/e2e/home-layered-background.spec.ts`

### Base
Delivery:
`public/assets/home/background/layered/web/desktop/base/home-probability-field-base-desktop.webp`

Native dimensions:
`1672 × 941`

Desktop behavior:
- cover;
- centered;
- scale approx `1.04`.

### Foreground overlay
Delivery:
`public/assets/home/background/layered/web/desktop/overlay/home-probability-field-overlay-desktop.webp`

The overlay contains real transparency and restores/conceals the neutral-side foreground and irregular boundary above the moving waves.

Overlay background-stack z-index:
`20`

Do not replace it with a flat straight mask.

## Wave families
Approved delivery paths:
1. `wave-01-thick-cream-upper.webp`
2. `wave-02-thick-cream-lower.webp`
3. `wave-03-thin-yellow.webp`
4. `wave-04-thin-ivory.webp`
5. `wave-05-dashed-white-upper.webp`
6. `wave-06-dashed-white-lower.webp`
7. `wave-07-halftone-yellow-band.webp`
8. `wave-08-translucent-cream-ribbon.webp`

All live under:
`public/assets/home/background/layered/web/desktop/waves/`

## Rendered instance counts
Total desktop wave elements:
`20`

Counts:
- thick cream upper: 1;
- thick cream lower: 1;
- thin yellow: 3;
- thin ivory: 3;
- dashed white upper: 3;
- dashed white lower: 3;
- halftone yellow band: 3;
- translucent cream ribbon: 3.

The duplicate instances reuse the same browser image URLs.

## Depth
Intended hierarchy:
dominant translucent ribbon → other broad ribbon/halftone underlayers → thick cream waves → thin yellow/ivory → dashed crossing waves → foreground boundary overlay.

Larger/broader waves stay behind smaller/sharper waves.

The two thick cream waves are full opacity:
`opacity: 1`

## Dominant broad ribbon
Primary translucent ribbon:
- width approx `220%`;
- height approx `500%`;
- top approx `-205%`;
- opacity `0.5`;
- `z-index: 0`.

“Broad” primarily means large vertical presence, not merely horizontal width.

## Amplitude / vertical occupancy
The accepted composition deliberately increased wave heights so crests/troughs read strongly.

Instances are distributed across upper, middle, and lower field bands.

The USER explicitly passed:
- crest/trough amplitude;
- vertical occupancy;
- overlap;
- ribbon role.

## Wave motion
Primary motion:
- left → right;
- CSS only;
- two-keyframe horizontal `translate3d`;
- `linear` timing;
- infinite;
- independent durations/delays;
- no animated rotation;
- no animated scale;
- no animated vertical drift;
- no opacity animation.

Current duration range:
`7.2–16.5s`

Actual tested velocity range:
`14.78–23.63 vw/s`

Broad underlayers are slower; thin/dashed crossing waves are faster.

## Boundary emergence and reset concealment
Visible waves must appear to originate from the irregular neutral/yellow boundary.

They must NOT:
- travel visibly across the neutral field;
- pop into existence inside the yellow field;
- reset visibly within the yellow field.

Implementation defines semantic painted-edge spawn positions and converts them into transform offsets.

Focused tests use Sharp to inspect actual alpha.

Thresholds:
- meaningful wave alpha: `>=16`;
- opaque overlay alpha: `>=250`;
- hidden-spawn safety fraction: `0.02` of stage width.

Representative desktop aspect ratios:
- `1024×768`;
- `1280×720`;
- `1440×900`;
- `1920×1080`.

This logic is a regression guard and should not be casually simplified.

## Mobile background isolation
Below `48rem`:
- desktop waves hidden;
- desktop overlay hidden;
- desktop CSS background URLs not fetched;
- `picture` falls back to Frame A.

Frame A:
`public/assets/home/background/home-probability-field-frame-a-v1.png`

Mobile base positioning:
`object-position: 55% center`

Desktop layered assets must remain absent from actual mobile network requests until a separate mobile layered phase is approved.

## Schrödinger box placement
Desktop:
- right side;
- current width `clamp(19rem, 32vw, 31rem)`;
- max width `43vw`.

Mobile:
- relative stacked placement;
- approx `min(66vw, 18rem)`.

The box must preserve its accepted tilt and apparent dimensions when switching state.

## Box assets
Closed:
`public/assets/home/schrodinger/box-closed-v1.png`

Reveal:
`public/assets/home/schrodinger/box-reveal-v1.png`

The reveal asset contains the approved adjusted split cat.

Do not reconstruct the visible cat from separate cat masters in normal rendering.

## Reveal calibration
Critical accepted transform:
`translate(0.993070%, 1.680001%) scale(0.953033, 0.951307)`

Reason: closed and reveal PNGs have slightly different visible-alpha bounds despite matching canvas dimensions.

This value is locked absent objective regression evidence.

## Current box idle — before final polish
Current `home-box-float`:
- duration `6.5s`;
- high point about `-0.45rem`;
- rotation about `-0.35deg` to `+0.35deg`.

The USER says this is too subtle now that the background moves.

## Current reveal — before final polish
Current switch is essentially a simple opacity crossfade.

Pending direction:
- separate state wrappers;
- small opposing transform displacement + opacity;
- optional very small scale difference;
- roughly 280–420ms;
- no filters/masks/canvas/JS animation loop;
- outer box continues idle transform independently;
- reveal image retains exact calibration.

Not yet visually accepted because it is not yet implemented.

## Interaction state machine
Script:
`src/scripts/schrodinger-box.ts`

Initial:
- `data-locked="false"`
- `data-revealed="false"`
- `aria-pressed="false"`

Fine pointer:
- pointer enter → temporary hover reveal;
- pointer leave → remove hover reveal unless locked/focused.

Focus:
- focus in reveals;
- focus out removes temporary focus reveal unless another state keeps it revealed.

Click:
- toggles `data-locked`;
- `aria-pressed` mirrors lock state.

Coarse pointer:
- click/tap toggles locked state;
- temporary focus is cleared.

Do not alter this state machine merely to implement a visual transition.

## Reduced motion
Current:
- wave animation disabled;
- box idle disabled;
- image transition disabled.

For upcoming phase split:
- disable displacement/scale;
- use immediate state switch or very short/simple opacity only;
- final state must remain unambiguous.

## Visual acceptance ledger
USER passed:
- boundary illusion;
- constant-speed motion;
- final speed;
- population/occupancy;
- overlap;
- depth;
- broad ribbon;
- vertical occupancy;
- crest/trough amplitude;
- boundary-origin appearance;
- performance.

Still pending before PR #8 acceptance:
- stronger box idle float;
- improved performant closed↔reveal transition;
- no-jump verification;
- final live normal-motion visual QA.
