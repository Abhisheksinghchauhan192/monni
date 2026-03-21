import React, {  useState } from "react";
import { Trash2, AlertTriangle, X } from "lucide-react";

export const DeleteButton = ({ onDelete }) => {
  const [confirm, setConfirm] = useState(false);
  
  return (
    <>
      <button
        onClick={() => setConfirm(true)}
        className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        aria-label="Delete"
      >
        <Trash2 size={18} />
      </button>

      {confirm && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setConfirm(false)}
          />

          {/* Modal Content Card */}
          <div className="relative w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 transform transition-all animate-in fade-in zoom-in slide-in-from-bottom-4 duration-200">
            <div className="flex flex-col items-center text-center">
              {/* Visual Warning */}
              <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
                <AlertTriangle
                  className="text-red-600 dark:text-red-400"
                  size={24}
                />
              </div>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Confirm Deletion
              </h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                This action cannot be undone. Are you sure you want to delete
                this category?
              </p>
              <p className="text-sm text-gray-400">You can add same later !</p>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={onDelete}
                className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl order-first sm:order-last transition-colors"
              >
                Delete Now
              </button>
              <button
                onClick={() => setConfirm(false)}
                className="w-full py-3 px-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>

            <button
              onClick={() => setConfirm(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
