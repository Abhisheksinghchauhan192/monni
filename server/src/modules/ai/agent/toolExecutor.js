import { toolRegistry } from "./toolRegistry.js";

export async function executeTool(toolName, args, context) {
  const tool = toolRegistry.find((t) => t.name === toolName);

  if (!tool) {
    throw new Error(`Unknown tool: ${toolName}`);
  }

  try {
    const result = await tool.execute({
      ...args,
      ...context
    });

    return result;
  } catch (error) {
    console.error("Tool execution error:", error);
    throw new Error(`Failed executing tool: ${toolName}`, { cause: error });
  }
}