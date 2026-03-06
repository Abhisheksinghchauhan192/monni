import { motion } from "framer-motion";
import { User, Bot } from "lucide-react";

export default function ChatMessage({ message }) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex items-end gap-2 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && (
        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/20">
          <Bot className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
        </div>
      )}

      <div
        className={`max-w-[75%] px-3 py-2 rounded-xl text-sm break-words
        ${
          isUser
            ? "bg-emerald-500 text-white"
            : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
        }`}
      >
        {message.thinking ? (
          <span className="flex gap-1">
            <span className="animate-bounce">.</span>
            <span className="animate-bounce delay-150">.</span>
            <span className="animate-bounce delay-300">.</span>
          </span>
        ) : (
          message.content
        )}
      </div>

      {isUser && (
        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
          <User className="w-3 h-3 text-gray-700 dark:text-gray-200" />
        </div>
      )}
    </motion.div>
  );
}