import TableFilterBar from "./expensetable/TableFilterBar";
import ExpenseTable from "./expensetable/ExpenseTable";

export default function ExpenseSection() {
  return (
    <div className="bg-white dark:bg-gray-900 
                    border border-gray-200 dark:border-gray-800 
                    rounded-2xl shadow-sm 
                    flex flex-col 
                    h-140">

      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800">
        <h3 className="text-lg font-semibold">
          Recent Expenses
        </h3>
      </div>

      <TableFilterBar />

      {/* Scroll Area */}
      <div className="flex-1 min-h-0">
        <ExpenseTable />
      </div>

    </div>
  );
}