import User from "../models/User.js";

import express from "express";
const router = express.Router();

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

router.put("/send-request/:email", async (req, res) => {
  try {
    const friend = User.findOne({ email: req.body.params });
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

router.get("/requests", async(req,res)=>{
    const id = req.user.id;
    const user = await User.findById(id);
    res.send(user.pendingRequests);
})

router.post('/accept-request', async(req,res)=>{
    const { requesterId } = req.body;
    const requester = await User.findById( requesterId );
    const user = await User.findById( req.user.id );
    user.pendingRequests = user.pendingRequests.filter(id=> id.toString !== requester.id)
    user.friends.push(requester.id)
    requester.friends.push(user.id)

    await user.save();
    await requester.save();

    res.json({ message: "friend request accepted"})
})

export default router;
