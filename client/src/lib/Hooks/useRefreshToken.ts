import { graphQLClient } from '@/config/graphqlClient';
import { useRefreshTokenQuery } from '@/generated';
import { setAccessToken } from '../States/accessToken.state';
import { useRouter } from 'next/router';

const useRefreshToken = () => {
    const { refetch } = useRefreshTokenQuery(graphQLClient, undefined, {
        enabled: false,
        cacheTime: 0,
        staleTime: 0,
    });

    const refreshToken = async () => {
        const { status, ...res } = await refetch();
        if (status === 'success') {
            const token = res.data?.refreshAccessToken?.token;
            token && setAccessToken(token);
            return token;
        }
        return null;
    };

    return { refreshToken };
};

export default useRefreshToken;
