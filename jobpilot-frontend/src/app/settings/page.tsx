"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { User, Bell, CreditCard, Settings2 } from "lucide-react";

export default function Settings() {
    const [notifications, setNotifications] = useState({
        email: true,
        push: false,
        sms: false,
        jobAlerts: true,
        applicationUpdates: true,
        weeklyDigest: false,
    });

    return (
        <div className="p-4 md:p-8 pt-20 md:pt-8 space-y-6">
            <div>
                <h1 className="text-3xl font-bold mb-2">Settings</h1>
                <p className="text-muted-foreground">
                    Manage your account and preferences
                </p>
            </div>

            <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="profile" className="flex items-center gap-2">
                        <User size={16} />
                        <span className="hidden sm:inline">Profile</span>
                    </TabsTrigger>
                    <TabsTrigger value="preferences" className="flex items-center gap-2">
                        <Settings2 size={16} />
                        <span className="hidden sm:inline">Preferences</span>
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="flex items-center gap-2">
                        <Bell size={16} />
                        <span className="hidden sm:inline">Notifications</span>
                    </TabsTrigger>
                    <TabsTrigger value="billing" className="flex items-center gap-2">
                        <CreditCard size={16} />
                        <span className="hidden sm:inline">Billing</span>
                    </TabsTrigger>
                </TabsList>

                {/* Profile Tab */}
                <TabsContent value="profile" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>
                                Update your personal information and profile picture
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Avatar Section */}
                            <div className="flex items-center gap-4">
                                <Avatar className="h-20 w-20">
                                    <AvatarImage src="" alt="Profile" />
                                    <AvatarFallback>KV</AvatarFallback>
                                </Avatar>
                                <div className="space-y-2">
                                    <Button variant="outline" size="sm">
                                        Change Photo
                                    </Button>
                                    <p className="text-xs text-muted-foreground">
                                        JPG, GIF or PNG. Max size of 2MB
                                    </p>
                                </div>
                            </div>

                            <Separator />

                            {/* Form Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input id="firstName" defaultValue="Kevin" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input id="lastName" defaultValue="Smith" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    defaultValue="kevin@example.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    defaultValue="+1 (555) 123-4567"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="bio">Bio</Label>
                                <Textarea
                                    id="bio"
                                    placeholder="Tell us about yourself..."
                                    defaultValue="Experienced full-stack developer with a passion for building scalable web applications."
                                    rows={4}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="location">Location</Label>
                                <Input
                                    id="location"
                                    defaultValue="San Francisco, CA"
                                />
                            </div>

                            <div className="flex justify-end gap-2">
                                <Button variant="outline">Cancel</Button>
                                <Button>Save Changes</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Preferences Tab */}
                <TabsContent value="preferences" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Job Preferences</CardTitle>
                            <CardDescription>
                                Set your job search preferences and criteria
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="jobTitle">Desired Job Title</Label>
                                <Input
                                    id="jobTitle"
                                    defaultValue="Senior Frontend Engineer"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="jobType">Job Type</Label>
                                    <Select defaultValue="remote">
                                        <SelectTrigger id="jobType">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="remote">Remote</SelectItem>
                                            <SelectItem value="hybrid">Hybrid</SelectItem>
                                            <SelectItem value="onsite">Onsite</SelectItem>
                                            <SelectItem value="any">Any</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="experience">Experience Level</Label>
                                    <Select defaultValue="senior">
                                        <SelectTrigger id="experience">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="entry">Entry Level</SelectItem>
                                            <SelectItem value="mid">Mid Level</SelectItem>
                                            <SelectItem value="senior">Senior</SelectItem>
                                            <SelectItem value="lead">Lead</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="minSalary">Minimum Salary</Label>
                                    <Input
                                        id="minSalary"
                                        type="number"
                                        defaultValue="120000"
                                        placeholder="120000"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="maxSalary">Maximum Salary</Label>
                                    <Input
                                        id="maxSalary"
                                        type="number"
                                        defaultValue="180000"
                                        placeholder="180000"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="skills">Skills (comma-separated)</Label>
                                <Input
                                    id="skills"
                                    defaultValue="React, TypeScript, Node.js, Next.js"
                                />
                            </div>

                            <div className="flex justify-end gap-2">
                                <Button variant="outline">Cancel</Button>
                                <Button>Save Preferences</Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Display Settings</CardTitle>
                            <CardDescription>
                                Customize how you see information
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="theme">Theme</Label>
                                <Select defaultValue="system">
                                    <SelectTrigger id="theme">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="light">Light</SelectItem>
                                        <SelectItem value="dark">Dark</SelectItem>
                                        <SelectItem value="system">System</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="language">Language</Label>
                                <Select defaultValue="en">
                                    <SelectTrigger id="language">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="en">English</SelectItem>
                                        <SelectItem value="es">Spanish</SelectItem>
                                        <SelectItem value="fr">French</SelectItem>
                                        <SelectItem value="de">German</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex justify-end gap-2">
                                <Button variant="outline">Cancel</Button>
                                <Button>Save Settings</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Notifications Tab */}
                <TabsContent value="notifications" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Notification Preferences</CardTitle>
                            <CardDescription>
                                Manage how you receive notifications
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Email Notifications</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Receive notifications via email
                                        </p>
                                    </div>
                                    <Switch
                                        checked={notifications.email}
                                        onCheckedChange={(checked) =>
                                            setNotifications({
                                                ...notifications,
                                                email: checked,
                                            })
                                        }
                                    />
                                </div>

                                <Separator />

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Push Notifications</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Receive push notifications on your device
                                        </p>
                                    </div>
                                    <Switch
                                        checked={notifications.push}
                                        onCheckedChange={(checked) =>
                                            setNotifications({
                                                ...notifications,
                                                push: checked,
                                            })
                                        }
                                    />
                                </div>

                                <Separator />

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>SMS Notifications</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Receive text messages for important updates
                                        </p>
                                    </div>
                                    <Switch
                                        checked={notifications.sms}
                                        onCheckedChange={(checked) =>
                                            setNotifications({
                                                ...notifications,
                                                sms: checked,
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            <Separator />

                            <div>
                                <h3 className="text-lg font-medium mb-4">
                                    Notification Types
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>Job Alerts</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Get notified about new job postings
                                            </p>
                                        </div>
                                        <Switch
                                            checked={notifications.jobAlerts}
                                            onCheckedChange={(checked) =>
                                                setNotifications({
                                                    ...notifications,
                                                    jobAlerts: checked,
                                                })
                                            }
                                        />
                                    </div>

                                    <Separator />

                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>Application Updates</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Status changes on your applications
                                            </p>
                                        </div>
                                        <Switch
                                            checked={notifications.applicationUpdates}
                                            onCheckedChange={(checked) =>
                                                setNotifications({
                                                    ...notifications,
                                                    applicationUpdates: checked,
                                                })
                                            }
                                        />
                                    </div>

                                    <Separator />

                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>Weekly Digest</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Weekly summary of your job search activity
                                            </p>
                                        </div>
                                        <Switch
                                            checked={notifications.weeklyDigest}
                                            onCheckedChange={(checked) =>
                                                setNotifications({
                                                    ...notifications,
                                                    weeklyDigest: checked,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-2">
                                <Button variant="outline">Cancel</Button>
                                <Button>Save Preferences</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Billing Tab */}
                <TabsContent value="billing" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Current Plan</CardTitle>
                            <CardDescription>
                                Manage your subscription and billing
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="rounded-lg border p-6 bg-muted/50">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-2xl font-bold">Free Plan</h3>
                                        <p className="text-muted-foreground">
                                            Basic features for job seekers
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-3xl font-bold">$0</p>
                                        <p className="text-sm text-muted-foreground">/month</p>
                                    </div>
                                </div>
                                <ul className="space-y-2 mb-4">
                                    <li className="flex items-center gap-2">
                                        <span className="text-green-500">✓</span>
                                        <span>Up to 10 applications per month</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-green-500">✓</span>
                                        <span>Basic job alerts</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-green-500">✓</span>
                                        <span>Application tracking</span>
                                    </li>
                                </ul>
                                <Button className="w-sm">Upgrade to Premium</Button>
                            </div>

                            <Separator />

                            <div>
                                <h3 className="text-lg font-medium mb-4">Premium Plan</h3>
                                <div className="rounded-lg border p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h4 className="text-xl font-bold">Premium</h4>
                                            <p className="text-sm text-muted-foreground">
                                                Unlock all features
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-bold">$29</p>
                                            <p className="text-sm text-muted-foreground">
                                                /month
                                            </p>
                                        </div>
                                    </div>
                                    <ul className="space-y-2">
                                        <li className="flex items-center gap-2">
                                            <span className="text-green-500">✓</span>
                                            <span>Unlimited applications</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="text-green-500">✓</span>
                                            <span>AI-powered resume optimization</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="text-green-500">✓</span>
                                            <span>Priority support</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="text-green-500">✓</span>
                                            <span>Advanced analytics</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="text-green-500">✓</span>
                                            <span>Custom job alerts</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Payment Method</CardTitle>
                            <CardDescription>
                                Manage your payment information
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                No payment method added yet
                            </p>
                            <Button variant="outline">Add Payment Method</Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}