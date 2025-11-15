import express from "express";
import Session from "../models/Session.js";
import { nanoid } from "nanoid";

const router = express.Router();

// Create session (admin)
router.post("/create", async (req, res) => {
  try {
    const unique_id = nanoid(10);
    const userurl = `http://localhost:5173/student/${unique_id}`;
    const session = new Session({
      type: "admin",
      unique_id,
      userurl,
    });
    await session.save();
    res.json(session);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error" });
  }
});

// Get session by unique_id
router.get("/:id", async (req, res) => {
  try {
    const session = await Session.findOne({ unique_id: req.params.id });
    if (!session) return res.status(404).json({ error: "Session not found" });
    res.json(session);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error" });
  }
});

export default router;
