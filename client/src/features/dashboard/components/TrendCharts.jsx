import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function TrendCharts({ trend, loading }) {
  return (
    <div
      className="bg-white dark:bg-gray-900 
                 border border-gray-200 dark:border-gray-800 
                 rounded-2xl shadow-sm 
                 p-6 space-y-6"
    >
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Spending Trend
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Visual representation of spending over time
        </p>
      </div>

      {/* Chart Area */}
      <div className="h-[350px] w-full">

        {loading && (
          <div className="h-full w-full animate-pulse bg-gray-100 dark:bg-gray-800 rounded-xl" />
        )}

        {!loading && (!trend || trend.length === 0) && (
          <div className="h-full flex items-center justify-center text-gray-400 text-sm">
            No trend data available for selected period.
          </div>
        )}

        {!loading && trend && trend.length > 0 && (
          <ResponsiveContainer>
            <LineChart data={trend}>
              <CartesianGrid
                strokeDasharray="3 3"
                strokeOpacity={0.1}
              />

              <XAxis
                dataKey="period"
                tick={{ fontSize: 12 }}
                stroke="#9ca3af"
              />

              <YAxis
                tick={{ fontSize: 12 }}
                stroke="#9ca3af"
              />

              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "none",
                }}
              />

              <Line
                type="monotone"
                dataKey="total"
                stroke="#10b981"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}

      </div>
    </div>
  );
}