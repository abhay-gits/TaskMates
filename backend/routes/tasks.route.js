import Task from "../models/Tasks.js";
import User from "../models/User.js";

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

router.get("/friends-tasks", async (req, res) => {
  try {
    const userId = req.user.id;

    // Get user with friends details
    const user = await User.findById(userId).populate("friends", "name email profilePic");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch tasks for each friend
    const friendsWithTasks = await Promise.all(user.friends.map(async (friend) => {
      const tasks = await Task.find({ userId: friend._id }).select("title status");
      return { ...friend.toObject(), tasks }; // Merge friend details with tasks
    }));

    res.json(friendsWithTasks);
  } catch (error) {
    console.log("Error in fetching friends and tasks:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});


export default router;
