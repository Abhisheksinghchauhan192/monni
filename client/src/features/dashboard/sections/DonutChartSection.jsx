import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useState, useMemo } from "react";
import { getCategoryMeta } from "../../../utils/getCategoryMeta";

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
              <defs>
                <filter
                  id="donutShadow"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feDropShadow
                    dx="0"
                    dy="3"
                    stdDeviation="6"
                    floodOpacity="0.15"
                  />
                </filter>
              </defs>
              <Pie
                data={breakdown}
                dataKey="total"
                nameKey="label"
                innerRadius={80}
                outerRadius={140}
                paddingAngle={4}
                stroke="rgba(255,255,255,0.6)"
                strokeWidth={2}
                filter="url(#donutShadow)"
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {breakdown.map((entry, index) => {
                  const { color } = getCategoryMeta(entry.label);

                  return (
                    <Cell
                      key={index}
                      fill={color || COLORS[index % COLORS.length]}
                      opacity={
                        activeIndex === null || activeIndex === index ? 1 : 0.35
                      }
                    />
                  );
                })}
              </Pie>

              {/* Emoji labels on slices */}
              <Pie
                data={breakdown}
                dataKey="total"
                nameKey="label"
                innerRadius={80}
                outerRadius={140}
                label={({ name }) => {
                  const { emoji } = getCategoryMeta(name);
                  return emoji;
                }}
                labelLine={false}
                stroke="none"
                fill="transparent"
              />

              <Tooltip
                formatter={(value, name) => {
                  const { emoji } = getCategoryMeta(name);
                  return [
                    `₹ ${Number(value).toLocaleString()}`,
                    `${emoji} ${name}`,
                  ];
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Center Total */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div
              className="
    absolute w-36 h-36
    rounded-full
    bg-emerald-400/10
    blur-2xl
    dark:bg-emerald-500/10
  "
            />
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

              const { emoji, chip } = getCategoryMeta(item.label);

              return (
                <div
                  key={index}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                  className="
        flex items-center justify-between
        px-4 py-3 rounded-xl
        bg-gray-50 dark:bg-gray-800
        border border-transparent
        hover:border-gray-200 dark:hover:border-zinc-700
        transition-all
        cursor-pointer
      "
                >
                  {/* Left */}
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Category Pill */}
                    <span
                      className={`
          inline-flex items-center gap-1
          px-2.5 py-[3px]
          rounded-md
          text-[12px]
          font-medium
          whitespace-nowrap
          ${chip}
          `}
                    >
                      {emoji}

                      {" "+item.label}
                    </span>
                  </div>

                  {/* Right */}
                  <div className="text-right ml-3">
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
