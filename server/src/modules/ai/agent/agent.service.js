import { getToolSchemas } from "./toolRegistry.js";
import { executeTool } from "./toolExecutor.js";
// import { callGemini } from "../providers/gemini.provider.js";
import { callAI } from "../providers/openrouter.provider.js";
// import { callOpenAI } from "../providers/openai.provider.js";
import { validateToolCall } from "../utils/toolValidator.js";
export async function runAgent({ message, history, userId }) {
  const tools = getToolSchemas();


  const decision = await callAI({
    message,
    history,
    tools,
  });

  if (decision.tool && validateToolCall(decision)) {
    const toolResult = await executeTool(
      decision.tool,
      decision.arguments || {},
      { userId },
    );


    const finalResponse = await callAI({
      message,
      history,
      toolResult,
    });

    return finalResponse;
  } else {
    return {
      reply:
        "I'm not sure how to process that financial query yet. Try asking about spending, categories, or trends.",
    };
  }

  return decision;
}
