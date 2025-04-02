import Task from "../models/Task.js";

// Post a new task
export const postTasks = async (req, res) => {
  try {
    const { title } = req.body;
    const userId = req.user._id;
    if (!title || !userId) {
      return res.status(400).json({ error: "Title and userId are required" });
    }
    await Task.create({ title, userId });
    res.json({ message: "Task added successfully" });
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Fetch all tasks for a user
export const getTasks = async (req, res) => {
  try {
    const userId = req.user._id;
    const tasks = await Task.find({ userId }).select("_id title status");
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};