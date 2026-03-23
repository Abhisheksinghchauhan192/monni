import asyncHandler from "../../utils/asyncHandler.js";
import {
  updateProfileService,
  updateProfilePhotoService,
  changePasswordService,
  deleteAccountService,
  fetchUserSettings,
  modifyUserSettings,
  getUserProfileImage,
} from "./user.service.js";

import cloudinary from "../../utils/cloudinary.js";

//update user profile PATCH : /users/profile
export const updateProfileController = asyncHandler(async (req, res) => {
  const userId = req.user.id; // from auth middleware
  const data = req.body;
  const updatedData = await updateProfileService(userId, data);

  return res.status(200).json({
    success: true,
    message: "Profile Updated ",
    data: updatedData,
  });
});

// Update Profile Photo POST:/users/profile/photo
export const updateProfilePhotoController = asyncHandler(async (req, res) => {
  const userId = req.user.id; // from auth middleware

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded",
    });
  }
  // get old profileImagedata.
  const existing = await getUserProfileImage(userId);
  // upload new image.
  // buffer base 64
  const fileBase64 = req.file.buffer.toString("base64");
  const result = await cloudinary.uploader.upload(
    `data:${req.file.mimetype};base64,${fileBase64}`,
    {
      folder: "monni/profile",
      transformation: [
        { width: 300, height: 300, crop: "fill" },
        { quality: "auto" },
      ],
    },
  );
  const imageUrl = result.secure_url;
  const publicId = result.public_id;

  // save in DB
  const updatedUser = await updateProfilePhotoService(userId, {
    profile_image: imageUrl,
    profile_image_id: publicId,
  });

  // now Delete old image (if exists) ad previouse upload was success.then
  if (existing?.profile_image_public_id && result.public_id) {
    try {
      await cloudinary.uploader.destroy(existing.profile_image_public_id);
    } catch (err) {
      console.warn("Old image deletion failed:", err.message);
    }
  }

  return res.status(200).json({
    success: true,
    message: "Profile photo updated",
    data:updatedUser,
  });
});
// Change User Password PATCH: /users/password

export const changePasswordController = asyncHandler(async (req, res) => {
  const userId = req.user.id; // from auth middleware
  await changePasswordService(userId, req.body);

  res.status(200).json({
    success: true,
    message: "Password updated successfully .",
  });
});

// Delete User Account Service DELETE: /users/account
export const deleteAccountController = asyncHandler(async (req, res) => {
  const userId = req.user.id; //from auth middleware
  await deleteAccountService(userId);

  // Clear jwt token
  res.clearCookie("monni_token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  });

  res.status(200).json({
    success: true,
    message: "Account deleted successfully",
  });
});

//---------------------------------------------------
// User Personalization controllers
//----------------------------------------------------

// get User Personalization settings
export const getUserSettingsController = asyncHandler(async (req, res) => {
  const userId = req.user.id; // from auth middleware

  const settings = await fetchUserSettings(userId);

  res.json({
    success: true,
    ...settings,
  });
});

// Set users Personalization settings.
export const updateUserSettingsController = asyncHandler(async (req, res) => {
  const userId = req.user.id; // from auth middleware

  const updated = await modifyUserSettings(userId, req.body);

  res.json({
    success: true,
    message: "Settings updated successfully",
    data: updated,
  });
});
