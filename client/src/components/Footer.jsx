import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-gray-200 dark:border-gray-800 
                       bg-gray-50 dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-10">

        {/* Brand */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            MoNNi
          </h3>
          <p className="mt-3 text-gray-600 dark:text-gray-400 text-sm">
            Modern expense tracking made simple.
            Track smarter. Spend wiser.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-gray-100">
            Quick Links
          </h4>
          <div className="mt-4 space-y-2 text-sm">
            <Link to="/register" className="block hover:text-emerald-500 transition">
              Get Started
            </Link>
            <Link to="/login" className="block hover:text-emerald-500 transition">
              Login
            </Link>
            <Link to="/#features" className="block hover:text-emerald-500 transition">
              Features
            </Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-gray-100">
            Contact
          </h4>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            servicesmonni@gmail.com
          </p>
        </div>
      </div>

      {/* bottom strip */}
      <div className="border-t border-gray-200 dark:border-gray-800 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} MoNNi. All rights reserved.
      </div>
    </footer>
  );
}