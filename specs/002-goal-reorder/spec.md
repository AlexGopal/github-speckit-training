# Feature Specification: Goal Reorder

**Feature Branch**: `002-goal-reorder`

**Created**: 2026-06-18

**Status**: Draft

**Input**: User description: "drag and drop - let's make it so that users can reorder goals by dragging and dropping them above or below other goals in the list."

## Clarifications

### Session 2026-06-18

- Q: Should drag-and-drop support completed goals as well? → A: Option A - Support drag-and-drop reorder only for the active goals list

## User Scenarios & Validation *(mandatory)*

### User Story 1 - Reorder Active Goals (Priority: P1)

As a user, I want to drag and drop active goals so I can order them by priority.

**Why this priority**: Reordering goals is the core interaction for managing focus and prioritizing work in the goal list.

**Independent Validation**: Drag a goal item above or below another goal and confirm the list updates instantly and the new order remains visible.

**Acceptance Scenarios**:

1. **Given** a list of active goals, **When** the user drags a goal above another goal, **Then** the dragged goal appears in the new position and the list reflects the updated order.
2. **Given** a list of active goals, **When** the user drags a goal below another goal, **Then** the dragged goal appears below the target goal and the new order is preserved.
3. **Given** a reordered list, **When** the user refreshes the page, **Then** the same goal order is restored.

---

### User Story 2 - Maintain Goal State During Reorder (Priority: P2)

As a user, I want goals to keep their title, due date, and completion state while I reorder them.

**Why this priority**: Order changes should not alter goal data or accidentally complete, delete, or otherwise modify a goal.

**Independent Validation**: Reorder a completed or selected goal and verify its title, due date, and completed status remain unchanged.

**Acceptance Scenarios**:

1. **Given** a checked goal or completed goal, **When** the user drags it to a new position, **Then** the goal retains its existing state and only its list position changes.
2. **Given** a goal being reordered, **When** the drop is complete, **Then** the goal remains selectable and its inline actions remain associated with the same goal.

---

### User Story 3 - Accessible Reorder Feedback (Priority: P3)

As a user, I want clear visual and keyboard-friendly feedback while dragging goals so I can complete reordering without confusion.

**Why this priority**: Drag-and-drop interactions must feel reliable and understandable for all users.

**Independent Validation**: Start a drag operation, observe visual feedback for the dragged item and placeholder position, then drop and confirm the result.

**Acceptance Scenarios**:

1. **Given** a goal item, **When** the user begins dragging it, **Then** a clear drag indicator appears and the target position is shown.
2. **Given** a goal item, **When** the user uses keyboard move controls if available, **Then** the goal moves one slot up or down with clear focus feedback.

---

### Edge Cases

- Dragging a goal into the first position when the list already has an active top item.
- Dragging a goal into the last position in a long list.
- Attempting to reorder when there is only one goal in the active list.
- Reordering while a goal is selected or has inline action buttons visible.
- Page reload during or immediately after a reorder operation.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Users MUST be able to drag and drop active goals to reorder them above or below other goals in the list.
- **FR-002**: The goal list MUST update immediately to reflect the new order after a drop action.
- **FR-003**: The reordered goal order MUST persist across page reloads and browser sessions.
- **FR-004**: The reorder operation MUST preserve each goal's title, end date, completion state, and any selected state.
- **FR-005**: The interface MUST provide clear visual feedback during drag-and-drop so users can see the target position.
- **FR-006**: The reorder interaction MUST remain usable with pointer dragging and must include an accessible fallback for keyboard users or users who cannot use a pointer.
- **FR-007**: Completed goals MUST retain their completed state and placement when they are reordered within the same goal list.
- **FR-008**: The system MUST prevent accidental state changes during reorder; dragging a goal MUST not complete or delete it.

### Key Entities *(include if feature involves data)*

- **Goal**: A tracked item with title, end date, created date, completion state, and persisted order.
- **Goal Order**: The relative position of each goal within the active goal list, independent of goal content.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can reorder a goal with drag-and-drop in under 3 interactions for 95% of simple reorder tasks.
- **SC-002**: Reordered goal sequence is restored after a page refresh in 95% of manual verification checks.
- **SC-003**: 100% of reordered goals retain their title, due date, and completed state after the drop.
- **SC-004**: Drag-and-drop feedback is visible for every reorder operation, including a move placeholder or highlight of the target position.

## Assumptions

- This feature applies to the active goals list and does not require reordering goals across separate completed/archived sections.
- Goal persistence uses the existing local storage approach for the goals app.
- Goal content and metadata remain unchanged during reorder; only list position changes.
- The app already has a page for listing goals and supports state persistence for goal entries.
- No additional server-side storage or syncing is required for this feature.
