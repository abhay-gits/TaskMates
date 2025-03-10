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
app.use(cors());
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized : true,
    cookie: { secure: false }
}))
app.use(passport.initialize())
app.use(passport.session())

/*------------------ Routes-------------------- */
  
app.use('/auth', authRoutes);
app.use('/task', taskRoutes);
app.use('/friend', friendRoutes);
  
/* -----------------------PORT Listening----------------------- */
const PORT = 3000;
app.listen(PORT, () => {
    connectDatabase();
    console.log(`Server Started on ${PORT}`);
});
