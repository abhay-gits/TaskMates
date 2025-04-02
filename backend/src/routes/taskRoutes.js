import express from "express";
import { deleteTask, getTasks, postTasks } from "../controllers/taskController.js";
import protectedRoute from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/",protectedRoute, postTasks);
router.get("/",protectedRoute, getTasks);
router.delete("/:taskId",protectedRoute, deleteTask);

router.get("/friends-tasks",);


export default router;
