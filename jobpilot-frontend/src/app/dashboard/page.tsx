"use client";
import { useState } from 'react';
import { Menu, Home, Settings, Users, FileText, ChevronLeft, ChevronRight, PanelRight, PanelLeft, Newspaper, User } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import Search from '@/components/search';
import StatItem from '@/components/stats-item';

interface NavItemProps {
    icon: React.ReactNode;
    label: String;
    href?: String;
    onClick?: () => void;
    isCollapsed?: boolean;
}

const statsData = [
    {
        id: 0,
        label: "Applied",
        count: 45,
        total: 100,
        color: "bg-blue-500"
    },
    {
        id: 1,
        label: "In Review",
        count: 12,
        total: 100,
        color: "bg-yellow-500"
    },
    {
        id: 2,
        label: "Interviews",
        count: 8,
        total: 100,
        color: "bg-purple-500"
    },
    {
        id: 3,
        label: "Offers",
        count: 3,
        total: 100,
        color: "bg-green-500"
    },
    {
        id: 4,
        label: "Rejected",
        count: 22,
        total: 100,
        color: "bg-red-500"
    }
]

export default function Dashboard({
    job
}:{
    job:Job[]
}) {
    const [open, setOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="flex h-screen bg-background">
            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                <div className="p-4 md:p-8 pt-20 md:pt-8 space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Overview</h1>
                        <p className="text-muted-foreground">Track your job application progress</p>
                    </div>
                    
                    <Search />

                    {/*Dummy Charts*/}

                    {/* Stats Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Stats</CardTitle>
                            <CardDescription>Job application statistics</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className='flex flex-col gap-4'>
                                {statsData.map((item) => (
                                    <StatItem 
                                        key={item.id} 
                                        label={item.label} 
                                        color={item.color} 
                                        count={item.count} 
                                        total={item.total} 
                                    />
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

