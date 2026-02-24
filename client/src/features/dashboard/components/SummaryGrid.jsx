export default function SummaryGrid({ summary }) {
  const average =
    summary.count > 0 ? (summary.total / summary.count).toFixed(2) : 0;

  const Card = ({ title, value }) => (
    <div
      className="bg-white dark:bg-gray-900 
                    border border-gray-200 dark:border-gray-800 
                    rounded-2xl p-6 shadow-sm 
                    hover:shadow-md transition"
    >
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold mt-2">{value}</h3>
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-6">
      <Card title="Total Spend" value={`₹ ${summary.total}`} />
      <Card title="Total Expenses" value={summary.count} />
      <Card title="Average Expense" value={`₹ ${average}`} />
    </div>
  );
}
