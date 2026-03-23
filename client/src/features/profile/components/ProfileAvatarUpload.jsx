import { useRef, useState } from "react";
import { useToast } from "../../../context/ToastContext";
import AvatarCropModal from "./AvatarCropModal";
import getCroppedImg from "../../../utils/cropImage";

export default function ProfileAvatarUpload({ user, uploadPhoto, uploading }) {
  const { addToast } = useToast();
  const fileRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [cropImage, setCropImage] = useState(null);
  const [showCrop, setShowCrop] = useState(false);

  const handleClick = () => {
    if (uploading) return;
    fileRef.current.click();
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      addToast("Only image files allowed", "error");
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    setCropImage(imageUrl);
    setShowCrop(true);
  };

  const handleCropComplete = async (croppedAreaPixels) => {
    const croppedBlob = await getCroppedImg(cropImage, croppedAreaPixels);

    const file = new File([croppedBlob], "avatar.jpg", {
      type: "image/jpeg",
    });

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    await uploadPhoto(file);

    setShowCrop(false);

    setTimeout(() => {
      URL.revokeObjectURL(previewUrl);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Crop model  */}
      {showCrop && (
        <AvatarCropModal
          image={cropImage}
          onCancel={() => setShowCrop(false)}
          onCropComplete={handleCropComplete}
        />
      )}
      {/* Avatar Container */}
      <div onClick={handleClick} className="relative group cursor-pointer">
        {/* Outer Ring */}
        <div className="p-[3px] rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500">
          {/* Avatar */}
          <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100">
            <img
              src={preview || user?.profile_image || "/NavbarProfileImage.png"}
              alt="profile"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
              {/* Camera Icon */}
              {!uploading && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 7h4l2-2h6l2 2h4v12H3V7z"
                  />
                  <circle cx="12" cy="13" r="3" />
                </svg>
              )}

              {/* Loader Spinner */}
              {uploading && (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
            </div>
          </div>
        </div>

        {/* Status Dot */}
        <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
      </div>

      {/* Hidden input */}
      <input
        type="file"
        ref={fileRef}
        className="hidden"
        onChange={handleChange}
      />

      {/* Helper Text */}
      <p className="text-xs text-gray-500">Click to change profile photo</p>
    </div>
  );
}
