export default function DeleteConfirmation({ onCancel, onConfirm, deleting }) {
  return (
    <div className="space-y-4">
      <div
        className="text-sm text-red-600 bg-red-50 
                      dark:bg-red-900/30 
                      p-3 rounded-xl"
      >
        This action cannot be undone. Are you sure?
      </div>

      <div className="flex justify-between">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-xl 
                     bg-gray-100 dark:bg-zinc-800 
                     cursor-pointer"
        >
          Cancel
        </button>

        <button
          disabled={deleting}
          onClick={onConfirm}
          className="px-4 py-2 rounded-xl 
                     bg-red-600 text-white 
                     cursor-pointer"
        >
          {deleting?"Deleting..":"Yes, Delete"}
        </button>
      </div>
    </div>
  );
}
