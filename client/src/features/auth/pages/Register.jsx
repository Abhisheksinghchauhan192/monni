import AuthCard from "../components/AuthCard";
import RegisterForm from "../components/RegisterForm";
import VerifyOtpForm from "../components/VerifyOtpForm";
import useRegister from "../hooks/useRegister";

export default function Register() {
  const {
    step,
    email,
    verifyOtp,

    values,
    errors,
    loading,
    handleChange,
    handleSubmit,
  } = useRegister();

  return (
    <div>
      <AuthCard title={step === "otp" ? "Verify Email" : "Sign Up"}>
        {step === "form" && (
          <RegisterForm
            form={values}
            errors={errors}
            loading={loading}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        )}

        {step === "otp" && (
          <VerifyOtpForm
            email={email}
            verifyOtp={verifyOtp}
            loading={loading}
          />
        )}
      </AuthCard>
    </div>
  );
}
