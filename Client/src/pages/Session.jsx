import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

const SERVER_URL = "http://localhost:5000";
const socket = io(SERVER_URL);

const Session = () => {
  const { sessionId } = useParams();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    socket.emit("join-session", sessionId);
    socket.on("video-control", (data) => {
      const video = videoRef.current;
      if (!video) return;
      if (data.action === "play") video.play();
      if (data.action === "pause") video.pause();
      if (data.action === "seek") video.currentTime = data.time;
    });
    return () => socket.off("video-control");
  }, [sessionId]);

  const handlePlay = () => {
    videoRef.current.play();
    socket.emit("video-control", { sessionId, action: "play" });
    setIsPlaying(true);
  };
  const handlePause = () => {
    videoRef.current.pause();
    socket.emit("video-control", { sessionId, action: "pause" });
    setIsPlaying(false);
  };
  const handleSeek = (e) => {
    const time = e.target.value;
    videoRef.current.currentTime = time;
    socket.emit("video-control", { sessionId, action: "seek", time });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Live Session: {sessionId}</h2>
      <video ref={videoRef} width="800" controls src="/sample-video.mp4" />
      <div style={{ marginTop: "20px" }}>
        <button onClick={handlePlay} disabled={isPlaying}>Play</button>
        <button onClick={handlePause} disabled={!isPlaying}>Pause</button>
        <input type="range" min="0" max={videoRef.current?.duration || 100} onChange={handleSeek} />
      </div>
    </div>
  );
};

export default Session;
