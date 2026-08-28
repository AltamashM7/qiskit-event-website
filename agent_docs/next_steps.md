# Immediate Next Steps

## Current gate

The previous box-motion implementation was technically green, but USER normal-motion review found two issues: the sparse eased float read as move/pause/direction-change phases, and the phase split felt too aggressive.

Previous application head before this correction:

`007e1e74f4840afc4db393aef9db26c20ef80c4f`

This same-PR correction replaces both behaviors. Final-head verification and renewed USER normal-motion visual QA remain pending.

The current gate is USER normal-motion visual QA of:
1. strengthened Schrödinger-box idle float;
2. transform+opacity phase-split reveal.

Do NOT ask Luna for another correction until the USER actually identifies a visual problem.

## Preview to review

Immutable exact-head preview:

`https://0a1bd3fa.qiskit-event-website.pages.dev`

PR alias:

`https://pr-8.qiskit-event-website.pages.dev`

Use immutable URL when validating this exact implementation.

## USER QA checklist

### Idle float
Check:
- clearly more noticeable than old float;
- still feels like a heavy suspended box;
- not bouncy;
- not orbiting;
- horizontal drift is subtle;
- rotation feels natural;
- moving waves no longer visually hide the float.

Current implementation:
- 6.2s linear infinite;
- 12-point interior path plus the 0/100% loop closure;
- approximately 0.96rem vertical travel and ±0.15rem horizontal travel;
- rotation approximately -0.48deg → +0.74deg;
- nearby asymmetric keyframes avoid explicit hold frames.

### Phase split
Check:
- more interesting than plain crossfade;
- does not feel like a cheap glitch;
- displacement is small enough;
- closed/reveal states visually pass through one another cleanly;
- final revealed geometry settles exactly;
- reverse transition also feels coherent.

Current implementation:
- 640ms;
- cubic-bezier(0.22, 0.61, 0.36, 1);
- closed leaves toward -0.65% x / +0.65% y with scale 0.995;
- reveal starts +0.65% x / -0.65% y at scale 1.006;
- transform + opacity only.

### Alignment / interaction
Check:
- no jump when hover reveals;
- no jump when focus reveals;
- click lock/unlock correct;
- mobile tap correct;
- box tilt/size appears preserved;
- cat/reveal calibration remains visually aligned.

### Performance
Check:
- float remains smooth;
- reveal remains smooth;
- wave performance feels unchanged;
- interaction responsiveness remains good.

## If USER finds an issue

Do one bounded correction on SAME Draft PR #8.

Do not create another PR.

Preserve:
- wave system;
- reveal image calibration;
- interaction state machine;
- mobile background/resource isolation;
- performance architecture.

Only tune the specific observed box-motion issue.

Then:
- run `npm ci`;
- `npm run check`;
- `npm run verify`;
- `npm run build`;
- wait for final-head Actions;
- independently verify exact head;
- USER re-tests immutable preview.

## If all visual checks pass

The Orchestrator must still perform a final pre-merge source-of-truth check:

1. Re-read PR #8 state/head.
2. Confirm no newer unexpected commit.
3. Confirm required final-head Actions are successful.
4. Confirm PR remains mergeable.
5. Confirm no production deployment occurred.
6. Ask/require explicit USER merge approval if not already clearly given.

Only then:
- squash-merge PR #8;
- verify resulting `main` SHA;
- confirm PR merged;
- update durable docs from “pending visual QA” to accepted/merged;
- begin next roadmap phase in a NEW bounded branch/PR.

## Previous authoritative technical evidence

Actions run:

`https://github.com/AltamashM7/qiskit-event-website/actions/runs/33186955589`

Head:
`007e1e74f4840afc4db393aef9db26c20ef80c4f`

Technical verification:
- success;
- 92 passed;
- 53 skipped;
- 0 failed;
- 0 Astro errors;
- 0 Astro warnings.

Cloudflare preview and visual QA:
- success.

Artifact:
- `home-visual-qa-pr-8`
- ID `9692181025`
- digest `sha256:35612c1623b6bdda8b2d503edc50643c4b5083c106b585fddbb8d3dd8dc3519b`
- six PNG files.

No production deployment.

## Reduced-motion screenshot caveat

The screenshot captures emulate reduced motion.

They intentionally do not show the strengthened idle float or phase displacement.

Therefore visual acceptance must come from the live normal-motion preview.
