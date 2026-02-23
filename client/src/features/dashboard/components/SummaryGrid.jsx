export default function SummaryGrid() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border dark:border-gray-800 shadow-sm">
        Total Spent
      </div>
      <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border dark:border-gray-800 shadow-sm">
        This Month
      </div>
      <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border dark:border-gray-800 shadow-sm">
        Average
      </div>
    </div>
  );
}