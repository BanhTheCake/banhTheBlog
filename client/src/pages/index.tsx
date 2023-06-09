import cn from '@/lib/Utils/cn';
import RootLayout from '@/layouts/RootLayout';
import { GetServerSideProps } from 'next';
import { QueryClient, dehydrate } from 'react-query';
import { useGetPostsQuery } from '@/generated';
import { graphQLClient } from '@/config/graphqlClient';
import { ReactElement } from 'react';
import Home from '@/components_v2/home';
import HeadTitle from '@/components_v2/global/HeadTitle';

export const LIMIT = 7;
export default function HomePage() {
    return (
        <>
            <HeadTitle
                title="Happy Tato | Home page"
                content="Happy Tato. The blog writings from out team, the latest industry news, interviews, technologies and resources."
                keyData="homepage"
                name="homepage"
            />
            <div className={cn('w-full flex flex-col space-y-4')}>
                <div
                    className={cn(
                        'w-full flex justify-center items-center flex-col py-16 space-y-4'
                    )}
                >
                    <p className="font-semibold text-xl">The blog</p>
                    <h1 className="font-semibold text-6xl text-center pb-2">
                        Writings from out team
                    </h1>
                    <p className="text-black/90 text-center">
                        The latest industry news, interviews, technologies and
                        resources.
                    </p>
                </div>
                <Home.Content />
            </div>
        </>
    );
}

HomePage.getLayout = function getLayout(page: ReactElement) {
    return <RootLayout>{page}</RootLayout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const queryClient = new QueryClient();
    const pageQuery = context.query?.page;

    let page = 1;
    if (pageQuery && typeof pageQuery === 'string') {
        page = parseInt(pageQuery);
    }

    await queryClient.prefetchQuery(
        useGetPostsQuery.getKey({
            limit: LIMIT,
            page,
        }),
        useGetPostsQuery.fetcher(graphQLClient, { limit: LIMIT, page })
    );

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};
