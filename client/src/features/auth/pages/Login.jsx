import AuthCard from "../components/AuthCard";
import LoginForm from "../components/LoginForm";
import useLogin from "../hooks/useLogin";

export default function Login() {
  const { form, loading, error, handleChange, handleSubmit } = useLogin();

  return (
    <AuthCard title={"Welcome Back"}>
      <LoginForm
        form={form}
        loading={loading}
        error={error}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </AuthCard>
  );
}
