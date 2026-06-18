"use client";

import { FormEvent, useEffect, useState } from "react";
import { buttonPrimary, buttonSecondary, inputField } from "./theme";

type NewGoalModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (title: string, endDate: string) => void;
};

export function NewGoalModal({ open, onClose, onSubmit }: NewGoalModalProps) {
  const [title, setTitle] = useState("");
  const [endDate, setEndDate] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setTitle("");
      setEndDate("");
      setFormError(null);
    }
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim()) {
      setFormError("Please enter a goal title.");
      return;
    }

    if (!endDate) {
      setFormError("Please choose an end date.");
      return;
    }

    setFormError(null);
    onSubmit(title.trim(), endDate);
  }

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4 modal-backdrop">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="new-goal-title"
        className="w-full max-w-xl rounded-[28px] border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-2xl"
      >
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 id="new-goal-title" className="text-2xl font-semibold text-[var(--color-text)]">
              Add Goal
            </h2>
            <p className="mt-2 text-sm text-[var(--color-muted)]">
              Enter a goal title and select an end date to save a new goal.
            </p>
          </div>
          <button type="button" className={buttonSecondary} onClick={onClose}>
            Close
          </button>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--color-text)]" htmlFor="goal-title">
              Title
            </label>
            <input
              id="goal-title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className={inputField}
              placeholder="Enter goal title"
              autoFocus
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--color-text)]" htmlFor="goal-end-date">
              End date
            </label>
            <input
              id="goal-end-date"
              type="date"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
              className={inputField}
            />
          </div>

          {formError ? <p className="text-sm text-[var(--color-danger)]">{formError}</p> : null}

          <div className="flex flex-wrap gap-3">
            <button type="submit" className={buttonPrimary}>
              Save goal
            </button>
            <button type="button" className={buttonSecondary} onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
