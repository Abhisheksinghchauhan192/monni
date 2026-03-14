import { useState, useEffect, useRef } from "react";
import { fetchExpenseTable } from "../services/expenses.api";

export default function useExpenses(filters = {}) {

  const [expenses, setExpenses] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cursorRef = useRef(null);

  const requestIdRef = useRef(0);
  const fetchingRef = useRef(false);

  const cacheRef = useRef(new Map());

  const serializedFilters = JSON.stringify(filters || {});

  const fetchExpenses = async (reset = false) => {

    if (fetchingRef.current) return;
    if (!hasMore && !reset) return;

    fetchingRef.current = true;
    setLoading(true);

    const requestId = ++requestIdRef.current;

    try {

      const safeFilters = filters || {};

      const cleanFilters = Object.fromEntries(
        Object.entries(safeFilters).filter(([_, v]) => v !== "" && v != null)
      );

      const params = {
        limit: 10,
        ...cleanFilters,
        ...(reset ? {} : cursorRef.current || {}),
      };

      const cacheKey = JSON.stringify(params);

      if (cacheRef.current.has(cacheKey)) {

        const cached = cacheRef.current.get(cacheKey);

        setExpenses(prev => reset ? cached.expenses : [...prev, ...cached.expenses]);
        cursorRef.current = cached.nextCursor;
        setHasMore(cached.hasMore);

        return;
      }

      const res = await fetchExpenseTable(params);

      if (requestId !== requestIdRef.current) return;

      const newExpenses = res?.expenses || [];
      const nextCursor = res?.pagination?.nextCursor || null;
      const more = res?.pagination?.hasMore ?? false;

      cacheRef.current.set(cacheKey, {
        expenses: newExpenses,
        nextCursor,
        hasMore: more
      });

      setExpenses(prev => {

        if (reset) return newExpenses;

        const map = new Map(prev.map(e => [e.id, e]));
        newExpenses.forEach(e => map.set(e.id, e));

        return Array.from(map.values());
      });

      cursorRef.current = nextCursor;
      setHasMore(more);

    } catch (err) {

      if (requestId === requestIdRef.current) {
        setError(err);
      }

    } finally {

      fetchingRef.current = false;
      setLoading(false);

    }
  };

  useEffect(() => {

    cursorRef.current = null;
    setExpenses([]);
    setHasMore(true);

    fetchExpenses(true);

  }, [serializedFilters]);

  return {
    expenses,
    fetchExpenses,
    hasMore,
    loading,
    error,
    setError,
    setExpenses,
  };
}