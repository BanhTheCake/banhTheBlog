import { graphQLClient } from '@/config/graphqlClient';
import { useGetRelatedPostsQuery } from '@/generated';
import { LIMIT } from '@/pages';
import { FC } from 'react';
import { GiTomato } from 'react-icons/gi';
import Link from 'next/link';
import CardVertical from '../global/CardVertical';

interface RelatedPostsProps {
    categories: string[];
    currentId: string;
}

const RelatedPosts: FC<RelatedPostsProps> = ({ categories, currentId }) => {
    const { data, isLoading } = useGetRelatedPostsQuery(graphQLClient, {
        categories,
        limit: LIMIT,
        currentId,
    });

    const posts = data?.relatedPosts;

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {!posts ||
                (posts.length === 0 && (
                    <div className="flex flex-col justify-center items-center space-y-4">
                        <p className="text-center text-2xl ">
                            No blogs at this time. Sorry !!
                        </p>
                        <Link href={'/'} className="flex">
                            <GiTomato
                                size={70}
                                className="fill-red-600 hover:fill-red-700 transition-all"
                            />
                        </Link>
                    </div>
                ))}
            {posts && posts.length > 0 && (
                <>
                    <h4 className="font-semibold text-3xl pb-4">
                        <p className="inline-flex text-red-600">Tomato</p> Next
                    </h4>
                    <div className="flex flex-col space-y-4">
                        {posts.map((post) => {
                            return <CardVertical key={post._id} data={post} />;
                        })}
                    </div>
                </>
            )}
        </>
    );
};

export default RelatedPosts;
