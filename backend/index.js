import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";

import authRoutes from "./routes/auth.route.js";
import taskRoutes from "./routes/tasks.route.js"
import friendRoutes from "./routes/friends.route.js"

import "./config/passport.js";
import { connectDatabase } from "./db/mongoConnection.js";

dotenv.config();
const app = express();

// Trust the proxy
app.set('trust proxy', 1);

/* ----------------Middlewares-----------------*/
app.use(cors({
  origin: ['http://localhost:5173', 'https://tasksmates.vercel.app'],
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
}));

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    ttl: 24 * 60 * 60
  }),
  cookie: { 
    secure: true,
    sameSite: 'none', // Required for cross-domain cookies
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    domain: process.env.NODE_ENV === 'production' ? '.onrender.com' : undefined // Optional - try with and without
  }
}));

app.use(passport.initialize());
app.use(passport.session());

/*------------------ Routes-------------------- */
  
app.use('/auth', authRoutes);
app.use('/task', taskRoutes);
app.use('/friend', friendRoutes);

app.get('/api/user', (req, res) => {
    console.log('Session:', req.session);
    console.log('Is Authenticated:', req.isAuthenticated());
    console.log('User:', req.user);
    
    if (req.isAuthenticated()) {
      res.json(req.user);
    } else {
      res.status(401).json({ message: 'Not authenticated' });
    }
});
  
/* -----------------------PORT Listening----------------------- */
const PORT = process.env.PORT || 3000;
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
