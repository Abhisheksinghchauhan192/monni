import { registerUser, loginUser } from "./auth.service.js";
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
  const user = await loginUser({ email, password });
  res.status(201).json({
    success: true,
    message: "Login Successful",
    data: user,
  });
});
