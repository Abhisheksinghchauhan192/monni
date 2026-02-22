import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-800 dark:text-gray-100">
          404
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          The page you are looking for does not exist.
        </p>

        <Link
          to="/"
          className="mt-6 inline-block px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}