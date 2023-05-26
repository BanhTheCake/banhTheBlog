import { graphQLClient } from '@/config/graphqlClient';
import { RefreshTokenDocument, RefreshTokenQuery } from '@/generated';

const refreshToken = async () => {
    try {
        const data = await graphQLClient.request<RefreshTokenQuery>(
            RefreshTokenDocument
        );
        if (!data) return null;
        const isOk = data.refreshAccessToken.ok;
        if (!isOk) return null;
        return data.refreshAccessToken.token;
    } catch (error) {
        return null;
    }
};

export default refreshToken;
