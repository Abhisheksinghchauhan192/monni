import { Router } from "express";
import authRoutes from "./modules/auth/auth.routes.js";
import expenseRoutes from "./modules/expenses/expense.routes.js";
import analyticsRoutes from "./modules/analytics/analytics.routes.js";
import aiRoutes from "./modules/ai/ai.routes.js";
import userRoutes from "./modules/users/user.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/expenses", expenseRoutes);
router.use("/analytics", analyticsRoutes);
router.use("/ai", aiRoutes);
router.use("/users", userRoutes);

export default router;
