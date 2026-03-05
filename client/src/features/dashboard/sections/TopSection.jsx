import AIInsights from "../components/AIInsights/AIInsights";
import ExpenseSection from "./ExpenseSection";
export default function TopSection() {
  return (
    <div className="grid lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2">
        <ExpenseSection />
      </div>

      <div>
        <AIInsights  />
      </div>
    </div>
  );
}