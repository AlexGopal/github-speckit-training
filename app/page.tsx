"use client";

import { useEffect, useMemo, useState } from "react";
import { GoalActions } from "./components/goal-actions";
import { GoalCard } from "./components/goal-card";
import { NewGoalModal } from "./components/new-goal-modal";
import {
  buttonPrimary,
  pageInner,
  pageShell,
  sectionCard,
  sectionHeader,
  sectionSubtitle,
  sectionTitle,
} from "./components/theme";
import { createGoal, decorateGoal, Goal } from "./lib/goals";
import { loadGoals, saveGoals } from "./lib/storage";

export default function Home() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const result = loadGoals();
    if (!result.success) {
      setErrorMessage(result.error);
      setGoals([]);
    } else {
      setGoals(result.value);
    }
    setHydrated(true);
  }, []);

  const activeGoals = useMemo(
    () =>
      goals
        .filter((goal) => !goal.completed)
        .map(decorateGoal)
        .sort((a, b) => a.end_date.localeCompare(b.end_date)),
    [goals]
  );

  const completedGoals = useMemo(
    () =>
      goals
        .filter((goal) => goal.completed)
        .map(decorateGoal)
        .sort((a, b) => (b.completed_at ?? "").localeCompare(a.completed_at ?? "")),
    [goals]
  );

  function persistGoals(nextGoals: Goal[]) {
    const result = saveGoals(nextGoals);
    if (!result.success) {
      setErrorMessage(result.error);
      return false;
    }
    setErrorMessage(null);
    return true;
  }

  function handleAddGoal(title: string, endDate: string) {
    const nextGoal = createGoal(title, endDate);
    const nextGoals = [...goals, nextGoal];

    if (!persistGoals(nextGoals)) {
      return;
    }

    setGoals(nextGoals);
    setModalOpen(false);
    setSelectedGoalId(null);
  }

  function handleComplete(goalId: string) {
    const nextGoals = goals.map((goal) =>
      goal.id === goalId
        ? { ...goal, completed: true, completed_at: new Date().toISOString() }
        : goal
    );

    if (!persistGoals(nextGoals)) {
      return;
    }

    setGoals(nextGoals);
    setSelectedGoalId(null);
  }

  function handleDelete(goalId: string) {
    const nextGoals = goals.filter((goal) => goal.id !== goalId);

    if (!persistGoals(nextGoals)) {
      return;
    }

    setGoals(nextGoals);
    setSelectedGoalId(null);
  }

  function toggleSelect(goalId: string) {
    setSelectedGoalId((current) => (current === goalId ? null : goalId));
  }

  if (!hydrated) {
    return <div className={pageShell} />;
  }

  return (
    <main className={pageShell}>
      <div className={pageInner}>
        <div className={`${sectionHeader} mb-8`}>
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-accent)]">doit</p>
            <h1 className="mt-3 text-4xl font-semibold text-[var(--color-text)]">Goal tracker initial page</h1>
            <p className={`${sectionSubtitle} mt-3 max-w-2xl`}>
              Add goals with end dates, mark them complete, and highlight imminent deadlines. All data is stored locally in your browser.
            </p>
          </div>

          <button type="button" className={buttonPrimary} onClick={() => setModalOpen(true)}>
            Add Goal
          </button>
        </div>

        {errorMessage ? (
          <div className="mb-8 rounded-3xl border border-[var(--color-danger)] bg-[var(--color-surface)] p-4 text-sm text-[var(--color-danger)]">
            {errorMessage}
          </div>
        ) : null}

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <section className={`${sectionCard} p-6`}>
            <div className={sectionHeader}>
              <div>
                <h2 className={sectionTitle}>Current goals</h2>
                <p className={sectionSubtitle}>Your active goals appear here until completed or deleted.</p>
              </div>
              <span className="rounded-full bg-[var(--color-border)] px-3 py-1 text-xs font-medium text-[var(--color-muted)]">
                {activeGoals.length} open
              </span>
            </div>

            <div className="space-y-4">
              {activeGoals.length === 0 ? (
                <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-sm text-[var(--color-muted)]">
                  No goals yet. Click Add Goal to create your first item.
                </div>
              ) : (
                activeGoals.map((goal) => (
                  <GoalCard
                    key={goal.id}
                    goal={goal}
                    selected={selectedGoalId === goal.id}
                    onToggleSelect={() => toggleSelect(goal.id)}
                  >
                    <GoalActions
                      onComplete={() => handleComplete(goal.id)}
                      onDelete={() => handleDelete(goal.id)}
                    />
                  </GoalCard>
                ))
              )}
            </div>
          </section>

          <section className={`${sectionCard} p-6`}>
            <div className={sectionHeader}>
              <div>
                <h2 className={sectionTitle}>Completed goals</h2>
                <p className={sectionSubtitle}>Goals you have completed will appear here with timestamps.</p>
              </div>
              <span className="rounded-full bg-[var(--color-border)] px-3 py-1 text-xs font-medium text-[var(--color-muted)]">
                {completedGoals.length} completed
              </span>
            </div>

            <div className="space-y-4">
              {completedGoals.length === 0 ? (
                <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-sm text-[var(--color-muted)]">
                  No completed goals yet. Complete a goal to see it move here.
                </div>
              ) : (
                completedGoals.map((goal) => (
                  <GoalCard key={goal.id} goal={goal} selected={false} showCheckbox={false} />
                ))
              )}
            </div>
          </section>
        </div>
      </div>

      <NewGoalModal open={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleAddGoal} />
    </main>
  );
}
