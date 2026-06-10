import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

export default async function registerUser(req, res) {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            res.status(401).json({
                message: "All fields must be filled",
            });
        }

        const isUserExists = await userModel.findOne({
            email,
        });

        if (isUserExists) {
            res.status(409).json({
                message: "User already exists",
            });
        }

        const user = await userModel.create({
            username,
            email,
            password,
        });

        if (!user) {
            res.status(500).json({
                message: "Internal server error",
            });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.cookie("token", token);

        res.status(201).json({
            message: "user registerd successfully",
            user,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
}
