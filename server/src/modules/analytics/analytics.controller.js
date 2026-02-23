import {
  getSummaryService,
  getBreakdownService,
  getTrendService,
  getDashboardAnalytics,
} from "./analytics.service.js";

// /summary
export async function summary(req, res, next) {
  try {
    const userId = req.user.id;
    const { from, to } = req.validatedQuery;

    const data = await getSummaryService(userId, from, to);

    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

// /breakdown
export async function breakdown(req, res, next) {
  try {
    const userId = req.user.id;
    const { from, to, by } = req.validatedQuery;

    const data = await getBreakdownService(userId, from, to, by);

    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

// /trend
export async function trend(req, res, next) {
  try {
    const userId = req.user.id;
    const { from, to, interval } = req.validatedQuery;

    const data = await getTrendService(userId, from, to, interval);

    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

// /dashboard
export async function dashboard(req, res, next) {
  try {
    const userId = req.user.id;
    const { from, to, by } = req.validatedQuery;

    const data = await getDashboardAnalytics(userId, from, to, by);

    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}
