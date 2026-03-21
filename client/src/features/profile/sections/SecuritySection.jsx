import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Trash2 } from "lucide-react";
import ChangePasswordModal from "../modals/ChangePasswordModal";
import DeleteAccountModal from "../modals/DeleteAccountModal";
import ActionCard from "../components/ActionCard";
export default function SecuritySection() {
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="
          bg-white/70 dark:bg-zinc-900/60
          backdrop-blur-md
          border border-gray-200 dark:border-zinc-800
          rounded-2xl p-5
          shadow-sm
        "
      >
        {/* HEADER */}
        <div className="mb-5">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            Security
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Manage your account protection and access
          </p>
        </div>

        {/* ACTIONS */}
        <div className="space-y-3">

          {/* CHANGE PASSWORD */}
          <ActionCard
            icon={<Lock size={18} />}
            title="Change Password"
            subtitle="Update your account password"
            onClick={() => setPasswordOpen(true)}
          />

          {/* DELETE ACCOUNT */}
          <ActionCard
            icon={<Trash2 size={18} />}
            title="Delete Account"
            subtitle="Permanently remove your account"
            danger
            onClick={() => setDeleteOpen(true)}
          />

        </div>
      </motion.div>

      {/* MODALS */}
      {passwordOpen && (
        <ChangePasswordModal onClose={() => setPasswordOpen(false)} />
      )}

      {deleteOpen && (
        <DeleteAccountModal onClose={() => setDeleteOpen(false)} />
      )}
    </>
  );
}

