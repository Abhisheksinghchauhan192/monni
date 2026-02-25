import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { is } from "zod/locales";

export default function ExpenseModal({
  expense,
  onClose,
  onDelete,
  onSave,
  editMode = false,
}) {
  const [isEditing, setIsEditing] = useState(editMode);
  const [formData, setFormData] = useState(expense);
  const [confirmDelete, setConfirmDelete] = useState(false);
  useEffect(() => {
    setFormData(expense);
    setIsEditing(editMode);
  }, [expense, editMode]);

  useEffect(() => {
    if (expense) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
      setConfirmDelete(false);
    };
  }, [expense]);

  if (!expense) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    onSave(formData);
    setIsEditing(false);
  };

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
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold tracking-tight">
            {isEditing ? "Edit Expense" : "Expense Details"}
          </h2>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        {isEditing ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="text-xs text-gray-500">Description</label>
              <input
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 rounded-xl 
                           bg-gray-50 dark:bg-zinc-800
                           border border-gray-200 dark:border-zinc-700
                           focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="text-xs text-gray-500">Amount</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 rounded-xl 
                           bg-gray-50 dark:bg-zinc-800
                           border border-gray-200 dark:border-zinc-700"
              />
            </div>

            <div>
              <label className="text-xs text-gray-500">Date</label>
              <input
                type="date"
                name="expense_date"
                value={formData.expense_date?.split("T")[0]}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 rounded-xl 
                           bg-gray-50 dark:bg-zinc-800
                           border border-gray-200 dark:border-zinc-700"
              />
            </div>

            <div>
              <label className="text-xs text-gray-500">Merchant</label>
              <input
                name="merchant"
                value={formData.merchant}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 rounded-xl 
                           bg-gray-50 dark:bg-zinc-800
                           border border-gray-200 dark:border-zinc-700"
              />
            </div>

            <div>
              <label className="text-xs text-gray-500">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 rounded-xl 
                           bg-gray-50 dark:bg-zinc-800
                           border border-gray-200 dark:border-zinc-700"
              >
                <option value="Food">Food</option>
                <option value="Travel">Travel</option>
                <option value="Groceries">Groceries</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-gray-500">Payment</label>
              <select
                name="payment_method"
                value={formData.payment_method}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 rounded-xl 
                           bg-gray-50 dark:bg-zinc-800
                           border border-gray-200 dark:border-zinc-700"
              >
                <option value="UPI">UPI</option>
                <option value="Card">Card</option>
                <option value="Cash">Cash</option>
              </select>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-2xl font-bold text-emerald-600">
              ₹ {Number(expense.amount).toFixed(2)}
            </div>

            <div className="flex flex-wrap gap-2">
              <span
                className="px-3 py-1 text-xs rounded-full 
                               bg-emerald-100 text-emerald-700"
              >
                {expense.category}
              </span>

              <span
                className="px-3 py-1 text-xs rounded-full 
                               bg-blue-100 text-blue-700"
              >
                {expense.payment_method}
              </span>

              <span
                className="px-3 py-1 text-xs rounded-full 
                               bg-gray-100 text-gray-600"
              >
                {new Date(expense.expense_date).toLocaleDateString()}
              </span>
            </div>

            <div className="text-sm text-gray-500">
              Merchant: {expense.merchant}
            </div>

            <div className="text-sm">{expense.description}</div>
          </div>
        )}

        {/* Footer */}
        {/* Footer */}
        <div className="mt-8">
          {/* 🟡 DELETE CONFIRMATION STATE */}
          {confirmDelete ? (
            <div className="space-y-4">
              <div
                className="text-sm text-red-600 bg-red-50 
                      dark:bg-red-900/30 p-3 rounded-xl"
              >
                This action cannot be undone. Are you sure?
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="px-4 py-2 rounded-xl 
                     bg-gray-100 dark:bg-zinc-800"
                >
                  Cancel
                </button>

                <button
                  onClick={() => {
                    onDelete(expense)
                    setConfirmDelete(false);
                  }}
                  className="px-4 py-2 rounded-xl 
                     bg-red-600 text-white"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          ) : isEditing ? (
            /* 🟢 EDITING STATE */
            <div className="flex justify-between">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-xl 
                   bg-gray-100 dark:bg-zinc-800"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-5 py-2 rounded-xl 
                   bg-emerald-600 text-white
                   hover:bg-emerald-700 transition"
              >
                Save Changes
              </button>
            </div>
          ) : (
            /* 🔵 NORMAL VIEW STATE */
            <div className="flex justify-between">
              <button
                onClick={() => setIsEditing(true)}
                className="px-5 py-2 rounded-xl 
                   bg-gray-100 dark:bg-zinc-800"
              >
                Edit
              </button>

              <button
                onClick={() => setConfirmDelete(true)}
                className="px-5 py-2 rounded-xl 
                   bg-red-50 text-red-600
                   dark:bg-red-900/30 dark:text-red-400"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
