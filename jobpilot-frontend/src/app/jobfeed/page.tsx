import Search from "@/components/search";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { MapPin, DollarSign, Clock, Building2 } from "lucide-react";
import getJobs from "../api/job-actions";
import JobFeedClient from "@/app/jobfeed/jobfeed";

const locations = [
    { value: "any", label: "Any location" },
    { value: "bangalore", label: "Bangalore" },
    { value: "mumbai", label: "Mumbai" },
    { value: "delhi", label: "Delhi" },
    { value: "hyderabad", label: "Hyderabad" },
    { value: "pune", label: "Pune" },
    { value: "chennai", label: "Chennai" },
];

const jobTypes = [
    { value: "all", label: "All types" },
    { value: "remote", label: "Remote" },
    { value: "onsite", label: "Onsite" },
    { value: "hybrid", label: "Hybrid" },
];

// Server Component - receives searchParams from Next.js
export default async function JobFeed({
    searchParams
}: {
    searchParams: Promise<{ keyword?: string; location?: string; jobType?: string }>
}) {
    // Await and get current values from URL
    const currentSearchParams = await searchParams;
    const keyword = currentSearchParams?.keyword ?? '';
    const jobType = currentSearchParams?.jobType ?? '';
    const location = currentSearchParams?.location ?? '';

    const jobListings = await getJobs(keyword, jobType, location);

    return (
        <div className="p-4 md:p-8 pt-20 md:pt-8 space-y-6">
            <div>
                <h1 className="text-3xl font-bold mb-2">Job Feed</h1>
                <p className="text-muted-foreground">
                    Browse {jobListings?.length || 0} available opportunities
                </p>
            </div>

            {/* Pass to client component for interactive filters */}
            <JobFeedClient
                initialJobs={jobListings || []}
                locations={locations}
                jobTypes={jobTypes}
                initialKeyword={keyword}
                initialLocation={location}
                initialJobType={jobType}
            />
        </div>
    );
}