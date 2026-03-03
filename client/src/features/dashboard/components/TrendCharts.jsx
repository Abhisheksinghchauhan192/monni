import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import useTrendAnalytics from "../hooks/useTrendAnalytics";
import CustomTooltip from "./ui/CustomTooltip";
import MetricCard from "./ui/MetricCard"; // assuming you already created it

export default function TrendCharts({ trend, loading,dateRange }) {
  const analytics = useTrendAnalytics(trend,dateRange);

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
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Spending Trend
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {analytics.from} – {analytics.to}
            </p>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <MetricCard
              title="Total Spent"
              value={`₹${analytics.total.toLocaleString()}`}
              desc="Total in selected period"
            />

            <MetricCard
              title="Average"
              value={`₹${analytics.average.toFixed(0)}`}
              desc={analytics.averageLabel}
            />

            <MetricCard
              title="Highest"
              value={`₹${analytics.highest.total.toLocaleString()}`}
              desc="Highest period"
              highlight
            />

            <MetricCard
              title="Lowest"
              value={`₹${analytics.lowest.total.toLocaleString()}`}
              desc="Lowest period"
            />
          </div>

          {/* Chart */}
          <div className="h-[350px] w-full">
            <ResponsiveContainer>
              <LineChart data={analytics.enriched}>
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
        <div className="h-[350px] flex items-center justify-center text-gray-400 text-sm">
          No trend data available for selected period.
        </div>
      )}
    </div>
  );
}