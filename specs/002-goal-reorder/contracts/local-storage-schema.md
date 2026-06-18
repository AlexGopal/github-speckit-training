# Local Storage Schema

## Key

- `doit-goals`

## Value

A JSON string representing an array of `Goal` objects.

## Goal Object Schema

- `id`: string | number — unique identifier generated client-side.
- `title`: string — goal title.
- `end_date`: string — ISO date (YYYY-MM-DD).
- `created_at`: string — ISO datetime.
- `completed`: boolean — marks completion state.
- `completed_at`: string|null — ISO datetime when completed or `null`.
- `order`: number — explicit position in the active goals list.

## Example

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
