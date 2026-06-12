import dotenv from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/db/db.js";

// configure environment variables
dotenv.config();

// connect to database
connectDB();

// server is up on port 3000
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
