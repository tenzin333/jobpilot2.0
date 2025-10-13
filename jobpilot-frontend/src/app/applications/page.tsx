"use client";

import JobTable from "./job-table";

export default function Application() {
    return (
        <div className='p-4'>
            <div className='flex flex-col gap-3'>
                <div className='flex flex-col gap-3 py-4'>
                        <h1 className="text-3xl font-bold mb-2">My Applications</h1>
                        <p className="text-muted-foreground">Keep track of the job applications which you have applied to</p>
                </div>
                <JobTable />
            </div>

        </div>
    )
}