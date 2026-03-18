import {
  updateUserProfile,
  findUserById,
  updateUserPassword,
  deleteUserAccount,
  findPasswordHashById,
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
