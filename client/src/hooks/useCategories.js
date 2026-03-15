import { useState, useEffect, useMemo } from "react";
import {
  DEFAULT_CATEGORIES,
  MAX_CUSTOM_CATEGORIES,
} from "../constants/categories";

import { fetchCategories } from "../features/dashboard/services/expenses.api";

const STORAGE_KEY = "monni_custom_categories";

/* ---------- Helpers ---------- */

function normalizeCategory(name) {
  return name.trim().toLowerCase();
}

function toTitleCase(str) {
  return str
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/* ---------- Global cache ---------- */

let cachedDbCategories = null;
let fetchingPromise = null;

/* ---------- Hook ---------- */

export default function useCategories() {
  const [dbCategories, setDbCategories] = useState([]);
  const [customCategories, setCustomCategories] = useState([]);

  /* Load DB categories (cached) */
  useEffect(() => {
    async function load() {
      try {
        if (cachedDbCategories) {
          setDbCategories(cachedDbCategories);
          return;
        }

        if (!fetchingPromise) {
          fetchingPromise = fetchCategories();
        }

        const res = await fetchingPromise;

        cachedDbCategories = res?.categories || [];

        setDbCategories(cachedDbCategories);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    }

    load();
  }, []);

  /* Load local custom categories */
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      try {
        setCustomCategories(JSON.parse(stored));
      } catch {
        setCustomCategories([]);
      }
    }
  }, []);

  /* Persist custom categories */
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(customCategories)
    );
  }, [customCategories]);

  /* Merge categories safely */
  const categories = useMemo(() => {
    const map = new Map();

    const all = [
      ...DEFAULT_CATEGORIES,
      ...dbCategories,
      ...customCategories,
    ];

    for (const cat of all) {
      const normalized = normalizeCategory(cat);

      if (!map.has(normalized)) {
        map.set(normalized, toTitleCase(normalized));
      }
    }

    return Array.from(map.values()).sort();
  }, [dbCategories, customCategories]);

  /* Add custom category */
  const addCustomCategory = (name) => {
    const normalized = normalizeCategory(name);

    if (!normalized) return { error: "Empty category" };

    const exists = categories.some(
      (c) => normalizeCategory(c) === normalized
    );

    if (exists) return { error: "Already exists" };

    if (customCategories.length >= MAX_CUSTOM_CATEGORIES)
      return { error: "Custom Category Limit Reached !" };

    setCustomCategories((prev) => [
      ...prev,
      toTitleCase(normalized),
    ]);

    return { success: true };
  };

  return {
    categories,
    addCustomCategory,
  };
}