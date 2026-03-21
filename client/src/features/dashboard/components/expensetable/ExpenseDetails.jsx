import { useState } from "react";
import DeleteConfirmation from "./DeleteConfirmation";
import useDeleteExpense from "../../hooks/useDeleteExpense";
import useCurrency from "../../../../hooks/useCurrency";
import { useCategories } from "../../../../context/CategoriesContext";

export default function ExpenseDetails({ expense, onEdit, onDeleteSuccess }) {
  const [confirm, setConfirm] = useState(false);
  const { deleteExpense } = useDeleteExpense();
  const{format} = useCurrency();
  const{getCategoryMeta} = useCategories();
  const { emoji, chip } = getCategoryMeta(expense.category);

  const handleDelete = async () => {
    await deleteExpense(expense.id);
    onDeleteSuccess(expense.id);
  };

  return (
    <>
      {/* Header */}
      <h2 className="text-lg font-semibold tracking-tight mb-6 text-gray-900 dark:text-gray-100">
        Expense Details
      </h2>

      {/* Amount */}
      <div className="mb-6">
        <div className="text-3xl font-bold text-emerald-600">
          {format(expense.amount)}
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {/* Category */}
        <span
          className={`
          inline-flex items-center gap-1
          px-2.5 py-[3px]
          rounded-md
          text-[12px]
          font-medium
          ${chip}
        `}
        >
          {emoji+" "}
          {expense.category}
        </span>

        {/* Payment */}
        <span
          className="
          inline-flex items-center
          px-2.5 py-[3px]
          rounded-md
          text-[12px]
          font-medium
          bg-blue-50 text-blue-700
          dark:bg-blue-900/40 dark:text-blue-300
        "
        >
          {expense.payment_method}
        </span>

        {/* Date */}
        <span
          className="
          inline-flex items-center
          px-2.5 py-[3px]
          rounded-md
          text-[12px]
          font-medium
          bg-zinc-100 text-zinc-700
          dark:bg-zinc-800 dark:text-zinc-300
        "
        >
          {new Date(expense.expense_date).toDateString()}
        </span>
      </div>

      {/* Details Section */}
      <div
        className="
        bg-gray-50 dark:bg-zinc-800/40
        border border-gray-100 dark:border-zinc-800
        rounded-xl
        p-4
        space-y-3
        mb-8
      "
      >
        {/* Merchant */}
        <div>
          <p className="text-[11px] uppercase tracking-wide text-gray-400">
            Merchant
          </p>
          <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
            {expense.merchant || "—"}
          </p>
        </div>

        {/* Description */}
        <div>
          <p className="text-[11px] uppercase tracking-wide text-gray-400">
            Description
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {expense.description || "—"}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-2">
        {confirm ? (
          <DeleteConfirmation
            onCancel={() => setConfirm(false)}
            onConfirm={handleDelete}
          />
        ) : (
          <div className="flex justify-between gap-3">
            
            {/* Edit */}
            <button
              onClick={onEdit}
              className="
              flex-1
              px-5 py-2.5
              rounded-xl
              text-sm font-medium
              bg-gray-100 hover:bg-gray-200
              dark:bg-zinc-800 dark:hover:bg-zinc-700
              transition
              cursor-pointer
            "
            >
              Edit
            </button>

            {/* Delete */}
            <button
              onClick={() => setConfirm(true)}
              className="
              flex-1
              px-5 py-2.5
              rounded-xl
              text-sm font-medium
              bg-red-50 text-red-600
              hover:bg-red-100
              dark:bg-red-900/30 dark:text-red-400
              transition
              cursor-pointer
            "
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </>
  );
}
