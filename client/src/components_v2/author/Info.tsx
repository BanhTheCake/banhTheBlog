import { graphQLClient } from '@/config/graphqlClient';
import { useGetDataAuthorQuery } from '@/generated';
import { useDataUser } from '@/lib/States/user.state';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { FaBirthdayCake } from 'react-icons/fa';
import Author from '.';
import HeadTitle from '../global/HeadTitle';

interface InfoProps {
    userId: string;
}

const Info: FC<InfoProps> = ({ userId }) => {
    const router = useRouter();
    const [user] = useDataUser();

    const { data, isLoading } = useGetDataAuthorQuery(graphQLClient, {
        userId,
    });

    const author = data?.getBaseUser;
    const isOwner = user?._id === userId;

    useEffect(() => {
        if (data && !author) {
            router.replace('/404');
        }
    }, [data, author, router]);

    if (!author) return null;

    return (
        <>
            <HeadTitle
                title={author.username}
                content={author.username}
                name={author.username}
                keyData={author.email}
            />
            <div className="rounded-md shadow-sm bg-white">
                <div className="relative">
                    <div className="w-full aspect-[16/4] md:aspect-[16/3] bg-black rounded-t-md" />
                    <Author.Avatar
                        author={author}
                        isOwner={isOwner}
                        className="md:w-28 w-14 aspect-square rounded-full border-4 md:border-8 border-black overflow-hidden absolute bottom-0 left-8 md:left-[50%] md:translate-x-[-50%] translate-y-[50%]"
                    />
                </div>
                <div className="p-4 pt-14 md:pt-20 pb-6 md:pb-10 flex flex-col justify-center items-start md:items-center space-y-3">
                    <h3 className="font-medium text-2xl capitalize">
                        {author.username}
                    </h3>
                    <p className="text-black/60 ">{author.email}</p>
                    <div className="text-black/60 flex space-x-4 items-end">
                        <FaBirthdayCake size={24} />
                        <span>
                            Joined on{' '}
                            {format(new Date(author.createdAt), 'dd MMM yyyy', {
                                locale: enUS,
                            })}
                        </span>
                        <FaBirthdayCake size={24} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Info;
