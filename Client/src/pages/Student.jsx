import { useParams } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer";

export default function Student() {
  const { id } = useParams();

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Student Panel</h2>
      <VideoPlayer sessionId={id} isAdmin={false} />
    </div>
  );
}
