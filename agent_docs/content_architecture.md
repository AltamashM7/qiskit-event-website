# Formal Content Architecture

## Status

**USER-approved planning direction; not yet implemented.**

This document defines the intended content architecture beneath the art-directed hero/Stage of each major route.

## Core page model

Each major route uses:

`unique art-directed hero Stage → mostly-static formal content → footer`

Visual assets are reserved for the hero/Stage systems.

Formal sections:
- do not require newly generated visual assets;
- remain mostly static;
- use typography, spacing, CSS borders/dividers, restrained accent states, and layout for identity;
- prioritize readability and weak-device performance.

## Target routes

### Home
Purpose:
- public event landing page;
- event overview and participation information;
- preview/entry point to Schedule and Speakers.

Planned formal content:
1. Event Snapshot
2. About the Event
3. What You'll Do / What to Expect
4. Program Preview
5. Speakers Preview
6. Organizers + Registration
7. Site Footer

### Schedule
Purpose:
- full formal program after its own unique hero Stage.

Planned formal content:
1. concise program context;
2. day/date selection where needed;
3. full schedule/timeline;
4. registration/action banner;
5. site footer.

Schedule entries should support:
- day/date;
- start time;
- end time;
- category/type;
- title;
- speaker/facilitator;
- venue/room;
- short description.

### Speakers
Purpose:
- full speaker directory after its own unique hero Stage.

Planned formal content:
1. concise people/speakers introduction;
2. speaker directory;
3. registration/action banner;
4. site footer.

Speaker entries should support:
- photo;
- name;
- role/title;
- affiliation;
- short bio;
- optional session association.

## Shared formal grammar

The three routes should share a reusable formal system without becoming visual clones.

Candidate reusable primitives:
- `FormalSectionHeader`
- `EditorialSplitSection`
- `EventMetaRail`
- `IndexedFeatureList`
- `ContentPreviewSection`
- `ScheduleEntry`
- `SpeakerCard`
- `BrandStrip`
- `ActionBanner`
- `SiteFooter`

These names are architectural planning labels, not a mandate for exact implementation filenames.

## Home section intent

### Event Snapshot
A compact information rail rather than independent dashboard cards.

Intended fields:
- date;
- location;
- format;
- audience;
- registration action.

### About the Event
Concise event purpose and context.

Preferred information pattern:
- one large editorial statement;
- smaller supporting copy.

### What You'll Do
Directly satisfies the requirement to explain what participants will accomplish.

Preferred pattern:
- numbered/indexed rows rather than a generic card grid;
- realistic dummy copy until real content is supplied.

### Program Preview
Abbreviated preview only.
The full schedule belongs on the Schedule route.

### Speakers Preview
A limited subset/preview using the same underlying speaker data shape as the full Speakers page.

### Organizers + Registration
Brand-safe organizer/partner area followed by a strong final participation CTA.

Official marks remain unmodified standalone assets.

## Formal-content motion

Locked direction:
- formal content is mostly static;
- no continuously animated probability field or equivalent decorative background below the hero;
- small CSS-only hover/focus responses are acceptable if restrained;
- no additional generated visual assets are required for formal sections;
- reduced-motion behavior must remain intentional.

## Remaining visual decisions before implementation

Still to decide with the USER:
- exact Stage-to-formal transition;
- formal background/surface treatment;
- content max-width and grid proportions;
- section header/numbering treatment;
- border/divider language;
- amount and placement of the Home yellow accent below the Stage;
- CTA/button styling in the formal system;
- hover/focus micro-interaction strength;
- section spacing/rhythm;
- mobile collapse rules for the formal grid;
- exact footer treatment.

No Luna implementation prompt should be written until this visual grammar is discussed and approved.
