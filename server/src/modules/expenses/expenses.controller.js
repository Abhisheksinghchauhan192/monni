import {
  createExpense,
  deleteExpense,
  getExpensesByUser,
  getExpensesCursor,
} from "./expense.model.js";

// POST API : /api/expenses

export async function addExpense(req, res, next) {
  try {
    const userId = req.user.id; // From JWT TOKEN
    const expenseData = req.body;

    const expenseId = await createExpense(userId, expenseData);

    res.status(201).json({
      success: true,
      message: "expense added successfully",
      data: { expenseId },
    });
  } catch (err) {
    next(err);
  }
}

// GET API /api/expenses

export async function getExpenses(req, res, next) {
  try {
    const userId = req.user.id;

    const result = await getExpensesCursor(userId, req.validatedQuery);

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (err) {
    next(err);
  }
}

// DELETE: api/expeneses/:id
export async function removeExpense(req, res, next) {
  try {
    const userId = req.user.id;
    const expenseId = req.params.id;

    await deleteExpense(expenseId, userId);

    res.status(200).json({
      status: true,
      message: "expense deleted successfully",
    });
  } catch (err) {
    next(err);
  }
}
