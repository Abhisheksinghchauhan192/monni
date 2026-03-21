import {
  getBreakdown,
  getTrend,
  getDashboardSummary,
  getEarliestExpenseDate,
} from "./analytics.model.js";

/* Determine Trend Interval */

function determineInterval(from, to) {
  const fromDate = new Date(from);
  const toDate = new Date(to);

  const diffInDays = (toDate - fromDate) / (1000 * 60 * 60 * 24);

  return diffInDays <= 31 ? "day" : "month";
}

/* timezone conveerter to UTC for DB */
function convertToUTC(date, timezone, end = false) {
  const time = end ? "23:59:59" : "00:00:00";

  const local = new Date(`${date}T${time}`);

  const utc = new Date(
    local.toLocaleString("en-US", { timeZone: "UTC" })
  );

  return utc.toISOString().slice(0, 19).replace("T", " ");
}

/* Resolve Date Range */

async function resolveDateRange(userId, query) {
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];

  switch (query.mode) {
    case "overall": {
      const earliest = await getEarliestExpenseDate(userId);

      if (!earliest) {
        return { from: todayStr, to: todayStr };
      }

      return {
        from: convertToUTC(earliest,query.timezone),
        to: convertToUTC(todayStr,query.timezone,true),
      };
    }

    case "monthly": {
      const year = Number(query.year);
      const month = Number(query.month);

      const from = `${year}-${String(month).padStart(2, "0")}-01`;

      const lastDay = new Date(year, month, 0).getDate();

      const to = `${year}-${String(month).padStart(2, "0")}-${lastDay}`;

      return { from:convertToUTC(from,query.timezone), to:convertToUTC(to,query.timezone,true) };
    }

    case "yearly":
      return {
        from: `${query.year}-01-01`,
        to: `${query.year}-12-31`,
      };

    case "custom":
      return {
        from: convertToUTC(query.from,query.timezone),
        to: convertToUTC(query.to,query.timezone,true),
      };

    default:
      throw new Error("Invalid mode");
  }
}
/* Full Dashboard Service */

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
    getTrend(userId, from, to, interval,query.timezone),
  ]);

  return {
    summary,
    breakdown,
    trend,
  };
}
