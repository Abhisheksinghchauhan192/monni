import {
  getDashboardSummary,
  getBreakdown,
  getTrend,
  getEarliestExpenseDate,
  getCurrencyDetail,
} from "./analytics.model.js";

export async function generateInsights(userId,timezone) {
  const today = new Date().toISOString().split("T")[0];
  const earliest = await getEarliestExpenseDate(userId);
  const currency = await getCurrencyDetail(userId);
  if (!earliest) {
    return [];
  }

  const from = earliest;
  const to = today;
  const [summary, breakdown, trend] = await Promise.all([
    getDashboardSummary(userId, from, to),
    getBreakdown(userId, from, to, "category"),
    getTrend(userId, from, to, "day",timezone),
  ]);

  const insights = [];

  

  if (breakdown?.length) {
    const top = breakdown[0];

    const percentage = (
      (top.total / summary.total) *
      100
    ).toFixed(1);

    insights.push(
      `${top.label} accounts for ${percentage}% of your total spending.`
    );
  }



  if (summary.highestExpense) {
    insights.push(
      `Your highest single expense was : ${summary.highestExpense} ${currency}.`
    );
  }

 

  if (summary.total && summary.count) {
    const avg = (summary.total / summary.count).toFixed(2);

    insights.push(
      `Your average expense amount is ${avg} ${currency}.`
    );
  }


  if (trend?.length) {
    const highestDay = trend.reduce((max, day) =>
      day.total > max.total ? day : max
    );

    const date = new Date(highestDay.period)
      .toISOString()
      .split("T")[0];

    insights.push(
      `Your highest spending day was ${date} with ${highestDay.total} ${currency}.`
    );
  }

  return insights;
}