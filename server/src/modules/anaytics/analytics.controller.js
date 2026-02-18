import { getTotalSpend, getBreakdown, getTrend } from "./analytics.model.js";

export async function summary(req, res, next) {
  try {
    const userId = req.user.id;
    const { from, to } = req.validatedQuery;

    const total = await getTotalSpend(userId, from, to);

    res.json({ success: true, total });
  } catch (err) {
    next(err);
  }
}

export async function breakdown(req, res, next) {
  try {
    const userId = req.user.id;
    const { from, to, by } = req.validatedQuery;

    const data = await getBreakdown(userId, from, to, by);

    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

export async function trend(req, res, next) {
  try {
    const userId = req.user.id;
    const { from, to, interval } = req.validatedQuery;

    const data = await getTrend(userId, from, to, interval);

    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}
