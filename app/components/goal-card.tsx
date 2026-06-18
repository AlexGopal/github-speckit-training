import type { ReactNode } from "react";
import type { GoalWithDerived } from "@/app/lib/goals";
import { cardEntry, cardHighlight, cardUrgent } from "./theme";

type GoalCardProps = {
  goal: GoalWithDerived;
  selected: boolean;
  showCheckbox?: boolean;
  onToggleSelect?: () => void;
  children?: ReactNode;
};

export function GoalCard({ goal, selected, showCheckbox = true, onToggleSelect, children }: GoalCardProps) {
  const ringStyle = goal.urgent ? cardUrgent : goal.imminent ? cardHighlight : "";

  return (
    <article className={`${cardEntry} ${ringStyle}`}>
      <div className="flex items-start justify-between gap-3">
        {showCheckbox ? (
          <label className="flex flex-1 cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={selected}
              onChange={onToggleSelect}
              className="mt-1 h-5 w-5 shrink-0 rounded border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-accent)] focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/50"
            />
            <div className="min-w-0">
              <p className="text-base font-semibold text-[var(--color-text)]">{goal.title}</p>
              <p className="mt-1 text-sm text-[var(--color-muted)]">Due {goal.formatted_end_date}</p>
            </div>
          </label>
        ) : (
          <div className="min-w-0">
            <p className="text-base font-semibold text-[var(--color-text)]">{goal.title}</p>
            <p className="mt-1 text-sm text-[var(--color-muted)]">Due {goal.formatted_end_date}</p>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-[var(--color-muted)]">
        <span>Days left: {goal.days_left}</span>
        {goal.completed && goal.formatted_completed_at ? (
          <span>Completed {goal.formatted_completed_at}</span>
        ) : null}
      </div>

      {selected && children ? <div className="mt-4 flex flex-wrap gap-3">{children}</div> : null}
    </article>
  );
}
