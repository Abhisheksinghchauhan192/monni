import { useEffect } from "react";
import ExpenseDetails from "./ExpenseDetails";
import EditExpenseForm from "./EditExpenseForm";

export default function ExpenseModal({
  expense,
  mode,
  setMode,
  onClose,
  setExpenses,
  categories,
}) {
  useEffect(() => {
    if (expense) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [expense]);

  if (!expense) return null;

  return (
    <div
      className="fixed inset-0 z-1000 bg-black/50 backdrop-blur-md 
                 flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-zinc-900 
                   w-full sm:max-w-xl
                   rounded-t-3xl sm:rounded-2xl
                   p-6 sm:p-8
                   shadow-2xl
                   border border-gray-200 dark:border-zinc-800
                   animate-in fade-in slide-in-from-bottom-4"
        onClick={(e) => e.stopPropagation()}
      >
        {mode === "edit" ? (
          <EditExpenseForm
            expense={expense}
            categories={categories}
            onCancel={() => setMode("details")}
            onSuccess={(updated) => {
              setExpenses((prev) =>
                prev.map((e) =>
                  e.id === updated.id ? updated : e
                )
              );
              onClose();
            }}
          />
        ) : (
          <ExpenseDetails
            expense={expense}
            onEdit={() => setMode("edit")}
            onDeleteSuccess={(id) => {
              setExpenses((prev) =>
                prev.filter((e) => e.id !== id)
              );
              onClose();
            }}
          />
        )}
      </div>
    </div>
  );
}