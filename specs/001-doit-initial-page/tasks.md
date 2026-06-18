# Tasks: doit-initial-page

**Input**: Design documents from `/specs/001-doit-initial-page/`

## Phase 1: Setup (Shared Infrastructure)

- [ ] T001 Create `app/page.tsx` page shell for the Doit initial page feature
- [ ] T002 Create `app/components/` and `app/lib/` directories for reusable UI and persistence logic
- [ ] T003 Install `date-fns` and confirm the dependency is added to `package.json`
- [ ] T004 Configure Tailwind theme colors in `app/styles/globals.css` using `@theme` tokens

---

## Phase 2: Foundational (Blocking Prerequisites)

- [ ] T005 [P] Create `app/lib/storage.ts` with Local Storage helpers for loading, saving, and deleting the `doit-goals` goal list
- [ ] T006 [P] Create `app/lib/goals.ts` with the `Goal` type, timestamp ID generation, and derived date helpers for `days_left`, `imminent`, and `urgent`
- [ ] T007 [P] Create `app/components/theme.tsx` with shared color and style constants that use Tailwind `@theme` values
- [ ] T008 [P] Create `app/components/goal-card.tsx` for rendering goal details, checkbox selection, and highlight styles
- [ ] T009 [P] Create `app/components/goal-actions.tsx` for inline `Complete` and `Delete` controls shown when a goal is checked

---

## Phase 3: User Story 1 - Create Goal (Priority: P1) 🎯 MVP

**Goal**: Allow users to add a goal with a title and end date and display it in the current goals column.

**Independent Validation**: Open the modal, submit a valid goal, and verify it appears in the left column with the correct end date and days-left counter.

- [ ] T010 [US1] Create `app/components/new-goal-modal.tsx` with title and end date fields and accessible keyboard dismissal behavior
- [ ] T011 [US1] Integrate the new-goal modal into `app/page.tsx` and wire modal open/close state
- [ ] T012 [US1] Implement goal creation in `app/page.tsx` and persist new goals to storage using `app/lib/storage.ts`
- [ ] T013 [US1] Render current goals in the left column from application state in `app/page.tsx`
- [ ] T014 [US1] Display a days-left counter for each goal in `app/components/goal-card.tsx`
- [ ] T015 [US1] Ensure the add-goal modal closes after successful submission in `app/components/new-goal-modal.tsx`

---

## Phase 4: User Story 2 - Complete or Delete Goal (Priority: P1)

**Goal**: Let users check a goal and either move it to completed or permanently delete it.

**Independent Validation**: Check a goal, click `Complete`, confirm it moves to completed; then check another goal, click `Delete`, confirm it is removed.

- [ ] T016 [US2] Add checkbox selection to `app/components/goal-card.tsx` and show inline `Complete`/`Delete` buttons when checked
- [ ] T017 [US2] Implement the `Complete` action in `app/page.tsx` to set `completed_at` and move the goal to the completed goals list
- [ ] T018 [US2] Implement the `Delete` action in `app/page.tsx` to remove the goal from Local Storage and UI state
- [ ] T019 [US2] Add unchecking behavior so inline action buttons disappear and the goal remains unchecked in `app/components/goal-card.tsx`
- [ ] T020 [US2] Render completed goals in the right column with formatted `completed_at` in `app/page.tsx`

---

## Phase 5: User Story 3 - Highlight Imminent Goals (Priority: P2)

**Goal**: Visually highlight goals that are within 3 days of their end date.

**Independent Validation**: Create a goal due within 2 days and confirm it displays the imminent highlight style in the left column.

- [ ] T021 [US3] Add derived `imminent` and `urgent` state to goal helpers in `app/lib/goals.ts`
- [ ] T022 [US3] Use `date-fns` in `app/lib/goals.ts` to calculate days-left and format end dates and completion timestamps
- [ ] T023 [US3] Apply imminent and overdue highlight styling in `app/components/goal-card.tsx`
- [ ] T024 [US3] Confirm goals due within 3 days show the imminent highlight in `app/page.tsx`

---

## Final Phase: Polish & Cross-Cutting Concerns

- [ ] T025 [P] Implement responsive two-column page layout in `app/page.tsx` and `app/styles/globals.css`
- [ ] T026 [P] Ensure all UI colors use Tailwind `@theme` tokens consistently across `app/components/*`
- [ ] T027 [P] Add user-facing storage error handling in `app/lib/storage.ts` and display error messages in `app/page.tsx`
- [ ] T028 [P] Document feature usage and manual validation steps in `specs/001-doit-initial-page/quickstart.md`
- [ ] T029 [P] Perform manual validation of each user story against `specs/001-doit-initial-page/spec.md` acceptance criteria

---

## Dependencies & Execution Order

- **Setup**: T001–T004 can begin immediately
- **Foundational**: T005–T009 must complete before user story implementation
- **User Story 1**: T010–T015 depend on foundational tasks
- **User Story 2**: T016–T020 depend on foundational tasks and can start after User Story 1 if desired
- **User Story 3**: T021–T024 depend on foundational tasks and can start after User Story 1 or in parallel with User Story 2
- **Final Phase**: T025–T029 depend on user story completion

## Parallel Opportunities

- T005, T006, T007, T008, and T009 are parallelizable foundational tasks
- T026, T027, T028, and T029 are parallelizable polish tasks
- Different user stories can be developed in parallel after foundational work is complete
- Validation and documentation tasks can also proceed in parallel with final styling cleanup
