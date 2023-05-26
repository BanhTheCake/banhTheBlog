import { useDeletePostMutation } from '@/generated';
import isGraphQLError from '@/lib/Guards/isGraphqlError';
import usePrivateGraphClient from '@/lib/Hooks/usePrivateGraphClient';
import React, { FC, memo, useState } from 'react';
import { toast } from 'react-hot-toast';
import DeleteModal from './DeleteModal';
import { ButtonProps } from './Button';
import { useHistory } from '@/lib/Context/History';

interface DeleteBtnWrapperProps {
    children: React.ReactElement<ButtonProps>;
    postId: string;
    onCallback?: (...args: any) => any;
}

const DeleteBtnWrapper = React.forwardRef<unknown, DeleteBtnWrapperProps>(
    ({ children, postId, onCallback, ...props }, ref) => {
        const { graphQLClient } = usePrivateGraphClient();
        const { mutate: deletePost, isLoading } =
            useDeletePostMutation(graphQLClient);

        const [open, setOpen] = useState(false);

        const onDelete = () => {
            if (!postId) return;
            deletePost(
                {
                    id: postId,
                },
                {
                    onSuccess(data) {
                        const isOk = data.deletePostById.ok;
                        if (!isOk) {
                            toast.error(data.deletePostById.error as string);
                            return;
                        }
                        toast.success('Delete post success');
                        onCallback && onCallback();
                    },
                    onError(error) {
                        if (isGraphQLError(error)) {
                            console.log(error.response.errors);
                        }
                        toast.error('Delete post failed');
                    },
                    onSettled() {
                        onClose();
                    },
                }
            );
        };

        const onClose = () => {
            setOpen(false);
        };

        if (!React.isValidElement(children)) {
            throw new Error('Children is not valid element');
        }

        return (
            <>
                {React.cloneElement(children, {
                    ...props,
                    onClick: () => {
                        setOpen(true);
                    },
                })}
                <DeleteModal
                    open={open}
                    onClose={onClose}
                    onDelete={onDelete}
                    isLoading={isLoading}
                />
            </>
        );
    }
);

DeleteBtnWrapper.displayName = 'DeleteBtnWrapper';

export default DeleteBtnWrapper;
