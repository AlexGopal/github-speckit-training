import type { Goal } from "./goals";

const STORAGE_KEY = "doit-goals";

export type StorageResult<T> =
  | {
      success: true;
      value: T;
    }
  | {
      success: false;
      error: string;
    };

function parseStorage(value: string): Goal[] {
  const parsed = JSON.parse(value);

  if (!Array.isArray(parsed)) {
    throw new Error("Saved goal data is not an array.");
  }

  return parsed.map((item) => ({
    id: String(item?.id ?? ""),
    title: String(item?.title ?? ""),
    end_date: String(item?.end_date ?? ""),
    created_at: String(item?.created_at ?? new Date().toISOString()),
    completed: Boolean(item?.completed),
    completed_at: item?.completed_at ? String(item.completed_at) : null,
    order: typeof item?.order === "number" ? item.order : item?.order ? Number(item.order) : undefined,
  }));
}

export function loadGoals(): StorageResult<Goal[]> {
  if (typeof window === "undefined") {
    return { success: true, value: [] };
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return { success: true, value: [] };
  }

  try {
    return { success: true, value: parseStorage(raw) };
  } catch (error) {
    return {
      success: false,
      error:
        "Unable to load saved goals. Local Storage data appears corrupted. Clear browser storage and refresh to continue.",
    };
  }
}

export function saveGoals(goals: Goal[]): StorageResult<Goal[]> {
  if (typeof window === "undefined") {
    return { success: false, error: "Local Storage is unavailable." };
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
    return { success: true, value: goals };
  } catch (error) {
    return {
      success: false,
      error:
        "Cannot save goals — storage is full or unavailable. Try deleting old goals and refreshing the page.",
    };
  }
}
