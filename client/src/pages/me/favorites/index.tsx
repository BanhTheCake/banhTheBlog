import OptionsHandlePost from '@/components_v2/blog/OptionsHandle';
import Button from '@/components_v2/global/Button';
import Pagination from '@/components_v2/global/Pagination';
import { useGetFavoritesPostsQuery } from '@/generated';
import RootLayout from '@/layouts/RootLayout';
import usePrivateGraphClient from '@/lib/Hooks/usePrivateGraphClient';
import { useDataUser } from '@/lib/States/user.state';
import { LIMIT } from '@/pages';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { IoOptionsOutline } from 'react-icons/io5';
import CardVertical from '@/components_v2/global/CardVertical';
import { useQueryClient } from 'react-query';

const FavoritesBlogs = () => {
    const { graphQLClient, isReady } = usePrivateGraphClient();
    const router = useRouter();
    const [user] = useDataUser();
    const queryClient = useQueryClient();

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

    const onSuccessDelete = () => {
        queryClient.invalidateQueries({
            predicate(query) {
                const queryKey = query.queryKey[0];
                if (typeof queryKey === 'string') {
                    return queryKey.toLowerCase().includes('post');
                }
                return false;
            },
        });
    };

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
                            <CardVertical
                                data={posts[0]}
                                className="border-none "
                            >
                                {user?._id && user._id === posts[0].user._id ? (
                                    <OptionsHandlePost
                                        post={posts[0]}
                                        onSuccessDelete={onSuccessDelete}
                                    >
                                        <Button
                                            variant={'text'}
                                            className="aspect-square ml-4"
                                        >
                                            <IoOptionsOutline size={24} />
                                        </Button>
                                    </OptionsHandlePost>
                                ) : undefined}
                            </CardVertical>
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
                            <CardVertical
                                key={item._id}
                                data={item}
                                className="bg-white shadow-sm"
                            >
                                {isOwner ? (
                                    <OptionsHandlePost
                                        post={item}
                                        onSuccessDelete={onSuccessDelete}
                                    >
                                        <Button
                                            variant={'text'}
                                            className="aspect-square ml-4"
                                        >
                                            <IoOptionsOutline size={24} />
                                        </Button>
                                    </OptionsHandlePost>
                                ) : undefined}
                            </CardVertical>
                        );
                    })}
                {totalPage ? (
                    <div className="p-4 rounded-md bg-white shadow-sm">
                        <Pagination displayPage={3} totalPage={totalPage} />
                    </div>
                ) : null}
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
