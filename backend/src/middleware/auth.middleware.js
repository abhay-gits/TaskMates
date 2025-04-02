import jwt from 'jsonwebtoken';
import User from "../models/User.js";

const protectedRoute = async (req, res, next) => {
    try {
        const token = req.headers["authorization"]?.split(" ")[1];
        console.log("Token:", token); // Log the token for debugging
        if (!token) {
            return res.status(401).json({ message: "Unauthorized access" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized access" });
        }
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(401).json({ message: "Unauthorized access" });
        }
        req.user = user;
        next(); 
    } catch (error) {
        console.error("Error in protected route middleware:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export default protectedRoute;