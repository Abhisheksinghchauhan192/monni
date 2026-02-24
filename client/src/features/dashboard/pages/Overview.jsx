import FilterBar from "../components/FilterBar";
import ExpenseTable from "../components/ExpenseTable";
import DonutChartSection from "../components/DonutChartSection";
import SummaryGrid from "../components/SummaryGrid";
import TrendCharts from "../components/TrendCharts";
import AIInsights from "../components/AIInsights";
import AddExpenseButton from "../components/AddExpenseButton";

import useDashboardFilter from "../hooks/useDashboardFilter";
import useDashboard from "../hooks/useDashboard";
import DashboardSkeleton from "../components/DashboardSkeleton";

export default function Overview() {
  const { filter, updateMode, updateField } = useDashboardFilter();
  const { data, loading, error } = useDashboard(filter);

  // Demo Data For MockInsights.. 
  const mockInsights = {
    growthPercentage: 12.4,
    highestExpense: 5400,
    topCategory: "Food",
  };

  return (
    <div className="space-y-10">
      {loading && <DashboardSkeleton />}

      {error && <div className="text-red-500">Failed to load dashboard.</div>}

      {!loading && data && (
        <>
          {/* Top Section */}
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <ExpenseTable filter={filter} />
            </div>

            <div className="md:col-span-1 ">
              <AIInsights />
            </div>
          </div>

          <div className="pt-4">
            <FilterBar
              filter={filter}
              updateField={updateField}
              updateMode={updateMode}
            />
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
            <div className="xl:col-span-2">
              <DonutChartSection breakdown={data.breakdown} />
            </div>

            <div>
              <SummaryGrid
                summary={data.summary}
                insights={mockInsights}
              />{" "}
            </div>
          </div>

          <TrendCharts trend={data.trend} />

          <AddExpenseButton />
        </>
      )}
    </div>
  );
}
