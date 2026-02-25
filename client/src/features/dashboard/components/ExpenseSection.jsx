import { useState ,useMemo} from "react";
import TableFilterBar from "./expensetable/TableFilterBar";
import ExpenseTable from "./expensetable/ExpenseTable";
import useCategories from "../../../hooks/useCategories";

export default function ExpenseSection() {
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    payment_method: "",
    fromDate: "",
    toDate: "",
  });

  const stableFilters = useMemo(
    () => filters,
    [
      filters.search,
      filters.category,
      filters.payment_method,
      filters.fromDate,
      filters.toDate,
    ],
  );

  const { categories } = useCategories();
  return (
    <div
      className="bg-white dark:bg-gray-900 
                    border border-gray-200 dark:border-gray-800 
                    rounded-2xl shadow-sm 
                    flex flex-col 
                    h-130"
    >
      <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800">
        <h3 className="text-lg font-semibold">Recent Expenses</h3>
      </div>

      <TableFilterBar
        filters={filters}
        setFilters={setFilters}
        categories={categories}
      />

      <div className="flex-1 min-h-0">
        <ExpenseTable filters={stableFilters} categories={categories} />
      </div>
    </div>
  );
}
