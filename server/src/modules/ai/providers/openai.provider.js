import OpenAI from "openai";
import { OPENAI_API_KEY } from "../../../config/env.js";
const client = new OpenAI({
  apiKey:OPENAI_API_KEY
});

export async function callOpenAI({
  message,
  history = [],
  tools = [],
  toolResult = null
}) {

  const prompt = buildPrompt({
    message,
    history,
    tools,
    toolResult
  });

  const response = await client.responses.create({
    model: "gpt-4o-mini",
    temperature: 0,
    input: prompt
  });

  const text = response.output_text;

  return parseAIResponse(text);
}

function buildPrompt({ message, tools, toolResult }) {

  let prompt = `
You are an AI financial assistant for the MoNNI expense tracker.

Always respond in JSON.

If a tool is required:

{
 "tool": "tool_name",
 "arguments": {}
}

Otherwise:

{
 "reply": "..."
}
`;

  if (tools.length) {
    prompt += `

Available tools:
${JSON.stringify(tools, null, 2)}
`;
  }

  if (toolResult) {
    prompt += `

Financial data retrieved:

${JSON.stringify(toolResult, null, 2)}

Generate the final answer.

Return JSON only.
`;
  }

  prompt += `

User question:
${message}
`;

  return prompt;
}

function parseAIResponse(text) {

  if (!text) {
    return { reply: "No response generated." };
  }

  try {
    return JSON.parse(text);
  } catch {
    return { reply: text };
  }

}