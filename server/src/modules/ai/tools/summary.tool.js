import { getDashboardSummary } from "../../analytics/analytics.model.js";


export const summaryTool = {
  name: "getDashboardSummary",

  description: `
  Get overall financial summary including total spending,
  expense count, highest expense, top category and growth percentage
  for a specific date range.
  `,

  parameters: {
    type: "object",
    properties: {
      from: {
        type: "string",
        description: "Start date of the period (YYYY-MM-DD)"
      },
      to: {
        type: "string",
        description: "End date of the period (YYYY-MM-DD)"
      }
    },
    required: ["from", "to"]
  },

  execute: async ({ userId, from, to }) => {
    return await getDashboardSummary(userId, from, to);
  }
};