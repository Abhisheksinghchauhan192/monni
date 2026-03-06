import express from "express";
import authMiddleWare from "../../middlewares/auth.middleware.js";
import {authRateLimiter} from "../../middlewares/rateLimit.middleware.js";
import {chat} from "./ai.controller.js";

const router = express.Router();

router.post(
    "/chat",
    authMiddleWare,
    authRateLimiter(30),
    chat
);

export default router;