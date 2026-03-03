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
      {error && <div className="text-red-500">Failed to load dashboard.</div>}

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
          />
        </>
      )}
    </div>
  );
}
