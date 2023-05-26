import { createGlobalState } from 'react-hooks-global-state';

const { useGlobalState, getGlobalState, setGlobalState } = createGlobalState({
    accessToken: '',
});

export const getAccessToken = () => getGlobalState('accessToken');
export const setAccessToken = (value: string) =>
    setGlobalState('accessToken', value);
export const useAccessToken = () => useGlobalState('accessToken');
