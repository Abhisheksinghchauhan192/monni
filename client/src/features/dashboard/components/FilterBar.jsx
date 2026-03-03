export default function FilterBar({ filter, updateMode, updateField }) {
  return (
    <div
      className="bg-white dark:bg-gray-900 
                 border border-gray-200 dark:border-gray-800 
                 rounded-2xl shadow-sm 
                 px-5 sm:px-6 py-6 space-y-6"
    >
      {/* ================= Breakdown Section ================= */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Breakdown View
          </h4>
          <span className="text-xs text-gray-400">
            Choose how spending is grouped
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {["category", "payment_method"].map((type) => (
            <button
              key={type}
              onClick={() => updateField("breakdownBy", type)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                ${
                  filter.breakdownBy === type
                    ? "bg-emerald-500 text-white shadow-sm"
                    : `bg-gray-100 dark:bg-gray-800 
                       text-gray-600 dark:text-gray-300 
                       hover:bg-gray-200 dark:hover:bg-gray-700`
                }
              `}
            >
              {type === "category" ? "By Category" : "By Payment Method"}
            </button>
          ))}
        </div>
      </div>

      {/* ================= Time Mode Section ================= */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Time Range
        </h4>

        <div className="flex flex-wrap gap-2">
          {["overall", "monthly", "yearly", "custom"].map((mode) => (
            <button
              key={mode}
              onClick={() => updateMode(mode)}
              className={`flex-1 sm:flex-none 
                          px-4 py-2.5 rounded-full 
                          text-sm font-medium 
                          transition-all duration-200
                ${
                  filter.mode === mode
                    ? "bg-emerald-500 text-white shadow-sm"
                    : `bg-gray-100 dark:bg-gray-800 
                       text-gray-600 dark:text-gray-300 
                       hover:bg-gray-200 dark:hover:bg-gray-700`
                }
              `}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* ================= Context Controls ================= */}
      {(filter.mode === "monthly" ||
        filter.mode === "yearly" ||
        filter.mode === "custom") && (
        <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 mt-4">
            {filter.mode === "monthly" && (
              <>
                <select
                  value={filter.month}
                  onChange={(e) => updateField("month", Number(e.target.value))}
                  className="w-full sm:w-auto
                             px-4 py-2.5 rounded-xl
                             border border-gray-200 dark:border-gray-700
                             bg-gray-50 dark:bg-gray-800
                             text-sm shadow-sm"
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i} value={i + 1}>
                      {new Date(0, i).toLocaleString("default", {
                        month: "long",
                      })}
                    </option>
                  ))}
                </select>

                <select
                  value={filter.year}
                  onChange={(e) => updateField("year", Number(e.target.value))}
                  className="w-full sm:w-auto
                             px-4 py-2.5 rounded-xl
                             border border-gray-200 dark:border-gray-700
                             bg-gray-50 dark:bg-gray-800
                             text-sm shadow-sm"
                >
                  {[2023, 2024, 2025, 2026].map((year) => (
                    <option key={year}>{year}</option>
                  ))}
                </select>
              </>
            )}

            {filter.mode === "yearly" && (
              <select
                value={filter.year}
                onChange={(e) => updateField("year", Number(e.target.value))}
                className="w-full sm:w-auto
                           px-4 py-2.5 rounded-xl
                           border border-gray-200 dark:border-gray-700
                           bg-gray-50 dark:bg-gray-800
                           text-sm shadow-sm"
              >
                {[2023, 2024, 2025, 2026].map((year) => (
                  <option key={year}>{year}</option>
                ))}
              </select>
            )}

            <div className="flex flex-col sm:flex-row sm:items-end gap-4">
              {filter.mode === "custom" && (
                <>
                  {/* From Date Group */}
                  <div className="flex flex-col flex-1 gap-1.5">
                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400 ml-1">
                      From
                    </label>
                    <input
                      type="date"
                      value={filter.fromDate || ""}
                      onChange={(e) => updateField("fromDate", e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl
                   border border-gray-200 dark:border-gray-700
                   bg-gray-50 dark:bg-gray-800
                   text-sm shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  {/* To Date Group */}
                  <div className="flex flex-col flex-1 gap-1.5">
                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400 ml-1">
                      To
                    </label>
                    <input
                      type="date"
                      value={filter.toDate || ""}
                      onChange={(e) => updateField("toDate", e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl
                   border border-gray-200 dark:border-gray-700
                   bg-gray-50 dark:bg-gray-800
                   text-sm shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
