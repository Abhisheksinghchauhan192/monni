import express from "express";
import authMiddleWare from "../../middlewares/auth.middleware.js";
import {authRateLimiter} from "../../middlewares/rateLimit.middleware.js";
import {chatWithAI} from "./ai.controller.js";

const router = express.Router();

router.post(
    "/chat",
    authMiddleWare,
    authRateLimiter(30),
    chatWithAI
);

export default router;