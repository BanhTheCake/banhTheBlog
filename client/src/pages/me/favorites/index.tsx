import OptionsHandlePost from '@/components/blogs/OptionsHandlePost';
import ContentItem from '@/components/categories/ContentItem';
import Button from '@/components/global/Button';
import Pagination from '@/components/global/Pagination';
import { useGetFavoritesPostsQuery } from '@/generated';
import RootLayout from '@/layouts/RootLayout';
import usePrivateGraphClient from '@/lib/Hooks/usePrivateGraphClient';
import { useDataUser } from '@/lib/States/user.state';
import { LIMIT } from '@/pages';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';
import { IoOptionsOutline } from 'react-icons/io5';

const FavoritesBlogs = () => {
    const { graphQLClient, isReady } = usePrivateGraphClient();
    const router = useRouter();
    const [user] = useDataUser();

    let page = 1;
    if (router.query?.page && typeof router.query.page === 'string') {
        page = parseInt(router.query.page);
    }

    const { data: postsRes, isLoading } = useGetFavoritesPostsQuery(
        graphQLClient,
        {
            limit: LIMIT,
            page,
        },
        {
            enabled: isReady,
        }
    );

    const posts = postsRes?.getAllFavoritePost.PostPagination;
    const totalPage = postsRes?.getAllFavoritePost.totalPage;

    console.log('-----: ', posts);

    if (isLoading) return <div>Loading...</div>;

    return (
        <>
            <div className="flex flex-1 flex-col space-y-3 bg-gray-200/40 p-4">
                <div className="bg-white shadow-sm rounded-md">
                    <h2 className="p-4 font-semibold text-3xl border-b">
                        Your favorites posts
                    </h2>
                    {posts?.[0] ? (
                        <>
                            <ContentItem
                                data={posts[0]}
                                className="border-none "
                            >
                                {user?._id && user._id === posts[0].user._id ? (
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
                            You don&apos;t have any favorites post
                        </p>
                    )}
                </div>
                {posts &&
                    posts.slice(1).length > 0 &&
                    posts.slice(1).map((item) => {
                        const isOwner = user?._id && user._id === item.user._id;
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
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {},
    };
};

FavoritesBlogs.getLayout = function getLayout(page: ReactElement) {
    return <RootLayout variant={'noPadding'}>{page}</RootLayout>;
};

export default FavoritesBlogs;
