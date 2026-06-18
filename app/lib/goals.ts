import { differenceInCalendarDays, format, parseISO } from "date-fns";

export type Goal = {
  id: string;
  title: string;
  end_date: string;
  created_at: string;
  completed: boolean;
  completed_at: string | null;
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
  };
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
