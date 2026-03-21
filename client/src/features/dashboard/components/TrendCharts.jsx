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
import MetricCard from "./ui/MetricCard";
import useCurrency from "../../../hooks/useCurrency";

export default function TrendCharts({ trend, loading, filter }) {
  const [viewMode, setViewMode] = useState("normal");
  const analytics = useTrendAnalytics(trend, filter, viewMode);

  const { format } = useCurrency();
  return (
    <div
      className="
    bg-white/70 dark:bg-gray-900/70
    backdrop-blur-md
    border border-gray-200 dark:border-gray-800
    rounded-2xl
    shadow-sm hover:shadow-md
    transition-all duration-300
    p-6 space-y-6
  "
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
              <h3 className="text-lg font-semibold tracking-tight">
                Spending Trend
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {analytics.from} – {analytics.to}
              </p>
            </div>

            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              {["normal", "cumulative"].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`
          px-3 py-1 text-xs rounded-md transition-all duration-200
          ${
            viewMode === mode
              ? "bg-white dark:bg-gray-700 shadow-sm scale-[1.03]"
              : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-200"
          }
        `}
                >
                  {mode === "normal" ? "Normal" : "Cumulative"}
                </button>
              ))}
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            {[
              {
                title: "Total Spent",
                value: format(analytics.total),
                desc: "Total in selected period",
              },
              {
                title: "Average",
                value: format(analytics.average),
                desc: analytics.averageLabel,
              },
              {
                title: "Highest",
                value: format(analytics.highest.total),
                desc: "Highest period",
                highlight: true,
              },
              {
                title: "Lowest",
                value: format(analytics.lowest.total),
                desc: "Lowest period",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="transform transition duration-300 hover:scale-[1.02]"
                style={{ animation: `fade-in 0.4s ease ${i * 0.05}s both` }}
              >
                <MetricCard {...item} />
              </div>
            ))}
          </div>

          {/* Chart */}
          <div
            className="
    h-[350px] w-full
    rounded-xl
    bg-gray-50/40 dark:bg-gray-800/40
    p-2
  "
          >
            {" "}
            <ResponsiveContainer>
              <LineChart data={analytics.data}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.08} />
                <XAxis dataKey="label" tick={{ fontSize: 12 }} />

                <YAxis tick={{ fontSize: 12 }} />

                <Tooltip content={<CustomTooltip />} />

                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#10b981"
                  strokeWidth={3}
                  strokeOpacity={0.9}
                  dot={(props) => {
                    const { payload } = props;

                    return (
                      <circle
                        cx={props.cx}
                        cy={props.cy}
                        r={payload.isHighest ? 6 : 3}
                        className="transition-all duration-200"
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
                  activeDot={{
                    r: 7,
                    strokeWidth: 2,
                  }}
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
