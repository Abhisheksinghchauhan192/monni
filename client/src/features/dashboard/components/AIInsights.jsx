import { Sparkles } from "lucide-react";

export default function AIInsights({ insights, loading }) {
  return (
    <div
      className="relative 
                 bg-white dark:bg-gray-900 
                 border border-emerald-200/50 dark:border-emerald-500/20
                 rounded-2xl shadow-sm 
                 p-5 
                 h-105 
                 flex flex-col"
    >
      {/* Subtle glow */}
      <div className="absolute inset-0 rounded-2xl bg-emerald-500/5 pointer-events-none"></div>

      {/* Header */}
      <div className="relative flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-500/20">
          <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
        </div>

        <div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
            AI Insights
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Intelligent spending patterns
          </p>
        </div>
      </div>

      {/* Scrollable Content */}
      <div
        className="relative flex-1 overflow-y-auto pr-2 space-y-4 
                   text-sm text-gray-700 dark:text-gray-300
                   scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700"
      >
        {loading && (
          <div className="space-y-3 animate-pulse">
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-2/3"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
          </div>
        )}

        {!loading && !insights && (
          <div className="text-gray-400 text-sm">
            Insights will appear once enough data is available.
          </div>
        )}

        {!loading && insights && (
          <>
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
              {insights.primary}
            </div>

            {insights.secondary && (
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
                {insights.secondary}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}