"use client";

import { DataTable } from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal, Eye, Trash2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Application = {
    id: string;
    jobTitle: string;
    company: string;
    location: string;
    appliedDate: string;
    status: "pending" | "reviewing" | "interview" | "rejected" | "accepted";
    salary: string;
};

const statusColors = {
    pending: "bg-yellow-500",
    reviewing: "bg-blue-500",
    interview: "bg-purple-500",
    rejected: "bg-red-500",
    accepted: "bg-green-500",
};

export const columns: ColumnDef<Application>[] = [
    {
        accessorKey: "jobTitle",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Job Title
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return <div className="font-medium">{row.getValue("jobTitle")}</div>;
        },
    },
    {
        accessorKey: "company",
        header: "Company",
        cell: ({ row }) => {
            return <div>{row.getValue("company")}</div>;
        },
    },
    {
        accessorKey: "location",
        header: "Location",
    },
    {
        accessorKey: "appliedDate",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Applied Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            return (
                <Badge className={statusColors[status as keyof typeof statusColors]}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                </Badge>
            );
        },
    },
    {
        accessorKey: "salary",
        header: "Salary",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const application = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(application.id)}
                        >
                            Copy application ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

const data: Application[] = [
    {
        id: "1",
        jobTitle: "Senior Frontend Engineer",
        company: "Google",
        location: "Mountain View, CA",
        appliedDate: "2024-01-15",
        status: "interview",
        salary: "$150k - $200k",
    },
    {
        id: "2",
        jobTitle: "Full Stack Developer",
        company: "Meta",
        location: "Menlo Park, CA",
        appliedDate: "2024-01-14",
        status: "reviewing",
        salary: "$140k - $180k",
    },
    {
        id: "3",
        jobTitle: "Backend Engineer",
        company: "Amazon",
        location: "Seattle, WA",
        appliedDate: "2024-01-13",
        status: "pending",
        salary: "$130k - $170k",
    },
    {
        id: "4",
        jobTitle: "DevOps Engineer",
        company: "Microsoft",
        location: "Redmond, WA",
        appliedDate: "2024-01-12",
        status: "rejected",
        salary: "$120k - $160k",
    },
    {
        id: "5",
        jobTitle: "UI/UX Designer",
        company: "Apple",
        location: "Cupertino, CA",
        appliedDate: "2024-01-11",
        status: "accepted",
        salary: "$110k - $150k",
    },
    {
        id: "6",
        jobTitle: "Machine Learning Engineer",
        company: "OpenAI",
        location: "San Francisco, CA",
        appliedDate: "2024-01-10",
        status: "interview",
        salary: "$180k - $250k",
    },
    {
        id: "7",
        jobTitle: "Software Engineer",
        company: "Netflix",
        location: "Los Gatos, CA",
        appliedDate: "2024-01-09",
        status: "reviewing",
        salary: "$140k - $190k",
    },
    {
        id: "8",
        jobTitle: "Data Scientist",
        company: "Uber",
        location: "San Francisco, CA",
        appliedDate: "2024-01-08",
        status: "pending",
        salary: "$130k - $170k",
    },
];

export default function JobTable() {
    return (
        <div className="w-full">
            <DataTable columns={columns} data={data} />
        </div>
    );
}