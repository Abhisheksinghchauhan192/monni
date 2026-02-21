import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../api/auth.api";
import { useToast } from "../../../context/ToastContext";
import useForm from "../../../hooks/useForm";
import { loginSchema } from "../shemas/login.schema";

export default function useLogin() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { addToast } = useToast();

  const submitLogic = async (values) => {
    try {
      const response = await loginUser(values);
      setUser(response.data);
      addToast("Login successful 🎉", "success");
      navigate("/app");
    } catch (err) {
      addToast(err, "error");
    }
  };
  return useForm({
    initialValues: {
      email: "",
      password: "",
    },
    schema: loginSchema,
    onSubmit: submitLogic,
  });
}
