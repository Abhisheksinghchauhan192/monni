import { motion } from "framer-motion";


export default function ActionCard({ icon, title, subtitle, onClick, danger }) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.01 }}
      onClick={onClick}
      className={`
        w-full flex items-center gap-4
        px-4 py-4 rounded-xl
        text-left transition-all duration-200
        border
        ${
          danger
            ? "bg-red-50/70 dark:bg-red-950/20 border-red-200 dark:border-red-900/40 hover:bg-red-100/70 dark:hover:bg-red-900/30"
            : "bg-gray-50/70 dark:bg-zinc-800/70 border-gray-200 dark:border-zinc-700 hover:bg-gray-100/70 dark:hover:bg-zinc-700"
        }
      `}
    >
      {/* ICON */}
      <div
        className={`
          w-10 h-10 flex items-center justify-center rounded-xl
          ${
            danger
              ? "bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400"
              : "bg-gray-200 dark:bg-zinc-700 text-gray-600 dark:text-gray-300"
          }
        `}
      >
        {icon}
      </div>

      {/* TEXT */}
      <div className="flex-1">
        <p
          className={`
            text-sm font-semibold
            ${
              danger
                ? "text-red-600 dark:text-red-400"
                : "text-gray-800 dark:text-gray-100"
            }
          `}
        >
          {title}
        </p>

        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          {subtitle}
        </p>
      </div>

      {/* ARROW */}
      <div className="text-gray-400">
        →
      </div>
    </motion.button>
  );
}