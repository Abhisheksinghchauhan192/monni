import { useCallback, useState } from "react";

export default function useDashboardFilter() {
  const currentYear = new Date().getFullYear();
  const [filter, setFilter] = useState({
    mode: "overall",
    month: null,
    year: currentYear,
    fromDate: null,
    toDate: null,
  });

  const updateMode = useCallback((mode) => {
    setFilter((prev) => ({
      ...prev,
      mode,
      month: mode === "monthly" ? new Date().getMonth() + 1 : null,
      fromDate: null,
      toDate: null,
    }));
  }, []);

  const updateField = useCallback((field, value) => {
    setFilter((prev) => ({
      ...prev,
      [field]: value,
    }));
  });

  return {
    filter,
    updateMode,
    updateField,
  };
}
