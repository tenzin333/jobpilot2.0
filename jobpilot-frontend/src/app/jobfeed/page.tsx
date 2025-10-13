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
import JobFeedClient from "@/app/jobfeed/jobfeed"; // We'll create this

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
    searchParams?: { keyword?: string; location?: string; jobType?: string }
}) {
    // Get current values from URL
    const currentKeyword = searchParams?.keyword || '';
    const currentLocation = searchParams?.location || '';
    const currentJobType = searchParams?.jobType || '';
    
    const jobListings = await getJobs(currentKeyword, currentJobType, currentLocation);

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
                initialKeyword={currentKeyword}
                initialLocation={currentLocation}
                initialJobType={currentJobType}
            />
        </div>
    );
}