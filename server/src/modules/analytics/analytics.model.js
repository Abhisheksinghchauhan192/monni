import pool from "../../config/database.js";

// Total Spend
export async function getTotalSpend(userId, from, to) {
  let query = `
    SELECT COALESCE(SUM(amount), 0) AS total
    FROM expenses
    WHERE user_id = ?
  `;
  const params = [userId];

  if (from) {
    query += " AND expense_date >= ?";
    params.push(from);
  }

  if (to) {
    query += " AND expense_date <= ?";
    params.push(to);
  }

  const [[row]] = await pool.query(query, params);
  return row.total;
}

// Expense Count
export async function getExpenseCount(userId, from, to) {
  let query = `
    SELECT COUNT(*) AS count
    FROM expenses
    WHERE user_id = ?
  `;
  const params = [userId];

  if (from) {
    query += " AND expense_date >= ?";
    params.push(from);
  }

  if (to) {
    query += " AND expense_date <= ?";
    params.push(to);
  }

  const [[row]] = await pool.query(query, params);
  return row.count;
}

// Flexible Breakdown (category OR payment_method)
export async function getBreakdown(userId, from, to, by) {
  const allowedFields = ["category", "payment_method"];
  if (!allowedFields.includes(by)) {
    throw new Error("Invalid breakdown field");
  }

  let query = `
    SELECT ${by} AS label, SUM(amount) AS total
    FROM expenses
    WHERE user_id = ?
  `;
  const params = [userId];

  if (from) {
    query += " AND expense_date >= ?";
    params.push(from);
  }

  if (to) {
    query += " AND expense_date <= ?";
    params.push(to);
  }

  query += `
    GROUP BY ${by}
    ORDER BY total DESC
  `;

  const [rows] = await pool.query(query, params);
  return rows;
}

// Trend
export async function getTrend(userId, from, to, interval) {
  const groupExpr =
    interval === "day"
      ? "DATE(expense_date)"
      : "DATE_FORMAT(expense_date, '%Y-%m')";

  const [rows] = await pool.query(
    `
    SELECT
      ${groupExpr} AS period,
      SUM(amount) AS total
    FROM expenses
    WHERE user_id = ?
      AND expense_date BETWEEN ? AND ?
    GROUP BY period
    ORDER BY period ASC
    `,
    [userId, from, to],
  );

  return rows;
}
