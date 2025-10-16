// src/app/dashboard/page.tsx
import Dashboard from "./dashboard";
import getJobs from "../api/job-actions";
import { useSearchParams } from "next/navigation";

export default async function DashboardPage({
  searchParams
}:{
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  // Extract query parameters
  const currentSearchParams =  await searchParams;
  const keyword = currentSearchParams["keyword"] ?? '';
  const jobType = currentSearchParams["jobType"] ?? '';
  const location = currentSearchParams["location"] ?? '';

  // Fetch jobs on the server
  const jobs = await getJobs(keyword, jobType, location);

  return <Dashboard job={jobs} />;
}
