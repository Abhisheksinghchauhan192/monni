import { useState, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";
import { PAYMENT_METHODS } from "../../../../constants/paymentMethods";

export default function TableFilterBar({
  filters,
  setFilters,
  categories,
  clearFilters,
}) {
  const [localSearch, setLocalSearch] = useState(filters.search);
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((prev) => ({
        ...prev,
        search: localSearch,
      }));
    }, 1500);

    return () => clearTimeout(timer);
  }, [localSearch]);

  useEffect(() => {
    setLocalSearch(filters.search);
  }, [filters.search]);
  return (
    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 space-y-3">
      {/* Top Row */}
      <div className="flex flex-col gap-3">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by description or merchant..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          className="w-full px-4 py-2 rounded-xl 
                     bg-gray-50 dark:bg-gray-800
                     border border-gray-200 dark:border-gray-700
                     text-sm focus:ring-2 focus:ring-emerald-500"
        />

        {/* Compact Grid Filters */}
        <div className="grid grid-cols-2 gap-3">
          <select
            value={filters.category}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                category: e.target.value,
              }))
            }
            className="px-3 py-2 rounded-xl text-sm
                       bg-gray-50 dark:bg-gray-800
                       border border-gray-200 dark:border-gray-700"
          >
            <option value="">Category</option>
            {categories.map((c) => (
              <option value={c} key={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            value={filters.payment_method}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                payment_method: e.target.value,
              }))
            }
            className="px-3 py-2 rounded-xl text-sm
                       bg-gray-50 dark:bg-gray-800
                       border border-gray-200 dark:border-gray-700"
          >
            <option value="">Payment</option>
            {PAYMENT_METHODS.map((m) => (
              <option value={m} key={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        {/* Advanced Toggle */}
        <button
          onClick={() => setShowAdvanced((prev) => !prev)}
          className="flex items-center justify-center gap-2 
                     text-xs text-gray-500 hover:text-emerald-600"
        >
          Advanced Filters
          <ChevronDown
            size={14}
            className={`transition-transform ${
              showAdvanced ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Advanced Grid */}
        {showAdvanced && (
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col">
              <label className="text-xs text-gray-500 mb-1">From</label>
              <input
                type="date"
                value={filters.fromDate}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    fromDate: e.target.value,
                  }))
                }
                className="px-3 py-2 rounded-xl text-sm
           bg-gray-50 dark:bg-gray-800
           border border-gray-200 dark:border-gray-700
           focus:ring-2 focus:ring-emerald-500
           appearance-none"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xs text-gray-500 mb-1">To</label>
              <input
                type="date"
                value={filters.toDate}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    toDate: e.target.value,
                  }))
                }
                className="px-3 py-2 rounded-xl text-sm
           bg-gray-50 dark:bg-gray-800
           border border-gray-200 dark:border-gray-700
           focus:ring-2 focus:ring-emerald-500
           appearance-none"
              />
            </div>

            <button
              onClick={() => {
                clearFilters();
                setLocalSearch("");
                setShowAdvanced(false);
              }}
              className="col-span-2 py-2 rounded-xl text-sm
                         bg-red-50 text-red-600
                         dark:bg-red-900/30 dark:text-red-400"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
