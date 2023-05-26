import { useUpdateUserMutation } from '@/generated';
import isGraphQLError from '@/lib/Guards/isGraphqlError';
import usePrivateGraphClient from '@/lib/Hooks/usePrivateGraphClient';
import useUpload from '@/lib/Hooks/useUpload';
import { setDataUser, useDataUser } from '@/lib/States/user.state';
import { Author, User } from '@/lib/Types/User';
import cn from '@/lib/Utils/cn';
import Image from 'next/image';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { SlNote } from 'react-icons/sl';
import { useQueryClient } from 'react-query';

interface AvatarProps {
    author: Author;
    className: string;
    isOwner: boolean;
}

const Avatar = ({ className, author, isOwner }: AvatarProps) => {
    const { onUpload, isUploading } = useUpload();
    const { graphQLClient } = usePrivateGraphClient();
    const queryClient = useQueryClient();

    const [img, setImg] = useState(author.img);

    const { mutate: update, isLoading: isUpdating } =
        useUpdateUserMutation(graphQLClient);

    const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0] || isLoading || !isOwner) return;
        const url = await onUpload(e.target.files[0]);
        setImg(url);
        update(
            { img: url },
            {
                onSuccess(data) {
                    const isOk = data.updateDataUser.ok;
                    if (!isOk) {
                        toast.error('Please try again...');
                        return;
                    }
                    setImg(url);
                    setDataUser({ img: url });
                    console.log('Done');
                    queryClient.invalidateQueries({
                        predicate(query) {
                            const queryKey = query.queryKey[0];
                            if (typeof queryKey === 'string') {
                                return queryKey.toLowerCase().includes('post');
                            }
                            return false;
                        },
                    });
                },
                onError(error) {
                    if (isGraphQLError(error)) {
                        console.log(error.response.errors);
                    }
                    toast.error('Please try again...');
                },
            }
        );
    };

    const isLoading = isUploading || isUpdating;

    return (
        <div className={cn('relative', className)}>
            <Image
                src={
                    img ||
                    'https://images.unsplash.com/photo-1683360467368-45591bbccaeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
                }
                alt={author.username}
                fill
                priority
                className="object-cover"
            />
            {isOwner && (
                <>
                    <label
                        htmlFor={author.createdAt}
                        className={cn(
                            'absolute inset-0 bg-transparent transition-all hover:bg-black/30 cursor-pointer md:text-[30px] flex justify-center items-center text-slate-100 group',
                            isLoading && 'bg-black/30 cursor-not-allowed'
                        )}
                    >
                        {isLoading ? (
                            <AiOutlineLoading3Quarters className="animate-twSpin animate-infinite m-auto" />
                        ) : (
                            <SlNote className="hidden group-hover:flex animate-fadeIn animate-duration-150" />
                        )}
                    </label>
                    <input
                        type={isLoading ? 'text' : 'file'}
                        id={author.createdAt}
                        hidden
                        onChange={onChange}
                    />
                </>
            )}
        </div>
    );
};

export default Avatar;
