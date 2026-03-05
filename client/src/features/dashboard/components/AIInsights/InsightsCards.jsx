export default function InsightCards({ insights, loading }) {
  if (loading) {
    return (
      <div className="space-y-3 animate-pulse">
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-2/3"></div>
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
    <div className="space-y-2">
      <p className="text-xs uppercase tracking-wide text-gray-400">
        Insights
      </p>

      {insights.map((item, index) => (
        <div
          key={index}
          className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800"
        >
          {item}
        </div>
      ))}
    </div>
  );
}