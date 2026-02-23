import useForm from "../../../hooks/useForm";
import { forgotSchema } from "../schemas/forgot.schema";
import { forgotPassword } from "../services/auth.api";
import { useToast } from "../../../context/ToastContext";
import { useNavigate } from "react-router-dom";
export default function useForgotPassword() {
  const { addToast } = useToast();
  const navigate = useNavigate();
  const submitLogic = async (values) => {
    try {
      const data = await forgotPassword(values);
      addToast(data.message, "success");
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
