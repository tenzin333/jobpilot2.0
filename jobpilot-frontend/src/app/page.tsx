// src/app/page.tsx
import Dashboard from "@/app/dashboard/page";

interface HomeProps {
  searchParams: {
    keyword?: string;
    location?: string;
    jobType?: string;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  return (
    <div className='flex flex-col w-full'>
      <Dashboard searchParams={searchParams} />
    </div>
  );
}