import mongoose from "mongoose";

const mongoURI = process.env.MONGO_URI;
export async function connectDatabase() {
    try {
        await mongoose.connect(mongoURI)
        console.log("Database connected")
    } catch (error) {
        console.log("error in conecting to database",err)
    }
}