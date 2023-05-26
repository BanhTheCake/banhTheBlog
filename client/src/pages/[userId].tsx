import RootLayout from '@/layouts/RootLayout';
import { LIMIT } from '@/pages';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { ReactElement, useMemo } from 'react';
import Author from '@/components_v2/author';
import { QueryClient, dehydrate } from 'react-query';
import { useGetDataAuthorQuery, useGetPostByUserIdQuery } from '@/generated';
import { graphQLClient } from '@/config/graphqlClient';

const AccountDetailsPage = () => {
    const router = useRouter();
    const userId = router.query?.userId;

    if (!userId || typeof userId !== 'string') return null;

    return (
        <div className="flex flex-1 flex-col space-y-3 bg-gray-200/40 p-4">
            <Author.Info userId={userId} />
            <Author.Posts userId={userId} />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const queryClient = new QueryClient();

    const userId = context.query?.userId;
    let page = 1;
    if (context.query?.page && typeof context.query.page === 'string') {
        page = parseInt(context.query.page);
    }

    if (!userId || typeof userId !== 'string') {
        return {
            notFound: true,
        };
    }

    const authorPromise = queryClient.prefetchQuery(
        useGetDataAuthorQuery.getKey({ userId }),
        useGetDataAuthorQuery.fetcher(graphQLClient, { userId })
    );

    const postsPromise = queryClient.prefetchQuery(
        useGetPostByUserIdQuery.getKey({ userId, page, limit: LIMIT }),
        useGetPostByUserIdQuery.fetcher(graphQLClient, {
            userId,
            page,
            limit: LIMIT,
        })
    );

    await Promise.all([authorPromise, postsPromise]);

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};

AccountDetailsPage.getLayout = function getLayout(page: ReactElement) {
    return <RootLayout variant={'noPadding'}>{page}</RootLayout>;
};

export default AccountDetailsPage;
