# Immediate Next Steps

## Current gate

The previous box-motion implementation was technically green, but USER normal-motion review found two issues: the sparse eased float read as move/pause/direction-change phases, and the phase split felt too aggressive. The USER accepted the calmer 640ms reveal; the prior 13-keyframe float remained unresolved because it produced perceived variable-speed/stutter.

Previous application head before this correction:

`007e1e74f4840afc4db393aef9db26c20ef80c4f`

This same-PR correction replaces only the idle float. Final-head verification and renewed USER normal-motion QA of the new float remain pending.

The current gate is USER normal-motion visual QA of the simple two-endpoint Schrödinger-box idle float. The 640ms transform+opacity phase-split reveal is accepted and locked.

Do NOT ask Luna for another correction until the USER actually identifies a visual problem.

## Preview to review

Immutable exact-head preview: pending the final-head Actions run for this correction.

PR alias:

`https://pr-8.qiskit-event-website.pages.dev`

Use the immutable URL from the final-head Actions run when validating this exact implementation.

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
- 3.1s `ease-in-out` infinite `alternate`;
- lower endpoint `translate3d(0.04rem, -0.08rem, 0) rotate(-0.35deg)`;
- upper endpoint `translate3d(-0.04rem, -0.92rem, 0) rotate(0.45deg)`;
- exactly two authored spatial endpoints and no intermediate motion keyframes.

### Phase split — accepted / locked

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
