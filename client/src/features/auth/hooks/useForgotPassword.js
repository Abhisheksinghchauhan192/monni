import useForm from "../../../hooks/useForm";
import { forgotSchema } from "../shemas/forgot.schema";
import { forgotPassword } from "../../../api/auth.api";
import { useToast } from "../../../context/ToastContext";
import { useNavigate } from "react-router-dom";
export default function useForgotPassword() {
  const { addToast } = useToast();
  const navigate = useNavigate();
  const submitLogic = async (values) => {
    try {
      await forgotPassword(values);
      addToast("Password reset link sent to your email 📩", "success");
      navigate("/login");
    } catch (err) {
      addToast(err, "error");
    }
  };

  return useForm({
    initialValues: { email: "" },
    schema: forgotSchema,
    onSubmit: submitLogic,
  });
}
