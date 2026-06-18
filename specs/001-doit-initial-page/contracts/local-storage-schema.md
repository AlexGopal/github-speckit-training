# Local Storage Schema

## Key

- `doit-goals`

## Value

A JSON string representing an array of goal objects.

## Goal Object Schema

- `id`: string — unique identifier generated from `Date.now()`
- `title`: string — goal title
- `end_date`: string — ISO date (YYYY-MM-DD)
- `created_at`: string — ISO datetime
- `completed`: boolean — marks completion state
- `completed_at`: string|null — ISO datetime when completed or `null`

## Example

```json
[
  {
    "id": "1687044400000",
    "title": "Finish project",
    "end_date": "2026-06-20",
    "created_at": "2026-06-18T12:00:00.000Z",
    "completed": false,
    "completed_at": null
  }
]
```
