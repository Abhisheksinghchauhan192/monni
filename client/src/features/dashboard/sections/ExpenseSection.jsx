import { useState, useRef } from "react";
import TableFilterBar from "../components/expensetable/TableFilterBar";
import ExpenseTable from "../components/expensetable/ExpenseTable";
import AddExpenseButton from "../components/AddExpenseButton";
import useExpense from "../hooks/useExpense";
import { useCategories } from "../../../context/CategoriesContext";
import useDebounce from "../../../hooks/useDebounce";

/* ---------- DEFAULT ---------- */

const DEFAULT_FILTERS = {
  search: "",
  category: "",
  payment_method: "",
  fromDate: "",
  toDate: "",
};

/* ---------- HELPER: DEEP EQUAL ---------- */
function isEqual(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

/* ---------- COMPONENT ---------- */

export default function ExpenseSection() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const { categories } = useCategories();

  /* ---------- CLEAR ---------- */

  const clearFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const filtersActive = Object.values(filters).some(Boolean);

  /* ---------- SMART FETCH SYSTEM ---------- */

  // 1. debounce filters
  const debouncedFilters = useDebounce(filters, 500);

  // 2. store last applied filters
  const lastAppliedFilters = useRef(debouncedFilters);

  // 3. check if actually changed
  const hasChanged = !isEqual(
    lastAppliedFilters.current,
    debouncedFilters
  );

  // 4. validate (important for date range)
  const isValidFilter = (() => {
    if (debouncedFilters.fromDate && !debouncedFilters.toDate)
      return false;

    if (!debouncedFilters.fromDate && debouncedFilters.toDate)
      return false;

    return true;
  })();

  // 5. decide final filters
  const effectiveFilters =
    hasChanged && isValidFilter
      ? debouncedFilters
      : lastAppliedFilters.current;

  // 6. update last applied
  if (hasChanged && isValidFilter) {
    lastAppliedFilters.current = debouncedFilters;
  }

  /* ---------- DATA ---------- */

  const {
    expenses,
    fetchExpenses,
    hasMore,
    loading,
    setExpenses,
    error,
    setError,
  } = useExpense(effectiveFilters);

  /* ---------- ADD EXPENSE ---------- */

  const handleExpenseAdded = (newExpense) => {
    setExpenses((prev) => [newExpense, ...prev]);
  };

  /* ---------- UI ---------- */

  return (
    <div
      className="
        relative
        bg-white dark:bg-gray-900
        border border-gray-200 dark:border-gray-800
        rounded-2xl shadow-sm
        flex flex-col
        h-128
      "
    >
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800">
        <h3 className="text-lg font-semibold">Recent Expenses</h3>
      </div>

      {/* Filters */}
      <TableFilterBar
        filters={filters}
        setFilters={setFilters}
        categories={categories}
        clearFilters={clearFilters}
      />

      {/* Table */}
      <ExpenseTable
        expenses={expenses}
        fetchExpenses={fetchExpenses}
        hasMore={hasMore}
        error={error}
        setError={setError}
        loading={loading}
        setExpenses={setExpenses}
        categories={categories}
        isFiltersActive={filtersActive}
        clearFilters={clearFilters}
        handleExpenseAdded={handleExpenseAdded}
      />

      {/* Floating Add Button */}
      <AddExpenseButton onSuccess={handleExpenseAdded} />
    </div>
  );
}