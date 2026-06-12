import express from "express";
import { registerUserValidation } from "./middlewares/validation.middleware.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Hello",
    });
});

app.post("/register", registerUserValidation, (req, res) => {
    const { username, password, email } = req.body;

    res.status(200).json({
        success: true,
        message: "User registered successfully",
    });
});

export default app;
