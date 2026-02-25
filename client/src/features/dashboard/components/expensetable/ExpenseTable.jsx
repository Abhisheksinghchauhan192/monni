import { useState, useEffect } from "react";
import { mockExpenses } from "./mockExpenseDate";
import ExpenseCard from "./components/ExpenseCard";
import ExpenseModal from "./ExpenseModal";

export default function ExpenseTable() {
  const [expenses, setExpenses] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    setExpenses(mockExpenses.slice(0, visibleCount));
  }, [visibleCount]);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  return (
    <div className="h-full overflow-y-auto px-4 py-3 space-y-3">
      {expenses.map((exp) => (
        <ExpenseCard
          key={exp.id}
          expense={exp}
          onOpen={(exp) => {
            setSelectedExpense(exp);
            setIsEditMode(false);
          }}
          onEdit={(exp) => {
            setSelectedExpense(exp);
            setIsEditMode(true);
          }}
        />
      ))}

      {visibleCount < mockExpenses.length && (
        <button
          onClick={loadMore}
          className="w-full py-3 text-blue-500 text-sm"
        >
          Load More
        </button>
      )}

      <ExpenseModal
        expense={selectedExpense}
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
