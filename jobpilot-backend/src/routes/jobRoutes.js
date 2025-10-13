import express from "express";
import { getJobs, createJob,scrapeJobs } from "../controllers/jobController.js";
const router = express.Router();

// Scrape jobs from external API (rate limited)
router.get("/scrape", scrapeJobs);
router.get("/", getJobs);
router.post("/", createJob);

export default router;
