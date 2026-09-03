# Formal Visual System

## Status

**USER-DELEGATED / ORCHESTRATOR-SELECTED / APPROVED DIRECTION — not yet implemented.**

The USER explicitly delegated the remaining formal-content visual decisions to the Web Orchestrator, with the instruction to choose the best coherent result considering:
- association with research/technical organizations;
- appropriate formality;
- elegance;
- visual quality;
- consistency with the accepted expressive hero art direction;
- performance on ordinary phones and weaker college computers.

This document is the implementation-facing specification for the formal content system.

## Design thesis

The formal layer should read as:

**research editorial / technical poster**

It should feel credible enough for an IBM/Qiskit-linked academic event while still belonging to the same site as the expressive halftone/pixel-print hero Stages.

The intended rhythm is:

**spectacle → clean editorial handoff → structured information → decisive participation CTA**

The formal layer is deliberately calmer than the hero and does not reproduce the hero's continuous animated scenery.

## 1. Stage → formal-content transition

Use a **clean hard editorial handoff**.

Locked behavior:
- do not overlap formal content into the accepted Home Stage;
- do not curve, fade, blur, or gradient the transition;
- do not continue the animated probability field below the Stage;
- the formal shell begins immediately after the Stage on the paper/off-white surface;
- use a full-width **2px ink rule** at the handoff;
- add one short page-accent marker aligned to the formal content grid near the top edge (approximately 5–7rem wide and 0.35–0.5rem tall);
- the marker is CSS geometry, not an image asset.

Reason:
- protects the accepted Stage composition;
- gives a deliberate editorial cut;
- keeps the transition distinctive without becoming decorative noise.

## 2. Formal surface/background

Use one continuous **paper/off-white canvas**.

Home baseline tokens should reuse the established visual family:
- paper: `#f7f7f5`;
- ink: `#111820`;
- Home accent: `#ffe51a`.

Locked:
- no alternating card-dashboard backgrounds;
- no glassmorphism;
- no blurred surfaces;
- no gradients;
- no paper texture asset;
- no generated visual asset;
- no large decorative background illustration.

Sections are separated primarily by whitespace and rules, not by large background-color changes.

The formal system should expose a `--page-accent`-style concept so Schedule/Speakers can later reuse the grammar with their own approved hero accent without rewriting the structure.

## 3. Content width and grid

Desktop:
- centered formal container;
- target max-width approximately **1180px**;
- responsive horizontal gutter approximately `clamp(1rem, 4vw, 3rem)`;
- use a **12-column editorial grid** for major compositions;
- typical column gap: approximately 24–32px.

Text:
- ordinary prose should generally stay at or below **68ch**;
- do not stretch body paragraphs across the full content container.

Tablet/mobile:
- collapse the 12-column relationships progressively;
- preserve source order and semantic order;
- avoid horizontal page scrolling.

The exact CSS grid implementation may vary as long as these visual proportions are preserved.

## 4. Typography hierarchy

Do not add a new formal-section font dependency.

Locked:
- hero display typography remains its own art-directed system;
- formal body text uses the existing clean system sans-serif foundation;
- small metadata/category/index labels use the existing UI-monospace style;
- do not use Archivo Black for long-form body content;
- reserve heavy display treatment primarily for hero identity and exceptional short headings.

Formal section heading pattern:
- small monospace index/category label, uppercase;
- large clean sans-serif section title, preferably title case rather than all-uppercase;
- optional concise supporting note.

Approximate hierarchy:
- micro/index label: 0.72–0.82rem, bold, uppercase, increased tracking;
- section title: responsive approximately 2–3.5rem;
- body: approximately 1–1.1rem with comfortable line-height around 1.55–1.7;
- metadata values may be slightly larger/heavier than body labels.

## 5. Formal section header

Use a consistent three-part editorial header.

Desktop conceptual grid:
- left ~2 columns: `01 / EVENT`;
- middle ~6 columns: section title;
- right ~4 columns: optional supporting note.

A thin top rule precedes the header.

Mobile:
- stack label → title → optional note;
- preserve generous spacing;
- do not force tiny multi-column headings.

The numbering/category is part of navigation/visual rhythm, not decorative artwork.

## 6. Borders/dividers

Use a restrained print/editorial rule language.

Locked:
- normal dividers: **1px ink at reduced opacity**;
- major boundaries: **2px solid ink**;
- square corners;
- no soft rounded cards as the default grammar;
- no drop shadows on ordinary formal sections;
- no glow;
- no embossed/3D panel effects.

Dividers should create hierarchy without making the page look like a spreadsheet.

## 7. Accent usage

Home formal sections use electric yellow sparingly.

Target:
- page accent should usually occupy **well under 15%** of the formal visual field.

Use accent for:
- Stage→formal marker;
- primary CTA fill;
- active/selected schedule tab;
- small tags or micro-label highlights;
- restrained hover/focus state;
- occasional short rule or index emphasis.

Do not use:
- full yellow backgrounds for every section;
- large animated yellow fields;
- yellow body text on light backgrounds;
- decorative accent blocks with no information purpose.

Schedule/Speakers may later use their own approved page accent through the same tokenized grammar.

## 8. CTA and link language

Primary CTA:
- rectangular/square-cornered;
- 1px ink border;
- page-accent fill;
- ink text;
- compact uppercase monospace or similarly technical label;
- minimum comfortable touch target around 44–48px high;
- no gradient;
- no pill shape;
- no glow.

Hover/focus:
- may invert to ink background + paper text;
- transition should be short and restrained.

Secondary action:
- paper/off-white background or text-link presentation;
- visible ink boundary/underline;
- simple text arrow `→` is acceptable.

Registration is the strongest CTA on Home.

## 9. Motion and micro-interactions

Formal content is **mostly static**.

Locked:
- no scroll-triggered entrance animation;
- no continuous formal-background animation;
- no parallax;
- no scaling cards;
- no animated gradients;
- no decorative JS animation loops.

Allowed:
- short CSS color/background/border transitions;
- at most ~2px positional movement on hover/focus where useful;
- underline/rule expansion;
- active-state changes;
- no interaction should be required to understand content.

Use existing motion tokens where practical.
Reduced-motion mode remains fully functional and visually complete.

## 10. Vertical rhythm

Formal sections should feel spacious and deliberate rather than dense.

Target section padding:
- desktop: roughly **88–104px**;
- tablet: roughly **64–80px**;
- mobile: roughly **48–64px**.

Within sections:
- header-to-content gap usually ~32–48px;
- row/list spacing ~20–32px depending on information density.

Schedule is allowed to be denser than About/Experience sections because it is intrinsically data-heavy.

## 11. Mobile collapse rules

### Event Snapshot
Desktop:
- one horizontal rail of metadata cells + registration action.

Mobile:
- metadata becomes a 2×2 grid where practical;
- registration action becomes full width below;
- no horizontal scroll.

### About / Editorial split
Desktop:
- approximately 5/7 or 4/8 split between large statement and explanatory copy.

Mobile:
- statement first;
- supporting prose second.

### Indexed feature list
Desktop:
- index / title / description columns.

Mobile:
- keep a narrow index rail beside content where space permits;
- at very narrow widths stack cleanly;
- preserve numbering prominence.

### Program/Schedule rows
Desktop:
- editorial row/timeline structure.

Mobile:
- time/category become the compact leading metadata row;
- title/details follow below;
- do not require horizontal table scrolling.

Day selectors should wrap/grid cleanly rather than depend on horizontal scrolling.

### Speakers
Formal speaker layout must not depend on custom artwork.

Dummy-review state:
- typographic speaker entries are sufficient;
- no generated portraits/placeholders are required.

Future real speaker photographs may be treated as real content assets if supplied/approved, but the component must remain usable without a photo.

Mobile:
- one-column speaker list/grid on narrow screens;
- two columns only where width comfortably supports it.

### Footer
Stack columns on mobile in semantic order.

## 12. Home formal-section specifics

### Event Snapshot
Use a **divided information rail**, not cards.

Fields:
- Date
- Location
- Format
- Audience
- Register

Desktop:
- four metadata cells + CTA cell with vertical dividers.

Mobile:
- 2×2 metadata + full-width CTA.

### About the Event
Use an editorial split:
- large concise statement;
- smaller supporting paragraphs.

No visual asset.

### What You'll Do
Use numbered rows:
- index;
- action/title;
- explanation.

Avoid card grid.

Hover/focus may add a small page-accent rule/fill cue, but the section is readable without interaction.

### Program Preview
Use a short formal schedule preview, approximately 3 highlighted rows.

Do not duplicate the full Schedule page.

End with a clear `View full schedule →` action.

### Speakers Preview
Use approximately 3 representative typographic speaker entries.

The preview must not require portraits.
If real photographs are later supplied, the system may support them without changing the content model.

End with `View all speakers →`.

### Organizers / branding
Use a clean brand-safe strip/area.

Until official marks are supplied/approved:
- use text placeholders;
- do not manufacture fake logo artwork.

Official IBM Quantum / Qiskit marks, if later used, remain pristine assets outside generated art treatment.

### Registration finale
Use a strong dark editorial block:
- ink background;
- paper/off-white text;
- page-accent primary CTA;
- concise eligibility/participation copy.

This acts as the visual closing statement before the footer.

## 13. Footer

Use a strong but restrained site ending.

Locked direction:
- full-width ink background (`#111820` family);
- paper/off-white text;
- thin page-accent top strip/rule;
- no illustration;
- no texture;
- no glow;
- no rounded container.

Desktop:
- compact multi-column layout for event identity, navigation, registration/contact as relevant.

Mobile:
- stacked layout.

The footer should look institutional/research-ready while still matching the site's black/paper/accent visual vocabulary.

## 14. Reusability for Schedule and Speakers

Schedule and Speakers inherit:
- formal shell;
- Stage handoff;
- grid;
- section header;
- typography;
- divider language;
- CTA language;
- interaction restraint;
- footer.

They do NOT inherit:
- Home's exact content sequence;
- Home hero artwork;
- Home yellow as a permanent universal accent if another page accent is later approved.

This is a shared **grammar**, not a shared template clone.

## 15. Performance/accessibility implications

This direction intentionally requires:
- no new formal-section image asset downloads;
- no formal-section animation loop;
- minimal/no new client JavaScript for ordinary content;
- semantic lists/tables/sections where appropriate;
- visible keyboard focus;
- sufficient contrast;
- responsive reflow rather than horizontal overflow;
- touch targets suitable for phones.

It therefore supports the project's weak-device performance requirement and the external-review requirement for a polished public-facing event site.
