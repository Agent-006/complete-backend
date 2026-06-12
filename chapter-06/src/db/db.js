import mongoose from "mongoose";

// function to connect to database
export default async function connectDB() {
    try {
        // mongoose.connect()
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        // if connection fails, log the error and exit
        console.log("Error connecting to MongoDB", error);
        process.exit(1);
    }
}
