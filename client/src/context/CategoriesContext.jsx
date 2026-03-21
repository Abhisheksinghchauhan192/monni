import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../features/profile/services/category.api";

import { getCategoryMeta as getStaticMeta } from "../utils/getCategoryMeta";

const CategoriesContext = createContext();

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

/* ---------- Provider ---------- */

export function CategoriesProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ---------- Load ONCE ---------- */

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      setLoading(true);
      const res = await fetchCategories();
      setCategories(res.data?.categories || []);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    } finally {
      setLoading(false);
    }
  }

  /* ---------- FORMATTED ---------- */

const formattedCategories = useMemo(() => {
  return categories.map((c) => {
    const meta = getStaticMeta(c.name);

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

  /* ---------- MAP ( IMPORTANT) ---------- */

  const categoryMap = useMemo(() => {
    const map = {};

    formattedCategories.forEach((c) => {
      map[c.name] = c;
    });

    return map;
  }, [formattedCategories]);

  /* ---------- DYNAMIC META ---------- */

  function getCategoryMeta(categoryName) {
    const key = normalizeCategory(categoryName);

    const category = categoryMap[key];
    const fallback = getStaticMeta(categoryName);

    return {
      emoji: category?.emoji || fallback.emoji,
      chip: fallback.chip,
      color: fallback.color,
      label: category?.label || toTitleCase(categoryName),
    };
  }

  /* ---------- CRUD ---------- */

  async function addCategory(name, emoji = "🏷️") {
    const normalized = normalizeCategory(name);

    const exists = categories.find(
      (c) => normalizeCategory(c.name) === normalized
    );

    if (exists) return { success: true, data: exists };

    const res = await createCategory({ name: normalized, emoji });

    const newCat = {
      id: res.data.id,
      name: normalized,
      emoji,
      user_id: res.data.userId ?? true,
    };

    setCategories((prev) => [...prev, newCat]);

    return { success: true, data: newCat };
  }

  async function editCategory(id, data) {
    await updateCategory(id, data);

    setCategories((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              ...data,
              name: data.name ? normalizeCategory(data.name) : c.name,
            }
          : c
      )
    );
  }

  async function removeCategory(id) {
    await deleteCategory(id);
    setCategories((prev) => prev.filter((c) => c.id !== id));
  }

  return (
    <CategoriesContext.Provider
      value={{
        categories: formattedCategories,
        rawCategories: categories,
        loading,
        reload: loadCategories,
        addCategory,
        editCategory,
        removeCategory,
        getCategoryMeta,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}

/* ---------- Hook ---------- */

export function useCategories() {
  return useContext(CategoriesContext);
}