import {
  getBreakdown,
  getTrend,
  getDashboardSummary,
  getEarliestExpenseDate,
} from "./analytics.model.js";

/* ============================= */
/* Determine Trend Interval */
/* ============================= */

function determineInterval(from, to) {
  const fromDate = new Date(from);
  const toDate = new Date(to);

  const diffInDays =
    (toDate - fromDate) / (1000 * 60 * 60 * 24);

  return diffInDays <= 31 ? "day" : "month";
}

/* ============================= */
/* Resolve Date Range */
/* ============================= */

async function resolveDateRange(userId, query) {
  const now = new Date();
  const today = now.toISOString().split("T")[0];

  switch (query.mode) {
    case "overall": {
      const earliest = await getEarliestExpenseDate(userId);

      if (!earliest) {
        return { from: today, to: today };
      }

      return {
        from: earliest.toISOString().split("T")[0],
        to: today,
      };
    }

    case "monthly":
      return {
        from: new Date(query.year, query.month - 1, 1)
          .toISOString()
          .split("T")[0],
        to: new Date(query.year, query.month, 0)
          .toISOString()
          .split("T")[0],
      };

    case "yearly":
      return {
        from: `${query.year}-01-01`,
        to: `${query.year}-12-31`,
      };

    case "custom":
      return {
        from: query.from,
        to: query.to,
      };

    default:
      throw new Error("Invalid mode");
  }
}

/* ============================= */
/* Full Dashboard Service */
/* ============================= */

export async function getFullDashboardService(userId, query) {
  const allowedFields = ["category", "payment_method"];

  if (!allowedFields.includes(query.by)) {
    throw new Error("Invalid breakdown field");
  }

  const { from, to } = await resolveDateRange(userId, query);

  const interval = determineInterval(from, to);

  const [summary, breakdown, trend] = await Promise.all([
    getDashboardSummary(userId, from, to),
    getBreakdown(userId, from, to, query.by),
    getTrend(userId, from, to, interval),
  ]);

  return {
    summary,
    breakdown,
    trend,
    dateRange: { from, to },
  };
}