import { useState } from "react";
import { Sparkles } from "lucide-react";

import ChatWindow from "./ChatWindow";
import ChatInput from "./ChatInput";
import SuggestedPrompts from "./SuggestedPrompts";
import InsightCards from "./InsightsCards";

import useAIInsights from "../../hooks/useAIInsights";
import { chatWithAI } from "../../services/ai.api";

export default function AIInsights() {
  const { insights, loading } = useAIInsights();

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! Ask me anything about your spending.",
    },
  ]);
  const [mode, setMode] = useState("insights");
  // "insights" | "chat"
  const [suggestions, setSuggestions] = useState([
    "Which category costs the most?",
    "When did I spend the most?",
    "Why did my spending increase?",
  ]);

  const [thinking, setThinking] = useState(false);
  const [chatStarted, setChatStarted] = useState(false);

  async function sendMessage(text) {
    if (!text) return;

    setChatStarted(true);

    const userMessage = { role: "user", content: text };

    setMessages((prev) => [
      ...prev,
      userMessage,
      { role: "assistant", thinking: true },
    ]);

    setThinking(true);

    try {
      const history = [...messages].slice(-6);

      const res = await chatWithAI(text, history);

      setMessages((prev) => {
        const updated = [...prev];
        updated.pop();

        updated.push({
          role: "assistant",
          content: res.reply,
        });

        return updated;
      });

      if (res.suggestions) {
        setSuggestions(res.suggestions);
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated.pop();

        updated.push({
          role: "assistant",
          content: "Sorry, I couldn't generate insights right now.",
        });

        return updated;
      });
    } finally {
      setThinking(false);
    }
  }

  return (
    <div className="bg-white dark:bg-gray-900 border border-emerald-200/50 dark:border-emerald-500/20 rounded-2xl shadow-sm p-5 h-[420px] flex flex-col ">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-500/20">
          <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
        </div>

        <div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
            AI Insights
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Intelligent spending assistant
          </p>
        </div>
      </div>
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => setMode("insights")}
          className={`px-3 py-1 text-xs rounded-full border
      ${
        mode === "insights"
          ? "bg-emerald-500 text-white border-emerald-500"
          : "border-gray-300 dark:border-gray-700"
      }
    `}
        >
          Insights
        </button>

        <button
          onClick={() => setMode("chat")}
          className={`px-3 py-1 text-xs rounded-full border
      ${
        mode === "chat"
          ? "bg-emerald-500 text-white border-emerald-500"
          : "border-gray-300 dark:border-gray-700"
      }
    `}
        >
          Chat
        </button>
      </div>
      {/* Warning */}
      {mode === "chat" && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 text-xs p-2 rounded-md mb-2">
          ⚠️ AI Assistant is experimental. Responses may occasionally be
          inaccurate.
        </div>
      )}

      <div className="flex-1 overflow-y-auto pr-2">
        {mode === "insights" && (
          <InsightCards insights={insights} loading={loading} />
        )}

        {mode === "chat" && <ChatWindow messages={messages} />}
      </div>

      {/* Suggested prompts */}
      {mode === "chat" && (
        <SuggestedPrompts
          suggestions={suggestions}
          onSelect={sendMessage}
          disabled={thinking}
        />
      )}
      {/* Input */}
      {mode === "chat" && (
        <ChatInput onSend={sendMessage} disabled={thinking} />
      )}
    </div>
  );
}
