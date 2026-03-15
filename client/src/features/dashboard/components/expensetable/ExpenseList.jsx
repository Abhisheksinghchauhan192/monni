import { useRef, useEffect } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import ExpenseCard from "./components/ExpenseCard";
import ExpenseCardSkeleton from "./components/ExpenseCardSkeleton";
import { Loader } from "lucide-react";

export default function ExpenseList({
  expenses,
  hasMore,
  fetchExpenses,
  onOpen,
  onEdit,
  loading,
}) {
  const parentRef = useRef(null);

  // include loader row
  const rowCount = hasMore ? expenses.length + 1 : expenses.length;

  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 110,
    overscan: 5,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();

  // infinite scroll trigger
  useEffect(() => {
    const lastRow = virtualRows[virtualRows.length - 1];

    if (!lastRow) return;

    if (lastRow.index >= expenses.length - 1 && hasMore && !loading) {
      fetchExpenses(false);
    }
  }, [virtualRows, expenses.length, hasMore, loading]);

  return (
    <div ref={parentRef} className="h-full overflow-y-auto pr-2">
      {/* First Load Skeleton */}
      {loading &&
        expenses.length === 0 &&
        [...Array(3)].map((_, i) => <ExpenseCardSkeleton key={i} />)}

      <div
        style={{
          height: rowVirtualizer.getTotalSize(),
          position: "relative",
        }}
      >
        {virtualRows.map((virtualRow) => {
          const isLoaderRow = virtualRow.index > expenses.length - 1;
          const expense = expenses[virtualRow.index];

          return (
            <div
              key={virtualRow.index}
              className="pb-3"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              {isLoaderRow ? (
                hasMore ? (
                  <div className="py-4 flex justify-center">
                    <Loader className="animate-spin text-emerald-400" />
                  </div>
                ) : null
              ) : (
                <ExpenseCard
                  expense={expense}
                  onOpen={onOpen}
                  onEdit={onEdit}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
