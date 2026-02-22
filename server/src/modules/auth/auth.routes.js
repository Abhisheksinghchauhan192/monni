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
import { authRateLimiter } from "../../middlewares/rateLimit.middleware.js";
import authMiddleWare from "../../middlewares/auth.middleware.js";

const router = Router();

router.post(
  "/register",
  authRateLimiter(3),
  validateBody(registerSchema),
  register,
);

router.post("/login",
  authRateLimiter(5),
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
  authRateLimiter(3),
  validateBody(forgotPasswordSchema),
  forgotPasswordController,
);

router.post(
  "/reset-password/:token",
  validateBody(resetPasswordSchema),
  resetPasswordController,
);
export default router;
