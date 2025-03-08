import React from "react";
import { FaCopy } from "react-icons/fa";
import { format } from "date-fns";

const ChatMessage = ({ message, isUser }) => (
  <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
    <div
      className={`max-w-[70%] rounded-lg p-3 ${
        isUser ? "bg-primary text-white" : "bg-base-200 text-base-content"
      }`}
    >
      <p className="text-sm">{message.content}</p>
      <div className="text-xs mt-1 flex justify-between items-center">
        <span>{format(new Date(message.timestamp), "HH:mm")}</span>
        <button
          onClick={() => navigator.clipboard.writeText(message.content)}
          className="ml-2 opacity-50 hover:opacity-100"
          aria-label="Copy message"
        >
          <FaCopy size={12} />
        </button>
      </div>
    </div>
  </div>
);

export default ChatMessage;