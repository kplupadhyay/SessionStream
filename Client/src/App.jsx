import { Link } from "react-router-dom";

export default function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Live Session App</h1>
      <Link to="/admin">
        <button>Go to Admin</button>
      </Link>
    </div>
  );
}
