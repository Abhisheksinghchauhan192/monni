import AuthCard from "../components/AuthCard";
import ResetPasswordForm from "../components/ResetPasswordForm";
import useResetPassword from "../hooks/useResetPassword";
import { Link } from "react-router-dom";

export default function ResetPassword() {
  const { values, errors, loading, handleChange, handleSubmit, isTokenValid } =
    useResetPassword();

  if (!isTokenValid) {
    return (
      <AuthCard title={"Link Expired !"}>
        <div className="text-center space-y-4 px-4 py-2">
          <div className="text-5xl">⚠️</div>

          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            This password reset link is invalid or has expired.
            <br />
            For security reasons, reset links are only valid for a limited time.
          </p>

          <Link
            to="/forgot-password"
            className="inline-block mt-4 px-6 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition"
          >
            Request New Link
          </Link>

          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
            Already remembered your password?{" "}
            <Link to="/login" className="text-emerald-500 hover:underline">
              Go back to login
            </Link>
          </p>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard title="Set New Password">
      <ResetPasswordForm
        form={values}
        errors={errors}
        loading={loading}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </AuthCard>
  );
}
