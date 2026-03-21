export default function FilterBar({
  filter,
  updateMode,
  updateField,
  applyFilter,
}) {
  return (
    <div
      className="
        bg-white/70 dark:bg-zinc-900/60
        backdrop-blur-md
        border border-gray-200 dark:border-zinc-800
        rounded-2xl
        px-4 py-4 sm:px-5 sm:py-4
        shadow-sm
      "
    >
      {/* ================= MAIN ROW ================= */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        {/* LEFT SIDE (CONTROLS) */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 flex-1">

          {/* ===== BREAKDOWN ===== */}
          <div className="space-y-1 min-w-[140px]">
            <p className="text-[10px] text-gray-400 uppercase tracking-wide">
              Breakdown by
            </p>

            <div className="inline-flex bg-gray-100 dark:bg-zinc-800 rounded-lg p-1">
              {["category", "payment_method"].map((type) => {
                const active = filter.breakdownBy === type;

                return (
                  <button
                    key={type}
                    onClick={() => updateField("breakdownBy", type)}
                    className={`
                      px-3 py-1.5 text-xs font-medium rounded-md
                      transition-all duration-200

                      ${
                        active
                          ? "bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 shadow-sm"
                          : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                      }
                    `}
                  >
                    {type === "category" ? "Category" : "Payment"}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ===== TIME MODE ===== */}
          <div className="space-y-1 min-w-[220px]">
            <p className="text-[10px] text-gray-400 uppercase tracking-wide">
              Time Range
            </p>

            <div className="inline-flex bg-gray-100 dark:bg-zinc-800 rounded-lg p-1">
              {["overall", "monthly", "yearly", "custom"].map((mode) => {
                const active = filter.mode === mode;

                return (
                  <button
                    key={mode}
                    onClick={() => updateMode(mode)}
                    className={`
                      px-3 py-1.5 text-xs font-medium rounded-md
                      transition-all duration-200

                      ${
                        active
                          ? "bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 shadow-sm"
                          : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                      }
                    `}
                  >
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ===== DYNAMIC CONTROLS ===== */}
          {(filter.mode === "monthly" ||
            filter.mode === "yearly" ||
            filter.mode === "custom") && (
            <div className="space-y-1 min-w-[200px]">
              <p className="text-[10px] text-gray-400 uppercase tracking-wide">
                Options
              </p>

              {/* MONTHLY */}
              {filter.mode === "monthly" && (
                <div className="flex gap-2">
                  <select
                    value={filter.month}
                    onChange={(e) =>
                      updateField("month", Number(e.target.value))
                    }
                    className="
                      px-3 py-1.5 rounded-lg
                      border border-gray-200 dark:border-zinc-700
                      bg-gray-50 dark:bg-zinc-800
                      text-xs
                    "
                  >
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i} value={i + 1}>
                        {new Date(0, i).toLocaleString("default", {
                          month: "short",
                        })}
                      </option>
                    ))}
                  </select>

                  <select
                    value={filter.year}
                    onChange={(e) =>
                      updateField("year", Number(e.target.value))
                    }
                    className="
                      px-3 py-1.5 rounded-lg
                      border border-gray-200 dark:border-zinc-700
                      bg-gray-50 dark:bg-zinc-800
                      text-xs
                    "
                  >
                    {[2023, 2024, 2025, 2026, 2027, 2028].map((year) => (
                      <option key={year}>{year}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* YEARLY */}
              {filter.mode === "yearly" && (
                <select
                  value={filter.year}
                  onChange={(e) =>
                    updateField("year", Number(e.target.value))
                  }
                  className="
                    px-3 py-1.5 rounded-lg
                    border border-gray-200 dark:border-zinc-700
                    bg-gray-50 dark:bg-zinc-800
                    text-xs
                  "
                >
                  {[2023, 2024, 2025, 2026, 2027, 2028].map((year) => (
                    <option key={year}>{year}</option>
                  ))}
                </select>
              )}

              {/* CUSTOM */}
              {filter.mode === "custom" && (
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={filter.fromDate || ""}
                    onChange={(e) =>
                      updateField("fromDate", e.target.value)
                    }
                    className="
                      px-3 py-1.5 rounded-lg
                      border border-gray-200 dark:border-zinc-700
                      bg-gray-50 dark:bg-zinc-800
                      text-xs
                    "
                  />

                  <input
                    type="date"
                    value={filter.toDate || ""}
                    onChange={(e) =>
                      updateField("toDate", e.target.value)
                    }
                    className="
                      px-3 py-1.5 rounded-lg
                      border border-gray-200 dark:border-zinc-700
                      bg-gray-50 dark:bg-zinc-800
                      text-xs
                    "
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* ===== APPLY BUTTON ===== */}
        <div className="flex justify-end">
          <button
            onClick={applyFilter}
            className="
              px-4 py-2 rounded-lg
              bg-emerald-500 text-white text-sm font-semibold
              hover:bg-emerald-600
              active:scale-95
              transition
              shadow-sm
            "
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}