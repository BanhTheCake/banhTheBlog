import cn from '@/lib/Utils/cn';
import { FC } from 'react';
import Skeleton from '../Skeleton';

interface CardVerticalSkeletonProps {
    className?: string;
}

const CardVerticalSkeleton: FC<CardVerticalSkeletonProps> = ({ className }) => {
    return (
        <div
            className={cn(
                'border rounded-md shadow-sm p-4 flex flex-col space-y-3',
                className
            )}
        >
            <div className="flex space-x-3 items-center">
                <Skeleton className="w-12 aspect-square rounded-full" />
                <div className="flex flex-col">
                    <Skeleton className="h-3 w-[200px] max-w-full mb-2" />
                    <Skeleton className="h-3 w-[200px] max-w-full" />
                </div>
            </div>
            <Skeleton className="w-full h-5" />
            <Skeleton className="w-full h-5" />
            <Skeleton className="w-full h-3" />
            <div className="flex flex-wrap">
                <Skeleton className="h-8 w-[140px] mr-1 mb-1" />
                <Skeleton className="h-8 w-[140px]" />
            </div>
            <div className="flex items-center w-full justify-between">
                <Skeleton className="h-5 w-[180px] max-w-full" />
                <Skeleton className="w-12 aspect-square rounded-full" />
            </div>
        </div>
    );
};

export default CardVerticalSkeleton;
