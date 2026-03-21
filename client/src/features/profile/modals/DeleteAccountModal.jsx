import useDeleteAccount from "../hooks/useDeleteAccount";
import ModalWrapper from "../components/ui/ModalWrapper";

export default function DeleteAccountModal({ onClose }) {
  const { handleChange, handleSubmit, errors, values, loading } =
    useDeleteAccount();

  return (
    <ModalWrapper onClose={onClose} title="Delete Account">
      
      {/* Warning Block */}
      <div
        className="
        p-4 rounded-xl
        bg-red-50 dark:bg-red-900/20
        border border-red-200 dark:border-red-900/40
        mb-4
        "
      >
        <p className="text-sm text-red-600 dark:text-red-400 font-medium">
          This action is permanent
        </p>

        <p className="text-xs text-red-500 mt-1">
          Your data will be deleted and cannot be recovered.
        </p>
      </div>

      {/* Instruction */}
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
        Type <b className="text-gray-700 dark:text-gray-200">
          DELETE MY ACCOUNT
        </b>{" "}
        to confirm.
      </p>

      {/* Input */}
      <input
        name="confirmation"
        value={values.confirmation}
        onChange={handleChange}
        placeholder="DELETE MY ACCOUNT"
        className="
        w-full px-4 py-2.5 rounded-xl
        border border-gray-300 dark:border-zinc-700
        bg-white/80 dark:bg-zinc-800/60
        text-sm
        focus:outline-none focus:ring-2 focus:ring-red-400
        transition
        "
      />

      {errors.confirmation && (
        <p className="text-xs text-red-500 mt-2">
          {errors.confirmation}
        </p>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-3 mt-5 pt-4 border-t border-gray-100 dark:border-zinc-800">

        <button
          type="button"
          onClick={onClose}
          className="
          px-4 py-2 rounded-xl
          bg-gray-100 dark:bg-zinc-800
          text-sm
          hover:bg-gray-200 dark:hover:bg-zinc-700
          transition
          "
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="
          px-4 py-2 rounded-xl
          bg-red-500 text-white
          text-sm
          shadow-md
          hover:bg-red-600 hover:shadow-lg
          active:scale-[0.97]
          transition-all
          disabled:opacity-50
          "
        >
          {loading ? "Deleting..." : "Delete Account"}
        </button>

      </div>
    </ModalWrapper>
  );
}