import { useState, useEffect, useRef } from "react";
import { fetchExpenseTable } from "../services/expenses.api";

export default function useExpenses(filters) {
  const [expenses, setExpenses] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const cursorRef = useRef(null);

  const fetchExpenses = async (reset = false) => {
    if (loading) return;
    if (!hasMore && !reset) return;

    try {
      setLoading(true);

      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== "" && v != null),
      );

      const params = {
        limit: 10,
        ...cleanFilters,
        ...(reset ? {} : cursorRef.current),
      };

      const res = await fetchExpenseTable(params);

      const newExpenses = res.expenses;
      const nextCursor = res.pagination.nextCursor;
      const more = res.pagination.hasMore;

      setExpenses((prev) => (reset ? newExpenses : [...prev, ...newExpenses]));

      cursorRef.current = nextCursor;
      setHasMore(more);
    } catch (err) {
      console.error("Fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const serializedFilters = JSON.stringify(filters);

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
    setExpenses,
  };
}
