import express from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

const router = express.Router();

router.post("/create", async (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized!",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);

        const user = await userModel.findById({
            _id: decoded.id,
        });

        console.log(user);

        res.send("Post created successfully");
    } catch (error) {
        res.send("Token Invalid");
    }
});

export default router;
