export default function AuthCard({ title, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 sm:p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-900 dark:text-gray-100 mb-6">
          {title}
        </h2>

        {children}
      </div>
    </div>
  );
}
