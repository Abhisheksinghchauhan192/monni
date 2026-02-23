import {
  getTotalSpend,
  getExpenseCount,
  getBreakdown,
  getTrend,
} from "./analytics.model.js";

function determineInterval(from, to) {
  const fromDate = new Date(from);
  const toDate = new Date(to);
  const diffInDays = (toDate - fromDate) / (1000 * 60 * 60 * 24);

  return diffInDays <= 31 ? "day" : "month";
}

// Individual Services

export async function getSummaryService(userId, from, to) {
  const [total, count] = await Promise.all([
    getTotalSpend(userId, from, to),
    getExpenseCount(userId, from, to),
  ]);

  return { total, count };
}

export async function getBreakdownService(userId, from, to, by) {
  return await getBreakdown(userId, from, to, by);
}

export async function getTrendService(userId, from, to, interval) {
  return await getTrend(userId, from, to, interval);
}

// Dashboard Service
export async function getDashboardAnalytics(userId, from, to, breakdownBy) {
  const interval = determineInterval(from, to);

  const [summary, breakdown, trend] = await Promise.all([
    getSummaryService(userId, from, to),
    getBreakdownService(userId, from, to, breakdownBy),
    getTrendService(userId, from, to, interval),
  ]);

  return {
    summary,
    breakdown,
    trend,
  };
}
