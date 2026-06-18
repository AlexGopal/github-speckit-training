# Data Model

## Entities

### Goal

- id: string
  - generation: timestamp milliseconds since epoch (`Date.now()`)
- title: string
- end_date: string (ISO date, user-local date fields)
- created_at: string (ISO datetime)
- completed: boolean
- completed_at: string|null (ISO datetime)
- urgent: boolean (derived; true when end date is today or earlier)
- imminent: boolean (derived; true when end date is within 3 days)

### UI State

- modalOpen: boolean
- selectedGoalId: string|null
- errorMessage: string|null

## Derived Fields

- days_left: integer = difference between end_date and today in days
- formatted_end_date: string = localized date display using `date-fns`
- formatted_completed_at: string|null = localized datetime display using `date-fns`

## Storage Schema

Local Storage key: `doit-goals`
Value: JSON string of an array of `Goal` objects.

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
