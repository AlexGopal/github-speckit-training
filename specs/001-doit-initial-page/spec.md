# Feature: doit - Initial Page

Short name: doit-initial-page

Created: 2026-06-17
Status: Draft

## Summary

Create the initial public-facing page for "doit", a goal-tracking web app. The page presents two columns: a left column showing current goals with a countdown of days remaining, and a right column listing completed goals. Users can check a goal via a checkbox and then either move it to the completed column or permanently delete it. New goals are added via a modal form that captures a title and end date. Goals that will reach their end date within 3 days are visually highlighted.

## Clarifications

### Session 2026-06-18

 - Q: Goal ID Generation → A: Option A - Timestamp (ms)

## Actors

- Viewer: someone who views completed goals (same as User, no separate auth assumed)
  - generation: timestamp milliseconds since epoch (Date.now())

## Actions

- Create goal (title + end date)
- Mark goal checkbox
- Move goal to completed list
- Permanently delete a goal
- Open/close new-goal modal
 - FR-009: Goal `id` values are generated client-side using the timestamp in milliseconds (`Date.now()`).

- Goal: { id, title, end_date, created_at, completed (bool), completed_at }
- UI state: modal open/closed, selected goal id for actions

## Constraints

- No automated tests are included (conforms to project constitution)
- Timezone: dates are user-local unless otherwise specified in implementation
- Modal must be accessible and dismissible via keyboard
- Data persistence: goals are stored in browser Local Storage; data is device-specific and cleared if browser storage is cleared

## User Scenarios & Validation (mandatory)

### User Story 1 - Create Goal (P1)

As a user, I want to add a goal with a title and end date so I can track progress.

Independent Validation: Open the modal, enter a title and an end date, submit, and confirm the goal appears in the left column with the correct end date and days-left counter.

Acceptance Scenarios:
1. Given the page is open, when the user clicks Add Goal, then a modal appears with title and end date fields.
2. Given valid input, when the user submits, then the goal appears in the left column and the modal closes.

### User Story 2 - Complete or Delete Goal (P1)

As a user, I can check a goal and either move it to completed or delete it permanently.

Independent Validation: Check a goal and perform the move-to-completed action; verify the goal moves to the right column. Then repeat and choose delete; verify it is removed.

Acceptance Scenarios:
1. Given an unchecked goal, when the user checks it, inline "Complete" and "Delete" buttons appear next to the goal.
2. Given a checked goal with action buttons visible, when the user clicks "Complete", the goal moves to the completed column with completion timestamp.
3. Given a checked goal with action buttons visible, when the user clicks "Delete", the goal is permanently removed.
4. Given a checked goal with action buttons visible, when the user unchecks it, the inline action buttons disappear and the goal remains unchecked with no action applied.

### User Story 3 - Highlight Imminent Goals (P2)

As a user, I want goals within 3 days of their end date to be highlighted so I can prioritise them.

Independent Validation: Create a goal with an end date 2 days away; confirm it shows the highlight style in the left column.

Acceptance Scenarios:
1. Given a goal with end date within 3 days, then it renders with the "imminent" highlight.

### Edge Cases & Error Handling

- End date equal to today: days-left shows 0 and treated as imminent
- End date in the past: show as overdue and highlighted as urgent
- Deleting a completed goal removes it from completed list
- Storage quota exceeded: show error message to user; goal is not saved; user may delete existing goals to free space and retry

## Functional Requirements

- FR-001: Users can create a new goal with a title and end date
- FR-002: Created goals display in the left column with a days-left counter
- FR-003: Users can check a goal; inline "Complete" and "Delete" buttons appear next to the checked goal
- FR-004: Completed goals display in the right column with completed_at timestamp
- FR-005: Goals within 3 days of end date are visually highlighted
- FR-006: Modal is accessible (keyboard focus, ESC to close)
- FR-007: Storage errors (quota exceeded, etc.) display a user-friendly error message suggesting recovery actions (e.g., "Cannot save goal — storage is full. Try deleting old goals.")
 - FR-008: Unchecking a checked goal cancels pending actions; inline action buttons hide and no state change is applied.

## Key Entities

- Goal
  - id: unique identifier
  - title: string
  - end_date: date
  - created_at: datetime
  - completed: boolean
  - completed_at: datetime|null

## Success Criteria

- SC-001: Users can add a goal and see it appear in under 5 seconds
- SC-002: 95% of created goals show correct days-left calculation for sample dates
- SC-003: Users can move a checked goal to completed within 3 interactions
- SC-004: Goals within 3 days are visually distinct in the UI

## Assumptions

- No authentication required for initial page (public demo)
- Dates are presented in the user's locale and timezone
- Recurring goals are out of scope for this initial page
- Goals are stored locally per device/browser; data does not sync across devices or clear the browser cache

## Dependencies

- None at the specification level. Implementation may introduce libraries, but those choices belong to the plan phase.

## Notes

- Follow the project constitution: do not introduce automated testing guidance in this spec.
