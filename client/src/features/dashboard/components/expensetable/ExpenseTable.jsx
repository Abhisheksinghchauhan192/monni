import { useState } from "react";
import ExpenseList from "./ExpenseList";
import ExpenseModal from "./ExpenseModal";
import EmptyExpenseListPlaceholder from "./components/EmptyExpenseListPlaceholder";
import ErrorExpenseState from "./components/ErrorExpenseState";

export default function ExpenseTable({
  expenses,
  fetchExpenses,
  hasMore,
  loading,
  error,
  setError,
  setExpenses,
  categories,
  isFiltersActive,
  clearFilters,
  handleExpenseAdded,
}) {
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [mode, setMode] = useState("details");

  const openDetails = (exp) => {
    setMode("details");
    setSelectedExpense(exp);
  };

  const openEdit = (exp) => {
    setMode("edit");
    setSelectedExpense(exp);
  };

  const closeModal = () => {
    setSelectedExpense(null);
    setMode("details");
  };

  if (error) {
    return (
        <ErrorExpenseState onRetry={()=>{
          fetchExpenses();
          setError(null);
          clearFilters();
        }} />
    )
  }

  return (
    <div className="flex-1 px-4 py-3 min-h-0 overflow-hidden relative">
      {/* if there is now expense show this 
        could be due to nothing exists or not any expense meet filters if applied  if both not follow show expense list
      */}
      {!loading && expenses.length === 0 && !isFiltersActive ? (
        <EmptyExpenseListPlaceholder
          onAddExpense={handleExpenseAdded} // add expensee when no expense is available.
          type="empty"
        />
      ) : !loading && expenses.length === 0 && isFiltersActive ? (
        <EmptyExpenseListPlaceholder
          type="filtered"
          onClearFilters={clearFilters}
        />
      ) : (
        <ExpenseList
          expenses={expenses}
          loading={loading}
          hasMore={hasMore}
          fetchExpenses={fetchExpenses}
          onOpen={openDetails}
          onEdit={openEdit}
        />
      )}

      {/* if any expensee is seleted the open it's model initially on details mode  */}
      <ExpenseModal
        expense={selectedExpense}
        mode={mode}
        setMode={setMode}
        onClose={closeModal}
        setExpenses={setExpenses}
        categories={categories}
      />
    </div>
  );
}
