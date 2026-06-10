import express from "express";
import registerUser from "../controllers/auth.controller.js";

const router = express.Router();

// AUTH Routes
// POST -> /api/auth/register
router.post("/register", registerUser);

export default router;
