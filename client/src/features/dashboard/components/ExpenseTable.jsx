export default function ExpenseTable() {
  return (
    <div
      className="bg-white dark:bg-gray-900 
                    border border-gray-200 dark:border-gray-800 
                    rounded-2xl shadow-sm"
    >
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Recent Expenses
        </h2>
      </div>

      <div className="h-[60vh] overflow-y-auto">
        <div className="p-6 space-y-4">
          {/* Placeholder rows */}
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
            Expense Row Example
          </div>
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
            Expense Row Example
          </div>

          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
            Expense Row Example
          </div>
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
            Expense Row Example
          </div>
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
            Expense Row Example
          </div>
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
            Expense Row Example
          </div>
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
            Expense Row Example
          </div>
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
            Expense Row Example
          </div>
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
            Expense Row Example
          </div>
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
            Expense Row Example
          </div>
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
            Expense Row Example
          </div>
        </div>
      </div>
    </div>
  );
}
