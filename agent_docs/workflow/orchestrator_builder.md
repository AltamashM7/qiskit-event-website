# Orchestrator / Builder Workflow

## Roles

### Web ChatGPT Orchestrator

Owns:
- product interpretation,
- visual direction,
- information architecture,
- UX,
- responsive strategy,
- animation strategy,
- performance constraints,
- technical architecture,
- development phases,
- Builder task specifications,
- independent GitHub/CI/preview review,
- visual acceptance gates,
- final acceptance.

The Orchestrator does not treat a Builder status report as proof.

### Repository-native Builder (likely Codex Luna)

Owns bounded implementation work:
- repository inspection,
- edits,
- tests,
- local/repository-native verification,
- commits,
- Draft PR updates,
- reporting exact changed paths and verification results.

For the first representative Stage, prefer one coherent implementation owner.

Specialist agents may assist with:
- repository exploration,
- architecture impact,
- responsive review,
- accessibility review,
- performance profiling,
- testing,
- independent code review.

Avoid multiple independent executors making conflicting artistic decisions inside the same visual composition.

## GitHub workflow

Once the repository exists:

1. Reinspect authoritative repository state before mutation.
2. Create/use a bounded feature branch.
3. Implement one bounded phase.
4. Run verification.
5. Commit.
6. Push.
7. Open/update a Draft PR.
8. Run CI/browser QA/preview as applicable.
9. Orchestrator independently checks GitHub source of truth.
10. User performs visual/manual QA at visual gates.
11. Correct issues.
12. Explicit USER approval/authorization before merge.
13. Re-read the exact final PR head and required CI immediately before merge.
14. Merge only when authorized; never infer merge permission from “looks good” unless the USER clearly approves the PR/merge.

## Visual gates

Do not build the whole website before visual approval.

Recommended order:
1. project foundation,
2. Home Composition V1,
3. deployed preview,
4. desktop review,
5. mobile review,
6. interaction/accessibility review,
7. performance review,
8. user visual approval,
9. generalize stable Stage architecture,
10. add remaining pages.

## Context discipline

Durable project state belongs in the repository, not only in conversation history.

For a fresh Web Orchestrator restart, read:
- `AGENTS.md`
- `agent_docs/orchestrator_handoff.md`
- `agent_docs/current_scene.md`
- `agent_docs/next_steps.md`
- `agent_docs/roadmap.md`
- then the remaining durable docs and live GitHub state.

After major milestones update:
- `agent_docs/orchestrator_handoff.md` if the current gate/branch/critical architecture changed
- `agent_docs/current_scene.md` if the accepted visual scene changed
- `agent_docs/next_steps.md` when the immediate gate changes
- `agent_docs/roadmap.md` when sequencing changes
- `agent_docs/project_progress.md`
- `agent_docs/latest_session_work.md`
- `agent_docs/decisions.md` if decisions changed
- `ASSET_REGISTRY.md` if assets/status changed

Keep documentation concise and current.

Do not preserve:
- long debugging transcripts,
- failed image-generation prompts,
- superseded visual attempts,
- stale architecture claims.

## Art Assets workflow

Iterative asset generation belongs in a separate Art Assets conversation/workstream.

For each asset:
1. choose one closest production reference,
2. refine one major defect at a time,
3. explicitly freeze approved properties,
4. approve a final reference,
5. assign a stable filename/version,
6. record it in `ASSET_REGISTRY.md`,
7. bring only the approved result back to development.

Do not use ambiguous phrases like “the approved cat” when multiple similarly named binaries exist. Refer to the stable registry filename.
