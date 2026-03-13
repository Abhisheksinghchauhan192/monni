import axios from "axios";

const API_KEY = process.env.OPENROUTER_API_KEY;

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

export async function callAI({
  message,
  history = [],
  tools = [],
  toolResult = null,
}) {
  const prompt = buildPrompt({
    message,
    history,
    tools,
    toolResult,
  });

  const response = await axios.post(
    OPENROUTER_URL,
    {
      model: "meta-llama/llama-3.1-8b-instruct",
      temperature: 0,
      top_p: 0,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    },
  );

  const text = response.data.choices?.[0]?.message?.content;

  return parseAIResponse(text);
}

function buildPrompt({ message, tools, toolResult }) {
  let prompt = `
You are an AI financial assistant for the MoNNI expense tracker.

You have access to tools.

If the user question requires financial data you MUST respond ONLY with JSON.

Example:

{
 "tool": "getCategoryBreakdown",
 "arguments": {
   "from": "2026-03-01",
   "to": "2026-03-31"
 }
}

Do not explain the tool.
Do not write sentences.

If a tool is not needed respond with:

{
 "reply": "your answer"
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

The following financial data was retrieved:

${JSON.stringify(toolResult, null, 2)}

Analyze the data carefully.

Answer the user's question clearly.

Include:
- the category name
- the total amount
- a short explanation

Example response:

{
 "reply": "Your highest spending category this month is Food with ₹4767."
}

Do NOT call tools.
Return ONLY JSON.
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
    console.log("Error in Parsing Response");
  }

  // Try detecting tool call inside text
  if (text.includes("getCategoryBreakdown")) {
    return {
      tool: "getCategoryBreakdown",
      arguments: {},
    };
  }

  if (text.includes("getDashboardSummary")) {
    return {
      tool: "getDashboardSummary",
      arguments: {},
    };
  }

  if (text.includes("getSpendingTrend")) {
    return {
      tool: "getSpendingTrend",
      arguments: {},
    };
  }

  return {
    reply: text,
  };
}
