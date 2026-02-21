import AuthCard from "../components/AuthCard";
import RegisterForm from "../components/RegisterForm";
import useRegister from "../hooks/useRegister";

export default function Register() {
  const {values,errors,loading,handleChange,handleSubmit} = useRegister();
  return(
    <div>
      <AuthCard title={"Sign Up"}>
        <RegisterForm
        form={values}
        errors={errors}
        loading={loading}
        onChange={handleChange}
        onSubmit={handleSubmit}
        />
      </AuthCard>
    </div>
  )
}
