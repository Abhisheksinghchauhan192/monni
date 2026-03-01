import { useState, useMemo } from "react";
import TableFilterBar from "../components/expensetable/TableFilterBar";
import ExpenseTable from "../components/expensetable/ExpenseTable";
import AddExpenseButton from "../components/AddExpenseButton";
import useCategories from "../../../hooks/useCategories";
import useExpense from "../hooks/useExpense";

export default function ExpenseSection() {
  // 1. Filters state
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    payment_method: "",
    fromDate: "",
    toDate: "",
  });

  // 2. Stable filters to prevent unnecessary re-fetch
  const stableFilters = useMemo(
    () => filters,
    [
      filters.search,
      filters.category,
      filters.payment_method,
      filters.fromDate,
      filters.toDate,
    ],
  );

  // 3. Categories (for filter dropdown + add form)
  const { categories } = useCategories();

  // 4. Expense state (single source of truth)
  const { expenses, fetchExpenses, hasMore, loading, setExpenses } =
    useExpense(stableFilters);

  // 5. Insert new expense instantly (real-time update)
  const handleExpenseAdded = (newExpense) => {
    setExpenses((prev) => [newExpense, ...prev]);
  };

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
      <ExpenseTable
        expenses={expenses}
        fetchExpenses={fetchExpenses}
        hasMore={hasMore}
        loading={loading}
        setExpenses={setExpenses}
        categories={categories}
      />  

      {/* Floating Add Button */}
      <AddExpenseButton onSuccess={handleExpenseAdded} />
    </div>
  );
}
