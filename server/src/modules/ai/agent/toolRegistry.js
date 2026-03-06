import { summaryTool } from "../tools/summary.tool.js";
import { breakdownTool } from "../tools/breakdown.tool.js";
import { trendTool } from "../tools/trend.tool.js";
import { insightsTool } from "../tools/insights.tool.js";

export const toolRegistry = [
  summaryTool,
  breakdownTool,
  trendTool,
  insightsTool
];

export function getToolSchemas() {
  return toolRegistry.map((tool) => ({
    name: tool.name,
    description: tool.description
  }));
}