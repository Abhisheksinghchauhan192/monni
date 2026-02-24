import { useEffect, useState } from "react";
import { fetchDashboardAnalytics } from "../services/dashboard.api";

function transformFilter(filter) {
  const now = new Date();

  if (filter.mode === "overall") {
    const start = new Date(now.getFullYear(), 0, 1);
    return {
      by: filter.breakdownBy || "category",
    };
  }

  if (filter.mode === "monthly") {
    const start = new Date(filter.year, filter.month - 1, 1);
    const end = new Date(filter.year, filter.month, 0);

    return {
      from: start.toISOString().split("T")[0],
      to: end.toISOString().split("T")[0],
      by: filter.breakdownBy || "category",
    };
  }

  if (filter.mode === "yearly") {
    const start = new Date(filter.year, 0, 1);
    const end = new Date(filter.year, 11, 31);

    return {
      from: start.toISOString().split("T")[0],
      to: end.toISOString().split("T")[0],
      by: filter.breakdownBy || "category",
    };
  }

  if (filter.mode === "custom") {
    if (!filter.fromDate || !filter.toDate) return null;

    return {
      from: filter.fromDate,
      to: filter.toDate,
      by: filter.breakdownBy || "category",
    };
  }

  return null;
}

export default function useDashboard(filter) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiFilter = transformFilter(filter);

    if (!apiFilter) return;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const result = await fetchDashboardAnalytics(apiFilter);
        setData(result);
      } catch (err) {
        console.error("Dashboard error:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [filter]);

  return { data, loading, error };
}