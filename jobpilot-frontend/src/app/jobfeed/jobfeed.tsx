"use client";

import { useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
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
import { MapPin, DollarSign, Clock, Building2, ExternalLink } from "lucide-react";

interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    salary: string;
    postedDate: string;
    description: string;
    skills: string[];
    type: string;
    url: string;
}

interface JobFeedClientProps {
    initialJobs: Job[];
    locations: { value: string; label: string }[];
    jobTypes: { value: string; label: string }[];
    initialKeyword?: string;
    initialLocation?: string;
    initialJobType?: string;
}

export default function JobFeedClient({
    initialJobs,
    locations,
    jobTypes,
    initialKeyword = '',
    initialLocation = 'any',
    initialJobType = 'all'
}: JobFeedClientProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    
    const [selectedLocation, setSelectedLocation] = useState(initialLocation);
    const [selectedJobType, setSelectedJobType] = useState(initialJobType);

    const updateURL = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams?.toString());
        
        if (value && value !== 'any' && value !== 'all') {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        
        router.push(`${pathname}?${params.toString()}`);
    };

    const handleLocationChange = (value: string) => {
        setSelectedLocation(value);
        updateURL('location', value);
    };

    const handleJobTypeChange = (value: string) => {
        setSelectedJobType(value);
        updateURL('jobType', value);
    };

    const handleViewDetails = (url: string) => {
        if (url) {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <>
            {/* Search and Filters */}
            <div className='flex flex-col md:flex-row gap-3 w-full'>
                <Search className="flex-1" showFilters={false} />

                <Select value={selectedLocation} onValueChange={handleLocationChange}>
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Any location" />
                    </SelectTrigger>
                    <SelectContent>
                        {locations.map((location) => (
                            <SelectItem key={location.value} value={location.value}>
                                {location.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select value={selectedJobType} onValueChange={handleJobTypeChange}>
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                        {jobTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                                {type.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Job listings */}
            <div className="grid grid-cols-1 gap-4">
                {initialJobs.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                        No jobs found. Try adjusting your filters.
                    </div>
                ) : (
                    initialJobs.map((job) => (
                        <Card key={job.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Building2 size={16} />
                                            <span className="font-medium">{job.company}</span>
                                        </div>
                                    </div>
                                    <Badge variant="outline">{job.type}</Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className='flex flex-col gap-4'>
                                    {/* Job Meta Info */}
                                    <div className='flex flex-wrap gap-4 text-sm text-muted-foreground'>
                                        <div className='flex items-center gap-1'>
                                            <MapPin size={16} />
                                            <span>{job.location}</span>
                                        </div>
                                        <div className='flex items-center gap-1'>
                                            <DollarSign size={16} />
                                            <span>{job.salary}</span>
                                        </div>
                                        <div className='flex items-center gap-1'>
                                            <Clock size={16} />
                                            <span>{job.postedDate}</span>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                        {job.description}
                                    </p>

                                    {/* Skills */}
                                    {job.skills && job.skills.length > 0 && (
                                        <div className='flex flex-wrap gap-2'>
                                            {job.skills.map((skill: string, index: number) => (
                                                <Badge key={index} variant="secondary">
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </div>
                                    )}

                                    {/* Actions */}
                                    <div className='flex sm:flex-row gap-2 mt-2'>
                                        <Button variant='default'>
                                            Quick Apply
                                        </Button>
                                        <Button 
                                            variant='outline' 
                                            onClick={() => handleViewDetails(job.url)}
                                            className="gap-2"
                                        >
                                            View Details
                                            <ExternalLink size={16} />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </>
    );
}