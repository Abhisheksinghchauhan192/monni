import AuthCard from "../components/AuthCard";
import useForgotPassword from "../hooks/useForgotPassword";
import ForgotPasswordForm from "../components/ForgotPasswordForm";

export default function ForgotPassword() {
  const {
    values,
    errors,
    loading,
    handleChange,
    handleSubmit,
  } = useForgotPassword();

  return (
    <AuthCard title="Reset Password">
      <p className="text-sm text-center text-gray-600 dark:text-gray-400 mb-6">
        Enter your email and we’ll send you a reset link.
      </p>
      <ForgotPasswordForm
        form={values}
        errors={errors}
        loading={loading}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </AuthCard>
  );
}