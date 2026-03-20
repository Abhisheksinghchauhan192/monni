import useCurrency from "../../../../hooks/useCurrency";

export default function CustomTooltip({ active, payload }) {
  const{format} = useCurrency();

  if (!active || !payload?.length) return null;
  const data = payload[0].payload;

  if (!data) return null;
  return (
    <div
      className="bg-white dark:bg-gray-800
                 shadow-2xl rounded-2xl
                 p-4 border border-gray-200 dark:border-gray-700
                 text-sm min-w-[200px]"
    >
      {/* Period */}
      <div className="flex justify-between items-center">
        <span className="font-medium text-gray-500">
          {data.label}
        </span>
      </div>

      {/* Amount */}
      <div className="mt-2">
        <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {format(data.total)}
        </p>
      </div>

      {/* Share of total */}
      <div className="mt-1 text-xs text-gray-500">
        {data.share.toFixed(1)}% of selected period
      </div>

      {/* Visual indicator */}
      <div className="mt-2 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-emerald-500"
          style={{ width: `${Math.min(data.share, 100)}%` }}
        />
      </div>

      {/* Highest / Lowest badges */}
      {data.isHighest && (
        <p className="text-emerald-500 text-xs mt-2">
          Highest in this period
        </p>
      )}

      {data.isLowest && (
        <p className="text-amber-500 text-xs mt-1">
          Lowest in this period
        </p>
      )}
    </div>
  );
}