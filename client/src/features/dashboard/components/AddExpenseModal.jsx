import { useEffect } from "react";
import { X } from "lucide-react";
import AddExpenseForm from "./AddExpenseForm";

export default function AddExpenseModal({ onClose, onSuccess }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className="
        fixed inset-0
        z-200
        bg-black/40
        backdrop-blur-sm
        flex items-end sm:items-center justify-center
        animate-fadeIn
      "
      onClick={onClose}
    >
      {/* Modal Card */}
      <div
        className="
          relative
          w-full
          sm:max-w-lg
          bg-white dark:bg-zinc-900
          rounded-t-3xl sm:rounded-2xl
          shadow-[0_25px_60px_rgba(0,0,0,0.35)]
          max-h-[90vh]
          overflow-y-auto
          p-6 sm:p-8
          animate-slideUp
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold tracking-tight">
            Add New Expense
          </h2>

          <button
            onClick={onClose}
            className="
              p-2 rounded-full
              hover:bg-gray-100 dark:hover:bg-zinc-800
              transition cursor-pointer
            "
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <AddExpenseForm onSuccess={onSuccess} onClose={onClose} />
      </div>
    </div>
  );
}