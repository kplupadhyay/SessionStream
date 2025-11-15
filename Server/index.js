import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import sessionRoutes from "./routes/sessionRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(
  "mongodb+srv://upadhyaykapil61_db_user:9310316463@cluster0.bxes4ro.mongodb.net/?appName=Cluster0"
)
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log(err));

// Routes
app.use("/api/session", sessionRoutes);

// Socket.io setup
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:5173" }
});

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("join-session", (sessionId) => {
    socket.join(sessionId);
  });

  socket.on("video-control", (data) => {
    io.to(data.sessionId).emit("video-control", data);
  });
});

server.listen(5000, () => console.log("Server running on port 5000"));
