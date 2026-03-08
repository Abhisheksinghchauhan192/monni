import { AlertCircle, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

export default function ErrorExpenseState({ onRetry }) {
  return (
    <div className="flex h-full w-full min-h-0 overflow-hidden items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex flex-col items-center text-center"
      >
        {/* Icon */}
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-red-50 dark:bg-red-900/20">
          <AlertCircle className="h-9 w-9 text-red-500" />
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Failed to load expenses
        </h2>

        {/* Description */}
        <p className="mt-2 max-w-sm text-sm text-gray-500 dark:text-gray-400">
          Something went wrong while fetching your expense data. Please try
          again.
        </p>

        {/* Retry Button */}
        <button
          onClick={onRetry}
          className="mt-6 flex items-center gap-2 rounded-xl bg-red-500 px-5 py-2 text-sm font-medium text-white hover:bg-red-600 transition"
        >
          <RefreshCw className="h-4 w-4" />
          Retry
        </button>
      </motion.div>
    </div>
  );
}
