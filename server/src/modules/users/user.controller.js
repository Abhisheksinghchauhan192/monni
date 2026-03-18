import asyncHandler from "../../utils/asyncHandler.js";
import {
  updateProfileService,
  changePasswordService,
  deleteAccountService,
} from "./user.service.js";

//update user profile POST: /users/profile
export const updateProfileController = asyncHandler(async (req, res) => {
  const userId = req.user.id; // from auth middleware
  const data = req.body;
  const updatedData = await updateProfileService(userId, data);

  return res.status(200).json({
    success: true,
    message:"Profile Updated ",
    data: updatedData,
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
