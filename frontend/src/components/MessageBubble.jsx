import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FaRegCopy } from "react-icons/fa6";

const MessageBubble = ({ chat, userIcon, aiIcon }) => {
  // Regex to find code blocks
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;

  // Extract text & code separately
  let parts = [];
  let match;
  let lastIndex = 0;

  while ((match = codeBlockRegex.exec(chat.content)) !== null) {
    // Push text before code block
    if (match.index > lastIndex) {
      parts.push({ type: "text", content: chat.content.slice(lastIndex, match.index) });
    }
    // Push code block
    parts.push({ type: "code", language: match[1] || "plaintext", content: match[2] });
    lastIndex = codeBlockRegex.lastIndex;
  }

  // Push remaining text after last code block
  if (lastIndex < chat.content.length) {
    parts.push({ type: "text", content: chat.content.slice(lastIndex) });
  }

  return (
    <div className={`mb-6 flex ${chat.type === "user" ? "justify-end" : "justify-start"} animate__animated animate__fadeIn`}>
      {chat.type === "ai" && (
        <div className="flex items-center mr-2">
          <img src={aiIcon} alt="AI Icon" className="w-8 h-8 rounded-full" />
        </div>
      )}

      <div className={`max-w-[50%] rounded-2xl p-3 shadow-md ${chat.type === "user" ? "bg-primary text-white" : "bg-base-100 text-base-content"}`}>
        {parts.map((part, index) =>
          part.type === "code" ? (
            <div key={index} className="relative mt-2">
              <SyntaxHighlighter language={part.language} style={atomDark} className="rounded-2xl !pt-10">
                {part.content}
              </SyntaxHighlighter>
              <button
                className="absolute top-2 right-2 bg-primary text-white px-3 py-1 rounded-full hover:bg-secondary transition-all duration-300"
                onClick={() => navigator.clipboard.writeText(part.content)}
              >
                <FaRegCopy className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <p key={index} className="leading-relaxed">{part.content}</p>
          )
        )}
      </div>

      {chat.type === "user" && (
        <div className="flex items-center ml-2">
          <img src={userIcon} alt="User Icon" className="w-8 h-8 rounded-full" />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
