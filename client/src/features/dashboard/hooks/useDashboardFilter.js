import { useCallback, useState } from "react";

export default function useDashboardFilter() {
  const currentYear = new Date().getFullYear();

  // draft (UI state)
  const [draftFilter, setDraftFilter] = useState({
    mode: "overall",
    month: null,
    year: currentYear,
    fromDate: null,
    toDate: null,
    breakdownBy: "category",
  });

  //  applied (API state)
  const [filter, setFilter] = useState(draftFilter);

  const updateBreakdown = useCallback((by) => {
    setDraftFilter((prev) => ({
      ...prev,
      breakdownBy: by,
    }));
  }, []);

  const updateMode = useCallback((mode) => {
    setDraftFilter((prev) => ({
      ...prev,
      mode,
      month: mode === "monthly" ? new Date().getMonth() + 1 : null,
      fromDate: null,
      toDate: null,
    }));
  }, []);

  const updateField = useCallback((field, value) => {
    setDraftFilter((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  //  APPLY BUTTON
  const applyFilter = useCallback(() => {
    setFilter(draftFilter);
  }, [draftFilter]);

  return {
    filter,          // used for API
    draftFilter,     // used for UI
    updateMode,
    updateField,
    updateBreakdown,
    applyFilter,
  };
}