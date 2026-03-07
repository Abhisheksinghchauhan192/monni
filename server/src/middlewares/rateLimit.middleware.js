import rateLimit,{ipKeyGenerator} from "express-rate-limit";

export const rateLimiter = (maxRequests)=> rateLimit({
  windowMs: 15 * 60 * 1000,
  max: maxRequests,
  message: {
    success: false,
    message: "Too many attempts . Please try again later",
  },
  standardHeaders: true,
  legacyHeaders: false,
});


export const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,

  keyGenerator: (req) => req.body?.email || ipKeyGenerator(req.ip),

  message: {
    success:false,
    message: "Too many login attempts. Try again later.",
  },
});

export const registerRateLimiter = rateLimit({
  windowMs: 20 * 60 * 1000,
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,

  keyGenerator: (req) => {
   return ipKeyGenerator(req.ip);
  },

  message: {
    success:false,
    message: "Too many attempts . Try again later.",
  },
});

export const passwordResetLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,

  keyGenerator: (req) => req.body?.email || ipKeyGenerator(req.ip),

  message: {
    success:false,
    message: "Too many reset requests. Try again later.",
  },
});