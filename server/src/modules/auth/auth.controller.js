import {
  registerUser,
  loginUser,
  forgotPasswordService,
  resetPasswordService,
} from "./auth.service.js";
import asyncHandler from "../../utils/asyncHandler.js";

// POST API -> /api/auth/register
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await registerUser({ name, email, password });

  res.status(201).json({
    success: true,
    message: "User Registered Successfully.",
    data: user,
  });
});

// POST API -> /api/auth/login

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await loginUser({ email, password });

  res.cookie("monni_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    success: true,
    message: "Login Successfull",
    data: user,
  });
});

// api/auth/me
export const me = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    data: req.user,
  });
});

// api/auth/logout

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("monni_token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path:"/"
  });

  res.status(200).json({
    success: true,
    message: "Logged out succesfully.",
  });
});

// Reset Password Handeling

export const forgotPasswordController = asyncHandler(async (req, res) => {
  const { email } = req.body;

  await forgotPasswordService(email);

  res.status(200).json({
    success: true,
    message:
      "If an account with that email exists, a reset link has been sent.",
  });
});

export const resetPasswordController = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  await resetPasswordService(token, password);
  res.status(200).json({
    success: true,
    message: "Password reset successful",
  });
});
