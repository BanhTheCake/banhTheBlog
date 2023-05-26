import { FC } from 'react';
import ContentItem from '../categories/ContentItem';
import OptionsHandlePost from '../blogs/OptionsHandlePost';
import Button from '../global/Button';
import { IoOptionsOutline } from 'react-icons/io5';
import Pagination from '../global/Pagination';
import { useGetPostByUserIdQuery } from '@/generated';
import { graphQLClient } from '@/config/graphqlClient';
import { LIMIT } from '@/pages';
import { useRouter } from 'next/router';
import { useDataUser } from '@/lib/States/user.state';

interface PostsProps {
    userId: string;
}

const Posts: FC<PostsProps> = ({ userId }) => {
    const router = useRouter();
    const [user] = useDataUser();

    let page = 1;
    if (router.query?.page && typeof router.query.page === 'string') {
        page = parseInt(router.query.page);
    }
    const { data: postsRes, isLoading } = useGetPostByUserIdQuery(
        graphQLClient,
        {
            userId,
            limit: LIMIT,
            page,
        }
    );

    const posts = postsRes?.postsByUserId?.PostPagination;
    const totalPage = postsRes?.postsByUserId?.totalPage;
    const isOwner = user?._id === userId;

    return (
        <>
            <div className="bg-white shadow-sm rounded-md">
                <h2 className="p-4 font-semibold text-3xl border-b">
                    {isOwner ? 'Your posts' : 'All posts'}
                </h2>
                {posts && posts?.[0] ? (
                    <>
                        <ContentItem data={posts[0]} className="border-none ">
                            {isOwner ? (
                                <OptionsHandlePost post={posts[0]}>
                                    <Button
                                        variant={'text'}
                                        className="aspect-square ml-4"
                                    >
                                        <IoOptionsOutline size={24} />
                                    </Button>
                                </OptionsHandlePost>
                            ) : undefined}
                        </ContentItem>
                    </>
                ) : (
                    <p className="p-4 py-6 text-center text-xl font-medium text-black/70">
                        No blogs in this time
                    </p>
                )}
            </div>
            {posts &&
                posts.slice(1).length > 0 &&
                posts.slice(1).map((item) => {
                    return (
                        <ContentItem
                            key={item._id}
                            data={item}
                            className="bg-white shadow-sm"
                        >
                            {isOwner ? (
                                <OptionsHandlePost post={item}>
                                    <Button
                                        variant={'text'}
                                        className="aspect-square ml-4"
                                    >
                                        <IoOptionsOutline size={24} />
                                    </Button>
                                </OptionsHandlePost>
                            ) : undefined}
                        </ContentItem>
                    );
                })}
            {totalPage && (
                <div className="p-4 rounded-md bg-white shadow-sm">
                    <Pagination displayPage={3} totalPage={totalPage} />
                </div>
            )}
        </>
    );
};

export default Posts;
