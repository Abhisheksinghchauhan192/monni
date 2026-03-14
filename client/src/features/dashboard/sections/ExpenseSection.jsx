import { useState } from "react";
import TableFilterBar from "../components/expensetable/TableFilterBar";
import ExpenseTable from "../components/expensetable/ExpenseTable";
import AddExpenseButton from "../components/AddExpenseButton";
import useCategories from "../../../hooks/useCategories";
import useExpense from "../hooks/useExpense";

const DEFAULT_FILTERS = {
  search: "",
  category: "",
  payment_method: "",
  fromDate: "",
  toDate: "",
};

export default function ExpenseSection() {

  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const clearFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const filtersActive = Object.values(filters).some(Boolean);

  const { categories } = useCategories();

  const {
    expenses,
    fetchExpenses,
    hasMore,
    loading,
    setExpenses,
    error,
    setError
  } = useExpense(filters);

  const handleExpenseAdded = (newExpense) => {
    setExpenses(prev => [newExpense, ...prev]);
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