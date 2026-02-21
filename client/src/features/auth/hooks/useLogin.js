import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../api/auth.api";
import { useToast } from "../../../context/ToastContext";

export default function useLogin() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const{addToast} = useToast();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await loginUser(form);
      setUser(response.data);
      navigate("/app");
      addToast("Login Successfull", "success");
    } catch (err) {
      console.log(err);
      addToast(err, "error");
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    error,
    handleChange,
    handleSubmit,
  };
}
