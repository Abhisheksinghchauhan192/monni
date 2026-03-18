export default function ModalActions({ loading, onClose, submitText = "Save" }) {
  return (
    <div className="flex justify-end gap-3 pt-4">
      <button
        type="button"
        onClick={onClose}
        className="
        px-4 py-2 rounded-xl
        bg-gray-100 dark:bg-zinc-800
        text-sm
        "
      >
        Cancel
      </button>

      <button
        type="submit"
        disabled={loading}
        className="
        px-4 py-2 rounded-xl
        bg-emerald-500 text-white
        text-sm
        "
      >
        {loading ? "Saving..." : submitText}
      </button>
    </div>
  );
}