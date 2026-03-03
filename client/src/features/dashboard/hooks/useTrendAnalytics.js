import { useMemo } from "react";

/* ============================= */
/* Detect Granularity */
/* ============================= */

function detectGranularity(period) {
  if (!period) return "month";

  // YYYY-MM-DD → day
  if (period.length === 10) return "day";

  // YYYY-MM → month
  return "month";
}

/* ============================= */
/* Format Period Label */
/* ============================= */

function formatPeriod(period, granularity) {
  if (granularity === "month") {
    const [year, month] = period.split("-");
    const date = new Date(year, month - 1);

    return (
      date.toLocaleString("default", { month: "short" }) +
      " '" +
      year.slice(-2)
    );
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

/* ============================= */
/* Generate Full Date Range */
/* ============================= */

function generateFullRange(from, to, granularity) {
  const result = [];
  let current = new Date(from);
  const end = new Date(to);

  while (current <= end) {
    if (granularity === "day") {
      const year = current.getFullYear();
      const month = String(current.getMonth() + 1).padStart(2, "0");
      const day = String(current.getDate()).padStart(2, "0");

      result.push(`${year}-${month}-${day}`);

      current.setDate(current.getDate() + 1);
    } else {
      const year = current.getFullYear();
      const month = String(current.getMonth() + 1).padStart(2, "0");

      result.push(`${year}-${month}`);

      current.setMonth(current.getMonth() + 1);
    }
  }

  return result;
}

/* ============================= */
/* Main Hook */
/* ============================= */

export default function useTrendAnalytics(
  trend = [],
  dateRange,
  viewMode = "normal"
) {
  return useMemo(() => {
    if (!trend || trend.length === 0 || !dateRange)
      return null;

    const granularity = detectGranularity(trend[0].period);

    /* ----------------------------- */
    /* Step 1: Fill Missing Periods  */
    /* ----------------------------- */

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

    /* ----------------------------- */
    /* Step 2: Apply Cumulative Mode */
    /* ----------------------------- */

    let processed = [...filled];

    if (viewMode === "cumulative") {
      let runningTotal = 0;

      processed = filled.map((item) => {
        runningTotal += item.total;

        return {
          ...item,
          total: runningTotal,
        };
      });
    }

    /* ----------------------------- */
    /* Step 3: Calculate Analytics   */
    /* ----------------------------- */

    const total = filled.reduce(
      (sum, item) => sum + item.total,
      0
    );

    const average =
      filled.length > 0 ? total / filled.length : 0;

    const highest = processed.reduce((max, item) =>
      item.total > max.total ? item : max
    );

    const lowest = processed.reduce((min, item) =>
      item.total < min.total ? item : min
    );

    /* ----------------------------- */
    /* Step 4: Enrich For UI         */
    /* ----------------------------- */

    const enriched = processed.map((item) => ({
      ...item,
      label: formatPeriod(item.period, granularity),
      share:
        total > 0
          ? (item.total / total) * 100
          : 0,
      isHighest: item.total === highest.total,
      isLowest: item.total === lowest.total,
    }));

    return {
      granularity,
      data: enriched,
      total,
      average,
      highest,
      lowest,
      from: enriched[0]?.label,
      to: enriched[enriched.length - 1]?.label,
      averageLabel:
        granularity === "day"
          ? "Average per day"
          : "Average per month",
    };
  }, [trend, dateRange, viewMode]);
}