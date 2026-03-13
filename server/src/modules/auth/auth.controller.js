import {
  registerUser,
  loginUser,
  forgotPasswordService,
  resetPasswordService,
  initiateRegistration,
  verifyRegistrationOTP,
  resendRegistrationOTP,
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

// POST API -> api/register/initiate
export const initiateRegister = asyncHandler(async (req, res) => {
  const result = await initiateRegistration(req.body);

  res.status(200).json({
    success: true,
    message: "OTP sent to email",
    data: result,
  });
});

// POST API -> api/register/verify
export const verifyRegisterOTP = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  const { user, token } = await verifyRegistrationOTP({ email, otp });

  res.cookie("monni_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    success: true,
    message: "Account verified successfully",
    data: user,
  });
});

// POST API -> api/register/resend-otp
export const resendRegisterOTP = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const result = await resendRegistrationOTP(email);

  res.status(200).json({
    success: true,
    message: "OTP resent successfully",
    data: result,
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
    path: "/",
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
