import { getBreakdown } from "../../analytics/analytics.model.js";

export const breakdownTool = {
  name: "getCategoryBreakdown",

  description: `
  Get category-wise breakdown of spending within a date range.
  Useful for identifying which category has the highest spending.
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
      by: {
        type: "string",
        description: "Field used for grouping such as category and payment method",
        enum: ["category","payment_method"]
      }
    },
    required: ["from", "to"]
  },

  execute: async ({ userId, from, to, by = "category" }) => {
    return await getBreakdown(userId, from, to, by);
  }
};