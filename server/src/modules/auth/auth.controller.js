import { registerUser, loginUser } from "./auth.service.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { success } from "zod";
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
    secure: false,
    sameSite: "lax",
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
    sameSite: "lax",
    secure: false,
  });

  res.status(200).json({
    success: true,
    message: "Logged out succesfully.",
  });
});
