import { getFullDashboardService } from "./analytics.service.js";
import { generateInsights } from "./insights.engine.js";
import { getDashboardSummary, getBreakdown, getTrend } from "./analytics.model.js";

export async function dashboard(req, res, next) {
  try {
    const userId = req.user.id;
    const query = req.validatedQuery;

    const data = await getFullDashboardService(userId, query);

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    next(err);
  }
}



export const getInsights = async (req, res) => {
  const userId = req.user.id;

  const from = req.query.from;
  const to = req.query.to;

  const [summary, breakdown, trend] = await Promise.all([
    getDashboardSummary(userId, from, to),
    getBreakdown(userId, from, to, "category"),
    getTrend(userId, from, to, "month"),
  ]);

  const insights = generateInsights({
    summary,
    breakdown,
    trend,
  });

  res.json({
    success: true,
    insights,
  });
};