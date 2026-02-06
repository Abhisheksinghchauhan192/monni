import { Router } from "express";
import authRoutes from "./modules/auth/auth.routes.js";
import expenseRoutes from "./modules/expenses/expense.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/expenses",expenseRoutes);


export default router;
