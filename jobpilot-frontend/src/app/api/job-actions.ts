"use server";

export default async function getJobs(
  keyword: string = '',
  jobType: string = '',
  location: string = ''
): Promise<any[]> {
  try {
    // Build query params safely using URLSearchParams
    const params = new URLSearchParams();
    if (keyword) params.append("keyword", keyword);
    if (jobType) params.append("jobType", jobType);
    if (location) params.append("location", location);

    console.log("eeee",keyword)
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs?${params.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch jobs: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    if (!data.success) {
      throw new Error(data.message || "API returned an error");
    }

    return data.data;

  } catch (error) {
    console.error("Error fetching jobs:", error);
    return []; // or return [] for empty array
  }
}