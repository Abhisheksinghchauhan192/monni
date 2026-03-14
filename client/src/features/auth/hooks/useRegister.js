import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../../../hooks/useForm";
import { registerSchema } from "../schemas/register.schema";
import { initiateRegister, verifyRegisterOtp } from "../services/auth.api";
import { useToast } from "../../../context/ToastContext";
import { useAuth } from "../../../context/AuthContext";

export default function useRegister() {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const { setUser } = useAuth();
  const [step, setStep] = useState("form");
  const [email, setEmail] = useState(null);

  const submitLogic = async (values) => {
    try {
      const response = await initiateRegister(values);

      addToast(response.message, "success");

      setEmail(values.email);
      setStep("otp");
    } catch (err) {
      addToast(err, "error");
    }
  };

  const verifyOtp = async (otp) => {
    try {
      const response = await verifyRegisterOtp({
        email,
        otp,
      });
      addToast(response.message, "success");
      setUser(response.data);
      navigate("/app");
    } catch (err) {
      addToast(err, "error");
    }
  };

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    schema: registerSchema,
    onSubmit: submitLogic,
  });

  return {
    ...form,
    step,
    email,
    verifyOtp,
  };
}
