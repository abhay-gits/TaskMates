import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";

import "./config/passport.js";
import authRoutes from "./routes/auth.js";

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

app.get("/", (req, res) => {
    res.send("Hii from the server");
});

app.get('/auth', authRoutes);
  
/* -----------------------PORT Listening----------------------- */
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server Started on ${PORT}`);
});
