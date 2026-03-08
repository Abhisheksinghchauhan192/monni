import { PlusCircle, FilterX } from "lucide-react";
import { motion } from "framer-motion";
import AddExpenseModal from "../../AddExpenseModal";
import { useState } from "react";

export default function EmptyExpenseListPlaceholder({
  type = "empty",
  onAddExpense,
  onClearFilters,
}) {
  const isFilter = type === "filtered";
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center text-center"
        >
          {/* Floating icon */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            whileHover={{ scale: 1.05 }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut",
            }}
            className="
            mb-6 flex h-20 w-20 items-center justify-center
            rounded-2xl
            bg-gray-100 dark:bg-gray-800
            border border-gray-200 dark:border-gray-700
            shadow-sm
            "
          >
            {isFilter ? (
              <FilterX className="h-10 w-10 text-gray-500 dark:text-gray-400" />
            ) : (
              <PlusCircle className="h-10 w-10 text-gray-500 dark:text-gray-400" />
            )}
          </motion.div>

          {/* Title */}
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {isFilter ? "No matching expenses" : "No expenses yet"}
          </h2>

          {/* Description */}
          <p className="mt-2 max-w-sm text-sm text-gray-500 dark:text-gray-400">
            {isFilter
              ? "No expenses match your filters. Try adjusting or clearing them."
              : "Start tracking your spending by adding your first expense."}
          </p>

          {/* Action buttons */}
          {isFilter ? (
            <button
              onClick={onClearFilters}
              className="
              mt-6 rounded-xl
              bg-gray-100 dark:bg-gray-800
              border border-gray-200 dark:border-gray-700
              px-5 py-2 text-sm font-medium
              text-gray-700 dark:text-gray-300
              hover:bg-gray-200 dark:hover:bg-gray-700
              transition
              "
            >
              Clear Filters
            </button>
          ) : (
            <button
              onClick={() => setOpen(true)}
              className="
              mt-6 flex items-center gap-2 rounded-xl
              bg-emerald-500
              px-5 py-2 text-sm font-medium
              text-white
              hover:bg-emerald-400
              hover:shadow-md
              hover:-translate-y-px
              active:translate-y-0
              active:shadow-sm
              
              transition-all duration-200 ease-out
              "
            >
              <PlusCircle className="h-4 w-4" />
              Add your first expense
            </button>
          )}
        </motion.div>
      </div>

      {open && (
        <AddExpenseModal
          onSuccess={onAddExpense}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
