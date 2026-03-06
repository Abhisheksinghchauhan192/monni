export function createAIResponse({
  reply = "",
  data = null,
  suggestions = [],
  warning = null
}) {
  return {
    success: true,
    reply,
    data,
    suggestions,
    warning
  };
}