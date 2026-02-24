import ExpenseTable from "../components/ExpenseTable";
import AIInsights from "../components/AIInsights";

export default function TopSection() {
  return (
    <div className="grid lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2">
        <ExpenseTable />
      </div>

      <div>
        <AIInsights />
      </div>
    </div>
  );
}