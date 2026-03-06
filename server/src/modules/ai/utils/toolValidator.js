const allowedTools = [
  "getCategoryBreakdown",
  "getDashboardSummary",
  "getSpendingTrend",
  "getAutoInsights"
];

export function validateToolCall(decision) {

  if (!decision.tool) return false;

  if (!allowedTools.includes(decision.tool)) {
    return false;
  }

  if (!decision.arguments) {
    decision.arguments = {};
  }

  return true;
}