import { FC, useMemo } from 'react';
import { useGetPostsQuery } from '@/generated';
import { graphQLClient } from '@/config/graphqlClient';
import { LIMIT } from '@/pages';
import { useRouter } from 'next/router';
import CardMain from '@/components_v2/global/CardMain';
import CardVertical from '@/components_v2/global/CardHorizontal';
import Pagination from '@/components_v2/global/Pagination';

interface HomePageContentProps {}

const HomePageContent: FC<HomePageContentProps> = ({}) => {
    const router = useRouter();
    const page = useMemo(() => {
        if (!router.query?.page || typeof router.query.page !== 'string')
            return 1;
        return parseInt(router.query.page);
    }, [router.query.page]);

    const { data } = useGetPostsQuery(graphQLClient, {
        limit: LIMIT,
        page,
    });

    const posts = data?.posts?.PostPagination;

    if (!data || posts?.length === 0) {
        return (
            <p className="w-full text-4xl font-semibold text-center text-black/50">
                No blogs in this time
            </p>
        );
    }

    return (
        <>
            {posts && (
                <div className="w-full flex flex-col space-y-8 pb-16">
                    <CardMain data={posts[0]} />
                    <div className="grid grid-cols-12 gap-y-8 sm:gap-8">
                        {posts.slice(1).map((post) => {
                            return (
                                <CardVertical
                                    data={post}
                                    key={post.createdAt}
                                    className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-4"
                                />
                            );
                        })}
                    </div>
                </div>
            )}
            {data?.posts?.totalPage && (
                <Pagination totalPage={data.posts.totalPage} displayPage={3} />
            )}
        </>
    );
};

export default HomePageContent;
