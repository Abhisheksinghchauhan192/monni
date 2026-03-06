import { generateInsights } from "../../analytics/analytics.insights.service.js";

export const insightsTool = {
  name: "getAutoInsights",

  description: `
  Get automatic financial insights generated from the user's expenses.
  Use when the user asks for insights, analysis, or spending patterns.
  `,

  parameters: {
    type: "object",
    properties: {}
  },

  execute: async ({ userId }) => {
    const insights = await generateInsights(userId);
    return insights;
  }
};