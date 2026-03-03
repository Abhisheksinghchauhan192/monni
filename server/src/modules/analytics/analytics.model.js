import pool from "../../config/database.js";

/* ============================= */
/* Breakdown */
/* ============================= */

export async function getBreakdown(userId, from, to, by) {
  const query = `
    SELECT ${by} AS label,
           SUM(amount) AS total
    FROM expenses
    WHERE user_id = ?
      AND expense_date BETWEEN ? AND ?
    GROUP BY ${by}
    ORDER BY total DESC
  `;

  const [rows] = await pool.query(query, [userId, from, to]);

  return rows.map((row) => ({
    label: row.label,
    total: Number(row.total),
  }));
}

/* ============================= */
/* Trend */
/* ============================= */

export async function getTrend(userId, from, to, interval) {
  const groupExpr =
    interval === "day" ? "expense_date" : "DATE_FORMAT(expense_date, '%Y-%m')";

  const query = `
    SELECT ${groupExpr} AS period,
           SUM(amount) AS total
    FROM expenses
    WHERE user_id = ?
      AND expense_date >= ?
      AND expense_date <= ?
    GROUP BY period
    ORDER BY period ASC
  `;

  const [rows] = await pool.query(query, [userId, from, to]);

  return rows.map((row) => ({
    period: row.period,
    total: Number(row.total),
  }));
}

/* ============================= */
/* Dashboard Summary */
/* ============================= */

export async function getDashboardSummary(userId, from, to) {
  // Current period
  const [[summary]] = await pool.query(
    `
    SELECT 
      COALESCE(SUM(amount),0) AS total,
      COUNT(*) AS count,
      COALESCE(MAX(amount),0) AS highestExpense
    FROM expenses
    WHERE user_id = ?
      AND expense_date BETWEEN ? AND ?
    `,
    [userId, from, to],
  );

  // Top Category (by total spend)
  const [[topCategoryRow]] = await pool.query(
    `
    SELECT category
    FROM expenses
    WHERE user_id = ?
      AND expense_date BETWEEN ? AND ?
    GROUP BY category
    ORDER BY SUM(amount) DESC
    LIMIT 1
    `,
    [userId, from, to],
  );

  const topCategory = topCategoryRow?.category || null;

  // Growth calculation
  const start = new Date(from);
  const end = new Date(to);

  const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

  const prevStart = new Date(start);
  prevStart.setDate(prevStart.getDate() - diffDays - 1);

  const prevEnd = new Date(start);
  prevEnd.setDate(prevEnd.getDate() - 1);

  const [[previous]] = await pool.query(
    `
    SELECT COALESCE(SUM(amount),0) AS total
    FROM expenses
    WHERE user_id = ?
      AND expense_date BETWEEN ? AND ?
    `,
    [userId, prevStart, prevEnd],
  );

  const prevTotal = Number(previous.total);
  const currentTotal = Number(summary.total);

  let growthPercentage = 0;

  if (prevTotal > 0) {
    growthPercentage = ((currentTotal - prevTotal) / prevTotal) * 100;
  }

  return {
    total: currentTotal,
    count: Number(summary.count),
    highestExpense: Number(summary.highestExpense),
    topCategory,
    growthPercentage: Number(growthPercentage.toFixed(2)),
  };
}

export async function getEarliestExpenseDate(userId) {
  const [[row]] = await pool.query(
    `
    SELECT MIN(expense_date) AS earliest
    FROM expenses
    WHERE user_id = ?
    `,
    [userId],
  );

  return row.earliest || null;
}
