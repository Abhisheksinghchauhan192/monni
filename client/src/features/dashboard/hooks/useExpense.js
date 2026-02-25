import { useState, useEffect, useCallback } from "react";
import { fetchExpenseTable } from "../services/expenses.api";

export default function useExpenses(filters) {
  const [expenses, setExpenses] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchExpenses = useCallback(
    async (reset = false) => {
      if (loading) return;
      if (!hasMore && !reset) return;

      try {
        setLoading(true);

        const params = {
          limit: 10,
          ...filters,
          ...(reset ? {} : cursor),
        };

        const res = await fetchExpenseTable(params);

        const newExpenses = res.expenses;
        const nextCursor = res.pagination.nextCursor;
        const more = res.pagination.hasMore;

        setExpenses((prev) =>
          reset ? newExpenses : [...prev, ...newExpenses]
        );

        setCursor(nextCursor);
        setHasMore(more);
      } catch (err) {
        console.error("Fetch failed:", err);
      } finally {
        setLoading(false);
      }
    },
    [filters, cursor, hasMore, loading]
  );

  useEffect(() => {
    setExpenses([]);
    setCursor(null);
    setHasMore(true);

    fetchExpenses(true); // reset mode
  }, [filters]);

  return {
    expenses,
    fetchExpenses,
    hasMore,
    loading,
    setExpenses, // for optimistic updates
  };
}