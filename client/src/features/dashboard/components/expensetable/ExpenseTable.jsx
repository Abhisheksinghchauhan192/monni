import { useState } from "react";
import ExpenseList from "./ExpenseList";
import ExpenseModal from "./ExpenseModal";

export default function ExpenseTable({
  expenses,
  fetchExpenses,
  hasMore,
  loading,
  setExpenses,
  categories,
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

  return (
    <div className="h-full overflow-y-auto px-4 py-3">
      <ExpenseList
        expenses={expenses}
        loading={loading}
        hasMore={hasMore}
        fetchExpenses={fetchExpenses}
        onOpen={openDetails}
        onEdit={openEdit}
      />

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