import axios from "axios";

import { detectIntent, extractDateRange } from "./ai.intent.js";
import { buildPrompt } from "./ai.prompt.js";
import { fetchAIContext } from "./ai.tools.js";

/* Gemini API Call (with retry) */




async function callGemini(prompt, retries = 2) {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }
    );

    return response.data;
  } catch (err) {
    const status = err?.response?.status;

    // retry if temporary overload
    if (status === 503 && retries > 0) {
      console.log("Gemini overloaded, retrying...");
      await new Promise((r) => setTimeout(r, 1500));
      return callGemini(prompt, retries - 1);
    }

    console.error("Gemini API Error:", err?.response?.data || err.message);
    throw err;
  }
}


function parseAIResponse(text) {
  if (!text) {
    return {
      reply: "I couldn't generate a response.",
      suggestions: [],
    };
  }

  const parts = text.split("Suggestions:");

  const reply = parts[0]?.trim();

  let suggestions = [];

  if (parts[1]) {
    suggestions = parts[1]
      .split("\n")
      .map((s) => s.replace(/^\d+\.\s*/, "").trim())
      .filter(Boolean)
      .slice(0, 3);
  }

  return { reply, suggestions };
}


export async function processAIChat({
  userId,
  message,
  history = [],
}) {

  const intent = detectIntent(message);


  const dateRange = extractDateRange(message);

  const from = dateRange?.from;
  const to = dateRange?.to;


  const context = await fetchAIContext(
    userId,
    intent,
    from,
    to
  );


  const prompt = buildPrompt({
    message,
    history,
    context,
  });


  const gemini = await callGemini(prompt);

  const aiText =
    gemini?.candidates?.[0]?.content?.parts?.[0]?.text || "";


  const { reply, suggestions } = parseAIResponse(aiText);


  return {
    reply,
    suggestions:
      suggestions.length > 0
        ? suggestions
        : [
            "Why did my spending increase?",
            "Which category costs the most?",
            "When did I spend the most?",
          ],
  };
}


