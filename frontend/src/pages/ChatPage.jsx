import React, { useState, useRef, useEffect } from "react";
import { FiMenu, FiMic, FiSend, FiX } from "react-icons/fi";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import userIcon from '../assets/user.jpg'; // Corrected path
import aiIcon from '../assets/agent.jpg'; // Corrected path

const ChatPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false); // Theme state
  const chatContainerRef = useRef(null);

  const dummyChats = [
    { id: 1, text: "How to implement authentication in React?", timestamp: "2 hours ago" },
    { id: 2, text: "Explain Redux middleware", timestamp: "5 hours ago" },
    { id: 3, text: "Best practices for React hooks", timestamp: "1 day ago" }
  ];

  const handleSend = () => {
    if (!message.trim()) return;

    const newChat = {
      id: Date.now(),
      type: "user",
      content: message
    };

    const aiResponse = {
      id: Date.now() + 1,
      type: "ai",
      content: "```javascript\nconst example = () => {\n  console.log('Hello from CodeGenie AI!');\n}\n```"
    };

    setChatHistory([...chatHistory, newChat, aiResponse]);
    setMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div className={`min-h-screen flex flex-col ${isDarkTheme ? 'bg-[#213555] text-[#D8C4B6]' : 'bg-gradient-to-br from-[#F5EFE7] to-[#3E5879]'}`}>
      <div className="flex items-start">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className={`p-2 hover:bg-[#D8C4B6] rounded-lg transition-all duration-300 fixed top-20 left-4 z-50 ${isDarkTheme ? 'text-[#D8C4B6]' : 'text-[#213555]'}`}
        >
          <FiMenu className="w-6 h-6" />
        </button>

        <div className={`fixed top-32 left-0 h-full w-80 bg-[#F5EFE7] shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="p-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-[#213555]">Chat History</h2>
              <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-red-50 rounded-lg transition-all duration-300">
                <FiX className="w-6 h-6 text-red-500" />
              </button>
            </div>
            <div className="space-y-4">
              {dummyChats.map((chat) => (
                <div key={chat.id} className="p-4 hover:bg-[#D8C4B6] rounded-xl cursor-pointer transition-all duration-300 border border-gray-100 hover:border-[#3E5879]">
                  <p className="text-[#213555] font-medium">{chat.text}</p>
                  <span className="text-sm text-[#3E5879]">{chat.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Set the chat box width to 65% */}
      <div className="flex-1 mx-auto px-6 py-8 overflow-y-auto" ref={chatContainerRef} style={{ width: '65%', marginTop: '80px', marginBottom: '80px' }}>
        <div className={`bg-[#F5EFE7] rounded-2xl shadow-lg p-4 mb-0 ${isDarkTheme ? 'bg-[#3E5879]' : ''}`}>
          {chatHistory.map((chat) => (
            <div key={chat.id} className={`mb-6 flex ${chat.type === "user" ? "justify-end" : "justify-start"} animate__animated animate__fadeIn`}>
              {chat.type === "ai" && (
                <div className="flex items-center mr-2">
                  <img src={aiIcon} alt="AI Icon" className="w-8 h-8" />
                </div>
              )}
              <div className={`max-w-[50%] rounded-2xl p-3 shadow-md ${chat.type === "user" ? "bg-gradient-to-r from-[#213555] to-[#3E5879] text-white" : "bg-[#F5EFE7] text-[#213555]"}`}>
                {chat.content.startsWith("```") ? (
                  <div className="relative">
                    <SyntaxHighlighter language="javascript" style={atomDark} className="rounded-xl !pt-10">
                      {chat.content.replace(/```javascript\n|```/g, "")}
                    </SyntaxHighlighter>
                    <button className="absolute top-2 right-2 bg-[#3E5879] text-white px-3 py-1 rounded-lg text-sm hover:bg-[#213555] transition-all duration-300" onClick={() => navigator.clipboard.writeText(chat.content.replace(/```javascript\n|```/g, ""))}>
                      Copy Code
                    </button>
                  </div>
                ) : (
                  <p className="leading-relaxed">{chat.content}</p>
                )}
              </div>
              {chat.type === "user" && (
                <div className="flex items-center ml-2">
                  <img src={userIcon} alt="User Icon" className="w-8 h-8" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Set the input bar width to 65% */}
      <div className={`bg-[#F5EFE7] rounded-2xl shadow-lg p-4 fixed bottom-0 left-1/2 transform -translate-x-1/2 ${isDarkTheme ? 'bg-[#3E5879]' : ''}`} style={{ width: '65%' }}>
        <div className="flex items-center space-x-2">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter your coding query..."
            className="flex-1 resize-none rounded-xl border border-gray-200 p-2 focus:outline-none focus:ring-2 focus:ring-[#3E5879] focus:border-transparent transition-all duration-300"
            rows="1"
          />
          <button
            onClick={toggleRecording}
            className={`p-2 rounded-xl transition-all duration-300 ${isRecording ? "bg-red-500 text-white" : "hover:bg-red-50 text-red-500"}`}
          >
            <FiMic className="w-5 h-5" />
          </button>
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className="p-2 bg-gradient-to-r from-[#213555] to-[#3E5879] text-white rounded-xl hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
          >
            <FiSend className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
