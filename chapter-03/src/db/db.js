import mongoose from "mongoose";

async function connectDB() {
    try {
        await mongoose.connect(
            "<mongodb uri>",
        );
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB Error:", error.message);
        process.exit(1);
    }
}

export default connectDB;
