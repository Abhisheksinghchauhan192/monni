export default function MetricCard({
  title,
  value,
  desc,
  positive,
  highlight = false,
}) {
  const valueColor =
    positive === undefined
      ? "text-gray-900 dark:text-gray-100"
      : positive
      ? "text-emerald-500"
      : "text-red-500";

  return (
    <div
      className={`rounded-xl border p-4 transition-all 
                  bg-gray-50 dark:bg-gray-800
                  border-gray-200 dark:border-gray-700
                  ${highlight ? "ring-1 ring-emerald-500" : ""}`}
    >
      {/* Title */}
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {title}
      </p>

      {/* Value */}
      <p className={`text-lg font-semibold mt-1 ${valueColor}`}>
        {value}
      </p>

      {/* Description */}
      {desc && (
        <p className="text-[11px] text-gray-400 mt-1">
          {desc}
        </p>
      )}
    </div>
  );
}