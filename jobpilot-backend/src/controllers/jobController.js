import Job from "../models/job-schema.js";
import fetch from "node-fetch";

// Cache to track last fetch time per query
const fetchCache = new Map();
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in ms

// --- Helper: Perform actual scrape ---
async function performScrape(keyword = "software engineer", jobType = "", location = "", cacheKey, timestamp) {
  const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
  if (!RAPIDAPI_KEY) {
    throw new Error("RapidAPI key not configured");
  }

  // Sanitize & build query
  const validJobTypes = ["onsite", "remote", "hybrid"];
  const safeJobType = validJobTypes.includes(jobType?.toLowerCase()) ? jobType.toLowerCase() : "";

  const refinedKeyword = keyword?.trim() ? keyword : "software engineer";
  const refinedLocation = location?.toLowerCase() !== "any" ? location : "";

  const url = `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(
    `${refinedKeyword} ${refinedLocation}`
  )}&num_pages=1`;

  console.log(`🔍 Fetching from JSearch: ${url}`);

  const response = await fetch(url, {
    headers: {
      "X-RapidAPI-Key": RAPIDAPI_KEY,
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  });

  if (!response.ok) {
    throw new Error(`JSearch API error: ${response.status} ${response.statusText}`);
  }

  const json = await response.json();
  const jobs = json.data || [];

  console.log(`✅ Received ${jobs.length} jobs from JSearch`);

  if (jobs.length === 0) return [];

  // Update cache
  fetchCache.set(cacheKey, timestamp);

  // Clean up old jobs
  await Job.cleanupOldJobs(7);

  // Map to your DB schema
  const bulkOps = jobs.map((job) => ({
    updateOne: {
      filter: {
        title: job.job_title,
        company: job.employer_name,
        location: `${job.job_city || ""}, ${job.job_state || ""}, ${job.job_country || ""}`,
      },
      update: {
        $set: {
          title: job.job_title || "",
          company: job.employer_name || "",
          location: `${job.job_city || ""}, ${job.job_state || ""}, ${job.job_country || ""}`,
          salary: job.job_salary || `${job.job_min_salary || ""} - ${job.job_max_salary || ""}`,
          // jobType: job.job_employment_type || safeJobType || "unknown",
          jobType:job_is_remote ? "remote":'',
          description: job.job_description || "",
          url: job.job_apply_link || "",
          source: "JSearch",
          fetchedAt: Date.now(),
          isActive: true,
        },
      },
      upsert: true,
    },
  }));

  const result = await Job.bulkWrite(bulkOps);
  console.log(`🆕 Upserted: ${result.upsertedCount}, Modified: ${result.modifiedCount}`);

  // Return latest 50 jobs
  const latestJobs = await Job.find({})
    .sort({ fetchedAt: -1 })
    .limit(50);

  return latestJobs;
}


// --- Background scrape (non-blocking) ---
async function scrapeInBackground(keyword, jobType, location, cacheKey, timestamp) {
  try {
    await performScrape(keyword, jobType, location, cacheKey, timestamp);
    console.log("Background scrape completed");
  } catch (error) {
    console.error("Background scrape failed:", error.message);
  }
}

// --- Main endpoint: Get jobs with caching ---
export const getJobs = async (req, res) => {
  try {
    const { keyword = "", jobType = "", location = "any", limit = 100 } = req.query;

    const cacheKey = `${keyword}-${jobType}-${location}`;
    const lastFetch = fetchCache.get(cacheKey);
    const now = Date.now();

    console.log(`📦 Getting jobs for: ${cacheKey}`);

    const cachedJobs = await Job.searchJobs({
      keyword,
      jobType,
      location,
      limit,
      maxAge: CACHE_DURATION,
    });

    const hasRecentCache = lastFetch && now - lastFetch < CACHE_DURATION;

    // Case 1: Fresh cache
    if (cachedJobs.length > 0 && hasRecentCache) {
      console.log("✅ Returning fresh cached results");
      return res.status(200).json({
        success: true,
        data: cachedJobs,
        cached: true,
        count: cachedJobs.length,
      });
    }

    // Case 2: Stale cache → return old data & refresh in background
    if (cachedJobs.length > 0 && !hasRecentCache) {
      console.log("⚙️ Cache expired — returning stale data, refreshing in background...");
      scrapeInBackground(keyword, jobType, location, cacheKey, now);

      return res.status(200).json({
        success: true,
        data: cachedJobs,
        cached: true,
        updating: true,
        count: cachedJobs.length,
      });
    }

    // Case 3: No cache → scrape now
    console.log("🚀 No cached data — performing fresh scrape...");
    const scrapedJobs = await performScrape(keyword, jobType, location, cacheKey, now);

    return res.status(200).json({
      success: true,
      data: scrapedJobs,
      cached: false,
      count: scrapedJobs.length,
    });
  } catch (error) {
    console.error("❌ Error in getJobs:", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
      data: [],
    });
  }
};

// --- Manual scrape endpoint (for admin/testing) ---
export const scrapeJobs = async (req, res) => {
  const { keyword = "developer", jobType = "hybrid", location = "any" } = req.query;
  const cacheKey = `${keyword}-${jobType}-${location}`;
  const now = Date.now();

  try {
    console.log("🧠 Manual scrape triggered");
    const jobs = await performScrape(keyword, jobType, location, cacheKey, now);
    res.json({
      success: true,
      data: jobs,
      cached: false,
      count: jobs.length,
    });
  } catch (error) {
    console.error("Manual scrape failed:", error);
    res.status(500).json({
      success: false,
      message: "Scraping failed",
      error: error.message,
    });
  }
};

// --- Create job manually ---
export const createJob = async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json({
      success: true,
      data: job,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// --- Cleanup old jobs ---
export const cleanupJobs = async (req, res) => {
  try {
    const { days = 7 } = req.query;
    const result = await Job.cleanupOldJobs(parseInt(days));

    res.status(200).json({
      success: true,
      message: `Deleted ${result.deletedCount} old jobs`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
