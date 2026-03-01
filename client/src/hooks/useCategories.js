import { useState, useEffect, useMemo } from "react";
import {
  DEFAULT_CATEGORIES,
  MAX_CUSTOM_CATEGORIES,
} from "../constants/categories";

import {fetchCategories} from "../features/dashboard/services/expenses.api";

const STORAGE_KEY = "monni_custom_categories";

export default function useCategories() {
  const [dbCategories, setDbCategories] = useState([]);
  const [customCategories, setCustomCategories] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetchCategories();
      setDbCategories(res.categories || []);
    }
    load();
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setCustomCategories(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(customCategories)
    );
  }, [customCategories]);

  const categories = useMemo(() => {
    const merged = [
      ...DEFAULT_CATEGORIES,
      ...dbCategories,
      ...customCategories,
    ];
    return Array.from(new Set(merged));
  }, [dbCategories, customCategories]);

  const addCustomCategory = (name) => {
    const trimmed = name.trim();

    if (!trimmed) return { error: "Empty category" };
    if (categories.includes(trimmed))
      return { error: "Already exists" };
    if (customCategories.length >= MAX_CUSTOM_CATEGORIES)
      return { error: "Custom Category Limit Reached !" };

    setCustomCategories((prev) => [...prev, trimmed]);
    return { success: true };
  };

  return {
    categories,
    addCustomCategory,
  };
}