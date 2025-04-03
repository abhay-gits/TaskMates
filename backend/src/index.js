import express from "express";
import cors from "cors";
import dotenv from "dotenv/config";

import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js"
import friendRoutes from "./routes/friendRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import { connectDatabase } from "./db/db.js";

const app = express();
app.use(express.json());

app.use(cors({
  origin: ['https://tasksmates.vercel.app'],
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
}));
  
app.use('/api/auth', authRoutes);
app.use('/api/task', taskRoutes);
app.use('/api/friend', friendRoutes);
app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    try {
        await connectDatabase();
    } catch (error) {
        console.error("Database connection failed:", error);
        server.close();
        process.exit(1);
    }
});
