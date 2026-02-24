export default function AnalyticsSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">


      {/* Donut + Summary */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">

        {/* Donut Skeleton */}
        <div className="xl:col-span-2 
                        bg-white dark:bg-gray-900 
                        border border-gray-200 dark:border-gray-800 
                        rounded-2xl p-6 shadow-sm">
          <div className="h-6 w-48 bg-gray-200 dark:bg-gray-800 rounded mb-6" />
          <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-2xl" />
        </div>

        {/* Summary Skeleton */}
        <div className="space-y-6">
          <div className="h-24 bg-gray-200 dark:bg-gray-800 rounded-2xl" />
          <div className="h-24 bg-gray-200 dark:bg-gray-800 rounded-2xl" />
          <div className="h-24 bg-gray-200 dark:bg-gray-800 rounded-2xl" />
        </div>
      </div>

      {/* Trend Skeleton */}
      <div className="bg-white dark:bg-gray-900 
                      border border-gray-200 dark:border-gray-800 
                      rounded-2xl p-6 shadow-sm">
        <div className="h-6 w-40 bg-gray-200 dark:bg-gray-800 rounded mb-6" />
        <div className="h-80 bg-gray-200 dark:bg-gray-800 rounded-2xl" />
      </div>

    </div>
  );
}