import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
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
    setFilters((prev) => ({
      ...prev,
      search: localSearch,
    }));
  }, [localSearch]);

  useEffect(() => {
    setLocalSearch(filters.search);
  }, [filters.search]);

  return (
    <div
      className="
        px-4 py-4
        border-b border-gray-200 dark:border-gray-800
        bg-white/60 dark:bg-gray-900/60
        backdrop-blur-md
        space-y-4
      "
    >
      {/* ================= TOP ROW ================= */}
      <div className="flex flex-col lg:flex-row gap-3 lg:items-center">

        {/* SEARCH */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search expenses..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="
              w-full px-4 py-2 rounded-xl text-sm
              bg-gray-50 dark:bg-gray-800
              border border-gray-200 dark:border-gray-700
              focus:ring-2 focus:ring-emerald-500
              transition
            "
          />
        </div>

        {/* INLINE FILTERS */}
        <div className="flex gap-2 w-full lg:w-auto">

          {/* CATEGORY */}
          <select
            value={filters.category}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                category: e.target.value,
              }))
            }
            className="
              flex-1 lg:flex-none
              px-3 py-2 rounded-xl text-sm
              bg-gray-50 dark:bg-gray-800
              border border-gray-200 dark:border-gray-700
              hover:bg-gray-100 dark:hover:bg-gray-700
              transition
            "
          >
            <option value="">Category</option>
            {categories.map((c) => (
              <option value={c.name} key={c.id}>
                {c.emoji} {c.label}
              </option>
            ))}
          </select>

          {/* PAYMENT */}
          <select
            value={filters.payment_method}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                payment_method: e.target.value,
              }))
            }
            className="
              flex-1 lg:flex-none
              px-3 py-2 rounded-xl text-sm
              bg-gray-50 dark:bg-gray-800
              border border-gray-200 dark:border-gray-700
              hover:bg-gray-100 dark:hover:bg-gray-700
              transition
            "
          >
            <option value="">Payment</option>
            {PAYMENT_METHODS.map((m) => (
              <option value={m} key={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        {/* ADVANCED TOGGLE */}
        <button
          onClick={() => setShowAdvanced((prev) => !prev)}
          className="
            flex items-center justify-center gap-2
            px-3 py-2 rounded-xl
            text-xs font-medium
            bg-gray-100 dark:bg-gray-800
            text-gray-600 dark:text-gray-300
            hover:bg-gray-200 dark:hover:bg-gray-700
            transition
            w-full lg:w-auto
          "
        >
          Advanced
          <ChevronDown
            size={14}
            className={`transition-transform ${
              showAdvanced ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* ================= ADVANCED ================= */}
      {showAdvanced && (
        <div
          className="
            grid grid-cols-2 lg:grid-cols-4 gap-3
            pt-3
            border-t border-gray-100 dark:border-gray-800
          "
        >
          {/* FROM */}
          <div className="flex flex-col">
            <label className="text-[11px] text-gray-400 mb-1">
              From
            </label>
            <input
              type="date"
              value={filters.fromDate}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  fromDate: e.target.value,
                }))
              }
              className="
                px-3 py-2 rounded-xl text-sm
                bg-gray-50 dark:bg-gray-800
                border border-gray-200 dark:border-gray-700
                focus:ring-2 focus:ring-emerald-500
              "
            />
          </div>

          {/* TO */}
          <div className="flex flex-col">
            <label className="text-[11px] text-gray-400 mb-1">
              To
            </label>
            <input
              type="date"
              value={filters.toDate}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  toDate: e.target.value,
                }))
              }
              className="
                px-3 py-2 rounded-xl text-sm
                bg-gray-50 dark:bg-gray-800
                border border-gray-200 dark:border-gray-700
                focus:ring-2 focus:ring-emerald-500
              "
            />
          </div>

          {/* CLEAR */}
          <div className="col-span-2 flex items-end">
            <button
              onClick={() => {
                clearFilters();
                setLocalSearch("");
                setShowAdvanced(false);
              }}
              className="
                w-full py-2 rounded-xl text-sm font-medium
                bg-red-50 text-red-600
                dark:bg-red-900/30 dark:text-red-400
                hover:bg-red-100 dark:hover:bg-red-900/40
                transition
              "
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}