export default function ExpenseCardSkeleton() {
  return (
    <div className="bg-white dark:bg-zinc-900 
                    p-4 rounded-2xl
                    border border-gray-200 dark:border-zinc-800
                    animate-pulse">

      <div className="flex justify-between items-start">

        {/* Left */}
        <div className="space-y-2 w-2/3">
          <div className="h-4 bg-gray-200 dark:bg-zinc-700 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 dark:bg-zinc-700 rounded w-1/2"></div>
          <div className="h-3 bg-gray-200 dark:bg-zinc-700 rounded w-1/3"></div>
        </div>

        {/* Right */}
        <div className="space-y-2 w-1/4 text-right">
          <div className="h-5 bg-gray-200 dark:bg-zinc-700 rounded w-full"></div>
          <div className="h-3 bg-gray-200 dark:bg-zinc-700 rounded w-2/3 ml-auto"></div>
        </div>

      </div>
    </div>
  );
}