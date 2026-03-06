import { runAgent } from "./agent/agent.service.js";

import { createAIResponse } from "./utils/aiResponse.js";

export async function chat(req, res, next) {
  try {

    const { message, history } = req.body;
    const userId = req.user.id;

    const aiResult = await runAgent({
      message,
      history,
      userId
    });

    const response = createAIResponse({
      reply: aiResult.reply || "I'm not sure how to answer that yet.",
      data: aiResult.data || null,
      suggestions: aiResult.suggestions || [],
      warning: "AI responses may occasionally be inaccurate."
    });

    res.json(response);

  } catch (error) {

    res.json(
      createAIResponse({
        reply:
          "Something went wrong while processing your request.",
        warning: "AI assistant is currently experimental."
      })
    );

  }
}