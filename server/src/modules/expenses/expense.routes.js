import { Router } from "express";
import validate from "../../validators/validate.js";
import { expenseCreateSchema } from "../../validators/expenses/expense.schema.js";
import authMiddleWare from "../../middlewares/auth.middleware.js";
import {
  addExpense,
  getExpenses,
  removeExpense,
} from "./expenses.controller.js";

const router = Router();

// all expense routes will be protected

router.post("/", authMiddleWare, validate(expenseCreateSchema),addExpense);
router.get("/", authMiddleWare, getExpenses);
router.delete("/:id", authMiddleWare, removeExpense);

export default router;
