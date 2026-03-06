import { getTrend } from "../../analytics/analytics.model.js";

export const trendTool = {
  name: "getSpendingTrend",

  description: `
  Get spending trend over time.
  Useful for identifying daily or monthly spending patterns.
  `,

  parameters: {
    type: "object",
    properties: {
      from: {
        type: "string",
        description: "Start date (YYYY-MM-DD)"
      },
      to: {
        type: "string",
        description: "End date (YYYY-MM-DD)"
      },
      interval: {
        type: "string",
        description: "Aggregation interval",
        enum: ["day", "month"]
      }
    },
    required: ["from", "to"]
  },

  execute: async ({ userId, from, to, interval = "day" }) => {
    return await getTrend(userId, from, to, interval);
  }
};