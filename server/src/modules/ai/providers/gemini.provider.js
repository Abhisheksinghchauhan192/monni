import axios from "axios";
import {GEMINI_API_KEY} from "../../../config/env.js";

let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 1200;

const GEMINI_URL ="https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent"


const API_KEY = GEMINI_API_KEY;

/*
-----------------------------------------
MAIN ENTRY FUNCTION
-----------------------------------------
*/

export async function callGemini({
  message,
  history = [],
  tools = [],
  toolResult = null,
}) {
  if (toolResult) {
    toolResult = trimToolResult(toolResult);
  }

  const prompt = buildPrompt({
    message,
    history,
    tools,
    toolResult,
  });

  const payload = {
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
  };

  const data = await requestGemini(payload);

  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

  return parseAIResponse(text);
}

/*
-----------------------------------------
REQUEST WITH RETRY (Fixes 429 Errors)
-----------------------------------------
*/

async function requestGemini(payload, retries = 3) {
  const now = Date.now();
  const timeSinceLast = now - lastRequestTime;

  if (timeSinceLast < MIN_REQUEST_INTERVAL) {
    await new Promise((r) =>
      setTimeout(r, MIN_REQUEST_INTERVAL - timeSinceLast),
    );
  }

  lastRequestTime = Date.now();

  try {
    const response = await axios.post(`${GEMINI_URL}?key=${API_KEY}`, payload, {
      headers: { "Content-Type": "application/json" },
    });

    return response.data;
  } catch (error) {
    const status = error.response?.status;

    if ((status === 429 || status === 503) && retries > 0) {
      console.warn("Gemini rate limited. Retrying...");

      await new Promise((r) => setTimeout(r, 2000));

      return requestGemini(payload, retries - 1);
    }

    throw error;
  }
}

/*
-----------------------------------------
PROMPT BUILDER
-----------------------------------------
*/

function buildPrompt({ message, history, tools, toolResult }) {
  history = trimHistory(history);
  let prompt = `
You are an AI financial assistant for the MoNNI expense tracker.

Your job is to help users understand their spending.

Rules:
- Use tools when financial data is required
- Do NOT invent financial numbers
- Only use provided tool results
- If a tool is needed respond ONLY in JSON
`;

  /*
  -------------------------
  Conversation history
  -------------------------
  */

  if (history.length) {
    prompt += `

Conversation history:
`;

    history.forEach((msg) => {
      prompt += `${msg.role}: ${msg.content}\n`;
    });
  }

  /*
  -------------------------
  Tools section
  -------------------------
  */

  if (tools.length) {
    prompt += `

Available tools:
${JSON.stringify(tools, null, 2)}

If a tool is needed respond ONLY with:

{
  "tool": "tool_name",
  "arguments": {}
}

Otherwise respond:

{
  "reply": "your response"
}
`;
  }

  /*
  -------------------------
  Tool Result section
  -------------------------
  */

  if (toolResult) {
    prompt += `

Tool result:
${JSON.stringify(toolResult, null, 2)}

Use this data to answer the user.
Return ONLY JSON:

{
  "reply": "your answer"
}
`;
  }

  /*
  -------------------------
  User Question
  -------------------------
  */

  prompt += `

User question:
${message}
`;

  return prompt;
}

/*
-----------------------------------------
AI RESPONSE PARSER
-----------------------------------------
*/

function parseAIResponse(text) {
  if (!text) {
    return {
      reply: "Sorry, I couldn't generate a response.",
      suggestions: [],
    };
  }

  try {
    const parsed = JSON.parse(text);

    return parsed;
  } catch {
    return {
      reply: text,
      suggestions: [],
    };
  }
}

function trimHistory(history = []) {
  const MAX_MESSAGES = 6;

  if (history.length <= MAX_MESSAGES) {
    return history;
  }

  return history.slice(-MAX_MESSAGES);
}

function trimToolResult(result) {
  if (Array.isArray(result) && result.length > 20) {
    return result.slice(-20);
  }

  return result;
}
