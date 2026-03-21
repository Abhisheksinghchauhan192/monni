import { useCategories } from "../../../context/CategoriesContext";
import useCurrency from "../../../hooks/useCurrency";
import { GrowthBadge } from "./ui/GrowthBadge";
import { Card } from "./ui/SummaryCard";

export default function SummaryGrid({ summary }) {
  const total = Number(summary?.total || 0);
  const count = Number(summary?.count || 0);
  const average = count > 0 ? total / count : 0;
  const growth = summary?.growthPercentage ?? 0;
  const highest = summary?.highestExpense ?? 0;
  const topCategory = summary?.topCategory ?? "—";
  const{getCategoryMeta} = useCategories();
  const { emoji, chip } = getCategoryMeta(topCategory);
  const{format} = useCurrency()
  return (
    <div className="flex flex-col gap-6 w-full">

      <Card
        title="Total Spend"
        value={format(total)}
        subtitle="Total amount spent in selected range"
        extra={<GrowthBadge growth={growth} />}
      />

      <Card
        title="Transactions"
        value={count}
        subtitle="Number of recorded expenses"
      />

      <Card
        title="Avg per Expense"
        value={format(average)}
        subtitle="Average amount per transaction"
      />

      <Card
        title="Highest Expense"
        value={format(highest)}
        subtitle="Single largest transaction"
      />

      <div
        className="
        bg-linear-to-br from-emerald-500/10 to-transparent
        border border-emerald-200 dark:border-emerald-900
        rounded-2xl p-6 shadow-sm
      "
      >
        <p className="text-xs text-gray-500 uppercase tracking-wide">
          Most Frequent Category
        </p>

        {/* Category Pill */}
        <div className="mt-3">
          {topCategory !== "—" ? (
            <span
              className={`
                inline-flex items-center gap-2
                px-3 py-1.5
                rounded-lg
                text-sm font-semibold
                ${chip}
              `}
            >
              <span className="text-base">{emoji}</span>
              <span className="capitalize">{topCategory}</span>
            </span>
          ) : (
            <span className="text-gray-400">—</span>
          )}
        </div>

        <p className="text-xs text-gray-400 mt-3">
          Category with highest number of expenses
        </p>
      </div>

    </div>
  );
}