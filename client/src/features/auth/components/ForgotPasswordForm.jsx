import { Link } from "react-router-dom";
export default function ForgotPasswordForm({
  form,
  loading,
  errors,
  onChange,
  onSubmit,
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label className="block text-sm mb-1 text-gray-600 dark:text-gray-400">
          Email
        </label>

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={onChange}
          className="w-full px-4 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
        />

        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition disabled:opacity-50"
      >
        {loading ? "Sending..." : "Send Reset Link"}
      </button>

      <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-4">
        Remember your password?{" "}
        <Link to="/login" className="text-emerald-500 hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}
