import { useNavigate } from "react-router-dom";
import { Wallet } from "lucide-react";

export default function Budget() {
  const navigate = useNavigate();

  return (
    <div
      className="
        min-h-screen
        flex items-center justify-center
        px-4
      "
    >
      <div
        className="
          w-full max-w-lg
          text-center
          bg-white/70 dark:bg-gray-900/70
          backdrop-blur-md
          border border-gray-200 dark:border-gray-800
          rounded-2xl
          shadow-sm
          p-8 space-y-6
        "
      >
        {/* ICON */}
        <div
          className="
            mx-auto w-14 h-14 flex items-center justify-center
            rounded-xl
            bg-gray-100 dark:bg-gray-800
            border border-gray-200 dark:border-gray-700
          "
        >
          <Wallet className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </div>

        {/* TITLE */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-gray-100">
            Budget Planning
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            This feature is currently under development.
          </p>
        </div>

        {/* SUBTEXT */}
        <p className="text-xs text-gray-400 max-w-sm mx-auto">
          Soon you'll be able to set budgets, track limits, and get smart alerts to control your spending.
        </p>

        {/* BUTTON */}
        <button
          onClick={() => navigate("/app")}
          className="
            mt-2
            px-5 py-2.5 rounded-xl
            bg-emerald-500 text-white text-sm font-medium
            hover:bg-emerald-600
            active:scale-95
            transition-all duration-200
            shadow-sm hover:shadow-md
          "
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
}