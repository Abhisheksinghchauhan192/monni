import { useState } from "react";
import { uploadProfilePhoto } from "../services/profile.api";
import { useToast } from "../../../context/ToastContext";
import { useAuth } from "../../../context/AuthContext";

export function useProfile() {
  const [uploading, setUploading] = useState(false);
  const { addToast } = useToast();
  const{user,setUser} = useAuth();

  const uploadPhoto = async (file) => {
    if (uploading) return;

    if (file.size > 1 * 1024 * 1024) {
      addToast("Max file size 1MB", "error");
      return;
    }

    try {
      setUploading(true);

      const res = await uploadProfilePhoto(file);


      setUser((prev) => ({
        ...prev,
        profile_image: res.data.profile_image,
      }));

      addToast("Profile updated", "success");

    } catch (err) {
      addToast(err, "error");
    } finally {
      setUploading(false);
    }
  };

  return {
    user,
    uploadPhoto,
    uploading,
  };
}