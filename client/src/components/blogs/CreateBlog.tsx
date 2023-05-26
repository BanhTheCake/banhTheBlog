import { useCreateNewPostMutation } from '@/generated';
import isGraphQLError from '@/lib/Guards/isGraphqlError';
import usePrivateGraphClient from '@/lib/Hooks/usePrivateGraphClient';
import { UseFormReset } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import HandleBlog, { defaultValues } from './HandleBlog';
import { IHandlePost } from '@/lib/Types/Post';
import { HandlePostType } from '@/lib/Schema/posts.schema';
import { useQueryClient } from 'react-query';
import { useEffect } from 'react';

const CreateBlog = () => {
    const { graphQLClient: GraphQLClientPrivate } = usePrivateGraphClient();
    const queryClient = useQueryClient();

    const { mutate, isLoading } =
        useCreateNewPostMutation(GraphQLClientPrivate);

    const onMutate = async (
        input: IHandlePost,
        reset: UseFormReset<HandlePostType>
    ) => {
        mutate(input, {
            onSuccess(data) {
                const isOk = data.createNewPost.ok;
                if (!isOk) {
                    toast.error('Something wrong around here');
                    return;
                }
                toast.success('Create successful');
                queryClient.invalidateQueries('getMyPosts');
                reset(defaultValues);
            },
            onError(error) {
                if (isGraphQLError(error)) {
                    console.log(error.response.errors);
                }
                toast.error('Something wrong around here');
            },
        });
    };

    return (
        <>
            <HandleBlog
                type="CREATE"
                onMutate={onMutate}
                isHandling={isLoading}
            />
        </>
    );
};

export default CreateBlog;
