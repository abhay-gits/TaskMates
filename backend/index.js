import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";

import authRoutes from "./routes/auth.route.js";
import taskRoutes from "./routes/tasks.route.js"
import friendRoutes from "./routes/friends.route.js"

import "./config/passport.js";
import { connectDatabase } from "./db/mongoConnection.js";

dotenv.config();
const app = express();

/* ----------------Middlewares-----------------*/
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized : false,
    cookie: { 
      secure: false, // Set to true in production with HTTPS
      maxAge: 24 * 60 * 60 * 1000 // 24 hours }
}}))
app.use(passport.initialize())
app.use(passport.session())


/*------------------ Routes-------------------- */
  
app.use('/auth', authRoutes);
app.use('/task', taskRoutes);
app.use('/friend', friendRoutes);
app.get('/api/user', (req, res) => {
    if (req.isAuthenticated()) {
      res.json(req.user);
    } else {
      res.status(401).json({ message: 'Not authenticated' });
    }
  });
  
/* -----------------------PORT Listening----------------------- */
const PORT = 3000;
const server = app.listen(PORT, async () => {
    try {
        await connectDatabase();
        console.log(`Server Started on ${PORT}`);
    } catch (error) {
        console.error("Database connection failed:", error);
        server.close();
        process.exit(1);
    }
});
