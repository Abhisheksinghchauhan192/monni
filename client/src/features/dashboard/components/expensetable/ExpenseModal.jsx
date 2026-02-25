import { useState, useEffect } from "react";

export default function ExpenseModal({
  expense,
  onClose,
  onDelete,
  onSave,
  editMode = false,
}) {
  const [isEditing, setIsEditing] = useState(editMode);
  const [formData, setFormData] = useState(expense);

  useEffect(() => {
    setFormData(expense);
    setIsEditing(editMode);
  }, [expense, editMode]);

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
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[1000]"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-zinc-900 p-6 rounded-xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        {isEditing ? (
          <>
            <input
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded"
            />
            <input
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded"
            />
          </>
        ) : (
          <>
            <h2 className="text-lg font-bold mb-4">
              {expense.description}
            </h2>
            <p>Amount: ₹ {expense.amount}</p>
            <p>Category: {expense.category}</p>
            <p>Payment: {expense.paymentMethod}</p>
          </>
        )}

        <div className="mt-6 flex justify-between">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="text-blue-500 font-semibold"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-500 font-semibold"
            >
              Edit
            </button>
          )}

          <button
            onClick={() => onDelete(expense)}
            className="text-red-500 font-semibold"
          >
            Delete
          </button>

          <button onClick={onClose} className="text-gray-500">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}