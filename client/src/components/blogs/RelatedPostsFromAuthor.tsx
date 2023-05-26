import { graphQLClient } from '@/config/graphqlClient';
import { useGetRelatedPostsQuery } from '@/generated';
import { ICategory } from '@/lib/Types/Category';
import { LIMIT } from '@/pages';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

interface RelatedPostsFromAuthorProps {
    userId: string;
    currentId: string;
}

const Categories = ({ data }: { data: ICategory[] }) => {
    return (
        <div className="flex flex-wrap">
            {data &&
                data.length > 0 &&
                data.map((item) => {
                    return (
                        <p
                            key={item._id}
                            className="inline-flex mr-1.5 mb-1 text-sm text-black/80"
                        >
                            #{item.label}
                        </p>
                    );
                })}
        </div>
    );
};

const RelatedPostsFromAuthor: FC<RelatedPostsFromAuthorProps> = ({
    currentId,
    userId,
}) => {
    const { data: postsRes, isLoading } = useGetRelatedPostsQuery(
        graphQLClient,
        {
            currentId,
            limit: LIMIT,
            userId,
        }
    );

    const posts = postsRes?.relatedPosts;

    if (isLoading) return null;

    return (
        <>
            {posts && posts.length > 0 && (
                <div className="flex flex-col w-80 rounded-md shadow-md bg-white border">
                    <div className="w-full relative aspect-video rounded-t-md overflow-hidden">
                        <Image
                            src={
                                posts[0].user.img ||
                                'https://images.unsplash.com/photo-1683360467368-45591bbccaeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
                            }
                            alt={posts[0].user.username}
                            fill
                            priority
                            className="object-cover"
                        />
                    </div>
                    <h4 className="font-semibold text-xl p-4">
                        More from{' '}
                        <Link
                            href={`/${posts[0].user._id}`}
                            className="inline-flex text-blue-500"
                        >
                            {posts[0].user.username}
                        </Link>
                    </h4>
                    <div className="flex flex-wrap">
                        {posts.map((post) => {
                            return (
                                <Link
                                    key={post._id}
                                    href={`/blog/${post.slug}`}
                                    className="flex flex-col  border-t-[1.5px] border-slate-300 w-full px-4 py-2 space-y-1 group"
                                >
                                    <p className="group-hover:text-purple-700 transition-all">
                                        {post.title}
                                    </p>
                                    <Categories data={post.categories} />
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
};

export default RelatedPostsFromAuthor;
