import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useState } from "react";
import useTrendAnalytics from "../hooks/useTrendAnalytics";
import CustomTooltip from "./ui/CustomTooltip";
import MetricCard from "./ui/MetricCard"; // assuming you already created it
import useCurrency from "../../../hooks/useCurrency";

export default function TrendCharts({ trend, loading, dateRange }) {
  const [viewMode, setViewMode] = useState("normal");
  const analytics = useTrendAnalytics(trend, dateRange, viewMode);

  const{format} = useCurrency()
  return (
    <div
      className="bg-white dark:bg-gray-900
                 border border-gray-200 dark:border-gray-800
                 rounded-2xl shadow-sm
                 p-6 space-y-6 z-1000"
    >
      {/* Loading */}
      {loading && (
        <div className="h-[350px] w-full animate-pulse bg-gray-100 dark:bg-gray-800 rounded-xl" />
      )}

      {!loading && analytics && (
        <>
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Spending Trend</h3>
              <p className="text-xs text-gray-500">
                {analytics.from} – {analytics.to}
              </p>
            </div>

            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode("normal")}
                className={`px-3 py-1 text-xs rounded-md transition ${
                  viewMode === "normal"
                    ? "bg-white dark:bg-gray-700 shadow-sm"
                    : "text-gray-500"
                }`}
              >
                Normal
              </button>

              <button
                onClick={() => setViewMode("cumulative")}
                className={`px-3 py-1 text-xs rounded-md transition ${
                  viewMode === "cumulative"
                    ? "bg-white dark:bg-gray-700 shadow-sm"
                    : "text-gray-500"
                }`}
              >
                Cumulative
              </button>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <MetricCard
              title="Total Spent"
              value={`${format(analytics.total)}`}
              desc="Total in selected period"
            />

            <MetricCard
              title="Average"
              value={`${format(analytics.average)}`}
              desc={analytics.averageLabel}
            />

            <MetricCard
              title="Highest"
              value={`${format(analytics.highest.total)}`}
              desc="Highest period"
              highlight
            />

            <MetricCard
              title="Lowest"
              value={`${format(analytics.lowest.total)}`}
              desc="Lowest period"
            />
          </div>

          {/* Chart */}
          <div className="h-[350px] w-full">
            <ResponsiveContainer>
              <LineChart data={analytics.data}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />

                <XAxis dataKey="label" tick={{ fontSize: 12 }} />

                <YAxis tick={{ fontSize: 12 }} />

                <Tooltip content={<CustomTooltip />} />

                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={(props) => {
                    const { payload } = props;

                    return (
                      <circle
                        cx={props.cx}
                        cy={props.cy}
                        r={payload.isHighest ? 6 : 3}
                        fill={
                          payload.isHighest
                            ? "#ef4444"
                            : payload.isLowest
                              ? "#f59e0b"
                              : "#10b981"
                        }
                      />
                    );
                  }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}

      {!loading && !analytics && (
        <div className="flex flex-col items-center justify-center h-[350px] text-center px-6">
          <div
            className="
      mb-4 flex h-14 w-14 items-center justify-center
      rounded-xl
      bg-gray-100 dark:bg-gray-800
      border border-gray-200 dark:border-gray-700
    "
          >
            <svg
              className="h-6 w-6 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 17l6-6 4 4 8-8"
              />
            </svg>
          </div>

          <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            No spending trend available
          </h4>

          <p className="mt-1 max-w-sm text-xs text-gray-500 dark:text-gray-400">
            Add more expenses or adjust the selected date range to view spending
            trends over time.
          </p>
        </div>
      )}
    </div>
  );
}
