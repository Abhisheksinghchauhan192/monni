import { useState } from "react";
import ChangePasswordModal from "../modals/ChangePasswordModal";
import DeleteAccountModal from "../modals/DeleteAccountModal";

export default function SecuritySection() {
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <div
      className="
      bg-white dark:bg-zinc-900
      border border-gray-200 dark:border-zinc-800
      rounded-2xl p-5
      "
    >
      <h2 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wide">
        Security
      </h2>

      <div className="space-y-3">

        <button
          onClick={() => setPasswordOpen(true)}
          className="
          w-full text-left px-4 py-3
          rounded-xl
          bg-gray-50 dark:bg-zinc-800
          hover:bg-gray-100 dark:hover:bg-zinc-700
          transition
        "
        >
          Change Password
        </button>

        <button
          onClick={() => setDeleteOpen(true)}
          className="
          w-full text-left px-4 py-3
          rounded-xl
          bg-red-50 text-red-600
          dark:bg-red-900/30 dark:text-red-400
        "
        >
          Delete Account
        </button>

      </div>

      {passwordOpen && (
        <ChangePasswordModal onClose={() => setPasswordOpen(false)} />
      )}

      {deleteOpen && (
        <DeleteAccountModal onClose={() => setDeleteOpen(false)} />
      )}
    </div>
  );
}