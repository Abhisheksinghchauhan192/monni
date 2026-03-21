import { X } from "lucide-react";
import { useEffect } from "react";

export default function ModalWrapper({ children, onClose, title }) {

    //  Lock background scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className="
      fixed inset-0 z-50
      bg-black/50
      flex items-center justify-center
      backdrop-blur-sm
      px-4
      "
      onClick={onClose}
    >
      <div
        className="
        w-full max-w-md
        bg-white dark:bg-zinc-900
        rounded-2xl
        shadow-xl
        border border-gray-200 dark:border-zinc-800
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-zinc-800">
          <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}