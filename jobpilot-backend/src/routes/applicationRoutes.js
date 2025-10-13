import express from "express";
import {
  applyToJob,
  getUserApplications,
  updateApplicationStatus,
} from "../controllers/applicationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, applyToJob);
router.get("/", protect, getUserApplications);
router.put("/:id/status", protect, updateApplicationStatus);

export default router;
