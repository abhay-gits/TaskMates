import express from "express";
import User from "../models/User.js";
import protectedRoute from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectedRoute, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
