import { updateProfile } from "../services/profile.api";
import { useAuth } from "../../../context/AuthContext";
import useForm from "../../../hooks/useForm";
import { useToast } from "../../../context/ToastContext";
import { updateProfileSchema } from "../schema/updateProfile.schema";

export default function useUpdateProfile(user, onClose) {
  const { setUser } = useAuth();
  const { addToast } = useToast();

  const handleUpdate = async (data) => {
    try {

      if(data.name.trim() ===user.name && data.mobile===user.mobile){
        return;
      }
      const res = await updateProfile(data);

      // Merge into Global User..
      setUser((prev) => ({
        ...prev,
        ...res.data,
      }));

      addToast(res.message, "success");
      return { sucess: true };
    } catch (err) {
      addToast(err, "error");
    } finally {
      onClose();
    }
  };

  return useForm({
    initialValues: {
      name: user.name,
      mobile: user.mobile,
    },
    schema: updateProfileSchema,
    onSubmit: handleUpdate,
  });
}
