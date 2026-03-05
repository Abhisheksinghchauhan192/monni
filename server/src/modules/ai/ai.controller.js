import asyncHandler from "../../utils/asyncHandler.js";
import { processAIChat } from "./ai.service.js";

export const chatWithAI = asyncHandler(async (req, res) => {
  const { message, history } = req.body;

  const userId = req.user.id;

  const result = await processAIChat({
    userId,
    message,
    history,
  });

  res.json({
    success: true,
    reply: result.reply,
    suggestions: result.suggestions,
  });
});