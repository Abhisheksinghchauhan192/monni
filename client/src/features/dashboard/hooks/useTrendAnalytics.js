import { useMemo } from "react";

/**
 * Detect whether backend returned:
 * YYYY-MM  -> month granularity
 * YYYY-MM-DD -> day granularity
 */
function detectGranularity(period) {
  if (!period) return "month";
  if (period.length === 10) return "day";
  return "month";
}

/**
 * Format period for display
 */
function formatPeriod(period, granularity) {
  if (granularity === "month") {
    const [year, month] = period.split("-");
    const date = new Date(year, month - 1);

    return date.toLocaleString("default", {
      month: "short",
    }) + " '" + year.slice(-2);
  }

  if (granularity === "day") {
    const date = new Date(period);
    return date.toLocaleDateString("default", {
      day: "2-digit",
      month: "short",
    });
  }

  return period;
}

export default function useTrendAnalytics(trend = []) {
  return useMemo(() => {
    if (!trend || trend.length === 0) return null;

    const granularity = detectGranularity(trend[0].period);

    const sorted = [...trend].sort(
      (a, b) => new Date(a.period) - new Date(b.period)
    );

    const total = sorted.reduce((sum, item) => sum + item.total, 0);

    const highest = sorted.reduce((max, item) =>
      item.total > max.total ? item : max
    );

    const lowest = sorted.reduce((min, item) =>
      item.total < min.total ? item : min
    );

    const enriched = sorted.map((item) => {
      const share = total > 0 ? (item.total / total) * 100 : 0;

      return {
        ...item,
        label: formatPeriod(item.period, granularity),
        share,
        isHighest: item.total === highest.total,
        isLowest: item.total === lowest.total,
      };
    });

    const averageLabel =
      granularity === "day"
        ? "Average per day"
        : "Average per month";

    return {
      granularity,
      enriched,
      total,
      average: total / sorted.length,
      highest,
      lowest,
      averageLabel,
      from: enriched[0].label,
      to: enriched[enriched.length - 1].label,
    };
  }, [trend]);
}