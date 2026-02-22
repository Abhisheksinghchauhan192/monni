import AuthCard from "../components/AuthCard";
import ResetPasswordForm from "../components/ResetPasswordForm";
import useResetPassword from "../hooks/useResetPassword";

export default function ResetPassword() {
  const { values, errors, loading, handleChange, handleSubmit } =
    useResetPassword();

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