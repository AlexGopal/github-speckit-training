# Data Model

## Goal

A `Goal` represents a user-created item in the active goals list.

### Fields

- `id`: string | number — unique identifier for the goal.
- `title`: string — the user's goal text.
- `end_date`: string — ISO date representing the goal's due date.
- `created_at`: string — ISO datetime when the goal was created.
- `completed`: boolean — whether the goal is completed.
- `completed_at`: string | null — ISO datetime when the goal was completed.
- `order`: number — explicit sort position for active goals.

## Persistence Rules

- Active goals are sorted by `order` ascending before rendering.
- When a goal is added without an `order`, assign it the next highest order value at the end of the active list.
- When a goal is moved via drag-and-drop, update the `order` values for all active goals in the visible list.
- Completed goals retain their same data fields, but are excluded from active reorder logic.

## Local Storage Schema

The app stores a JSON array of goal objects under a single key.

- Key: `doit-goals`
- Value: JSON string of `Goal[]`

### Example

```json
[
  {
    "id": "1687044400000",
    "title": "Finish project",
    "end_date": "2026-06-20",
    "created_at": "2026-06-18T12:00:00.000Z",
    "completed": false,
    "completed_at": null,
    "order": 1
  }
]
```
