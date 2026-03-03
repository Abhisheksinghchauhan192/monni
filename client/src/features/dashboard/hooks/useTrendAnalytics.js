import { useMemo } from "react";

function detectGranularity(period) {
  if (!period) return "month";
  if (period.length === 10) return "day";
  return "month";
}

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

function generateFullRange(from, to, granularity) {
  const result = [];
  let current = new Date(from);
  const end = new Date(to);

  while (current <= end) {
    if (granularity === "day") {
      result.push(current.toISOString().split("T")[0]);
      current.setDate(current.getDate() + 1);
    } else {
      const year = current.getFullYear();
      const month = current.getMonth() + 1;

      result.push(
        `${year}-${String(month).padStart(2, "0")}`
      );

      current.setMonth(current.getMonth() + 1);
    }
  }

  return result;
}

export default function useTrendAnalytics(trend = [], dateRange) {
  return useMemo(() => {
    if (!trend || trend.length === 0 || !dateRange)
      return null;

    const granularity = detectGranularity(trend[0].period);

    const fullRange = generateFullRange(
      dateRange.from,
      dateRange.to,
      granularity
    );

    const trendMap = new Map(
      trend.map((item) => [
        granularity === "day"
          ? item.period
          : item.period.slice(0, 7),
        item.total,
      ])
    );

    const filled = fullRange.map((period) => ({
      period,
      total: trendMap.get(period) || 0,
    }));

    const total = filled.reduce(
      (sum, item) => sum + item.total,
      0
    );

    const highest = filled.reduce((max, item) =>
      item.total > max.total ? item : max
    );

    const lowest = filled.reduce((min, item) =>
      item.total < min.total ? item : min
    );

    const enriched = filled.map((item) => ({
      ...item,
      label: formatPeriod(item.period, granularity),
      share: total > 0 ? (item.total / total) * 100 : 0,
      isHighest: item.total === highest.total,
      isLowest: item.total === lowest.total,
    }));

    return {
      granularity,
      enriched,
      total,
      average: total / filled.length,
      highest,
      lowest,
      from: enriched[0].label,
      to: enriched[enriched.length - 1].label,
      averageLabel:
        granularity === "day"
          ? "Average per day"
          : "Average per month",
    };
  }, [trend, dateRange]);
}