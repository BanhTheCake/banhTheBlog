import RootLayout from '@/layouts/RootLayout';
import { useDataUser } from '@/lib/States/user.state';
import { GetServerSideProps } from 'next';
import { ReactElement, useEffect, useMemo } from 'react';
import Author from '@/components_v2/author';
import { useAuthState } from '@/lib/States/Auth.state';
import { useRouter } from 'next/router';

const MyBlogs = () => {
    const [user] = useDataUser();
    const [isAuth] = useAuthState();
    const router = useRouter();

    useEffect(() => {
        if (isAuth !== null && !isAuth) {
            router.replace('/404');
        }
    }, [isAuth, router]);

    if (!user) return null;

    return (
        <div className="flex flex-1 flex-col space-y-3 bg-gray-200/40 p-4">
            <Author.Info userId={user._id} />
            <Author.Posts userId={user._id} />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {},
    };
};

MyBlogs.getLayout = function getLayout(page: ReactElement) {
    return <RootLayout variant={'noPadding'}>{page}</RootLayout>;
};

export default MyBlogs;
