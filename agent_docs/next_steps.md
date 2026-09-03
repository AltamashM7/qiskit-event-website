# Immediate Next Steps

## Current gate

There is no active implementation phase.

Current authoritative `main` before this documentation PR:
`80e392da520eb99d32a0fd7a2b1dedf44a8f8b1a`

The accepted Home Stage and persistent Master Navigator remain locked.

## Approved target

Site map:
- Home
- Schedule
- Speakers

Review content:
- realistic dummy data in the final intended format;
- real content later;
- no fabricated corporate/sponsorship/partnership claims.

Page model:
- unique hero/Stage per route;
- mostly-static formal content;
- no newly generated formal-section visual assets.

Home formal architecture:
1. Event Snapshot
2. About the Event
3. What You'll Do
4. Program Preview
5. Speakers Preview
6. Organizers + Registration
7. Footer

## Formal visual system — resolved

The USER delegated the remaining formal visual decisions to the Orchestrator.

The resolved system is authoritative in:
`agent_docs/formal_visual_system.md`

Core direction:
- research-editorial / technical-poster;
- hard Stage→formal handoff;
- paper/off-white continuous surface;
- ~1180px 12-column desktop grid;
- clean sans-serif + monospace metadata;
- print-like 1px/2px divider hierarchy;
- restrained page-accent usage;
- square technical CTAs;
- mostly static interactions;
- responsive reflow;
- dark ink footer.

## Next bounded phase after this documentation is merged

Prepare a Luna implementation brief for the **first formal-content implementation phase**.

Recommended scope:
- shared formal shell/primitives required by Home;
- Home below-the-fold sections using realistic dummy data;
- responsive/mobile behavior;
- no Schedule/Speakers hero implementation yet;
- no new generated visual assets;
- preserve accepted Home Stage and current persistent Navigator behavior;
- route migration to Home/Schedule/Speakers may either be included only if it remains safely bounded or kept as the immediately following phase.

Before implementation, re-read live GitHub and the merged documentation head.

Production remains out of scope.
