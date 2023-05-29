import Pagination from '@/components_v2/global/Pagination';
import { graphQLClient } from '@/config/graphqlClient';
import { useGetPostBySearchQuery } from '@/generated';
import { LIMIT } from '@/pages';
import { useRouter } from 'next/router';
import { FC, useMemo } from 'react';
import CardVertical from '../global/CardVertical';

interface ContentsProps {}

const Contents: FC<ContentsProps> = ({}) => {
    const router = useRouter();

    let search = useMemo<Record<string, string>>(() => {
        const result: Record<string, string> = {};
        if (
            router.query?.name &&
            typeof router.query.name === 'string' &&
            router.query.name !== 'all'
        ) {
            result['categorySlug'] = router.query.name;
        }
        if (router.query?.query && typeof router.query.query === 'string') {
            result['query'] = router.query.query;
        }
        return result;
    }, [router.query]);

    const { data: postsRes } = useGetPostBySearchQuery(graphQLClient, {
        limit: LIMIT,
        page: 1,
        search,
    });

    const posts = postsRes?.postsBySearch?.PostPagination;
    const totalPage = postsRes?.postsBySearch?.totalPage;

    if (!postsRes || posts?.length === 0 || !posts) {
        return (
            <p className="w-full text-4xl text-black/40 text-center">
                No blogs in this time
            </p>
        );
    }

    return (
        <>
            {posts.map((post) => {
                return <CardVertical key={post.createdAt} data={post} />;
            })}
            {totalPage && <Pagination totalPage={totalPage} displayPage={3} />}
        </>
    );
};

export default Contents;
