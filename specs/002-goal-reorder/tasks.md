# Tasks: Goal Reorder

**Input**: Design documents from `/specs/002-goal-reorder/`

## Phase 1: Setup (Shared Infrastructure)

- [ ] T001 Add `sortable` dependency to `package.json` and run `npm install` (package.json)
- [ ] T002 Update `package-lock.json` after installing dependencies (package-lock.json)

---

## Phase 2: Foundational (Blocking Prerequisites)

- [ ] T003 [P] Add `order` field to `Goal` model and update local-storage contract in `specs/002-goal-reorder/contracts/local-storage-schema.md`
- [ ] T004 Migrate persisted goals to include `order` when loading in `app/lib/storage.ts` (or `app/lib/goals.ts`) so existing data is assigned stable order values
- [ ] T005 [P] Add helper functions to `app/lib/goals.ts` for reading/writing goals with `order` semantics (e.g., `assignMissingOrder()`, `reindexOrders()`)

---

## Phase 3: User Story 1 - Reorder Active Goals (Priority: P1) 🎯 MVP

**Goal**: Allow users to reorder active goals by dragging and dropping them above or below other goals and persist the new order.

**Independent Validation**: Manually reorder active goals and verify the visual order updates immediately and persists after page reload.

### Validation

- [ ] T006 [P] [US1] Document manual acceptance steps in `specs/002-goal-reorder/quickstart.md`

### Implementation

- [ ] T007 Create `app/components/goal-list.tsx` to render the active goals list and act as the `sortable` container
- [ ] T008 [US1] Integrate `sortable` in `app/components/goal-list.tsx` and configure drag handles, placeholder, and drop callbacks
- [ ] T009 [US1] Update `app/page.tsx` (or the active goals page) to use `app/components/goal-list.tsx` for active goals rendering
- [ ] T010 [US1] On drop, recalculate `order` values for visible active goals and persist via `app/lib/goals.ts` (or `app/lib/storage.ts`)
- [ ] T011 [US1] Style draggable items and placeholder using Tailwind classes in `app/components/goal-list.tsx` and `app/components/goal-card.tsx`

---

## Phase 4: User Story 2 - Maintain Goal State During Reorder (Priority: P2)

**Goal**: Preserve goal content, completion state, and selection when reordering.

**Independent Validation**: Reorder checked or completed goals and verify no field values change.

- [ ] T012 [US2] Ensure completed goals are rendered in a separate list in `app/page.tsx` and excluded from `sortable` container
- [ ] T013 [US2] Ensure the drop handler only updates `order` and not other fields; validate code in `app/lib/goals.ts`
- [ ] T014 [US2] Add migration/test helper to verify object identity is maintained after reorder (code: `app/lib/goals.ts`)
- [ ] T015 [US2] Manual validation: verify title, end date, and `completed` flag remain the same after multiple reorders (document in `specs/002-goal-reorder/quickstart.md`)

---

## Phase 5: User Story 3 - Accessible Reorder Feedback (Priority: P3)

**Goal**: Provide keyboard-friendly reorder operations and clear drag feedback.

**Independent Validation**: Use keyboard controls to move focused item up/down and observe ARIA announcements and focus management.

- [ ] T016 [US3] Add visible drag indicator and drop placeholder styles (files: `app/components/goal-list.tsx`, `app/components/goal-card.tsx`)
- [ ] T017 [US3] Implement keyboard move controls (Up/Down buttons or arrow-key handlers) in `app/components/goal-card.tsx` and wire to `app/lib/goals.ts`
- [ ] T018 [US3] Add ARIA attributes to announce drag start/drag end and placeholder positions (files: `app/components/goal-list.tsx`, `app/components/goal-card.tsx`)
- [ ] T019 [US3] Manual validation: document keyboard-based validation steps in `specs/002-goal-reorder/quickstart.md`

---

## Phase N: Polish & Cross-Cutting Concerns

- [ ] T020 Update `specs/002-goal-reorder/contracts/local-storage-schema.md` with final schema and example payload
- [ ] T021 [P] Code cleanup: remove unused imports and ensure tailwind class consistency (files: `app/components/*`, `app/lib/*`)
- [ ] T022 Commit changes and add a concise changelog entry in `CHANGELOG.md` (create file if missing)

---

## Dependencies & Execution Order

- Phase 1 → Phase 2 → Phase 3 (US1) → Phase 4 (US2, optional parallel) → Phase 5 (US3) → Polish

## Parallel Opportunities

- Tasks marked `[P]` can be implemented in parallel by different developers (e.g., `T003`, `T005`, `T021`).

---

## Notes

- All manual validation steps are documented in `specs/002-goal-reorder/quickstart.md` for easy verification.
- No automated tests to be introduced per project constitution.
