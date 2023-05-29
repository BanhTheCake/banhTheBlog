import { getAccessToken, setAccessToken } from '@/lib/States/accessToken.state';
import { GraphQLClient } from 'graphql-request';
import { RequestMiddleware } from 'graphql-request/dist/types';
import jwt_decode from 'jwt-decode';
import { AccessToken } from '@/lib/Types/Token';
import refreshToken from '@/lib/Utils/refreshToken';
import ENV from './VarEnv';

export const graphQLClient = new GraphQLClient(ENV.graphQL, {
    credentials: 'include',
    fetch: fetch,
});

const requestMiddleware: RequestMiddleware = async (request) => {
    let token = getAccessToken();
    if (jwt_decode<AccessToken>(token).exp < Date.now() / 1000) {
        const newToken = await refreshToken();
        newToken && setAccessToken(newToken);
        token = newToken ?? token;
    }
    return {
        ...request,
        headers: {
            ...request.headers,
            Authorization: `bearer ${token}`,
        },
    };
};

export const graphQLClientPrivate = new GraphQLClient(ENV.graphQL, {
    credentials: 'include',
    requestMiddleware,
});
