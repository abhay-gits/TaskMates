import User from "../models/User.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import express from "express";
const router = express.Router();

router.get("/friends", async(req,res)=>{
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate("friends", "name email profilePic")
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user.friends)
  } catch (error) {
    console.log("error in fetching friends", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
})


router.get("/search/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const matchedUser = await User.findOne({ email });

    if (!matchedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json({
      name: matchedUser.name,
      email: matchedUser.email,
      profilePic: matchedUser.profilePic,
    });
  } catch (error) {
    console.log(error);
  }
});

router.put("/send-request/:email",isAuthenticated, async (req, res) => {
  try {
    
    const friend = await User.findOne({ email: req.params.email });
    if (!friend) return res.status(404).json({ error: "user not found" });

    if (
      !friend.pendingRequests.includes(req.user.id) &&
      !friend.friends.includes(req.user.id)
    ) {
      friend.pendingRequests.push(req.user.id);
      await friend.save();
    }
    res.json({ message: "friend request sent" });
  } catch (error) {
    console.log(error);
  }
});

router.get("/requests",isAuthenticated, async(req,res)=>{
    const id = req.user.id;
    const user = await User.findById(id).populate("pendingRequests", "name email");
    res.send(user.pendingRequests);
})

router.post('/accept-request', async(req,res)=>{
  try {
    const { requesterId } = req.body;

    const requester = await User.findById( requesterId );
    const user = await User.findById( req.user.id );

    user.pendingRequests = user.pendingRequests.filter(id=> id.toString() !== requester.id)
    user.friends.push(requester.id)
    requester.friends.push(user.id)

    await user.save();
    await requester.save();

    res.json({ message: "friend request accepted"})
  } catch (error) {
    console.log(error)
  }
})

export default router;
