import { changePassword } from "../services/profile.api";
import useForm from "../../../hooks/useForm";
import { changePasswordSchema } from "../schema/changePassword.schema";
import { useToast } from "../../../context/ToastContext";

export default function useChangePassword(onClose) {
  const { addToast } = useToast();
  const submitLogic = async (values) => {
    try {
      if (values.currentPassword === values.newPassword) {
        addToast("New password must be different", "error");
        return;
      }

      const res = await changePassword(values);

      addToast(res.message || "Password updated", "success");
      onClose();
      return{success:true}
    } catch (err) {
      addToast(err, "error");
    }
  };

  return useForm({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    schema: changePasswordSchema,
    onSubmit:submitLogic
  });
}
