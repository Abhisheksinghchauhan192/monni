import { registerUser, loginUser } from "./auth.service.js";

// POST API -> /api/auth/register
export async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;
    const user = await registerUser({ name, email, password });

    res.status(201).json({
      success: true,
      message: "User Registered Successfully.",
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

// POST API -> /api/auth/login

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await loginUser({ email, password });
    res.status(201).json({
      success: true,
      message: "Login Successful",
      data: user,
    });
  } catch (err) {
    next(err);
  }
}
