import mongoose from "mongoose";

const mongoURI = process.env.MONGO_URI;
export async function connectDatabase() {
    try {
        await mongoose.connect(mongoURI)
        console.log("Database connected")
    } catch (error) {
        console.error("error in conecting to database",error);
    }
}