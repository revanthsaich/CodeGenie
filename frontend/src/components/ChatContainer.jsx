import React, { useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";

const ChatContainer = ({ chatHistory, userIcon, aiIcon, chatContainerRef }) => {
  return (
    <div
      className="flex-1 mx-auto px-6 py-8 overflow-y-auto rounded-2xl bg-base-100 text-base-content"
      ref={chatContainerRef}
      style={{
        width: "65%",
        marginTop: "80px",
        marginBottom: "100px",
        maxHeight: "80vh",
        overflowY: "auto",
      }}
    >
      <div className="bg-base-100 rounded-2xl shadow-lg p-4">
        {chatHistory.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
            <p className="text-lg font-medium">Start chatting!</p>
            <p className="text-sm">Ask me anything related to coding.</p>
          </div>
        ) : (
          chatHistory.map((chat) => (
            <MessageBubble key={chat.id} chat={chat} userIcon={userIcon} aiIcon={aiIcon} />
          ))
        )}
      </div>
    </div>
  );
};

export default ChatContainer;