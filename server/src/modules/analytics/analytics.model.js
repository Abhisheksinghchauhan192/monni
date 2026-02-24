import pool from "../../config/database.js";

// ================= SUMMARY =================
export async function getTotalSpend(userId, from, to) {
  let query = `
    SELECT COALESCE(SUM(amount), 0) AS total,
           COUNT(*) AS count
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

  return {
    total: Number(row.total),
    count: Number(row.count),
  };
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

/// ================= BREAKDOWN =================
export async function getBreakdown(userId, from, to, by) {
  let query = `
    SELECT ${by} AS label,
           SUM(amount) AS total
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

  return rows.map((row) => ({
    label: row.label,
    total: Number(row.total),
  }));
}

// ================= TREND =================
export async function getTrend(userId, from, to, interval) {
  const groupExpr =
    interval === "day"
      ? "DATE(expense_date)"
      : "DATE_FORMAT(expense_date, '%Y-%m')";

  let query = `
    SELECT ${groupExpr} AS period,
           SUM(amount) AS total
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
    GROUP BY period
    ORDER BY period ASC
  `;

  const [rows] = await pool.query(query, params);

  return rows.map((row) => ({
    period: row.period,
    total: Number(row.total),
  }));
}
