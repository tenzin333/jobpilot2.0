'use client';

import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useTransition, useCallback, useState, useEffect } from "react";

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
    { value: "any", label: "All types" },
    { value: "remote", label: "Remote" },
    { value: "onsite", label: "Onsite" },
    { value: "hybrid", label: "Hybrid" },
];

export default function Search({
    className,
    showFilters = true
}: {
    className?: string;
    showFilters?: boolean;
}) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    // Get current values from URL
    const currentKeyword = searchParams?.get('keyword') || '';
    const currentLocation = searchParams?.get('location') || 'any';
    const currentJobType = searchParams?.get('jobType') || 'any';

    // Local state for keyword input (for debouncing)
    const [keyword, setKeyword] = useState(currentKeyword);

    // Debounce keyword updates
    useEffect(() => {
        const timer = setTimeout(() => {
            if (keyword !== currentKeyword) {
                updateSearchParams({ keyword });
            }
        }, 500); // 500ms debounce

        return () => clearTimeout(timer);
    }, [keyword]);

    // Update URL with new search params
    const updateSearchParams = useCallback((updates: Record<string, string>) => {
        if (!searchParams) return;

        const params = new URLSearchParams(searchParams.toString());
        
        // Update or remove params based on values
        Object.entries(updates).forEach(([key, value]) => {
            if (value && value !== 'any' && value !== '') {
                params.set(key, value);
            } else {
                params.delete(key);
            }
        });

        // Navigate with new params
        startTransition(() => {
            router.push(`${pathname}?${params.toString()}`);
        });
    }, [searchParams, pathname, router]);

    // Handle keyword input change
    const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    };

    // Handle location select change
    const handleLocationChange = (location: string) => {
        updateSearchParams({ location });
    };

    // Handle job type select change
    const handleJobTypeChange = (jobType: string) => {
        updateSearchParams({ jobType });
    };

    return (
        <div className={cn('flex flex-col md:flex-row gap-3', className)}>
            {/* Search Input */}
            <div className="relative flex-1">
                <SearchIcon
                    className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground'
                    size={18}
                />
                <Input
                    className='pl-10'
                    placeholder="Search by job title or company..."
                    value={keyword}
                    onChange={handleKeywordChange}
                    disabled={isPending}
                />
            </div>

            {/* Filters */}
            {showFilters && (
                <>
                    {/* Location Filter */}
                    <Select
                        value={currentLocation}
                        onValueChange={handleLocationChange}
                        disabled={isPending}
                    >
                        <SelectTrigger className="w-full md:w-[200px]">
                            <SelectValue placeholder="Location" />
                        </SelectTrigger>
                        <SelectContent>
                            {locations.map((location) => (
                                <SelectItem key={location.value} value={location.value}>
                                    {location.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* Job Type Filter */}
                    <Select
                        value={currentJobType}
                        onValueChange={handleJobTypeChange}
                        disabled={isPending}
                    >
                        <SelectTrigger className="w-full md:w-[180px]">
                            <SelectValue placeholder="Job Type" />
                        </SelectTrigger>
                        <SelectContent>
                            {jobTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                    {type.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </>
            )}
        </div>
    );
}