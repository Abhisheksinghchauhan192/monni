import { useState } from "react";
import EditProfileModal from "../modals/EditProfileModal";
import {Field} from "../components/ui/Field";
import{Pencil} from "lucide-react"
export default function AccountSection({ user }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="
      bg-white dark:bg-zinc-900
      border border-gray-200 dark:border-zinc-800
      rounded-2xl p-5
      "
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
          Account
        </h2>

        <button
          onClick={() => setOpen(true)}
          className="
          text-xs 
          cursor-pointer
          text-emerald-600 hover:text-emerald-700
        "
        >
          <Pencil size={20}/>
        </button>
      </div>

      {/* Fields */}
      <div className="space-y-4">
        <Field label="Name" value={user.name} />
        <Field label="Email" value={user.email} />
        <Field label="Public ID" value={user.publicId} />
        <Field label="Mobile" value={user.mobile || "—"} />
      </div>

      {/* Modal */}
      {open && (
        <EditProfileModal user={user} onClose={() => setOpen(false)} />
      )}
    </div>
  );
}

