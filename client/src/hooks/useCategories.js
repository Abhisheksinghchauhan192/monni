import { useState, useEffect, useMemo } from "react";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../features/profile/services/category.api";

import { getCategoryMeta } from "../utils/getCategoryMeta";

/* ---------- Helpers ---------- */

function normalizeCategory(name) {
  
  return name?.trim().toLowerCase();
}

function toTitleCase(str) {
  if (!str) return "";
  return str
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/* ---------- Hook ---------- */

export default function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ---------- Load ---------- */

  const loadCategories = async () => {
    try {
      setLoading(true);

      const res = await fetchCategories();
      const data = res.data?.categories || [];

      setCategories(data);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  /* ---------- Derived UI ---------- */

  const formattedCategories = useMemo(() => {
    return categories.map((c) => {
      const meta = getCategoryMeta(c.name);

      return {
        id: c.id,
        name: normalizeCategory(c.name),
        label: toTitleCase(c.name),
        emoji: c.emoji || meta.emoji,
        chip: meta.chip,
        user_id: c.user_id,
      };
    });
  }, [categories]);

  /* ---------- ADD ---------- */

  const addCategory = async (name, emoji = "🏷️") => {
    const normalized = normalizeCategory(name);

    
    try {
      const exists = categories.find(
        (c) => normalizeCategory(c.name) === normalized,
      );

      if (exists) {
        return { success: true, data: exists };
      }
      const res = await createCategory({
        name: normalized,
        emoji,
      });

      const newCat = {
        id: res.data.id,
        name: normalized,
        emoji,
        user_id: res.data.userId || true, //force it as custom
      };

      setCategories((prev) => [...prev, newCat]);

      return { success: true, data: newCat };
    } catch (err) {
      return {
        error: err?.response?.data?.message || "Failed to create category",
      };
    }
  };

  /* ---------- UPDATE ---------- */

  const editCategory = async (id, data) => {
    try {
      await updateCategory(id, data);

      setCategories((prev) =>
        prev.map((c) =>
          c.id === id
            ? {
                ...c,
                ...data,
                name: data.name ? normalizeCategory(data.name) : c.name,
              }
            : c,
        ),
      );

      return { success: true };
    } catch (err) {
      return {
        error: err?.response?.data?.message || "Update failed",
      };
    }
  };

  /* ---------- DELETE ---------- */

  const removeCategory = async (id) => {
    try {
      await deleteCategory(id);

      setCategories((prev) => prev.filter((c) => c.id !== id));

      return { success: true };
    } catch (err) {
      return {
        error: err?.response?.data?.message || "Delete failed",
      };
    }
  };

  return {
    categories: formattedCategories,
    rawCategories: categories,

    loading,
    reload: loadCategories,

    addCategory,
    editCategory,
    removeCategory,
  };
}
