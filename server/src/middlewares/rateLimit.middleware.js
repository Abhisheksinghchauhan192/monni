import rateLimit from "express-rate-limit";

export const authRateLimiter = (maxRequests)=> rateLimit({
  windowMs: 15 * 60 * 1000,
  max: maxRequests,
  message: {
    success: false,
    message: "Too many attempts . Please try again later",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
