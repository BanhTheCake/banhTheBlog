import { FC, useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import Button from './Button';
import { useDataUser } from '@/lib/States/user.state';
import { useLikePostMutation } from '@/generated';
import usePrivateGraphClient from '@/lib/Hooks/usePrivateGraphClient';
import { toast } from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import isGraphQLError from '@/lib/Guards/isGraphqlError';
import cn from '@/lib/Utils/cn';

interface LikeBtnProps {
    data: string[];
    postId: string;
}

const LikeBtn: FC<LikeBtnProps> = ({ data, postId }) => {
    const [user] = useDataUser();
    const { graphQLClient } = usePrivateGraphClient();
    const queryClient = useQueryClient();

    const [favorite, setFavorite] = useState(() => {
        if (!user?._id) return false;
        return data.includes(user._id);
    });

    const { mutate: onLike } = useLikePostMutation(graphQLClient);

    const onClick = () => {
        onLike(
            { postId },
            {
                onSuccess(data, variables, context) {
                    const isOk = data.updateFavoriteUserPost.ok;
                    if (!isOk) {
                        toast.error(
                            data.updateFavoriteUserPost.error as string
                        );
                    }
                    queryClient.invalidateQueries('getMyPosts');
                },
                onError(error, variables, context) {
                    if (isGraphQLError(error)) {
                        console.log(error.response.errors);
                    }
                    toast.error('Please try again...');
                },
            }
        );
    };

    return (
        <Button
            variant={'text'}
            className={cn(
                'aspect-square rounded-full',
                favorite && 'bg-red-500 text-white hover:bg-red-400'
            )}
            onClick={onClick}
        >
            <AiOutlineHeart size={24} />
        </Button>
    );
};

export default LikeBtn;
