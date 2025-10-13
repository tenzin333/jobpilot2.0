import Application from "../models/application-schema.js";
import Job from "../models/job-schema.js";

// 📝 Apply to a job
export const applyToJob = async (req, res) => {
  const { jobId } = req.body;
  try {
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    const alreadyApplied = await Application.findOne({
      userId: req.user._id,
      jobId,
    });
    if (alreadyApplied)
      return res.status(400).json({ message: "Already applied to this job" });

    const application = await Application.create({
      userId: req.user._id,
      jobId,
    });

    job.applicantsCount = (job.applicantsCount || 0) + 1;
    await job.save();

    res.status(201).json(application);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📋 Get all applications by the logged-in user
export const getUserApplications = async (req, res) => {
  try {
    const applications = await Application.find({ userId: req.user._id })
      .populate("jobId")
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🧾 Update application status (e.g., Interview, Offer)
export const updateApplicationStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const application = await Application.findById(req.params.id);
    if (!application) return res.status(404).json({ message: "Not found" });

    application.status = status;
    await application.save();

    res.json(application);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
