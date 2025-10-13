"use client";
import { useState } from 'react';
import { Menu, Home, Settings, FileText, PanelRight, PanelLeft, Newspaper, User } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

interface NavItemProps {
    icon: React.ReactNode;
    label: string;
    href: string;
    onClick?: () => void;
    isCollapsed?: boolean;
}

const navItems = [
    {
        icon: <Home size={20} />,
        label: "Dashboard",
        href: "/"
    },
    {
        icon: <Newspaper size={20} />,
        label: "Job Feeds",
        href: "/jobfeed"
    },
    {
        icon: <FileText size={20} />,
        label: "Applications",
        href: "/applications"
    },
    {
        icon: <Settings size={20} />,
        label: "Settings",
        href: "/settings"
    }
] as const;

export default function Sidebar() {
    const [open, setOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <>
            {/* Desktop Sidebar */}
            <aside
                className={cn(
                    "hidden md:flex border-r bg-sidebar flex-col transition-all duration-300 relative",
                    isCollapsed ? "w-16" : "w-64"
                )}
            >
                <div className="p-4 border-b flex items-center justify-between">
                    {!isCollapsed && <h2 className="text-lg font-semibold">Job Pilot</h2>}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className={cn("ml-auto", isCollapsed && "mx-auto")}
                    >
                        {isCollapsed ? <PanelRight size={20} /> : <PanelLeft size={20} />}
                    </Button>
                </div>
                <nav className="flex-1 py-4 space-y-1 px-2">
                    {navItems.map((item) => (
                        <NavItem
                            key={item.href}
                            icon={item.icon}
                            label={item.label}
                            href={item.href}
                            isCollapsed={isCollapsed}
                        />
                    ))}
                </nav>

                <div className='absolute bottom-0 left-0 right-0 px-4 border-t py-4 bg-sidebar'>
                    <div className='flex items-center gap-3'>
                        <div className='flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center'>
                            <User size={18} />
                        </div>
                        {!isCollapsed && (
                            <div className='flex flex-col'>
                                <p className='text-sm font-semibold'>Kevin</p>
                                <p className='text-xs text-muted-foreground'>kevin@example.com</p>
                            </div>
                        )}
                    </div>
                </div>
            </aside>

            {/* Mobile Sidebar using Sheet */}
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden fixed top-4 left-4 z-40"
                    >
                        <Menu size={20} />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0">
                    <div className="flex flex-col h-full">
                        <div className="p-4 border-b">
                            <h2 className="text-lg font-semibold">Job Pilot</h2>
                        </div>
                        <nav className="flex-1 py-4 space-y-1 px-2">
                            {navItems.map((item) => (
                                <NavItem
                                    key={item.href}
                                    icon={item.icon}
                                    label={item.label}
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                />
                            ))}
                        </nav>
                        
                        <div className='px-4 border-t py-4'>
                            <div className='flex items-center gap-3'>
                                <div className='flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center'>
                                    <User size={18} />
                                </div>
                                <div className='flex flex-col'>
                                    <p className='text-sm font-semibold'>Kevin</p>
                                    <p className='text-xs text-muted-foreground'>kevin@example.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
}

function NavItem({
    icon,
    label,
    href,
    onClick,
    isCollapsed = false
}: NavItemProps) {
    return (
        <Button
            variant="ghost"
            className={cn(
                "w-full justify-start",
                isCollapsed && "justify-center px-2"
            )}
            onClick={onClick}
            asChild
        >
            <Link href={href}>
                <span className="flex-shrink-0">{icon}</span>
                {!isCollapsed && <span className="ml-3">{label}</span>}
            </Link>
        </Button>
    );
}