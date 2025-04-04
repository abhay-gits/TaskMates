import User from "../models/User.js";

// Get Friends
export const getFriends = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate(
      "friends",
      "_id name email profileImage"
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user.friends);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//Search Friends
export const searchUser = async (req, res) => {
  try {
    const { email } = req.params;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const userId = req.user._id;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const users = await User.find({ email, _id: { $ne: userId } }).select(
      "_id username email profileImage"
    );

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//Send Friend Request
export const sendRequest = async (req, res) => {
  try {
    const { email } = req.params;
    const userId = req.user._id;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const friend = await User.findOne({ email });
    if (!friend) {
      return res.status(404).json({ message: "User not found" });
    }
    if (friend.friends.includes(userId)) {
      return res.status(400).json({ message: "Already friends" });
    }
    if (friend.pendingRequests.includes(userId)) {
      return res.status(400).json({ message: "Request already sent" });
    }
    if (friend.pendingRequests.includes(userId)) {
      return res.status(400).json({ message: "Request already pending" });
    }
    friend.pendingRequests.push(userId);
    await friend.save();
    res.status(200).json({ message: "Request sent" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

//Get Requests
export const getRequests = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate(
      "pendingRequests",
      "_id username email profileImage"
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user.pendingRequests);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//Accept Request
export const acceptRequest = async (req, res) => {
  try {
    const requesterId = req.params.id;
    const userId = req.user._id;

    if (!requesterId) {
      return res.status(400).json({ message: "requesterId is required" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.friends.includes(requesterId)) {
      return res.status(400).json({ message: "Already friends" });
    }
    if (!user.pendingRequests.includes(requesterId)) {
      return res.status(400).json({ message: "No pending request from this user" });
    }
    await User.findByIdAndUpdate(userId, {
      $pull: { pendingRequests: requesterId },
      $push: { friends: requesterId },
    });
    await User.findByIdAndUpdate(requesterId, {
      $push: { friends: userId },
    });
    res.status(200).json({ message: "Request accepted" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

//Reject Request
export const rejectRequest = async (req, res) => {
  try {
    const requesterId = req.params.id;
    const userId = req.user._id;
    if (!requesterId) {
      return res.status(400).json({ message: "requesterId is required" });
    }
    await User.findByIdAndUpdate(userId, {
      $pull: { pendingRequests: requesterId },
    });
    res.status(200).json({ message: "Request rejected" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
