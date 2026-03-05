export default function ChatMessage({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`
          max-w-[80%] 
          px-3 py-2 
          rounded-xl 
          text-sm
          break-words
          ${
            isUser
              ? "bg-emerald-500 text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
          }
        `}
      >
        {/* Thinking state */}
        {message.thinking ? (
          <span className="animate-pulse text-gray-400">
            Thinking...
          </span>
        ) : (
          message.content
        )}
      </div>
    </div>
  );
}