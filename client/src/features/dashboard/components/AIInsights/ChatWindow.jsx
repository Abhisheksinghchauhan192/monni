import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";

export default function ChatWindow({ messages }) {
  const bottomRef = useRef(null);

  // Auto scroll when messages update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="space-y-3">
      {messages.map((msg, index) => (
        <ChatMessage key={index} message={msg} />
      ))}

      {/* Scroll anchor */}
      <div ref={bottomRef} />
    </div>
  );
}