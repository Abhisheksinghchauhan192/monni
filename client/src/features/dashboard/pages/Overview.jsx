import TopSection from "../sections/TopSection";
import AnalyticsSection from "../sections/AnalyticalSection";
import AddExpenseButton from "../components/AddExpenseButton";

export default function Overview() {
  return (
    <div className="space-y-10">
      <TopSection />
      <AnalyticsSection />
      <AddExpenseButton />
    </div>
  );
}