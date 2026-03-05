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
    <div
      className="relative 
                 bg-white dark:bg-gray-900 
                 border border-emerald-200/50 dark:border-emerald-500/20
                 rounded-2xl shadow-sm 
                 p-5 
                 h-105 
                 flex flex-col"
    >
      {/* Glow */}
      <div className="absolute inset-0 rounded-2xl bg-emerald-500/5 pointer-events-none"></div>

      {/* Header */}
      <div className="relative flex items-center gap-3 mb-4">
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

      {/* Scrollable Area */}
      <div
        className="relative flex-1 overflow-y-auto pr-2 space-y-4 
                   text-sm text-gray-700 dark:text-gray-300
                   scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700"
      >
        {/* Auto Insights */}
        {!chatStarted && (
          <InsightCards insights={insights} loading={loading} />
        )}

        {/* Chat */}
        <ChatWindow messages={messages} />

        {/* Suggested Questions */}
        <SuggestedPrompts
          suggestions={suggestions}
          onSelect={sendMessage}
          disabled={thinking}
        />
      </div>

      {/* Chat Input */}
      <ChatInput onSend={sendMessage} disabled={thinking} />
    </div>
  );
}