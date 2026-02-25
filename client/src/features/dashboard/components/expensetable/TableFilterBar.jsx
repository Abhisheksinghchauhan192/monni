export default function TableFilterBar() {
  return (
    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 
                    flex flex-col sm:flex-row gap-3">

      <input
        type="text"
        placeholder="Search merchant..."
        className="px-4 py-2 rounded-xl 
                   bg-gray-50 dark:bg-gray-800
                   border border-gray-200 dark:border-gray-700
                   text-sm flex-1"
      />

      <select
        className="px-4 py-2 rounded-xl 
                   bg-gray-50 dark:bg-gray-800
                   border border-gray-200 dark:border-gray-700
                   text-sm"
      >
        <option>All Categories</option>
        <option>Food</option>
        <option>Travel</option>
      </select>

      <select
        className="px-4 py-2 rounded-xl 
                   bg-gray-50 dark:bg-gray-800
                   border border-gray-200 dark:border-gray-700
                   text-sm"
      >
        <option>All Payments</option>
        <option>UPI</option>
        <option>Card</option>
      </select>

    </div>
  );
}