import { Router } from "express";
import {
  register,
  login,
  me,
  logout,
  forgotPasswordController,
  resetPasswordController,
} from "./auth.controller.js";
import { validateBody } from "../../validators/validate.js";
import {
  registerSchema,
  loginSchema,
} from "../../validators/auth/auth.schema.js";
import {
  forgotPasswordSchema,
  resetPasswordSchema,
} from "../../validators/auth/reset.schema.js";
import { loginRateLimiter, passwordResetLimiter, registerRateLimiter } from "../../middlewares/rateLimit.middleware.js";
import authMiddleWare from "../../middlewares/auth.middleware.js";

const router = Router();

router.post(
  "/register",
  registerRateLimiter,
  validateBody(registerSchema),
  register,
);

router.post("/login",
  loginRateLimiter,
  validateBody(loginSchema),
  login,
);

router.get("/me",
  authMiddleWare,
  me,
);

router.post("/logout",
  authMiddleWare,
  logout,
);

router.post(
  "/forgot-password",
  passwordResetLimiter,
  validateBody(forgotPasswordSchema),
  forgotPasswordController,
);

router.post(
  "/reset-password/:token",
  validateBody(resetPasswordSchema),
  resetPasswordController,
);
export default router;
