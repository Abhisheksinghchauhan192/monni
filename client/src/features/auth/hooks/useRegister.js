import { useNavigate } from "react-router-dom";
import useForm from "../../../hooks/useForm";
import { registerSchema } from "../schemas/register.schema";
import { registerUser } from "../services/auth.api";
import { useToast } from "../../../context/ToastContext";

export default function useRegister() {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const submitLogic = async (values) => {
    try {
      const response = await registerUser(values);
      addToast(response.message, "success");
      navigate("/login");
    } catch (err) {
      addToast(err, "error");
    }
  };

  return useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    schema: registerSchema,
    onSubmit: submitLogic,
  });
}
