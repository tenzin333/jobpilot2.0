import { cn } from "@/lib/utils";

interface StatItemProps {
    label: string;
    count: number;
    total: number;
    color: string;
}

export default function StatItem({ label, count, total, color }: StatItemProps) {
    const percentage = (count / total) * 100;
    
    return (
        <div className='flex flex-col gap-1'>
            <div className='flex justify-between items-center'>
                <p className='text-sm font-medium'>{label}</p>
                <p className='text-sm text-muted-foreground'>{count}</p>
            </div>
            <div className='w-full bg-secondary rounded-full h-2 overflow-hidden'>
                <div 
                    className={cn('h-full transition-all duration-300', color)}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}