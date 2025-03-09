import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FaRegCopy } from "react-icons/fa6";

const MessageBubble = ({ chat, userIcon, aiIcon }) => {
  return (
    <div className={`mb-6 flex ${chat.type === "user" ? "justify-end" : "justify-start"} animate__animated animate__fadeIn`}>
      {chat.type === "ai" && (
        <div className="flex items-center mr-2">
          <img src={aiIcon} alt="AI Icon" className="w-8 h-8 rounded-full" />
        </div>
      )}
      <div className={`max-w-[50%] rounded-2xl p-3 shadow-md ${chat.type === "user" ? "bg-primary text-white" : "bg-base-100 text-base-content"}`}>
        {chat.content.startsWith("```") ? (
          <div className="relative">
            <SyntaxHighlighter language="javascript" style={atomDark} className="rounded-2xl !pt-10">
              {chat.content.replace(/```javascript\n|```/g, "")}
            </SyntaxHighlighter>
            <button
              className="absolute top-2 right-2 bg-primary text-white px-3 py-1 rounded-full hover:bg-secondary transition-all duration-300"
              onClick={() => navigator.clipboard.writeText(chat.content.replace(/```javascript\n|```/g, ""))}
            >
              <FaRegCopy className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <p className="leading-relaxed">{chat.content}</p>
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