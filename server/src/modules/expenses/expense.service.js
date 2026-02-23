import {
  createExpense,
  deleteExpense,
  getExpensesCursor,
  getExpensesForExport,
  updateExpense,
} from "./expense.model.js";

import  ApiError  from "../../errors/ApiError.js";

// Add Expense
export async function addExpenseService(userId, expenseData) {
  const expenseId = await createExpense(userId, expenseData);

  return { expenseId };
}
//Get Expense With Cursor
export async function getExpensesService(userId, queryOptions) {
  return await getExpensesCursor(userId, queryOptions);
}
// Delete Expense
export async function deleteExpenseService(userId, expenseId) {
  await deleteExpense(expenseId, userId);
}

//Update Expense
export async function updateExpenseService(userId, expenseId, updates) {
  const success = await updateExpense(userId, expenseId, updates);

  if (!success) {
    throw new ApiError(404, "Expense Not Found");
  }
}

// Export Expenses Service
export async function getExportExpensesService(userId, from, to) {
  return await getExpensesForExport(userId, from, to);
}
