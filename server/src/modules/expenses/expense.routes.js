import { Router } from "express";
import { validateBody, validateQuery } from "../../validators/validate.js";
import { expenseCreateSchema } from "../../validators/expenses/expense.schema.js";
import { expenseCursorQuerySchema } from "../../validators/expenses/expense.query.schema.js";
import authMiddleWare from "../../middlewares/auth.middleware.js";
import { expenseUpdateSchema } from "../../validators/expenses/expense.update.schema.js";
import {
  addExpense,
  editExpense,
  getExpenses,
  removeExpense,
} from "./expenses.controller.js";

const router = Router();

// all expense routes will be protected

router.post("/", authMiddleWare, validateBody(expenseCreateSchema), addExpense);
router.get(
  "/",
  authMiddleWare,
  validateQuery(expenseCursorQuerySchema),
  getExpenses,
);
router.delete("/:id", authMiddleWare, removeExpense);
router.put(
  "/:id",
  authMiddleWare,
  validateBody(expenseUpdateSchema),
  editExpense,
);

export default router;
