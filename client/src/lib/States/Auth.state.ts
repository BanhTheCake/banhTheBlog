import { createGlobalState } from 'react-hooks-global-state';

const { useGlobalState, getGlobalState, setGlobalState } = createGlobalState<{
    isAuth: boolean | null;
}>({
    isAuth: null,
});

export const getAuthState = () => getGlobalState('isAuth');
export const setAuthState = (value: boolean) =>
    setGlobalState('isAuth', () => {
        return value;
    });
export const useAuthState = () => useGlobalState('isAuth');
