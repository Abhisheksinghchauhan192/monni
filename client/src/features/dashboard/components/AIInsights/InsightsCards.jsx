export default function InsightCards({ insights, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-2 animate-pulse">
        <div className="h-14 rounded-xl bg-gray-200 dark:bg-gray-800"></div>
        <div className="h-14 rounded-xl bg-gray-200 dark:bg-gray-800"></div>
      </div>
    );
  }

  if (!insights || insights.length === 0) {
    return (
      <div className="text-xs text-gray-400">
        Insights will appear when enough data is available.
      </div>
    );
  }

  return (
    <div className="grid gap-2">
      <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">
        AI Insights
      </p>

      {insights.map((item, index) => (
        <div
          key={index}
          className="
            p-3
            rounded-xl
            border
            border-gray-200 dark:border-gray-700
            bg-gradient-to-r
            from-emerald-50
            to-white
            dark:from-gray-800 dark:to-gray-900
            text-sm
            text-gray-800 dark:text-gray-200
            shadow-sm
            hover:shadow-md
            transition
          "
        >
          {item}
        </div>
      ))}
    </div>
  );
}