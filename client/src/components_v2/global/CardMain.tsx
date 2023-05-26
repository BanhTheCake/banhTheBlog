import Image from 'next/image';
import Link from 'next/link';
import { FC, MouseEvent } from 'react';
import { GoPrimitiveDot } from 'react-icons/go';
import { enUS } from 'date-fns/locale';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { IPost } from '@/lib/Types/Post';
import Button from './Button';

interface CardMainProps {
    data: IPost;
}

const CardMain: FC<CardMainProps> = ({ data }) => {
    const router = useRouter();
    const onNavigate =
        (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) =>
        (value: string) => {
            e.preventDefault();
            router.push(value);
        };

    return (
        <Link
            href={`/blog/${data.slug}`}
            className="relative w-full aspect-square md:aspect-video shadow-md flex rounded-sm"
        >
            <Image
                src={data.img}
                alt={data.title}
                fill
                className="object-cover object-center rounded-sm"
            />
            <div className="absolute bottom-0 right-0 left-0 h-[100%] md:h-[70%] bg-gradient-to-b from-transparent  to-black/60 to-100% rounded-sm" />
            <div className="absolute bottom-0 left-0 right-0 flex flex-col space-y-3 p-6">
                <div className="flex items-center space-x-1 text-white">
                    <p className="capitalize">{data.user.username}</p>
                    <GoPrimitiveDot size={16} className="fill-slate-50" />
                    <p>
                        {format(new Date(data.createdAt), 'dd MMM yyyy', {
                            locale: enUS,
                        })}
                    </p>
                </div>
                <p className="font-semibold text-white text-2xl">
                    {data.title}
                </p>
                <p className="text-white/90 line-clamp-3">
                    {data.subContent}...
                </p>
                <div className="flex space-x-3">
                    {data?.categories?.map((item) => {
                        return (
                            <Button
                                key={item.slug}
                                variant={'text'}
                                className="rounded-full text-white py-0.5 border-[1.5px] font-normal"
                                onClick={(e) =>
                                    onNavigate(e)(
                                        `/categories?name=${item.slug}`
                                    )
                                }
                            >
                                {item.label}
                            </Button>
                        );
                    })}
                </div>
            </div>
        </Link>
    );
};

export default CardMain;
