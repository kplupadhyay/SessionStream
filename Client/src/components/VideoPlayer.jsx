import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

export default function VideoPlayer({ sessionId, isAdmin }) {
  const videoRef = useRef();
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io("http://localhost:5000");
    socketRef.current.emit("join-session", sessionId);

    socketRef.current.on("video-control", (data) => {
      if (!isAdmin && videoRef.current) {
        if (data.action === "play") videoRef.current.play();
        if (data.action === "pause") videoRef.current.pause();
        if (data.action === "seek") videoRef.current.currentTime = data.time;
      }
    });

    return () => socketRef.current.disconnect();
  }, []);

  const handlePlay = () => {
    socketRef.current.emit("video-control", { sessionId, action: "play" });
  };

  const handlePause = () => {
    socketRef.current.emit("video-control", { sessionId, action: "pause" });
  };

  const handleSeek = () => {
    socketRef.current.emit("video-control", {
      sessionId,
      action: "seek",
      time: videoRef.current.currentTime,
    });
  };

  return (
    <div>
      <video
        ref={videoRef}
        width="600"
        controls
        onPlay={handlePlay}
        onPause={handlePause}
        onSeeked={handleSeek}
      >
        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
