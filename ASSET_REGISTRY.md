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

> Binary assets are not yet guaranteed to be committed. The filenames below are recommended stable repository names when importing them.

### Home background

**Canonical repository path:** `public/assets/home/background/home-probability-field-frame-a-v1.png`

Status: **APPROVED FOUNDATION / REFERENCE**

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

Future:
- derive frame B/C from the same composition for 2–3-frame stepped animation.
- do not independently regenerate all frames from scratch.

### Home living cat master

**Canonical repository path:** `public/assets/home/schrodinger/cat-living-master-v1.png`

Status: **APPROVED REFERENCE**

Purpose:
- Geometry/style source for living side of Schrödinger cat.

Style:
- front-facing seated cat,
- flat 2D,
- halftone/dither/pixel-print treatment.

### Home skeletal cat working master

**Canonical repository path:** `public/assets/home/schrodinger/cat-skeleton-master-v1.png`

Status: **APPROVED WORKING REFERENCE**

Purpose:
- Skeletal source used for adjusted composite.

Notes:
- Stylized rather than medically realistic.
- Anatomy is accepted as sensible enough for the intended illustration.

### Home adjusted split cat

**Canonical repository path:** `public/assets/home/schrodinger/cat-split-adjusted-v1.png`

Status: **APPROVED / AUTHORITATIVE CAT REFERENCE**

Purpose:
- Reveal-state cat.
- Viewer-left skeletal half + viewer-right living half.

Critical:
- This is the adjusted composite where the skeletal half was scaled/warped to better match the living cat's height/proportions.
- This supersedes the older unadjusted split-cat composite.

Do not use the unadjusted split-cat variant in production.

### Schrödinger's Box — opaque state

**Canonical repository path:** `public/assets/home/schrodinger/box-closed-v1.png`

Status: **APPROVED DIRECTION / REFERENCE**

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

Status: **APPROVED / AUTHORITATIVE REVEAL REFERENCE**

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

## Future assets

Not yet production-approved:
- Home background frame B,
- Home background frame C,
- mobile-specific Home background if needed,
- final official branding assets,
- About Event Stage subject,
- About Event background,
- About Quantum Mechanics wanted-poster subject,
- About Quantum Mechanics wave/measurement interaction assets.
