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

Historical full-frame experiment (retained for provenance):
- Frame A is the original approved Home background foundation.
- The previous full-frame experiment used the sequence `A → B → C → A`.
- Frames B and C remain registered below as historical/provenance assets.
- The frontend currently renders Frame A only; animation integration is not implemented.
- This earlier full-frame direction remains committed for provenance only and is superseded as the chosen production implementation direction by the desktop layered-wave foundation below.

### Home background — continuation frame B

**Canonical repository path:** `public/assets/home/background/home-probability-field-frame-b-v1.png`

Status: **APPROVED CONTINUATION FRAME / USER-SUPPLIED / COMMITTED**

Purpose:
- Historical Home full-frame stepped-animation experiment continuation frame.
- Used after Frame A in the previous `A → B → C → A` full-frame experiment.

Approval and source:
- Approved by the Web Orchestrator and USER for the earlier restrained stepped-loop experiment; retained as historical/provenance material and not chosen as the production background architecture.
- Generated externally through the USER's asset-generation workflow and manually supplied to the repository.
- Repository bytes were preserved without resizing, compression, optimization, recoloring, cropping, or re-export.

Immutable metadata:
- Dimensions: `1672 × 941`.
- Color: 8-bit truecolor RGB; no alpha channel.
- SHA-256: `FEF52C7EE68C844EB0C56B0B881D8FAA6085027CCCB9D7C57DF8C9574AAE513C`.

Integration:
- Retained for historical/provenance registration only.
- Not wired into the frontend; current Home rendering remains Frame A only.

### Home background — layered-wave foundation (Phase A)

**Canonical repository roots:**
- Masters: `public/assets/home/background/layered/masters/desktop/`
- Web delivery: `public/assets/home/background/layered/web/desktop/`

Status: **USER-SUPPLIED DESKTOP ASSET FOUNDATION / INTEGRATED ON PHASE-2 BRANCH / VISUAL ACCEPTANCE PENDING**

Purpose:
- Desktop base, overlay, and independent wave layers for the next Home background architecture.
- Preserve the source artwork as immutable masters while providing optimized web-serving derivatives.

Architecture context:
- Chosen production architecture: one static no-wave base background, the eight accepted transparent wave assets reused as a richer desktop instance composition above it, and a foreground neutral/boundary overlay above the waves.
- Phase A imported and optimized the assets; the current Phase B integration renders 16 desktop instances with lightweight independent linear horizontal transform movement.
- The earlier full-frame A/B/C animation exploration remains committed and unmerged on Draft PR #6; it is superseded as the chosen implementation direction by this layered-wave architecture.
- The current Phase B branch integrates the desktop base, 16 wave instances reusing the eight wave deliveries, and foreground overlay into Home. Broad ribbon/halftone instances form underlayers, while thick, thin, and dashed instances overlap above them. Mobile continues to use Frame A and does not request the desktop layer URLs.
- No source or delivery asset bytes were changed during integration.
- The overlay was inspected at the pixel level: its RGBA alpha channel has real transparency, including `615,141` fully transparent pixels on the right side. The apparent black area is not baked black fill.
- Mobile-specific layered base/overlay assets are not included in this phase.

Delivery generation:
- Reproducible helper: `scripts/generate-layered-background-deliveries.mjs`.
- Uses the direct dev-only `sharp` dependency pinned to `0.35.3`; it is used only for asset generation and is not a runtime dependency.
- Base WebP settings: quality `95`, effort `6`, smart chroma subsampling.
- Overlay and wave WebP settings: quality `95`, alpha quality `100`, effort `6`, smart chroma subsampling.
- All delivery files retain their masters' native dimensions; no resize, crop, recolor, or artwork simplification was performed.

#### Desktop layered masters

| Asset | Canonical path | Role | Dimensions | Format / alpha | Bytes | SHA-256 | Provenance / status |
| --- | --- | --- | ---: | --- | ---: | --- | --- |
| Base master | `public/assets/home/background/layered/masters/desktop/base/home-probability-field-base-desktop-master.png` | Desktop probability-field base | `1672 × 941` | PNG RGB; no alpha | 1,062,118 | `804FCA22571FF143E464498AA471D12F3D7759EE7BC1E1235D528EC08393286B` | Manually supplied by USER; immutable master |
| Overlay master | `public/assets/home/background/layered/masters/desktop/overlay/home-probability-field-overlay-desktop-master.png` | Desktop probability-field overlay | `1672 × 941` | PNG RGBA; alpha `0–255`, real transparency | 872,519 | `E1AF4B73653E4B16C2AE88A49FEC1F61468EA1BAEC7D4307F7C48555F558E88A` | Manually supplied by USER; immutable master |
| Wave 01 master | `public/assets/home/background/layered/masters/desktop/waves/wave-01-thick-cream-upper-master.png` | Thick cream upper wave | `1800 × 700` | PNG RGBA; alpha `0–255` | 43,179 | `37F6AF434C4701AB95877B1CDD48F525B537E7091AE44E1AA89AF6EFC4F7037E` | Manually supplied by USER; immutable master |
| Wave 02 master | `public/assets/home/background/layered/masters/desktop/waves/wave-02-thick-cream-lower-master.png` | Thick cream lower wave | `1800 × 700` | PNG RGBA; alpha `0–255` | 42,661 | `1CE05B82C47D5D15611FF9B3BD50397EC1D7F9166B8D0913B767FD6B7923559D` | Manually supplied by USER; immutable master |
| Wave 03 master | `public/assets/home/background/layered/masters/desktop/waves/wave-03-thin-yellow-master.png` | Thin yellow wave | `1800 × 700` | PNG RGBA; alpha `0–255` | 39,721 | `4B9A753026F920301BDCFD27B3DC447307B6A82FFD0950000A1E60B1451DEED8` | Manually supplied by USER; immutable master |
| Wave 04 master | `public/assets/home/background/layered/masters/desktop/waves/wave-04-thin-ivory-master.png` | Thin ivory wave | `1800 × 700` | PNG RGBA; alpha `0–255` | 29,406 | `9BB75F64C13DF8F4C3987B5EE45625CA91EF24AA8D009511821FCE91C2985947` | Manually supplied by USER; immutable master |
| Wave 05 master | `public/assets/home/background/layered/masters/desktop/waves/wave-05-dashed-white-upper-master.png` | Dashed white upper wave | `1800 × 700` | PNG RGBA; alpha `0–255` | 20,906 | `0A579039BDEFA06E1BF39ED5C567054CE109958F393188A3087AF06F4B363394` | Manually supplied by USER; immutable master |
| Wave 06 master | `public/assets/home/background/layered/masters/desktop/waves/wave-06-dashed-white-lower-master.png` | Dashed white lower wave | `1800 × 700` | PNG RGBA; alpha `0–255` | 18,617 | `3E865EA887656118CD5A3B2B5E4D6542446D3B9FD8CC164AFE3FCA18935DF19F` | Manually supplied by USER; immutable master |
| Wave 07 master | `public/assets/home/background/layered/masters/desktop/waves/wave-07-halftone-yellow-band-master.png` | Halftone yellow band | `1800 × 700` | PNG RGBA; alpha `0–172` | 330,175 | `5B3D8E2AF40DF610FFFE82055F7D4BD12697FE0471AABCC1ACF3618A9D252EB8` | Manually supplied by USER; immutable master |
| Wave 08 master | `public/assets/home/background/layered/masters/desktop/waves/wave-08-translucent-cream-ribbon-master.png` | Translucent cream ribbon | `1800 × 700` | PNG RGBA; alpha `0–201` | 36,714 | `152BFDD0ABDD6B811C0D435A66B21B537B4A8E66E2711C29A09C0F3176C0DE79` | Manually supplied by USER; immutable master |

#### Desktop layered web-delivery derivatives

| Asset | Canonical path | Role | Dimensions | Format / alpha | Bytes | SHA-256 | Provenance / status |
| --- | --- | --- | ---: | --- | ---: | --- | --- |
| Base delivery | `public/assets/home/background/layered/web/desktop/base/home-probability-field-base-desktop.webp` | Web-serving desktop base derivative | `1672 × 941` | WebP RGB; no alpha | 84,644 | `24D65E229596386DA9F22E1D420C8D4EB0B878E5AA5D06C3AE8D3CE960FF376D` | Generated from base master; delivery derivative |
| Overlay delivery | `public/assets/home/background/layered/web/desktop/overlay/home-probability-field-overlay-desktop.webp` | Web-serving desktop overlay derivative | `1672 × 941` | WebP RGBA; alpha `0–255` | 119,014 | `17E8893951B10D9446DB80299D080BBBEBE7E95F5852B9FBE41F89E3696326E3` | Generated from overlay master; delivery derivative |
| Wave 01 delivery | `public/assets/home/background/layered/web/desktop/waves/wave-01-thick-cream-upper.webp` | Web-serving thick cream upper wave | `1800 × 700` | WebP RGBA; alpha `0–255` | 28,952 | `6C0AAC3FB7F25C39ECDB6DCD041B9FB88AC46AAEE8C691628DE516DFD1570766` | Generated from Wave 01 master; delivery derivative |
| Wave 02 delivery | `public/assets/home/background/layered/web/desktop/waves/wave-02-thick-cream-lower.webp` | Web-serving thick cream lower wave | `1800 × 700` | WebP RGBA; alpha `0–255` | 28,348 | `E49CF69C8368A9915384EAB413A070DDE478B45357B95C02C2F23831227DE87F` | Generated from Wave 02 master; delivery derivative |
| Wave 03 delivery | `public/assets/home/background/layered/web/desktop/waves/wave-03-thin-yellow.webp` | Web-serving thin yellow wave | `1800 × 700` | WebP RGBA; alpha `0–255` | 34,406 | `CAC35F3CB613950A901238F59A343F5B462B78983ABE825095C78C6A901DE744` | Generated from Wave 03 master; delivery derivative |
| Wave 04 delivery | `public/assets/home/background/layered/web/desktop/waves/wave-04-thin-ivory.webp` | Web-serving thin ivory wave | `1800 × 700` | WebP RGBA; alpha `0–255` | 19,060 | `BEBB35B4BCE9E8A85872D6927D56C43112BBB66318C93604F7B1A224B447BA6F` | Generated from Wave 04 master; delivery derivative |
| Wave 05 delivery | `public/assets/home/background/layered/web/desktop/waves/wave-05-dashed-white-upper.webp` | Web-serving dashed white upper wave | `1800 × 700` | WebP RGBA; alpha `0–255` | 10,644 | `7415E31960206D13C512C652C96F80495F688F24D61E8FDEFED1CE7CCD5C1B58` | Generated from Wave 05 master; delivery derivative |
| Wave 06 delivery | `public/assets/home/background/layered/web/desktop/waves/wave-06-dashed-white-lower.webp` | Web-serving dashed white lower wave | `1800 × 700` | WebP RGBA; alpha `0–255` | 9,388 | `7721E4E5E8027C86892907025153E1D61121F62BFE03D249FB933429562A69D8` | Generated from Wave 06 master; delivery derivative |
| Wave 07 delivery | `public/assets/home/background/layered/web/desktop/waves/wave-07-halftone-yellow-band.webp` | Web-serving halftone yellow band | `1800 × 700` | WebP RGBA; alpha `0–172` | 174,514 | `3A2DF2BE9A3068791FFD753089E59C4186FE44B2E615ECD3133DFFCB3D631FD6` | Generated from Wave 07 master; delivery derivative |
| Wave 08 delivery | `public/assets/home/background/layered/web/desktop/waves/wave-08-translucent-cream-ribbon.webp` | Web-serving translucent cream ribbon | `1800 × 700` | WebP RGBA; alpha `0–201` | 25,720 | `DDE65E13668464E8A362AE91A257C7D2F9222B1E857C476E9AC825AE11EAF0A0` | Generated from Wave 08 master; delivery derivative |

### Home background — continuation frame C

**Canonical repository path:** `public/assets/home/background/home-probability-field-frame-c-v1.png`

Status: **APPROVED CONTINUATION FRAME / USER-SUPPLIED / COMMITTED**

Purpose:
- Historical Home full-frame stepped-animation experiment continuation frame.
- Used after Frame B in the previous `A → B → C → A` full-frame experiment.

Approval and source:
- Approved by the Web Orchestrator and USER for the earlier restrained stepped-loop experiment; retained as historical/provenance material and not chosen as the production background architecture.
- Generated externally through the USER's asset-generation workflow and manually supplied to the repository.
- Repository bytes were preserved without resizing, compression, optimization, recoloring, cropping, or re-export.

Immutable metadata:
- Dimensions: `1672 × 941`.
- Color: 8-bit truecolor RGB; no alpha channel.
- SHA-256: `A8CDFA7B17FDAFB495CA3D20E56015A477AF758F8C6385373C912F17ABD32B4B`.

Integration:
- Retained for historical/provenance registration only.
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
