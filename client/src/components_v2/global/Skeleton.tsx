import cn from '@/lib/Utils/cn';
import { ComponentProps, FC } from 'react';

interface SkeletonProps extends ComponentProps<'div'> {}

const Skeleton: FC<SkeletonProps> = ({ className, ...props }) => {
    return (
        <div
            className={cn('animate-pulse rounded-md bg-gray-200/50', className)}
            {...props}
        />
    );
};

export default Skeleton;
