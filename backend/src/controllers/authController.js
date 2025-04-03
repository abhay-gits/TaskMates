import User from "../models/User.js";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export const register = async (req, res) => {
  
  try {
    const { username, email, password } = req.body;
    
    // Check if all fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (username.length < 3){
        return res.status(400).json({ message: "Username must be at least 3 characters long" });
    }
    if (password.length < 6){
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    // Check if username or email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) return res.status(400).json({ message: "Email already exists" });
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: "Username already exists" });

    // Create new user
    const profileImage = `https://api.dicebear.com/9.x/dylan/svg?seed=${username}`;
    const user = new User({
      username,
      email,
      password,
      profileImage: profileImage,
    });
    await user.save();

    const token = generateToken(user._id);
    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
        friends: user.friends,
        pendingRequests: user.pendingRequests,
      },
    });

  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

//login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not Found" });
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
    const token = generateToken(user._id);
    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
