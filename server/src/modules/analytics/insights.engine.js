export function generateInsights({ summary, breakdown, trend }) {
  const insights = [];

  /* Top Category Insight */

  if (summary?.topCategory) {
    insights.push({
      text: `Your highest spending category is ${summary.topCategory}.`,
      score: 5,
    });
  }

  /*  Category Dominance */

  if (breakdown?.length > 0) {
    const total = breakdown.reduce((s, c) => s + c.total, 0);
    const top = breakdown[0];

    const percent = ((top.total / total) * 100).toFixed(0);

    if (percent > 40) {
      insights.push({
        text: `${top.label} accounts for ${percent}% of your spending.`,
        score: 9,
      });
    }
  }

  /* Largest Spending Period */

  if (trend?.length > 0) {
    const max = trend.reduce((a, b) =>
      a.total > b.total ? a : b
    );

    insights.push({
      text: `Your highest spending period was ${max.period} with ₹${max.total}.`,
      score: 8,
    });
  }

  /* Spending Growth */

  if (trend?.length >= 2) {
    const latest = trend[trend.length - 1];
    const previous = trend[trend.length - 2];

    if (previous.total > 0) {
      const change =
        ((latest.total - previous.total) / previous.total) *
        100;

      if (Math.abs(change) > 20) {
        insights.push({
          text: `Spending changed by ${change.toFixed(
            0
          )}% compared to the previous period.`,
          score: 7,
        });
      }
    }
  }

  /* Sort Insights by Score */

  insights.sort((a, b) => b.score - a.score);

  return insights.slice(0, 3).map((i) => i.text);
}