import { Outlet, Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext.jsx";
import { FaMoon } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";
export default function AppLayout() {
  const { toggleTheme, theme } = useTheme();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 shadow transition-colors duration-300">
        <h1 className="font-bold text-lg">MoNNi</h1>

        <div className="flex gap-6">
          <Link
            className="text-gray-700 dark:text-gray-200 hover:text-indigo-600"
            to="/app"
          >
            Overview
          </Link>
          <Link
            className="text-gray-700 dark:text-gray-200 hover:text-indigo-600"
            to="/app/monthly"
          >
            Monthly
          </Link>
          <Link
            className="text-gray-700 dark:text-gray-200 hover:text-indigo-600"
            to="/app/yearly"
          >
            Yearly
          </Link>
        </div>
        <div>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="relative w-10 h-10 flex items-center justify-center rounded-full border border-emerald-300 hover:bg-emerald-50 dark:hover:bg-gray-800 transition-colors duration-300"
          >
            <IoSunny className="absolute text-xl transition-all duration-300 rotate-90 scale-0 opacity-0 dark:rotate-0 dark:scale-100 dark:opacity-100" />

            <FaMoon className="absolute text-xl transition-all duration-300 rotate-0 scale-100 opacity-100 dark:rotate-90 dark:scale-0 dark:opacity-0" />
          </button>
        </div>
      </nav>

      <div className="p-6">
        <Outlet />
      </div>
    </div>
  );
}
