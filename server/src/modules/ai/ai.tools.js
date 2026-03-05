import {
  getDashboardSummary,
  getBreakdown,
  getTrend,
} from "../analytics/analytics.model.js";

export async function fetchAIContext(userId, intent, from, to) {

  const context = {};

  switch (intent) {

    case "breakdown":
      context.breakdown = await getBreakdown(
        userId,
        from,
        to,
        "category"
      );
      break;

    case "trend":
      context.trend = await getTrend(
        userId,
        from,
        to,
        "month"
      );
      break;

    case "summary":
      context.summary = await getDashboardSummary(
        userId,
        from,
        to
      );
      break;

    case "spike":
      context.summary = await getDashboardSummary(
        userId,
        from,
        to
      );

      context.breakdown = await getBreakdown(
        userId,
        from,
        to,
        "category"
      );

      context.trend = await getTrend(
        userId,
        from,
        to,
        "month"
      );

      break;

    default:
      context.summary = await getDashboardSummary(
        userId,
        from,
        to
      );
  }

  return context;
}