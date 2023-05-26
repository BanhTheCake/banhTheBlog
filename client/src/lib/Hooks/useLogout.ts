import { graphQLClient } from '@/config/graphqlClient';
import { Roles, useLogoutMutation } from '@/generated';
import { getDataUser, setDataUser } from '../States/user.state';
import { setAccessToken } from '../States/accessToken.state';
import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';

const useLogout = () => {
    const { mutate } = useLogoutMutation(graphQLClient);
    const user = getDataUser();
    const router = useRouter();
    const queryClient = useQueryClient();

    const handleUpdateState = async () => {
        await router.push('/login');
        queryClient.clear();
        setDataUser(null);
        setAccessToken('');
    };

    const logout = () => {
        if (!user) return;
        mutate(
            { id: user._id },
            {
                onSettled: async () => {
                    await handleUpdateState();
                },
            }
        );
    };

    const softLogout = handleUpdateState;

    return { logout, softLogout };
};

export default useLogout;
