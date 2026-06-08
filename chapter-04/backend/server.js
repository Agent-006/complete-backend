import dotenv from "dotenv";

dotenv.config();

import app from "./src/app.js";
import connectDB from "./src/db/db.js";

await connectDB();

app.listen(3000, () => {
    console.log("Server is running at http://localhost:3000");
});
