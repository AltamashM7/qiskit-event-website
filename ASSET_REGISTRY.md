# Asset Registry

This registry tracks production/reference visual assets.

## Rules

- Approved assets must receive stable filenames.
- Do not overwrite an approved asset with a materially different design; create a new version.
- Mark superseded variants clearly.
- Generated assets remain modular; do not bake official branding into scene artwork.
- Prefer transparent standalone subject/box assets where the frontend needs independent composition.
- Record desktop/mobile variants separately when they materially differ.

## Current approved/reference assets

> The approved Home binary assets listed below are committed at their canonical repository paths. They are approved references or bounded implementation assets as noted below.

### Home background

**Canonical repository path:** `public/assets/home/background/home-probability-field-frame-a-v1.png`

Status: **APPROVED FOUNDATION / REFERENCE / COMMITTED**

Purpose:
- Home Stage base/background reference.
- Calm monochrome/off-white region plus bright electric-yellow probability/interference field.

Important characteristics:
- flat 2D,
- low detail density,
- large wave/interference forms,
- selective small pixel breakup,
- no generic HUD clutter,
- no 3D/realistic environment.

Immutable metadata:
- Dimensions: `1672 × 941`.
- Color: 8-bit truecolor RGB; no alpha channel.
- SHA-256: `4DF70974F98A031BFCB420CCC11B5B900088423FDE81CD88FC9E5E8092A75789`.

Approved stepped set:
- Frame A is the original approved Home background foundation.
- The canonical future sequence is `A → B → C → A`.
- Frames B and C are approved continuation frames registered below.
- The frontend currently renders Frame A only; animation integration is not implemented.

### Home background — continuation frame B

**Canonical repository path:** `public/assets/home/background/home-probability-field-frame-b-v1.png`

Status: **APPROVED CONTINUATION FRAME / USER-SUPPLIED / COMMITTED**

Purpose:
- Home stepped-background animation continuation frame.
- Intended to follow Frame A in the future `A → B → C → A` sequence.

Approval and source:
- Approved by the Web Orchestrator and USER for the future restrained stepped loop.
- Generated externally through the USER's asset-generation workflow and manually supplied to the repository.
- Repository bytes were preserved without resizing, compression, optimization, recoloring, cropping, or re-export.

Immutable metadata:
- Dimensions: `1672 × 941`.
- Color: 8-bit truecolor RGB; no alpha channel.
- SHA-256: `FEF52C7EE68C844EB0C56B0B881D8FAA6085027CCCB9D7C57DF8C9574AAE513C`.

Integration:
- Registered for future use only.
- Not wired into the frontend; current Home rendering remains Frame A only.

### Home background — continuation frame C

**Canonical repository path:** `public/assets/home/background/home-probability-field-frame-c-v1.png`

Status: **APPROVED CONTINUATION FRAME / USER-SUPPLIED / COMMITTED**

Purpose:
- Home stepped-background animation continuation frame.
- Intended to follow Frame B in the future `A → B → C → A` sequence.

Approval and source:
- Approved by the Web Orchestrator and USER for the future restrained stepped loop.
- Generated externally through the USER's asset-generation workflow and manually supplied to the repository.
- Repository bytes were preserved without resizing, compression, optimization, recoloring, cropping, or re-export.

Immutable metadata:
- Dimensions: `1672 × 941`.
- Color: 8-bit truecolor RGB; no alpha channel.
- SHA-256: `A8CDFA7B17FDAFB495CA3D20E56015A477AF758F8C6385373C912F17ABD32B4B`.

Integration:
- Registered for future use only.
- Not wired into the frontend; current Home rendering remains Frame A only.

### Home living cat master

**Canonical repository path:** `public/assets/home/schrodinger/cat-living-master-v1.png`

Status: **APPROVED REFERENCE / COMMITTED**

Purpose:
- Geometry/style source for living side of Schrödinger cat.

Style:
- front-facing seated cat,
- flat 2D,
- halftone/dither/pixel-print treatment.

### Home skeletal cat working master

**Canonical repository path:** `public/assets/home/schrodinger/cat-skeleton-master-v1.png`

Status: **APPROVED WORKING REFERENCE / COMMITTED**

Purpose:
- Skeletal source used for adjusted composite.

Notes:
- Stylized rather than medically realistic.
- Anatomy is accepted as sensible enough for the intended illustration.

### Home adjusted split cat

**Canonical repository path:** `public/assets/home/schrodinger/cat-split-adjusted-v1.png`

Status: **APPROVED / AUTHORITATIVE CAT REFERENCE / COMMITTED**

Purpose:
- Reveal-state cat.
- Viewer-left skeletal half + viewer-right living half.

Critical:
- This is the adjusted composite where the skeletal half was scaled/warped to better match the living cat's height/proportions.
- This supersedes the older unadjusted split-cat composite.

Do not use the unadjusted split-cat variant in production.

### Schrödinger's Box — opaque state

**Canonical repository path:** `public/assets/home/schrodinger/box-closed-v1.png`

Status: **APPROVED DIRECTION / REFERENCE / COMMITTED**

Purpose:
- Default Home hero state.

Characteristics:
- industrial illustrated box,
- slight tilt,
- opaque shell,
- `SCHRÖDINGER'S BOX` label,
- flat monochrome/halftone language.

### Schrödinger's Box — reveal state

**Canonical repository path:** `public/assets/home/schrodinger/box-reveal-v1.png`

Status: **APPROVED / AUTHORITATIVE REVEAL REFERENCE / COMMITTED**

Purpose:
- Hover/focus/tap reveal state.

Characteristics:
- same general box orientation,
- no large text over cat,
- directional gradient translucency,
- upper/right region most transparent,
- opacity fades toward opposite side,
- bottom fully opaque,
- plain/minimal interior,
- adjusted split cat visibly contained inside.

Current approved external reference was supplied as:
`qiskit_approved_reveal_image.png`

When imported into the repository, rename/copy it to the stable recommended filename above.

## Superseded / avoid

- older unadjusted split-cat composite,
- regenerated split-cat variants with tall/unmatched skeleton,
- reveal boxes with:
  - wide display-case proportions,
  - hard rectangular transparent window,
  - uniformly transparent cube,
  - detailed sci-fi interior,
  - yellow Home-background leakage,
  - text obscuring the cat.

## Local typography asset

**Canonical repository path:** `public/fonts/archivo-black/archivo-black-latin.woff2`

Status: **LOCAL IMPLEMENTATION ASSET / LICENSED / COMMITTED**

Purpose:
- Deterministic Home event-title typography across supported browsers and devices.

Provenance and license:
- Sourced from the Archivo Black family in Google Fonts: https://github.com/google/fonts/tree/main/ofl/archivoblack
- Licensed under the SIL Open Font License 1.1; the license text and retrieval details are recorded beside the font in `public/fonts/archivo-black/`.

## Future assets

Not yet production-approved:
- mobile-specific Home background if needed,
- final official branding assets,
- About Event Stage subject,
- About Event background,
- About Quantum Mechanics wanted-poster subject,
- About Quantum Mechanics wave/measurement interaction assets.
