import { motion } from "framer-motion";
import { GrowthBadge } from "./ui/GrowthBadge";
import { Card } from "./ui/SummaryCard";

export default function SummaryGrid({ summary }) {
  const total = Number(summary?.total || 0);
  const count = Number(summary?.count || 0);
  const average = count > 0 ? total / count : 0;
  const growth = summary?.growthPercentage ?? 0;
  const highest = summary?.highestExpense ?? 0;
  const topCategory = summary?.topCategory ?? "—";

  return (
    <div className="flex flex-col gap-6 w-full">

      <Card
        title="Total Spend"
        value={total}
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
        value={average}
        subtitle="Average amount per transaction"
      />

      <Card
        title="Highest Expense"
        value={highest}
        subtitle="Single largest transaction"
      />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-linear-to-br from-emerald-500/5 to-transparent
                   border border-emerald-200 dark:border-emerald-900
                   rounded-2xl p-6 shadow-sm"
      >
        <p className="text-xs text-gray-500 uppercase tracking-wide">
          Most Frequent Category
        </p>

        <h3 className="text-xl font-bold mt-3 text-emerald-600">
          {topCategory}
        </h3>

        <p className="text-xs text-gray-400 mt-2">
          Category with highest number of expenses
        </p>
      </motion.div>

    </div>
  );
}