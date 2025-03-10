import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    googleId: String,
    name: String,
    email: String,
    profilePic: String,
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    pendingRequests : [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const User = mongoose.model('User',userSchema);
export default User;