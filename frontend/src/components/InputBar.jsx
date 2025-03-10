import React, { useState, useRef, useEffect } from "react";
import { FiMic, FiSend } from "react-icons/fi";

const InputBar = ({
  message,
  setMessage,
  handleKeyPress,
  handleSend,
  isLoading,
  isStreaming,
  handleStop,
}) => {
  const textareaRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);
  
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  useEffect(() => {
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event) => {
        let interimTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            setMessage((prev) => (prev ? prev + " " + event.results[i][0].transcript : event.results[i][0].transcript));
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        // Display interim transcript in the input field dynamically
        if (interimTranscript) {
          setMessage((prev) => (prev ? prev + " " + interimTranscript : interimTranscript));
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech Recognition Error:", event.error);
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }
  }, []);

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    } else {
      recognitionRef.current?.start();
      setIsRecording(true);
    }
  };

  return (
    <div
      className="bg-base-100 rounded-2xl shadow-lg p-4 fixed bottom-4 left-1/2 transform -translate-x-1/2"
      style={{ width: "65%" }}
    >
      <div className="flex items-center space-x-2">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter your coding query..."
          className="flex-1 resize-none rounded-2xl border border-base-300 p-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 overflow-hidden"
          rows="1"
        />

        <button
          onClick={toggleRecording}
          className={`p-2 rounded-full transition-all duration-300 ${
            isRecording ? "bg-red-500 text-white" : "hover:bg-base-200 text-primary"
          }`}
        >
          <FiMic className="w-5 h-5" />
        </button>

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
