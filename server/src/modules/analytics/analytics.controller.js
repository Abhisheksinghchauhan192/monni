import { getFullDashboardService } from "./analytics.service.js";

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