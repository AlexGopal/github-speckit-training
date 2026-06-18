"use client";

import { useEffect, useRef } from "react";
import Sortable from "sortablejs";
import type { GoalWithDerived } from "@/app/lib/goals";
import { GoalCard } from "./goal-card";
import { GoalActions } from "./goal-actions";

type GoalListProps = {
  goals: GoalWithDerived[];
  selectedGoalId: string | null;
  onToggleSelect: (id: string) => void;
  onReorder: (ids: string[]) => void;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function GoalList({ goals, selectedGoalId, onToggleSelect, onReorder, onComplete, onDelete }: GoalListProps) {
  const listRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (!listRef.current) return;

    const sortable = Sortable.create(listRef.current, {
      animation: 150,
      ghostClass: "opacity-60",
      swapThreshold: 0.65,
      onEnd: () => {
        if (!listRef.current) return;
        const ids = Array.from(listRef.current.children).map((el) => el.getAttribute("data-id") || "");
        onReorder(ids as string[]);
      },
    });

    return () => sortable.destroy();
  }, [onReorder]);

  return (
    <ul ref={listRef} className="space-y-4" aria-label="Active goals list">
      {goals.map((goal) => (
        <li key={goal.id} data-id={goal.id} className="cursor-grab" tabIndex={0}>
          <GoalCard goal={goal} selected={selectedGoalId === goal.id} onToggleSelect={() => onToggleSelect(goal.id)}>
            <GoalActions onComplete={() => onComplete(goal.id)} onDelete={() => onDelete(goal.id)} />
          </GoalCard>
        </li>
      ))}
    </ul>
  );
}
