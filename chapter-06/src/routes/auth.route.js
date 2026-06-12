import express from "express";
import {
    loginUser,
    logoutUser,
    registerUser,
} from "../controllers/auth.controller.js";

const router = express.Router();

// route for user registration
router.post("/register", registerUser);

// route for user login
router.post("/login", loginUser);

// route for user logout
router.post("/logout", logoutUser);

export default router;
