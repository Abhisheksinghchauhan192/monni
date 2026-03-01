import { useState } from "react";
import { Plus } from "lucide-react";
import AddExpenseModal from "./AddExpenseModal";

export default function AddExpenseButton({ onSuccess }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Action Button */}
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="
          fixed bottom-6 right-6
          w-14 h-14
          sm:bottom-8 sm:right-8
          group
          flex items-center gap-2
          px-5 py-4
          rounded-full
          bg-linear-to-br from-emerald-500 to-emerald-600
          text-white
          hover:shadow-[0_15px_40px_rgba(16,185,129,0.45)]
          hover:scale-105
          active:scale-95
          transition-all duration-300 ease-out
          cursor-pointer
          z-100
        "
        >
          <Plus className="transition-transform group-hover:rotate-90 duration-300" />
    
        </button>
      ) : null}

      {open && (
        <AddExpenseModal onSuccess={onSuccess} onClose={() => setOpen(false)} />
      )}
    </>
  );
}
