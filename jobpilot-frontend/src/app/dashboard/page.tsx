// src/app/dashboard/page.tsx
import Dashboard from "./dashboard";
import getJobs from "../api/job-actions";

interface DashboardPageProps {
  searchParams: {
    keyword?: string;
    location?: string;
    jobType?: string;
  };
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  // Extract query parameters from the searchParams prop
  const keyword = searchParams.keyword ?? "";
  const location = searchParams.location ?? "";
  const jobType = searchParams.jobType ?? "";

  // Fetch jobs on the server
  const jobs = await getJobs(keyword, jobType, location);

  return <Dashboard job={jobs} />;
}