import { acceptRequest, getFriends, getRequests, rejectRequest, searchUser, sendRequest } from "../controllers/friendController.js";
import express from "express";
import protectedRoute from "../middleware/auth.middleware.js";
const router = express.Router();

router.get("/",protectedRoute, getFriends);
router.get("/search/:email",protectedRoute, searchUser);
router.put("/send-request/:email",protectedRoute, sendRequest);
router.get("/requests",protectedRoute, getRequests);
router.post('/accept-request/:email', protectedRoute, acceptRequest);
router.post('/reject-request/:email', protectedRoute, rejectRequest);

export default router;
