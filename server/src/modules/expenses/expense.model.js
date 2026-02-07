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

export async function getExpensesCursor(userId, options) {
  const { limit, cursor, category, payment_method, fromDate, toDate } = options;

  let query = `
  SELECT * FROM expenses
  WHERE user_id = ?
  `;
  const params = [userId];

  // Cursor Logic ..
  if (cursor) {
    query += "AND id < ?";
    params.push(cursor);
  }

  // Filters
  if (category) {
    query += "AND category = ?";
    params.push(category);
  }
  if (payment_method) {
    query += "AND payment_method = ?";
    params.push(payment_method);
  }
  if (fromDate) {
    query += "AND expense_date >= ?";
    params.push(fromDate);
  }
  if (toDate) {
    query += "AND expense_date <= ?";
    params.push(toDate);
  }

  // Order + limit
  query += `
  ORDER BY id DESC
  LIMIT ?`;
  params.push(limit);

  const [rows] = await pool.query(query, params);

  // Determine Next Cursor

  const nextCursor = rows.length === limit ? rows[rows.length - 1].id : null;

  return {
    data: rows,
    nextCursor,
    hasMore: rows.length === limit,
  };
}
