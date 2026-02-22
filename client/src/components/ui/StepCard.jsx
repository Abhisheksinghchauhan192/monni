export default function StepCard({ number, title, children }) {
  return (
    <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-md">
      <div className="text-emerald-500 text-3xl font-bold">
        {number}
      </div>
      <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
        {title}
      </h3>
      <p className="mt-3 text-gray-600 dark:text-gray-400">
        {children}
      </p>
    </div>
  );
}