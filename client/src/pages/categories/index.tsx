import { graphQLClient } from '@/config/graphqlClient';
import {
    useAllCategoriesQuery,
    useGetPostBySearchQuery,
    useGetPostsQuery,
} from '@/generated';
import RootLayout from '@/layouts/RootLayout';
import isGraphQLError from '@/lib/Guards/isGraphqlError';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { ReactElement, useMemo } from 'react';
import { QueryClient, dehydrate } from 'react-query';
import { LIMIT } from '..';
import Button from '@/components_v2/global/Button';
import Category from '@/components_v2/category';

const CategoryPage = () => {
    const router = useRouter();
    // name: name of category
    const name = router.query?.name || 'all';

    const { data } = useAllCategoriesQuery(graphQLClient, undefined, {
        onError(err) {
            if (isGraphQLError(err)) {
                console.log(err.response.errors);
            }
        },
    });

    const categories = useMemo(() => {
        if (!data) return null;
        return [{ _id: '', label: 'All', slug: 'all' }, ...data.categories];
    }, [data]);

    const title = useMemo(() => {
        if (!categories || !name) return '';
        if (name === 'all') return '';
        return (
            categories.find((category) => category.slug === name)?.label || ''
        );
    }, [categories, name]);

    const onChangeCategory = (href: string) => {
        router.push({
            query: {
                ...router.query,
                name: href,
            },
        });
    };

    return (
        <div className="w-full flex flex-col space-y-6">
            <div className="py-4 flex flex-col justify-center items-center space-y-3">
                <h2 className="text-4xl font-semibold text-center">
                    HapyTato Blog {title && ` - ${title}`}
                </h2>
                <p className="text-black/80">Do you like potato ?</p>
            </div>
            {categories && (
                <div className="w-full flex">
                    <div className="mx-auto flex items-center flex-nowrap overflow-x-auto space-x-4 pb-3">
                        {categories.map((category) => {
                            return (
                                <Button
                                    key={category._id}
                                    variant={
                                        name === category.slug
                                            ? 'secondary'
                                            : 'text'
                                    }
                                    onClick={() =>
                                        onChangeCategory(category.slug)
                                    }
                                >
                                    {category.label}
                                </Button>
                            );
                        })}
                    </div>
                </div>
            )}
            <Category.InputSearch />
            <Category.Contents />
        </div>
    );
};

CategoryPage.getLayout = (page: ReactElement) => {
    return <RootLayout>{page}</RootLayout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const queryClient = new QueryClient();
    const router = context.query;

    let page = 1;
    let search: Record<string, string> = {};

    if (
        router?.name &&
        typeof router.name === 'string' &&
        router.name !== 'all'
    ) {
        search['categorySlug'] = router.name;
    }
    if (router?.query && typeof router.query === 'string') {
        search['query'] = router.query;
    }
    if (router?.page && typeof router.page === 'string') {
        page = parseInt(router.page);
    }

    const categoriesPromise = queryClient.prefetchQuery(
        useAllCategoriesQuery.getKey(),
        useAllCategoriesQuery.fetcher(graphQLClient),
        {
            staleTime: Infinity,
            cacheTime: Infinity,
        }
    );

    const allPostsPromise = queryClient.prefetchQuery(
        useGetPostBySearchQuery.getKey({
            limit: LIMIT,
            page,
            search,
        }),
        useGetPostBySearchQuery.fetcher(graphQLClient, {
            limit: LIMIT,
            page,
            search,
        })
    );

    await Promise.all([categoriesPromise, allPostsPromise]);

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};

export default CategoryPage;
