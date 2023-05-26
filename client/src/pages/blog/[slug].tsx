import RelatedPosts from '@/components/blogs/RelatedPosts';
import RelatedPostsFromAuthor from '@/components/blogs/RelatedPostsFromAuthor';
import CategoriesSidebar from '@/components/categories/CategoriesSidebar';
import Button from '@/components/global/Button';
import DisplayHtml from '@/components/global/TextEditor/DisplayHtml';
import { graphQLClient } from '@/config/graphqlClient';
import {
    useAllCategoriesQuery,
    useGetDetailsPostQuery,
    useGetRelatedPostsQuery,
} from '@/generated';
import RootLayout from '@/layouts/RootLayout';
import { useDataUser } from '@/lib/States/user.state';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { IoOptionsOutline } from 'react-icons/io5';
import { QueryClient, dehydrate } from 'react-query';
import { LIMIT } from '..';
import OptionsHandlePost from '@/components/blogs/OptionsHandlePost';
import Link from 'next/link';
import useLike from '@/lib/Hooks/useLike';
import cn from '@/lib/Utils/cn';

const PostDetails = () => {
    const router = useRouter();
    const slug = router.query?.slug || '';
    const [user] = useDataUser();

    const { like, onLike, setInitValue } = useLike({});

    const { data: postRes, isLoading } = useGetDetailsPostQuery(
        graphQLClient,
        { slug: slug as string },
        {
            enabled: !!slug,
        }
    );

    const post = useMemo(() => {
        if (!postRes?.postBySlug) return undefined;
        setInitValue({
            count: postRes.postBySlug.count,
            favoritesUsers: postRes.postBySlug.favoritesUser,
            postId: postRes.postBySlug._id,
        });
        return postRes.postBySlug;
    }, [postRes, setInitValue]);

    const isWitter = post?.user._id === user?._id;

    const categories = useMemo(() => {
        if (!post?.categories) return null;
        return post.categories.reduce((rs, item) => {
            return [...rs, item['_id']];
        }, [] as string[]);
    }, [post]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {post && (
                <div className="md:p-4 !pb-8 bg-gray-200/30 flex md:space-x-4">
                    <div className="flex flex-1 flex-col space-y-4">
                        <div className="flex flex-col bg-white md:rounded-md md:border shadow-md">
                            <div className="relative w-full aspect-video md:rounded-t-md shadow-sm">
                                <Image
                                    src={post.img}
                                    alt={post.title}
                                    fill
                                    className="object-cover md:rounded-t-md"
                                />
                            </div>
                            <div className="p-4 flex flex-col space-y-2">
                                <div className="flex justify-between items-center">
                                    <div className="flex flex-col">
                                        <Link
                                            href={`/${post.user._id}`}
                                            className="flex font-semibold text-xl capitalize"
                                        >
                                            {post.user.username}
                                        </Link>
                                        <p>
                                            Post on{' '}
                                            {format(
                                                new Date(post.createdAt),
                                                'dd MMM yyyy',
                                                {
                                                    locale: enUS,
                                                }
                                            )}
                                        </p>
                                    </div>
                                    <div className="flex space-x-3 items-center">
                                        <Button
                                            variant={'text'}
                                            className={cn(
                                                'aspect-square rounded-full',
                                                like &&
                                                    'bg-red-500 text-white hover:bg-red-400'
                                            )}
                                            onClick={onLike}
                                        >
                                            <AiOutlineHeart size={24} />
                                        </Button>
                                        {isWitter && (
                                            <>
                                                <OptionsHandlePost post={post}>
                                                    <Button
                                                        variant={'text'}
                                                        className="aspect-square ml-4"
                                                    >
                                                        <IoOptionsOutline
                                                            size={24}
                                                        />
                                                    </Button>
                                                </OptionsHandlePost>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <h1 className="font-semibold text-4xl pb-1.5">
                                    {post.title}
                                </h1>
                                {post.categories && (
                                    <div className="flex flex-wrap">
                                        {post.categories.map((category) => {
                                            return (
                                                <Button
                                                    variant={'text'}
                                                    className="mr-3 mb-3"
                                                    key={category.slug}
                                                >
                                                    #{category.label}
                                                </Button>
                                            );
                                        })}
                                    </div>
                                )}
                                <DisplayHtml
                                    key={post._id}
                                    value={post.content}
                                />
                            </div>
                        </div>
                        {categories && (
                            <div className="bg-white p-4 md:rounded-md border shadow-md">
                                <RelatedPosts
                                    categories={categories}
                                    currentId={post._id}
                                />
                            </div>
                        )}
                    </div>
                    <div className="hidden md:flex flex-col space-y-4">
                        <RelatedPostsFromAuthor
                            userId={post.user._id}
                            currentId={post._id}
                        />
                        <CategoriesSidebar />
                    </div>
                </div>
            )}
        </>
    );
};

PostDetails.getLayout = (page: React.ReactElement) => {
    return <RootLayout variant={'noPadding'}>{page}</RootLayout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const queryClient = new QueryClient();
    const slug = context.query?.slug || '';

    if (!slug)
        return {
            notFound: true,
        };

    const posts = await queryClient.fetchQuery({
        queryKey: useGetDetailsPostQuery.getKey({ slug: slug as string }),
        queryFn: useGetDetailsPostQuery.fetcher(graphQLClient, {
            slug: slug as string,
        }),
    });

    if (!posts?.postBySlug) {
        return {
            notFound: true,
        };
    }

    const detailsPostPromise = queryClient.prefetchQuery(
        useGetDetailsPostQuery.getKey({
            slug: slug as string,
        }),
        useGetDetailsPostQuery.fetcher(graphQLClient, { slug: slug as string })
    );

    const categories = posts.postBySlug.categories.reduce((rs, item) => {
        return [...rs, item['_id']];
    }, [] as string[]);

    const relatedPostByCategoriesPromise = queryClient.prefetchQuery(
        useGetRelatedPostsQuery.getKey({
            categories,
            limit: LIMIT,
            currentId: posts.postBySlug._id,
        }),
        useGetRelatedPostsQuery.fetcher(graphQLClient, {
            categories,
            limit: LIMIT,
            currentId: posts.postBySlug._id,
        })
    );

    const relatedPostByAuthorPromise = queryClient.prefetchQuery(
        useGetRelatedPostsQuery.getKey({
            limit: LIMIT,
            currentId: posts.postBySlug._id,
            userId: posts.postBySlug.user._id,
        }),
        useGetRelatedPostsQuery.fetcher(graphQLClient, {
            userId: posts.postBySlug.user._id,
            limit: LIMIT,
            currentId: posts.postBySlug._id,
        })
    );

    const categoriesPromise = queryClient.prefetchQuery(
        useAllCategoriesQuery.getKey(),
        useAllCategoriesQuery.fetcher(graphQLClient)
    );

    await Promise.all([
        detailsPostPromise,
        relatedPostByCategoriesPromise,
        relatedPostByAuthorPromise,
        categoriesPromise,
    ]);
    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};

export default PostDetails;
