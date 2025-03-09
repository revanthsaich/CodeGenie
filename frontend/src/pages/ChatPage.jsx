import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import InputBar from "../components/InputBar";
import userIcon from '../assets/user.png';
import aiIcon from '../assets/agent.png';
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go"; // Import icons

const ChatPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false); // Theme toggler state
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [isStreaming, setIsStreaming] = useState(false); // Track streaming state
  const abortControllerRef = useRef(null); // Reference to AbortController
  const chatContainerRef = useRef(null);

  // State for animated "Generating..." text
  const [generatingText, setGeneratingText] = useState("Generating...");

  useEffect(() => {
    if (isStreaming) {
      // Create an interval to animate the dots
      const interval = setInterval(() => {
        setGeneratingText((prevText) => {
          if (prevText === "Generating...") return "Generating..";
          if (prevText === "Generating..") return "Generating.";
          return "Generating...";
        });
      }, 500); // Change every 500ms

      return () => clearInterval(interval); // Cleanup interval on unmount or when streaming stops
    } else {
      setGeneratingText("Generating..."); // Reset text when streaming stops
    }
  }, [isStreaming]);

  const dummyChats = [
    { id: 1, text: "How to implement authentication in React?", timestamp: "2 hours ago" },
    { id: 2, text: "Explain Redux middleware", timestamp: "5 hours ago" },
    { id: 3, text: "Best practices for React hooks", timestamp: "1 day ago" }
  ];

  const handleSend = async () => {
    if (!message.trim() || isLoading) return;

    setIsLoading(true);
    setIsStreaming(true);
    abortControllerRef.current = new AbortController();

    const newChat = {
      id: Date.now(),
      type: "user",
      content: message
    };

    setChatHistory([...chatHistory, newChat]);
    setMessage("");

    const aiResponsePlaceholder = {
      id: Date.now() + 1,
      type: "ai",
      content: generatingText // Use the animated "Generating..." text as placeholder
    };

    setChatHistory((prevHistory) => [...prevHistory, aiResponsePlaceholder]);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/generate-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: message }),
        signal: abortControllerRef.current.signal
      });

      if (!response.ok) throw new Error("Failed to generate code");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedCode = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = JSON.parse(line.slice(6));
            accumulatedCode += data.code;

            setChatHistory((prevHistory) =>
              prevHistory.map((chat) =>
                chat.id === aiResponsePlaceholder.id
                  ? { ...chat, content: accumulatedCode }
                  : chat
              )
            );
          }
        }
      }
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Streaming aborted by user.");
      } else {
        console.error("Error generating code:", error);

        setChatHistory((prevHistory) =>
          prevHistory.map((chat) =>
            chat.id === aiResponsePlaceholder.id
              ? { ...chat, content: "Sorry, I encountered an error while generating the code." }
              : chat
          )
        );
      }
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
    }
  };

  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsStreaming(false);
    }
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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      setTimeout(() => {
        chatContainerRef.current.scrollTo({
          top: chatContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      });
    }
  }, [chatHistory]);

  return (
    <div className={`min-h-screen flex flex-col ${isDarkTheme ? 'dark' : ''}`}>

      {/* Top-Left Button to Toggle Sidebar */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 my-[120px] left-4 z-50 p-2 bg-primary text-white rounded-full shadow-md hover:bg-secondary transition-all duration-300"
      >
        {isSidebarOpen ? <GoSidebarCollapse className="w-5 h-5" /> : <GoSidebarExpand className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} dummyChats={dummyChats} />

      {/* Chat Container */}
      <ChatContainer chatHistory={chatHistory} userIcon={userIcon} aiIcon={aiIcon} chatContainerRef={chatContainerRef} />

      {/* Input Bar */}
      <InputBar
        message={message}
        setMessage={setMessage}
        handleKeyPress={handleKeyPress}
        handleSend={handleSend}
        isRecording={isRecording}
        toggleRecording={toggleRecording}
        isLoading={isLoading}
        isStreaming={isStreaming}
        handleStop={handleStop}
      />
    </div>
  );
};

export default ChatPage;