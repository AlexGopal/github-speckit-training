# Research

## Decisions

- Storage: browser Local Storage, since the feature explicitly targets device-local persistence and goals are managed within a single browser session.
- UI framework: Shadcn-style components can be used for accessible modal and controls while keeping the implementation aligned with the existing Next.js frontend.
- Styling: Tailwind CSS v4 with `@theme` color variables ensures theme colors are centralized and consistent.
- Date formatting: use `date-fns` for locale-aware formatting and day calculations.

## Rationale

- Local Storage is the simplest persistence mechanism for a small frontend demo and matches the user's explicit request.
- Shadcn UI patterns reduce custom component complexity and improve accessibility out of the box.
- `date-fns` is lightweight and well-suited for formatting dates in a user-local timezone without adding heavy dependencies.

## Alternatives Considered

- Backend persistence: rejected because the feature should remain frontend-only and device-specific.
- IndexedDB: more complex than needed for a small goal list and unnecessary when Local Storage suffices.
- UUID generation: more complex than timestamp IDs for this usage. A timestamp in milliseconds is adequate for locally created goals.

## Open Questions

- None remain; the spec has clarified storage, action flow, error handling, unchecking, and ID generation.