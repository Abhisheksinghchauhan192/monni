export default function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">

      {/* Top Grid */}
      <div className="grid lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2 h-72 bg-gray-200 dark:bg-gray-800 rounded-2xl" />

        <div className="h-72 bg-gray-200 dark:bg-gray-800 rounded-2xl" />

      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="h-24 bg-gray-200 dark:bg-gray-800 rounded-2xl" />
        <div className="h-24 bg-gray-200 dark:bg-gray-800 rounded-2xl" />
        <div className="h-24 bg-gray-200 dark:bg-gray-800 rounded-2xl" />
      </div>

      {/* Trend */}
      <div className="h-80 bg-gray-200 dark:bg-gray-800 rounded-2xl" />

    </div>
  );
}