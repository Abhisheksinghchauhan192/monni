import { Link } from "react-router-dom";
export default function RegisterForm({
  form,
  loading,
  errors,
  onChange,
  onSubmit,
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {/* Name */}
      <div>
        <label className="block text-sm mb-1 text-gray-600 dark:text-gray-400">
          Full Name
        </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={onChange}
          required
          className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm mb-1 text-gray-600 dark:text-gray-400">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={onChange}
          required
          className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm mb-1 text-gray-600 dark:text-gray-400">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={onChange}
          required
          className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-sm mb-1 text-gray-600 dark:text-gray-400">
          Confirm Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={onChange}
          required
          className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition disabled:opacity-50"
      >
        {loading ? "Creating account..." : "Create Account"}
      </button>
      <p className="text-sm text-center text-gray-600 dark:text-gray-400">
        Already have an account?{" "}
        <Link to="/login" className="text-emerald-500 hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}
