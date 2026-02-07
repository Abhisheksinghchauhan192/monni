import { Router } from "express";
import {validateBody,validateQuery} from "../../validators/validate.js";
import { expenseCreateSchema } from "../../validators/expenses/expense.schema.js";
import { expenseCursorQuerySchema } from "../../validators/expenses/expense.query.schema.js";
import authMiddleWare from "../../middlewares/auth.middleware.js";
import {
  addExpense,
  getExpenses,
  removeExpense,
} from "./expenses.controller.js";

const router = Router();

// all expense routes will be protected

router.post("/", authMiddleWare, validateBody(expenseCreateSchema),addExpense);
router.get("/", authMiddleWare,validateQuery(expenseCursorQuerySchema), getExpenses);
router.delete("/:id", authMiddleWare, removeExpense);

export default router;
