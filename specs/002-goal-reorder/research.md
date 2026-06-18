# Research

## Decisions

- Use the `sortable` library to enable drag-and-drop reordering for active goals.
- Use Tailwind CSS for all visual styling and drag-state feedback.
- Persist goal order in Local Storage, extending the existing goal schema with an explicit `order` field.
- Keep completed goals outside the sorting flow to avoid cross-list reordering complexity.

## Rationale

- `sortable` is a focused library for list item sorting that fits a small frontend feature without introducing a heavy drag-and-drop framework.
- Tailwind CSS is already established in the project and allows fast styling of drag handles, active drop targets, and placeholder states.
- Explicit `order` values are the simplest persistent sort key for browser storage and ensure order can be restored accurately on refresh.

## Alternatives Considered

- Using native HTML5 drag events directly: rejected because it would require more low-level event plumbing and `sortable` provides a stable list reorder abstraction.
- Persisting only array position without `order` fields: rejected because explicit `order` values make reordering idempotent and easier to manage when goals are added or removed.
- Reordering completed goals as well: rejected to keep scope limited and reduce UI complexity.

## Open Questions

- No open questions remain; the spec decision clearly bounds this feature to active goal ordering only.
