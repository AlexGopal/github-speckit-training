# Quickstart

## Prerequisites

- Node.js installed
- Dependencies installed via `npm install`
- Repository root contains the existing Next.js app

## Run the app

```bash
npm run dev
```

Then open the browser at the local development URL shown by Next.js.

## Validation Scenario

1. Open the app page that displays goals.
2. Add several active goals if none exist.
3. Drag an active goal item above another active goal.
4. Observe the list reorder immediately and the dragged item appear in its new position.
5. Refresh the page.
6. Confirm the active goals list retains the new order.

## Expected Outcome

- Active goals reorder instantly with drag-and-drop.
- The reorder preserves each goal's title, end date, and completion state.
- The order persists across page reloads.
- Completed goals remain unchanged and are not part of the reorder flow.
