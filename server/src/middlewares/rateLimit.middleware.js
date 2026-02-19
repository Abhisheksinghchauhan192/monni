import rateLimit from "express-rate-limit";
import { success } from "zod";

export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 100,
  max: 20,
  message: {
    success: false,
    message: "Too many attempts . Please try again later",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
