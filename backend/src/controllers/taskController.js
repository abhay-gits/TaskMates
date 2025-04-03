import Task from "../models/Task.js";
import User from "../models/User.js";

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
    res.status(500).json({ message: "Internal server error" });
  }
};

// Fetch tasks for friends 
export const getFriendsTasks = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate("friends", "username email profileImage");

    if (!user || !user.friends.length) {
      return res.status(404).json({ message: "No friends found" });
    }
    const friendsWithTasks = await User.aggregate([
      { $match: { _id: { $in: user.friends.map(f => f._id) } } }, // Match friends
      { 
        $lookup: { 
          from: "tasks", 
          localField: "_id",
          foreignField: "userId",
          as: "tasks"
        }
      },
      { 
        $project: { 
          _id: 1, 
          username: 1, 
          email: 1, 
          profileImage: 1, 
          "tasks._id": 1, 
          "tasks.title": 1, 
          "tasks.status": 1
        } 
      }
    ]);

    res.status(200).json(friendsWithTasks)
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};