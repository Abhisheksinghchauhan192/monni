import { useEffect, useState } from "react";
import { fetchDashboardAnalytics } from "../services/dashboard.api";

function transformFilter(filter) {
  if (!filter?.mode) return null;

  return {
    mode: filter.mode,
    year: filter.year,
    month: filter.month,
    from: filter.fromDate,
    to: filter.toDate,
    by: filter.breakdownBy || "category",
  };
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

        // IMPORTANT: backend returns { success, data }
        // so we must extract data properly

        setData(result.data ?? result);
      } catch (err) {
        console.error("Dashboard error:", err);
        setError("Failed to load dashboard.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [filter]);

  return { data, loading, error };
}