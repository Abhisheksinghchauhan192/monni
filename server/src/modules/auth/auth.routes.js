import { Router } from "express";
import { register, login } from "./auth.controller.js";
import { validateBody } from "../../validators/validate.js";
import {
  registerSchema,
  loginSchema,
} from "../../validators/auth/auth.schema.js";
import { authRateLimiter } from "../../middlewares/rateLimit.middleware.js";

const router = Router();

router.post("/register", validateBody(registerSchema), register);
router.post("/login", authRateLimiter, validateBody(loginSchema), login);

export default router;
