import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { FC, memo } from 'react';
import Button from '../global/Button';
import { AiOutlineHeart } from 'react-icons/ai';
import { IPost } from '@/lib/Types/Post';
import Image from 'next/image';
import cn from '@/lib/Utils/cn';
import Link from 'next/link';
import useLike from '@/lib/Hooks/useLike';

interface CardVerticalProps {
    data: IPost;
    className?: string;
    children?: React.ReactElement;
}

const CardVertical: FC<CardVerticalProps> = ({ data, className, children }) => {
    const { count, like, onLike } = useLike({
        count: data.count,
        favoritesUsers: data.favoritesUser,
        postId: data._id,
    });

    return (
        <div
            className={cn(
                'border rounded-md shadow-sm p-4 flex flex-col space-y-2',
                className
            )}
        >
            <div className="flex space-x-3 items-center">
                <Link
                    href={`/${data.user._id}`}
                    className="relative w-12 aspect-square rounded-full overflow-hidden flex"
                >
                    <Image
                        src={
                            data.user.img ||
                            'https://images.unsplash.com/photo-1683360467368-45591bbccaeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
                        }
                        alt={data.user.username}
                        fill
                        priority
                        className="object-cover"
                    />
                </Link>
                <div className="flex flex-col">
                    <Link href={`/${data.user._id}`} className="capitalize">
                        {data.user.username}
                    </Link>
                    <p className="text-black/60">
                        {format(new Date(data.createdAt), 'dd MMM yyyy', {
                            locale: enUS,
                        })}
                    </p>
                </div>
            </div>
            <Link
                href={`/blog/${data.slug}`}
                className="flex flex-col space-y-1"
            >
                <h3 className="text-2xl font-semibold">{data.title}</h3>
                <p className="text-black/80">{data.subContent}...</p>
            </Link>
            {data.categories.length > 0 && (
                <div className="flex flex-wrap">
                    {data.categories.map((category) => {
                        return (
                            <Link
                                key={category.slug}
                                href={`/categories?name=${category.slug}`}
                                className="flex"
                            >
                                <Button variant={'text'} className="mr-2 mb-2">
                                    #{category.label}
                                </Button>
                            </Link>
                        );
                    })}
                </div>
            )}
            <div className="flex items-center w-full justify-between">
                <p>{count} reactions</p>
                <div className="flex items-center">
                    <Button
                        variant={'text'}
                        className={cn(
                            'aspect-square rounded-full',
                            like && 'bg-red-500 text-white hover:bg-red-400'
                        )}
                        onClick={onLike}
                    >
                        <AiOutlineHeart size={24} />
                    </Button>
                    {/* For btn like delete or update post */}
                    {children && children}
                </div>
            </div>
        </div>
    );
};

export default memo(CardVertical, (prevValue, currentValue) => {
    return prevValue.data._id === currentValue.data._id;
});
