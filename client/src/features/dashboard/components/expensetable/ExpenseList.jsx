import { Loader } from "lucide-react";
import ExpenseCard from "./components/ExpenseCard";
import SentinelLoader from "./SentineLoader";
import ExpenseCardSkeleton from "./components/ExpenseCardSkeleton";

export default function ExpenseList({
  expenses,
  hasMore,
  fetchExpenses,
  onOpen,
  onEdit,
  loading
}) {
  return (
<div className="space-y-3 h-full overflow-y-auto pr-2">    

      {/* Skeleton on first load */}
      {loading &&
        expenses.length === 0 &&
        [...Array(3)].map((_, i) => <ExpenseCardSkeleton key={i} />)}


      {/* Actual Cards */}
      {expenses.map((exp) => (
        <ExpenseCard
          key={exp.id}
          expense={exp}
          onOpen={onOpen}
          onEdit={onEdit}
        />
      ))}

      {/* Bottom spinner for pagination */}
      {loading && expenses.length > 0 && (
        <div className="py-4 flex justify-center">
          <Loader className="animate-spin text-emerald-400" />
        </div>
      )}

      {/* Sentinel */}
      <SentinelLoader
        hasMore={hasMore}
        loading={loading}
        onVisible={() => fetchExpenses(false)}
        itemsLength={expenses.length}
      />
    </div>
  );
}
