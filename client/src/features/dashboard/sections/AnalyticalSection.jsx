import FilterBar from "../components/FilterBar";
import DonutChartSection from "./DonutChartSection";
import SummaryGrid from "../components/SummaryGrid";
import TrendCharts from "../components/TrendCharts";
import useDashboardFilter from "../hooks/useDashboardFilter";
import useDashboard from "../hooks/useDashboard";
import AnalyticsSkeleton from "../components/AnalyticsSkeleton";

export default function AnalyticsSection() {
  const { filter, updateMode, updateField } = useDashboardFilter();
  const { data, loading, error } = useDashboard(filter);

  return (
    <div className="space-y-8">
      <FilterBar
        filter={filter}
        updateField={updateField}
        updateMode={updateMode}
      />

      {loading && <AnalyticsSkeleton />}
      {error && (
        <div
          className="
    flex flex-col items-center justify-center
    rounded-2xl
    border border-gray-200 dark:border-gray-800
    bg-white dark:bg-gray-900
    py-16 px-6
    text-center
    shadow-sm
  "
        >
          <div
            className="
      mb-5 flex h-14 w-14 items-center justify-center
      rounded-xl
      bg-red-50 dark:bg-red-900/20
      border border-red-100 dark:border-red-900/40
    "
          >
            <svg
              className="h-6 w-6 text-red-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v4m0 4h.01M10.29 3.86l-7.19 12.45A2 2 0 004.82 19h14.36a2 2 0 001.72-3.02L13.71 3.86a2 2 0 00-3.42 0z"
              />
            </svg>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Unable to load analytics
          </h3>

          <p className="mt-2 max-w-md text-sm text-gray-500 dark:text-gray-400">
            Something went wrong while fetching your analytics data. Please try
            again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-5 rounded-lg bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-800 dark:bg-gray-400 dark:hover:bg-gray-500 dark:text-gray-900 cursor-pointer"
          >
            Retry
          </button>
        </div>
      )}

      {!loading && data && (
        <>
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 items-stretch">
            {/* Donut */}
            <div className="xl:col-span-3 h-full">
              <DonutChartSection breakdown={data.breakdown} />
            </div>

            {/* Summary */}
            <div className="xl:col-span-2 h-full flex">
              <SummaryGrid summary={data.summary} />
            </div>
          </div>

          <TrendCharts
            trend={data.trend}
            loading={loading}
            dateRange={data.dateRange}
          />
        </>
      )}
    </div>
  );
}
