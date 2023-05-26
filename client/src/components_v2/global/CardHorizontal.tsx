import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { GoPrimitiveDot } from 'react-icons/go';
import cn from '@/lib/Utils/cn';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { IPost } from '@/lib/Types/Post';
import Button from './Button';

interface CardHorizontalProps {
    data: IPost;
    className?: string;
    children?: React.ReactElement;
}

const CardHorizontal: FC<CardHorizontalProps> = ({
    data,
    className,
    children,
}) => {
    return (
        <div className={cn('flex flex-col space-y-3', className)}>
            <Link
                href={`/blog/${data.slug}`}
                className="relative aspect-video flex"
            >
                <Image
                    src={data.img}
                    alt={data.title}
                    fill
                    className="object-cover object-center rounded-sm"
                />
            </Link>
            <div className="flex-1 flex flex-col space-y-3">
                <div className="flex space-x-1 items-center ">
                    <Link
                        href={`/${data.user._id}`}
                        className="flex capitalize"
                    >
                        {data.user.username}
                    </Link>
                    <GoPrimitiveDot size={16} />
                    <p>
                        {format(new Date(data.createdAt), 'dd MMM yyyy', {
                            locale: enUS,
                        })}
                    </p>
                </div>
                <Link
                    href={`/blog/${data.slug}`}
                    className="flex space-y-3 flex-col"
                >
                    <p className="font-semibold text-xl">{data.title}</p>
                    <p className="line-clamp-3">{data.subContent}...</p>
                </Link>
                <div className="flex-1 flex">
                    <div className="mt-auto flex flex-wrap items-end">
                        {data?.categories?.map((category) => {
                            return (
                                <Link
                                    key={category.slug}
                                    href={`/categories?name=${category.slug}`}
                                    className="flex"
                                >
                                    <Button
                                        variant={'text'}
                                        className="border-black/80 text-black/80 border-[1.5px] rounded-full py-0.5 mr-3 mb-3"
                                    >
                                        {category.label}
                                    </Button>
                                </Link>
                            );
                        })}
                    </div>
                </div>
                {children && <>{children}</>}
            </div>
        </div>
    );
};

export default CardHorizontal;
