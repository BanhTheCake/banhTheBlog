import { graphQLClientPrivate } from '@/config/graphqlClient';
import { useEffect, useState } from 'react';
import { getAccessToken, useAccessToken } from '../States/accessToken.state';
import { RequestMiddleware } from 'graphql-request/dist/types';

const usePrivateGraphClient = () => {
    const [token] = useAccessToken();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (!token) return;
        // Wait for token has value
        setIsReady(true);
    }, [token]);

    return { graphQLClient: graphQLClientPrivate, isReady };
};

export default usePrivateGraphClient;
