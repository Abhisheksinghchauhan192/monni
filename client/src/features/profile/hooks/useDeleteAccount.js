import { deleteAccount } from "../services/profile.api";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../context/ToastContext";
import useForm from "../../../hooks/useForm";
import { deleteAccountSchema } from "../schema/deleteAccount.schema";

export default function useDeleteAccount() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const{addToast} = useToast();

  const handleDelete = async (data) => {
    try {
      
      const res = await deleteAccount(data);
      await logout(); // clear state + cookie
      navigate("/app");
      addToast(res.message || "Account Deleted","success");
      return { success: true };
    } catch (err) {
      addToast(err,"error");
    } 
  };


  return useForm(
    {
      initialValues:{
        confirmation:""
      },
      schema:deleteAccountSchema,
      onSubmit:handleDelete,
    }
  )
}