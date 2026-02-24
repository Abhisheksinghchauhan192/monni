export const GrowthBadge = ({growth}) => {
  const isPositive = growth >= 0;

  return (
    <div
      className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full
      ${
        isPositive
          ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30"
          : "bg-red-100 text-red-600 dark:bg-red-900/30"
      }`}
    >
      <span>{isPositive ? "▲" : "▼"}</span>
      <span>{Math.abs(growth)}%</span>
      <span className="hidden sm:inline text-gray-400">
        vs prev
      </span>
    </div>
  );
};