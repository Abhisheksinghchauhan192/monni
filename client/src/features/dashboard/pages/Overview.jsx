import FilterBar from "../components/FilterBar";
import ExpenseTable from "../components/ExpenseTable";
import DonutChartSection from "../components/DonutChartSection";
import SummaryGrid from "../components/SummaryGrid";
import TrendCharts from "../components/TrendCharts";
import AIInsights from "../components/AIInsights.jsx";
import AddExpenseButton from "../components/AddExpenseButton";
import useDashboardFilter from "../hooks/useDashboardFilter.js";

export default function Overview() {
  const{filter,updateMode,updateField} = useDashboardFilter();

  return (
    <div className="space-y-10">

      <FilterBar 
      filter={filter}
      updateField={updateField}
      updateMode={updateMode}
      />

      {/* Main Top Section */}
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Expense Table - 2/3 width */}
        <div className="lg:col-span-2">
          <ExpenseTable />
        </div>

        {/* Donut Chart - 1/3 width */}
        <div>
          <DonutChartSection />
        </div>

      </div>

      <SummaryGrid />

      <TrendCharts />

      <AIInsights />

      <AddExpenseButton />

    </div>
  );
}