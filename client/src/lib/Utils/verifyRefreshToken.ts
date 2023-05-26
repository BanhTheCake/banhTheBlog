import { graphQLClient } from '@/config/graphqlClient';
import {
    VerifyRefreshTokenDocument,
    VerifyRefreshTokenQuery,
} from '@/generated';

const verifyRefreshToken = async (rfToken: string) => {
    try {
        const data = await graphQLClient.request<VerifyRefreshTokenQuery>(
            VerifyRefreshTokenDocument,
            undefined,
            {
                cookie: `refreshToken=${rfToken}`,
            }
        );
        if (!data) return false;
        return true;
    } catch (error) {
        return false;
    }
};

export default verifyRefreshToken;
