export default function ThemeWrapper({ children }) {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      {children}
    </div>
  );
}
