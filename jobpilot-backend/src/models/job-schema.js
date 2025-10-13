import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String },
  location: { type: String },
  salary: { type: String },
  jobType: { type: String, default: "unknown" },
  description: { type: String },
  url: { type: String, unique: true },
  source: { type: String },
  fetchedAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
});

// 🧹 Delete jobs older than X days
jobSchema.statics.cleanupOldJobs = async function (days = 7) {
  const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  const result = await this.deleteMany({ fetchedAt: { $lt: cutoff } });
  console.log(`🧹 Deleted ${result.deletedCount} jobs older than ${days} days`);
  return result;
};

// 🔍 Search jobs with optional filters
jobSchema.statics.searchJobs = async function ({
  keyword,
  jobType,
  location,
  limit = 50,
  maxAge = 7 * 24 * 60 * 60 * 1000,
}) {
  const filters = { isActive: true };

  if (keyword) {
    filters.$or = [
      { title: new RegExp(keyword, "i") },
      { description: new RegExp(keyword, "i") },
      { company: new RegExp(keyword, "i") },
    ];
  }

  if (jobType && jobType !== "any") {
    filters.jobType = new RegExp(jobType, "i");
  }

  if (location && location !== "any") {
    filters.location = new RegExp(location, "i");
  }

  const minDate = new Date(Date.now() - maxAge);
  filters.fetchedAt = { $gte: minDate };

  const jobs = await this.find(filters)
    .sort({ fetchedAt: -1 })
    .limit(limit)
    .lean();

  return jobs;
};

const Job = mongoose.model("Job", jobSchema);
export default Job;
