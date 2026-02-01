import pool from "../../config/database.js";

export async function createExpense(userId, expense) {
  const {
    expense_date,
    amount,
    category,
    merchant,
    payment_method,
    description,
  } = expense;

  const [result] = await pool.query(
    `INSERT INTO expenses
         (user_id,expense_date,amount,category,merchant,payment_method,description) VALUES (?,?,?,?,?,?,?)
        `,
    [
      userId,
      expense_date,
      amount,
      category,
      merchant,
      payment_method,
      description,
    ],
  );

  return result.insertId;
}

export async function getExpensesByUser(userId) {
  const [rows] = await pool.query(
    `
        SELECT * FROM expenses WHERE user_id = ?
        ORDER BY expense_date DESC
        `,
    [userId],
  );

  return rows;
}

export async function deleteExpense(expenseId, userId) {
  await pool.query(
    `
        DELETE FROM expenses
        WHERE id = ? AND user_id = ? `,
    [expenseId, userId],
  );
}


