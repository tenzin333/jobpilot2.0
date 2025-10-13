import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updatePreferences,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);
router.put("/preferences", protect, updatePreferences);

export default router;
