import { useMemo } from "react";

/* ============================= */
/* Detect Granularity */
/* ============================= */

function detectGranularity(period) {
  if (!period) return "month";
  if (period.length === 10) return "day";
  return "month";
}

/* ============================= */
/* Format Period */
/* ============================= */

function formatPeriod(period, granularity) {
  if (granularity === "month") {
    const [y, m] = period.split("-").map(Number);
    const d = new Date(y, m - 1);

    return (
      d.toLocaleString("default", { month: "short" }) +
      " '" +
      y.toString().slice(-2)
    );
  }

  if (granularity === "day") {
    const [y, m, d] = period.split("-").map(Number);
    const date = new Date(y, m - 1, d);

    return date.toLocaleDateString("default", {
      day: "2-digit",
      month: "short",
    });
  }

  return period;
}

/* ============================= */
/* Range from Filter */
/* ============================= */

function getRangeFromFilter(filter, trend) {
  if (!filter) return null;

  if (filter.mode === "overall") {
    if (!trend.length) return null;

    const sorted = [...trend].sort(
      (a, b) => new Date(a.period) - new Date(b.period),
    );

    return {
      from: new Date(sorted[0].period),
      to: new Date(sorted[sorted.length - 1].period),
    };
  }

  if (filter.mode === "monthly") {
    const year = Number(filter.year);
    const month = Number(filter.month);

    return {
      from: new Date(year, month - 1, 1),
      to: new Date(year, month, 0),
    };
  }

  if (filter.mode === "yearly") {
    const year = Number(filter.year);

    return {
      from: new Date(year, 0, 1),
      to: new Date(year, 11, 31),
    };
  }

  if (filter.mode === "custom") {
    if (!filter.fromDate || !filter.toDate) return null;

    return {
      from: new Date(filter.fromDate),
      to: new Date(filter.toDate),
    };
  }

  return null;
}

/* ============================= */
/* Generate Range */
/* ============================= */

function generateFullRange(from, to, granularity) {
  const result = [];
  const current = new Date(from);
  const end = new Date(to);

  while (current <= end) {
    if (granularity === "day") {
      const y = current.getFullYear();
      const m = String(current.getMonth() + 1).padStart(2, "0");
      const d = String(current.getDate()).padStart(2, "0");

      result.push(`${y}-${m}-${d}`);
      current.setDate(current.getDate() + 1);
    } else {
      const y = current.getFullYear();
      const m = String(current.getMonth() + 1).padStart(2, "0");

      result.push(`${y}-${m}`);
      current.setMonth(current.getMonth() + 1);
    }
  }

  return result;
}

/* ============================= */
/* MAIN HOOK */
/* ============================= */

export default function useTrendAnalytics(
  trend = [],
  filter,
  viewMode = "normal",
) {
  return useMemo(() => {
    if (!trend || trend.length === 0 || !filter) {
      return null; //prevent crash
    }

    const granularity = detectGranularity(trend[0]?.period);

    const range = getRangeFromFilter(filter, trend);
    if (!range) return null;

    const fullRange = generateFullRange(range.from, range.to, granularity);

    const trendMap = new Map(
      trend.map((item) => [
        granularity === "day" ? item.period : item.period.slice(0, 7),
        item.total,
      ]),
    );

    const filled = fullRange.map((period) => ({
      period,
      total: trendMap.get(period) || 0,
    }));

    if (filled.length === 0) return null;

    let processed = [...filled];

    if (viewMode === "cumulative") {
      let runningTotal = 0;

      processed = filled.map((item) => {
        runningTotal += item.total;
        return { ...item, total: runningTotal };
      });
    }

    const total = filled.reduce((sum, i) => sum + i.total, 0);

    const average = filled.length ? total / filled.length : 0;

    
    // filter only real data (exclude 0s)
    const nonZeroData = filled.filter((item) => item.total > 0);
    
    const highest =
      nonZeroData.length > 0
        ? nonZeroData.reduce((max, item) =>
            item.total > max.total ? item : max
          )
        : { total: 0 };
        
    // fallback if everything is 0
    const lowest =
      nonZeroData.length > 0
        ? nonZeroData.reduce((min, item) =>
            item.total < min.total ? item : min,
          )
        : { total: 0 };

    const enriched = processed.map((item) => ({
      ...item,
      label: formatPeriod(item.period, granularity),
      share: total > 0 ? (item.total / total) * 100 : 0,
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
        granularity === "day" ? "Average per day" : "Average per month",
    };
  }, [trend, filter, viewMode]);
}
