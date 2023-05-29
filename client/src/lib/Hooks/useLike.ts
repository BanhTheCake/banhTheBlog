import { useLikePostMutation } from '@/generated';
import { useDataUser } from '../States/user.state';
import usePrivateGraphClient from './usePrivateGraphClient';
import { useCallback, useEffect, useReducer } from 'react';
import usePreviousValue from './usePreviousValue';
import { toast } from 'react-hot-toast';
import isGraphQLError from '../Guards/isGraphqlError';
import { useQueryClient } from 'react-query';
import isEqual from 'lodash.isequal';
import { useSocketContext } from '../Context/SocketContext';
import { I_Socket_Like, LIKE_ENUM } from '../Types/Socket';
import { useRouter } from 'next/router';

enum EActions {
    SET_VALUES = 'SET_VALUES',
    LIKE = 'LIKE',
    ROLL_BACK = 'ROLL_BACK',
}

type T_SET_VALUE = {
    type: EActions.SET_VALUES;
    payload: IState;
};

type T_LIKE = {
    type: EActions.LIKE;
};
type T_ROLL_BACK = {
    type: EActions.ROLL_BACK;
    payload: Pick<IState, 'like' | 'count'>;
};

interface IState {
    count: number;
    favoritesUsers: string[];
    postId: string;
    like: boolean;
}

type IAction = T_SET_VALUE | T_LIKE | T_ROLL_BACK;

const reducer = (prevState: IState, action: IAction) => {
    switch (action.type) {
        case EActions.SET_VALUES:
        case EActions.ROLL_BACK: {
            const payload = action.payload;
            return { ...prevState, ...payload };
        }
        case EActions.LIKE: {
            const isLike = prevState.like;
            const like = !isLike;
            const count = isLike
                ? Math.max(prevState.count - 1, 0)
                : prevState.count + 1;
            return { ...prevState, like, count };
        }
        default:
            return prevState;
    }
};

const initValue: IState = {
    count: 0,
    favoritesUsers: [],
    postId: '',
    like: false,
};

const useLike = (value: Partial<Omit<IState, 'like'>>) => {
    const [user] = useDataUser();
    const { graphQLClient } = usePrivateGraphClient();
    const queryClient = useQueryClient();
    const socket = useSocketContext();
    const router = useRouter();

    const generateValue = useCallback(
        (value: IState): IState => {
            const { favoritesUsers } = value;
            if (!user?._id) return value;
            const like = favoritesUsers.includes(user._id);
            return {
                ...value,
                like,
            };
        },
        [user?._id]
    );

    const [state, dispatch] = useReducer(
        reducer,
        generateValue({ ...initValue, ...value })
    );

    const prevLike = usePreviousValue(state.like);
    const prevCount = usePreviousValue(state.count);
    const prevValue = usePreviousValue(value);

    const { mutate: update } = useLikePostMutation(graphQLClient);

    const setInitValue = useCallback(
        (data: Omit<IState, 'like'>) => {
            const value = generateValue({ ...data } as IState);
            dispatch({
                type: EActions.SET_VALUES,
                payload: value,
            });
        },
        [generateValue]
    );

    const onLike = useCallback(() => {
        if (!user) {
            router.push('/login');
            return;
        }
        if (!state.postId) {
            toast.error('Please try again.');
            return;
        }
        dispatch({ type: EActions.LIKE });
        update(
            { postId: state.postId },
            {
                onSuccess: async (data) => {
                    const isOk = data.updateFavoriteUserPost.ok;
                    if (!isOk) {
                        toast.error(
                            data.updateFavoriteUserPost.error as string
                        );
                        dispatch({
                            type: EActions.ROLL_BACK,
                            payload: { like: prevLike, count: prevCount },
                        });
                        return;
                    }
                    await queryClient.invalidateQueries({
                        predicate(query) {
                            const queryKey = query.queryKey[0];
                            if (typeof queryKey === 'string') {
                                return queryKey.toLowerCase().includes('post');
                            }
                            return false;
                        },
                    });
                },
                onError(error) {
                    if (isGraphQLError(error)) {
                        console.log(error.response.errors);
                    }
                    dispatch({
                        type: EActions.ROLL_BACK,
                        payload: { like: prevLike, count: prevCount },
                    });
                    toast.error('Please try again...');
                },
            }
        );
    }, [prevCount, prevLike, queryClient, state.postId, update, user, router]);

    useEffect(() => {
        if (!user?._id) return;
        // Re-calc user is like or not
        setInitValue(state);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?._id]);

    useEffect(() => {
        if (!value || isEqual(value, prevValue)) return;
        // Re-calc user is like or not
        setInitValue({ ...initValue, ...value });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    useEffect(() => {
        if (!state.postId) return;
        socket.on(`posts:${state.postId}:likes`, (res: I_Socket_Like) => {
            let newFavoritesId = [...state.favoritesUsers];
            // UnLike
            if (res.type === LIKE_ENUM.REMOVE) {
                newFavoritesId = [...newFavoritesId].filter(
                    (id) => id !== res.data.userId
                );
            }
            //  AddLike
            if (res.type === LIKE_ENUM.UPDATE) {
                newFavoritesId = [...newFavoritesId, res.data.userId];
            }
            setInitValue({
                count: newFavoritesId.length,
                favoritesUsers: newFavoritesId,
                postId: state.postId,
            });
        });
        return () => {
            socket.off(`posts:${state.postId}:likes`);
        };
    }, [
        state.postId,
        socket,
        state.count,
        state.favoritesUsers,
        user?._id,
        setInitValue,
    ]);

    return { onLike, setInitValue, count: state.count, like: state.like };
};

export default useLike;
