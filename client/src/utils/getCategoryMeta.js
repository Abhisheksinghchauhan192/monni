import { CATEGORY_META } from "../constants/categoryMeta";

export function getCategoryMeta(category) {
  const key = category?.toLowerCase();

  if (CATEGORY_META[key]) {
    return CATEGORY_META[key];
  }

  return {
    emoji: "🏷️",
    color: "#6B7280",
    chip:
      "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
  };
}