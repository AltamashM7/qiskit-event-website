# Immediate Next Steps

## Current gate
PR #8 desktop layered-wave visual QA has passed.

Do not perform further background tuning unless box work causes an objective regression.

Immediate objective: finish Schrödinger-box motion polish on the SAME Draft PR #8.

## Task A — strengthen idle float
Problem:
current box moves only about `0.45rem` vertically with roughly `±0.35deg` over `6.5s`. Dynamic waves now mask it.

Desired:
- clearly visible float;
- heavy/suspended, not bouncy;
- not springy;
- not orbiting.

Suggested envelope:
- vertical: `0.8–1.0rem`;
- rotation: `±0.55–0.75deg`;
- optional horizontal: `0.1–0.2rem`;
- cycle: `5.5–6.2s`.

A slightly asymmetric multi-point path is preferred over a mechanical two-point bob if simple.

Animate transform only. No scale breathing.

## Task B — performant quantum phase-split reveal
Problem:
closed→reveal currently reads as a simple crossfade.

Desired:
- closed fades and moves slightly one direction;
- reveal starts slightly displaced opposite;
- reveal settles exactly into accepted geometry.

Performance:
- transform + opacity only;
- no blur/filter/backdrop-filter;
- no SVG filters;
- no animated clip-path/mask;
- no canvas/WebGL;
- no JS animation loop;
- no new dependency.

Suggested:
- `280–420ms`;
- `1–2%` displacement;
- optional `1–1.5%` scale delta max;
- restrained ease-out/cubic-bezier;
- optional 20–50ms micro-stagger only if reversal stays correct.

## Transform ownership
Do not let idle/reveal transforms fight.

Preferred:
button.schrodinger-box → idle float only
inner state wrappers → transition transform + opacity
actual images → fixed geometry

Reveal image MUST preserve:
`translate(0.993070%, 1.680001%) scale(0.953033, 0.951307)`

## Interaction unchanged
Desktop:
- hover temporary reveal;
- focus temporary reveal;
- click lock/unlock.

Mobile:
- tap toggle.

Keep:
- button semantics;
- `aria-label`;
- `aria-pressed`;
- keyboard;
- focus visibility.

Do not rewrite `src/scripts/schrodinger-box.ts` unless an objective bug requires it.

## No-jump requirement
No jump on:
- hover in/out;
- focus in/out;
- click;
- lock/unlock;
- mobile tap;
- transition completion.

Idle float should continue independently while internal artwork transitions.

## Reduced motion
Under `prefers-reduced-motion: reduce`:
- disable idle float;
- disable phase displacement/scale;
- immediate state or very short/simple opacity only;
- final state correct.

## Wave regression lock
Do not alter:
- 20-instance count;
- family counts;
- opacity;
- amplitude;
- vertical placement;
- velocity;
- boundary spawn;
- ribbon geometry;
- overlay;
- mobile resource isolation.

Existing layered-background tests remain intact/passing.

## Verification
Run:
- `npm ci`
- `npm run check`
- `npm run verify`
- `npm run build`

Then verify final-head:
- Technical verification success;
- Cloudflare preview and visual QA success;
- exact final head;
- six screenshot artifact;
- no production deployment.

## USER live preview QA
Test normal motion:
1. float clearly more noticeable;
2. float still natural/heavy;
3. phase-split looks cooler than crossfade;
4. not glitchy/overdesigned;
5. no box jump;
6. closed/reveal orientation/size aligned;
7. hover/focus/click/tap correct;
8. performance good;
9. waves unchanged.

## Acceptance/merge gate
If all pass:
1. Orchestrator re-reads final PR head.
2. Independently confirms changed files + CI.
3. USER explicitly approves/authorizes merge.
4. Squash merge PR #8.
5. Verify new main SHA.
6. Update durable docs if final implementation materially differs.
7. Start next phase in fresh bounded branch/PR.

Do not merge before explicit USER authorization.
