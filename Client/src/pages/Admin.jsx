import { useState } from "react";
import axios from "axios";
import VideoPlayer from "../components/VideoPlayer";

export default function Admin() {
  const [session, setSession] = useState(null);

  const startSession = async () => {
    const res = await axios.post("http://localhost:5000/api/session/create");
    setSession(res.data);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Admin Panel</h2>
      {!session ? (
        <button onClick={startSession}>START SESSION</button>
      ) : (
        <>
          <p>Session URL (share with student): {session.userurl}</p>
          <VideoPlayer sessionId={session.unique_id} isAdmin={true} />
        </>
      )}
    </div>
  );
}
