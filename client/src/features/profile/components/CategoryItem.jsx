import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import EditCategoryModal from "./EditCategoryModal";

export default function CategoryItem({ category, onDelete, onEdit }) {
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  return (
    <>
      <div
        className="
          flex items-center justify-between
          px-4 py-3 rounded-xl
          bg-gray-50 dark:bg-zinc-800
          border border-gray-100 dark:border-zinc-700
          hover:shadow-sm transition
        "
      >
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <span className="text-lg">{category.emoji}</span>

          <span className="font-medium text-gray-800 dark:text-gray-200">
            {category.label}
          </span>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-700"
          >
            <Pencil size={16} />
          </button>

          {confirm ? (
            <div className="flex gap-2">
              <button
                onClick={() => setConfirm(false)}
                className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={onDelete}
                className="px-3 py-1 rounded-lg bg-red-500 text-white"
              >
                Confirm
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirm(true)}
              className="p-2 rounded-lg text-red-500"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>

      {open && (
        <EditCategoryModal
          category={category}
          onClose={() => setOpen(false)}
          onSave={onEdit}
        />
      )}
    </>
  );
}
