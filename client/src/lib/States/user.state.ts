import { GetDataUserQuery, Roles } from '@/generated';
import { createGlobalState } from 'react-hooks-global-state';
import { User } from '../Types/User';

const { useGlobalState, getGlobalState, setGlobalState } = createGlobalState<{
    user: User | null;
}>({
    user: null,
});

export const getDataUser = () => getGlobalState('user');
export const setDataUser = (value: Partial<User> | null) =>
    setGlobalState('user', (user) => {
        if (!value) return null;
        return { ...user, ...value } as User;
    });
export const useDataUser = () => useGlobalState('user');
