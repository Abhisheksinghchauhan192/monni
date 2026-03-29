import { useEffect, useState } from "react";
import { fetchDashboardAnalytics } from "../services/dashboard.api";
import { useSettings } from "../../../context/SettingsContext";

function transformFilter(filter, timezone) {
  if (!filter?.mode) return null;

  return {
    mode: filter.mode,
    year: filter.year,
    month: filter.month,
    from: filter.fromDate,
    to: filter.toDate,
    by: filter.breakdownBy || "category",
    timezone,
  };
}

export default function useDashboard(filter) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { settings } = useSettings();
  useEffect(() => {
    const apiFilter = transformFilter(filter, settings?.timezone);
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
  }, [filter,settings?.timezone]);

  return { data, loading, error };
}
