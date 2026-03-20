import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

export default function OptionButton({
  active,
  loading,
  children,
  onClick,
}) {
  return (
    <motion.button
      layout
      whileTap={{ scale: 0.92, rotate: -1 }}
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
      className={`
        relative px-4 py-2 rounded-xl text-sm font-medium
        overflow-hidden transition-all duration-300
        ${
          active
            ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/40"
            : "bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700"
        }
      `}
    >
      {/*  Ripple Effect */}
      <motion.span
        className="absolute inset-0 bg-white/10"
        initial={{ scale: 0, opacity: 0 }}
        whileTap={{ scale: 2, opacity: 0.2 }}
        transition={{ duration: 0.4 }}
      />

      {/* CONTENT */}
      <span className="relative z-10 flex items-center gap-2">

        {children}

        {/* SUCCESS CHECK */}
        <AnimatePresence>
          {active && !loading && (
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Check size={14} />
            </motion.span>
          )}
        </AnimatePresence>

        {/* OADING DOT */}
        <AnimatePresence>
          {loading && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-2 h-2 bg-white rounded-full animate-pulse"
            />
          )}
        </AnimatePresence>
      </span>
    </motion.button>
  );
}