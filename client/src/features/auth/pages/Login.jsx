import AuthCard from "../components/AuthCard";
import LoginForm from "../components/LoginForm";
import useLogin from "../hooks/useLogin";

export default function Login() {
  const { values,errors,loading,handleChange,handleSubmit} = useLogin();
   return (
    <AuthCard title={"Welcome Back"}>
      <LoginForm
        form={values}
        loading={loading}
        errors={errors}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </AuthCard>
  );
}
