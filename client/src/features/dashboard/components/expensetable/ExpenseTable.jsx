import { useState } from "react";
import useExpenses from "../../hooks/useExpense";
import ExpenseList from "./ExpenseList";
import ExpenseModal from "./ExpenseModal";

export default function ExpenseTable({ filters,categories}) {
  const { expenses, fetchExpenses, hasMore, loading, setExpenses } =
    useExpenses(filters);

  const [selectedExpense, setSelectedExpense] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <div className="h-full overflow-y-auto px-4 py-3">
      <ExpenseList
        expenses={expenses}
        loading={loading}
        hasMore={hasMore}
        fetchExpenses={fetchExpenses}
        onOpen={(exp) => {
          setSelectedExpense(exp);
          setIsEditMode(false);
        }}
        onEdit={(exp) => {
          setSelectedExpense(exp);
          setIsEditMode(true);
        }}
      />

      <ExpenseModal
        expense={selectedExpense}
        categories={categories}
        editMode={isEditMode}
        onClose={() => setSelectedExpense(null)}
        onDelete={(exp) => {
          setExpenses((prev) => prev.filter((e) => e.id !== exp.id));
          setSelectedExpense(null);
        }}
        onSave={(updated) => {
          setExpenses((prev) =>
            prev.map((e) => (e.id === updated.id ? updated : e)),
          );
          setSelectedExpense(null);
        }}
      />
    </div>
  );
}
