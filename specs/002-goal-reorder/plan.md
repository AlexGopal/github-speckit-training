# Implementation Plan: Goal Reorder

**Branch**: `002-goal-reorder` | **Date**: 2026-06-18 | **Spec**: `/specs/002-goal-reorder/spec.md`

**Input**: Feature specification from `/specs/002-goal-reorder/spec.md`

**Note**: This plan is created by the `/speckit.plan` command and follows the repository's constitution, including the strict no-testing rule.

## Summary

Add drag-and-drop reordering for active goals using the `sortable` library and Tailwind CSS styling. The feature will persist active goal order through browser Local Storage, preserve each goal's title, end date, and completion state, and keep completed goals out of the reorder flow.

## Technical Context

**Language/Version**: JavaScript / TypeScript with React 19.2.4 and Next.js 16.2.9

**Primary Dependencies**:
- `sortable` for drag-and-drop ordering
- Tailwind CSS for styling
- browser `localStorage` for persistence

**Storage**: Local Storage with a JSON array of goal objects under a single key.

**Validation**: Manual acceptance criteria and exploratory UI review; no automated tests are introduced per project constitution.

**Target Platform**: Web browser, desktop and mobile viewport sizes supported by existing responsive layout.

**Project Type**: Frontend web application feature.

**Performance Goals**:
- Reorder latency should feel immediate on drag and drop.
- The persisted order should restore correctly after page reload.

**Constraints**:
- Completed goals are not reordered by this feature.
- Reorder must preserve goal data and not mark goals complete or deleted.
- Must avoid introducing automated testing in implementation.

**Scale/Scope**:
- Small client-side feature scoped to the active goals list only.
- No backend or sync persistence required.

## Constitution Check

This plan aligns with the repository constitution:
- No automated testing is introduced.
- The dependency surface remains minimal: only `sortable` is added for drag/drop behavior.
- The feature uses browser-native Local Storage and Tailwind styling already in project context.

## Project Structure

### Documentation (this feature)

```text
specs/002-goal-reorder/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── local-storage-schema.md
├── spec.md
└── checklists/
    └── requirements.md
```

### Source Code (repository root)

```text
app/
├── page.tsx
├── components/
│   ├── goal-actions.tsx
│   ├── goal-card.tsx
│   ├── new-goal-modal.tsx
│   └── theme.tsx
└── lib/
    ├── goals.ts
    └── storage.ts
```

**Structure Decision**: The feature will update the existing frontend path under `app/` and leverage `app/components/` and `app/lib/` for UI and storage logic.

## Complexity Tracking

No constitution violations identified; the plan remains within the repository's defined frontend architecture.
