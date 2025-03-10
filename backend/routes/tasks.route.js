import Task from "../models/Tasks.js";

import express from "express";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;
    const tasks = await Task.find({ userId }).populate("userId");
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, userId } = req.body;
    if (!title || !userId) {
      return res.status(400).json({ error: "tile and userId required" });
    }
    await Task.create({ title, userId });
    res.json({ message: "Task added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ message: "Task deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
