import { Router } from "express";
import { validateBody, validateQuery } from "../../validators/validate.js";
import { expenseCreateSchema } from "../../validators/expenses/expense.schema.js";
import { expenseCursorQuerySchema } from "../../validators/expenses/expense.query.schema.js";
import { expenseUpdateSchema } from "../../validators/expenses/expense.update.schema.js";
import { expenseExportSchema } from "../../validators/expenses/expense.export.schema.js";
import authMiddleWare from "../../middlewares/auth.middleware.js";

import {
  addExpense,
  editExpense,
  getExpenses,
  removeExpense,
  exportExpenses,
  exportToExcel,
  exportToPdf,
  getCategories,
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

router.get(
  "/export",
  authMiddleWare,
  validateQuery(expenseExportSchema),
  exportExpenses,
);

router.get(
  "/export/excel",
  authMiddleWare,
  validateQuery(expenseExportSchema),
  exportToExcel,
);

router.get(
  "/export/pdf",
  authMiddleWare,
  validateQuery(expenseExportSchema),
  exportToPdf,
);

// get categories api

router.get(
  "/categories",
   authMiddleWare,
   getCategories,
);

export default router;
