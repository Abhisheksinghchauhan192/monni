import { getFullDashboardService } from "./analytics.service.js";
import { generateInsights } from "./analytics.insights.service.js";
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


export async function getInsightsController(req, res) {
  const userId = req.user.id;
  const insights = await generateInsights(userId);

  res.json({
    success: true,
    insights,
  });
}