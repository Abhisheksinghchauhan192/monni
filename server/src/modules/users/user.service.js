import {
  updateUserProfile,
  findUserById,
  updateUserPassword,
  deleteUserAccount,
  findPasswordHashById,
  createUserSettings,
  getUserSettings,
  updateUserSettings,
} from "./user.model.js";

import { comparePassword, hashPassword } from "../../utils/password.js";
import ApiError from "../../errors/ApiError.js";

// Update Profile Implementation (Name,Mobile & Mobile number only)
export async function updateProfileService(userId, data) {
  await updateUserProfile(userId, data);

  // return updated user (fresh data)
  const updatedUser = await findUserById(userId);

  return {
    name: updatedUser.name,
    mobile: updatedUser.mobile,
    profileImage: updatedUser.profile_image,
  };
}

export async function updateProfilePhotoService(userId, data) {
  await updateUserProfile(userId, data);

  const updatedUser = await findUserById(userId);

  return {
    profile_image: updatedUser.profile_image,
  };
}

// get user profile photo.
export async function getUserProfileImage(userId) {
  const user = await findUserById(userId);

  return {
    profile_image: user.profile_image,
    profile_image_public_id: user.profile_image_id,
  };
}

export async function changePasswordService(userId, data) {
  const user = await findPasswordHashById(userId);
  const isMatch = await comparePassword(
    data.currentPassword,
    user.password_hash,
  );

  if (!isMatch) {
    throw new ApiError(400, "Current password is incorrect");
  }

  const newHash = await hashPassword(data.newPassword, 10);

  await updateUserPassword(userId, newHash);
}

/* ---------------- Delete Account ---------------- */
export async function deleteAccountService(userId) {
  // For now simple delete
  // Later: soft delete or cascade cleanup

  await deleteUserAccount(userId);
}

//----------------------------------------------------------
// User Personalization Settings Services
//------------------------------------------------------

// Fetch users settings.
export async function fetchUserSettings(userId) {
  let settings = await getUserSettings(userId);

  // auto-create if not exists
  if (!settings) {
    await createUserSettings(userId);
    settings = await getUserSettings(userId);
  }

  return settings;
}

//Update Users Settings
export async function modifyUserSettings(userId, data) {
  await updateUserSettings(userId, data);
  return await getUserSettings(userId);
}
