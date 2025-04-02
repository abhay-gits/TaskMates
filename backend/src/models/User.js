import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    profileImage: {
        type: String,
        default: "",
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    pendingRequests : [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
},{ timestamps: true });

userSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(7);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.comparePassword = async function (userPassword){
    return await bcrypt.compare(userPassword, this.password);
};

const User = mongoose.model('User',userSchema);
export default User;