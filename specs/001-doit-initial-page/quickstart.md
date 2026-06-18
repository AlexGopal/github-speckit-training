# Quickstart

## Prerequisites

- Node.js installed
- Dependencies installed via `npm install`

## Run the app locally

1. Start the Next.js development server:

```bash
npm run dev
```

2. Open the app in the browser at:

```text
http://localhost:3000
```

3. Navigate to the initial page and verify the feature:

- Click **Add Goal** to open the modal.
- Enter a title and end date, then submit.
- Confirm the new goal appears in the left column with the correct end date and days-left counter.
- Check the goal and verify inline **Complete** and **Delete** buttons appear.
- Click **Complete** to move the goal to the right column and confirm the completed timestamp appears.
- Create a goal with an end date within 3 days and verify it displays the imminent highlight.

## Expected Outcomes

- Goals persist when the browser reloads.
- The add-goal modal is keyboard accessible and dismissible with Escape.
- Completed goals show `completed_at`.
- Storage errors display a user-facing message.

## Notes

- No automated tests are included per project constitution.
