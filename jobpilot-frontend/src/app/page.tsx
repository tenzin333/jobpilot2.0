"use server";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Dashboard from "./dashboard/page";
import Sidebar from "@/components/side-bar";
import { useSearchParams } from "next/navigation";
import Router from "next/router";
import getJobs from "./api/job-actions";


export default async function Home({
  searchParams
}:{
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {

  const currentSearchParams =  await searchParams;
  const keyword = currentSearchParams["keyword"] ?? '';
  const jobType = currentSearchParams["jobType"] ?? '';
  const location = currentSearchParams["location"] ?? '';

  const job = await getJobs(keyword,jobType,location);

  return (
    <div className='flex flex-col w-full'>
      <Dashboard job={job} />
    </div>
  )
}