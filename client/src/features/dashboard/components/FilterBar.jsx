export default function FilterBar({ filter, updateMode, updateField }) {
  return (
    <div
      className="bg-white dark:bg-gray-900 
                    border border-gray-200 dark:border-gray-800 
                    rounded-2xl shadow-sm 
                    px-4 sm:px-6 py-5"
    >
      {/* Wrapper */}
      <div className="flex flex-col gap-6">
        {/* MODE SELECTOR */}
        <div className="flex flex-wrap gap-2">
          {["overall", "monthly", "yearly", "custom"].map((mode) => (
            <button
              key={mode}
              onClick={() => updateMode(mode)}
              className={`flex-1 sm:flex-none 
                          text-center 
                          px-4 py-2.5 
                          rounded-full text-sm font-medium
                          transition-all duration-200
                          ${
                            filter.mode === mode
                              ? "bg-emerald-500 text-white shadow"
                              : `bg-gray-100 dark:bg-gray-800 
                                 text-gray-600 dark:text-gray-300 
                                 hover:bg-gray-200 dark:hover:bg-gray-700`
                          }`}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>

        {/* CONTEXT CONTROLS */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-4">
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

          {filter.mode === "custom" && (
            <>
              <input
                type="date"
                value={filter.fromDate || ""}
                onChange={(e) => updateField("fromDate", e.target.value)}
                className="w-full sm:w-auto
                           px-4 py-2.5 rounded-xl
                           border border-gray-200 dark:border-gray-700
                           bg-gray-50 dark:bg-gray-800
                           text-sm shadow-sm"
              />
              <input
                type="date"
                value={filter.toDate || ""}
                onChange={(e) => updateField("toDate", e.target.value)}
                className="w-full sm:w-auto
                           px-4 py-2.5 rounded-xl
                           border border-gray-200 dark:border-gray-700
                           bg-gray-50 dark:bg-gray-800
                           text-sm shadow-sm"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
