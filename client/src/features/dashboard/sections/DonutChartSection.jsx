import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useState, useMemo } from "react";

const COLORS = [
  "#10B981",
  "#3B82F6",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#14B8A6",
];

export default function DonutChartSection({ breakdown = [] }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const totalAmount = useMemo(() => {
    return breakdown.reduce((sum, item) => sum + Number(item.total), 0);
  }, [breakdown]);

  if (!breakdown.length) {
    return (
      <div
        className="bg-white dark:bg-gray-900
                 border border-gray-200 dark:border-gray-800
                 rounded-2xl p-8 shadow-sm
                 flex flex-col h-full"
      >
        {/* Header (kept same as main layout) */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Spending Breakdown
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Distribution of expenses across selected period
          </p>
        </div>

        {/* Empty state */}
        <div className="flex flex-1 items-center justify-center text-center">
          <div className="max-w-sm">
            <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              No expense data available for this period.
            </div>

            <p className="text-xs text-gray-400 dark:text-gray-500">
              Add some expenses or adjust the selected date range to see
              expenses breakdown.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-white dark:bg-gray-900 
                    border border-gray-200 dark:border-gray-800 
                    rounded-2xl p-8 shadow-sm 
                    flex flex-col h-full"
    >
      {/* Header */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Spending Breakdown
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Distribution of expenses across selected period
        </p>
      </div>

      {/* Layout */}
      <div className="grid lg:grid-cols-2 gap-10 items-center flex-1">
        {/* Donut Area */}
        <div className="relative h-80 xl:h-full min-h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={breakdown}
                dataKey="total"
                nameKey="label"
                innerRadius={80}
                outerRadius={140}
                paddingAngle={3}
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {breakdown.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                    opacity={
                      activeIndex === null || activeIndex === index ? 1 : 0.35
                    }
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => `₹ ${Number(value).toLocaleString()}`}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Center Total */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xs text-gray-500">Total</span>
            <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              ₹ {totalAmount.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="max-h-95 xl:max-h-full overflow-y-auto pr-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {breakdown.map((item, index) => {
              const percent = ((item.total / totalAmount) * 100).toFixed(1);

              return (
                <div
                  key={index}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                  className="flex items-center justify-between
                             px-4 py-3 rounded-xl
                             bg-gray-50 dark:bg-gray-800
                             transition-all duration-200
                             hover:shadow-md cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor: COLORS[index % COLORS.length],
                      }}
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                      {item.label}
                    </span>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      ₹ {Number(item.total).toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-400">{percent}%</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
