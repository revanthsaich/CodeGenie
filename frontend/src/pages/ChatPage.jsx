import React, { useState, useRef, useEffect } from "react";
import ChatMessage from "../components/ChatMessage";
import ChatHistory from "../components/ChatHistory";
import AudioRecorder from "../components/AudioRecorder";
import { FaSun, FaMoon, FaPaperPlane } from "react-icons/fa";

const ChatPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messageContainerRef = useRef(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [activeChat?.messages]);

  // Create a new chat
  const handleNewChat = () => {
    const newChat = { id: Date.now().toString(), title: "New Conversation", messages: [] };
    setChats((prev) => [newChat, ...prev]);
    setActiveChat(newChat);
  };

  // Delete a chat
  const handleDeleteChat = (chatId) => {
    setChats((prev) => prev.filter((chat) => chat.id !== chatId));
    if (activeChat?.id === chatId) setActiveChat(null);
  };

  // Send a message
  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !activeChat) return;

    const newMessage = { content: inputMessage, timestamp: new Date().toISOString(), isUser: true };

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === activeChat.id ? { ...chat, messages: [...chat.messages, newMessage] } : chat
      )
    );

    setInputMessage("");
    setIsLoading(true);

    setTimeout(() => {
      const aiResponse = { content: "This is a simulated AI response.", timestamp: new Date().toISOString(), isUser: false };
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === activeChat.id ? { ...chat, messages: [...chat.messages, aiResponse] } : chat
        )
      );
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="flex h-screen bg-base-100 text-base-content">
        {/* Sidebar */}
        <div className="w-80 border-r dark:border-gray-700 flex flex-col">
          <ChatHistory
            chats={chats}
            activeChat={activeChat}
            onSelectChat={setActiveChat}
            onDeleteChat={handleDeleteChat}
            onNewChat={handleNewChat}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-xl font-semibold">{activeChat?.title || "Select a chat"}</h2>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="btn btn-circle btn-ghost"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-600" />}
            </button>
          </div>

          {/* Chat Messages */}
          <div ref={messageContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {activeChat?.messages.map((message, index) => (
              <ChatMessage key={index} message={message} isUser={message.isUser} />
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-base-200 rounded-lg p-3 animate-pulse">
                  <div className="h-4 w-12 bg-base-300 rounded"></div>
                </div>
              </div>
            )}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t dark:border-gray-700">
            <div className="flex items-end gap-2">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Send a message..."
                className="textarea textarea-bordered flex-1 resize-none focus:outline-none focus:border-primary"
                rows={1}
              />
              <AudioRecorder onAudioSubmit={console.log} />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || !activeChat}
                className="btn btn-primary btn-circle"
                aria-label="Send message"
              >
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;