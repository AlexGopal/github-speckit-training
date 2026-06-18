import { differenceInCalendarDays, format, parseISO } from "date-fns";

export type Goal = {
  id: string;
  title: string;
  end_date: string;
  created_at: string;
  completed: boolean;
  completed_at: string | null;
  order?: number;
};

export type GoalWithDerived = Goal & {
  days_left: number;
  imminent: boolean;
  urgent: boolean;
  formatted_end_date: string;
  formatted_completed_at: string | null;
};

export function createGoal(title: string, endDate: string): Goal {
  return {
    id: Date.now().toString(),
    title: title.trim(),
    end_date: endDate,
    created_at: new Date().toISOString(),
    completed: false,
    completed_at: null,
    order: undefined,
  };
}

export function assignMissingOrder(goals: Goal[]): Goal[] {
  // Ensure active goals have a stable order. Keep existing orders when present.
  const active = goals.filter((g) => !g.completed);

  // If any active goal lacks an order, assign sequential order based on created_at
  let nextOrder = 1;
  const sortedActive = [...active].sort((a, b) => (a.order ?? 0) - (b.order ?? 0) || a.created_at.localeCompare(b.created_at));

  const activeWithOrder = sortedActive.map((g) => ({ ...g, order: g.order ?? nextOrder++ }));

  // Merge back with completed goals preserving their order field if any
  const completed = goals.filter((g) => g.completed);

  return [...activeWithOrder, ...completed];
}

export function reindexOrders(goals: Goal[]): Goal[] {
  // Reindex only active goals starting at 1
  const active = goals.filter((g) => !g.completed).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const reindexedActive = active.map((g, i) => ({ ...g, order: i + 1 }));
  const completed = goals.filter((g) => g.completed);
  return [...reindexedActive, ...completed];
}

export function getDaysLeft(endDate: string): number {
  return differenceInCalendarDays(parseISO(endDate), new Date());
}

export function isUrgent(endDate: string): boolean {
  return getDaysLeft(endDate) <= 0;
}

export function isImminent(endDate: string): boolean {
  return getDaysLeft(endDate) <= 3;
}

export function formatEndDate(endDate: string): string {
  return format(parseISO(endDate), "PPP");
}

export function formatCompletedAt(datetime: string | null): string | null {
  return datetime ? format(parseISO(datetime), "PPP p") : null;
}

export function decorateGoal(goal: Goal): GoalWithDerived {
  return {
    ...goal,
    days_left: getDaysLeft(goal.end_date),
    imminent: isImminent(goal.end_date),
    urgent: isUrgent(goal.end_date),
    formatted_end_date: formatEndDate(goal.end_date),
    formatted_completed_at: formatCompletedAt(goal.completed_at),
  };
}
