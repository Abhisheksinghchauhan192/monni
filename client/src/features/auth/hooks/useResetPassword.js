import useForm from "../../../hooks/useForm";
import { resetPasswordSchema } from "../schemas/reset.shema";
import { resetPassword } from "../../../api/auth.api";
import { useToast } from "../../../context/ToastContext";
import { useNavigate, useParams } from "react-router-dom";

export default function useResetPassword() {
  const { addToast } = useToast();
  const navigate = useNavigate();
  const { token } = useParams();
  const submitLogic = async (values) => {
    try {
      await resetPassword(token, values);
      addToast("Password updated successfully 🎉", "success");

      navigate("/login");
    } catch (err) {
      addToast(err, "error");
    }
  };

  return useForm({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    schema: resetPasswordSchema,
    onSubmit: submitLogic,
  });
}
