import React, { useState, useRef, useEffect } from "react";
import { FiMic, FiSend } from "react-icons/fi";

const InputBar = ({
  message,
  setMessage,
  handleKeyPress,
  handleSend,
  isRecording,
  toggleRecording,
  isLoading,
  isStreaming,
  handleStop,
}) => {
  const textareaRef = useRef(null);

  // Auto-grow textarea height dynamically
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height to recalculate
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set new height
    }
  }, [message]);

  return (
    <div className="bg-base-100 rounded-2xl shadow-lg p-4 fixed bottom-4 left-1/2 transform -translate-x-1/2" style={{ width: '65%' }}>
      <div className="flex items-center space-x-2">
        {/* Dynamic Textarea */}
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter your coding query..."
          className="flex-1 resize-none rounded-2xl border border-base-300 p-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 overflow-hidden"
          rows="1"
        />

        {/* Microphone Button */}
        <button
          onClick={toggleRecording}
          className={`p-2 rounded-full transition-all duration-300 ${
            isRecording ? "bg-red-500 text-white" : "hover:bg-base-200 text-primary"
          }`}
        >
          <FiMic className="w-5 h-5" />
        </button>

        {/* Stop Button or Send Button */}
        {isStreaming ? (
          <button
            onClick={handleStop}
            className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300"
          >
            Stop
          </button>
        ) : (
          <button
            onClick={handleSend}
            disabled={!message.trim() || isLoading}
            className={`p-2 bg-primary text-white rounded-full hover:bg-secondary transition-all duration-300 ${
              !message.trim() || isLoading ? "opacity-50 cursor-not-allowed" : ""
            } shadow-md hover:shadow-lg`}
          >
            <FiSend className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default InputBar;