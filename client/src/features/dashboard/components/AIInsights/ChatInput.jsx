import { useState } from "react";
import { Send } from "lucide-react";

export default function ChatInput({ onSend, disabled }) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    const text = value.trim();

    if (!text) return;

    onSend(text);
    setValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-center gap-2 mt-3">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask about your finances..."
        disabled={disabled}
        className="
          flex-1
          px-3 py-2
          text-sm
          rounded-lg
          border
          border-gray-200 dark:border-gray-700
          bg-white dark:bg-gray-900
          text-gray-800 dark:text-gray-200
          placeholder-gray-400
          focus:outline-none
          focus:ring-2
          focus:ring-emerald-500/50
        "
      />

      <button
        onClick={handleSend}
        disabled={disabled}
        className="
    p-2 rounded-lg bg-emerald-500 text-white
    hover:bg-emerald-600 transition-colors
    disabled:opacity-50 disabled:cursor-not-allowed
  "
      >
        <Send className="w-4 h-4" />
      </button>
    </div>
  );
}
