import React, { useState, useRef, useEffect } from "react";
import { FaMicrophone } from "react-icons/fa";

const AudioRecorder = ({ onAudioSubmit }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => setRecordingTime((t) => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      audioChunks.current = [];

      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
        onAudioSubmit(audioBlob);
      };

      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current?.state === "recording") {
      mediaRecorder.current.stop();
      setIsRecording(false);
      setRecordingTime(0);
    }
  };

  return (
    <button
      onClick={isRecording ? stopRecording : startRecording}
      className={`btn btn-circle ${isRecording ? "btn-error" : "btn-ghost"}`}
      aria-label={isRecording ? "Stop recording" : "Start recording"}
    >
      <FaMicrophone className={isRecording ? "animate-pulse" : ""} />
      {isRecording && <span className="ml-2">{recordingTime}s</span>}
    </button>
  );
};

export default AudioRecorder;