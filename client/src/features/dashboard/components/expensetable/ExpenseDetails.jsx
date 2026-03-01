import { useState } from "react";
import DeleteConfirmation from "./DeleteConfirmation";
import useDeleteExpense from "../../hooks/useDeleteExpense";

export default function ExpenseDetails({
  expense,
  onEdit,
  onDeleteSuccess,
}) {
  const [confirm, setConfirm] = useState(false);
  const { deleteExpense } = useDeleteExpense();

  const handleDelete = async () => {
    await deleteExpense(expense.id);
    onDeleteSuccess(expense.id);
  };

  return (
    <>
      <h2 className="text-xl font-semibold tracking-tight mb-6">
        Expense Details
      </h2>

      <div className="space-y-4">
        <div className="text-2xl font-bold text-emerald-600">
          ₹ {Number(expense.amount).toFixed(2)}
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 text-xs rounded-full bg-emerald-100 text-emerald-700">
            {expense.category}
          </span>

          <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
            {expense.payment_method}
          </span>

          <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
            {new Date(expense.expense_date).toLocaleDateString()}
          </span>
        </div>

        <div className="text-sm text-gray-500">
          Merchant: {expense.merchant}
        </div>

        <div className="text-sm">{expense.description}</div>
      </div>

      <div className="mt-8">
        {confirm ? (
          <DeleteConfirmation
            onCancel={() => setConfirm(false)}
            onConfirm={handleDelete}
          />
        ) : (
          <div className="flex justify-between">
            <button
              onClick={onEdit}
              className="px-5 py-2 rounded-xl 
                         bg-gray-100 dark:bg-zinc-800 
                         cursor-pointer"
            >
              Edit
            </button>

            <button
              onClick={() => setConfirm(true)}
              className="px-5 py-2 rounded-xl 
                         bg-red-50 text-red-600
                         dark:bg-red-900/30 dark:text-red-400
                         cursor-pointer"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </>
  );
}