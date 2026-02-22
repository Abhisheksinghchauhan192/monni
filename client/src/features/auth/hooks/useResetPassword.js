import useForm from "../../../hooks/useForm";
import { resetPasswordSchema } from "../schemas/reset.shema";
import { resetPassword } from "../../../api/auth.api";
import { useToast } from "../../../context/ToastContext";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

export default function useResetPassword() {
  const [isTokenValid, setIsTokenValid] = useState(true);
  const { addToast } = useToast();
  const navigate = useNavigate();
  const { token } = useParams();
  const submitLogic = async (values) => {
    try {
      await resetPassword(token, values);
      addToast("Password updated successfully 🎉", "success");

      navigate("/login");
    } catch (err) {
      //Token Expired Page state
      console.log(err);
      if (err === "Invalid  Token") {
        setIsTokenValid(false);
      } else {
        addToast(err, "error");
      }
    }
  };

  const useFormReturn = useForm({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    schema: resetPasswordSchema,
    onSubmit: submitLogic,
  });

  return {
    ...useFormReturn,
    isTokenValid,
  };
}
