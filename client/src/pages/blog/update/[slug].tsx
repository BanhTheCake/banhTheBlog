import HandleBlog from '@/components/blogs/HandleBlog';
import {
    useGetPostBySlugToUpdateQuery,
    useUpdatePostMutation,
} from '@/generated';
import RootLayout from '@/layouts/RootLayout';
import isGraphQLError from '@/lib/Guards/isGraphqlError';
import usePrivateGraphClient from '@/lib/Hooks/usePrivateGraphClient';
import { IHandlePost } from '@/lib/Types/Post';
import { HandlePostType, ZHandlePostSchema } from '@/lib/Schema/posts.schema';
import { useRouter } from 'next/router';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import { UseFormReset } from 'react-hook-form';
import isEqual from 'lodash.isequal';
import pickBy from 'lodash.pickby';
import slugify from '@/lib/Utils/slugify';
import { toast } from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import DeleteBtnWrapper from '@/components/global/DeleteBtnWrapper';
import Button from '@/components/global/Button';
import { graphQLClient } from '@/config/graphqlClient';

const UpdatePost = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { graphQLClient: graphQLPrivate, isReady } = usePrivateGraphClient();

    const slug = router.query?.slug;
    const [baseValue, setBaseValue] = useState<HandlePostType | null>(null);

    const { mutate: updatePost, isLoading: isUpdating } =
        useUpdatePostMutation(graphQLPrivate);

    const { data, isLoading } = useGetPostBySlugToUpdateQuery(
        graphQLClient,
        { slug: slug as string },
        {
            onError(err) {
                if (isGraphQLError(err)) {
                    console.log(err.response.errors);
                }
            },
        }
    );

    const onMutate = (
        input: IHandlePost,
        reset: UseFormReset<HandlePostType>
    ) => {
        if (!baseValue || !data?.postBySlug) return;
        const { titleImg: img, ...other } = baseValue;
        const value: IHandlePost = {
            ...other,
            img: img as string,
            slug: slugify(other.title),
        };

        if (isEqual(input, value)) {
            return;
        }

        const differentValues = pickBy(
            input,
            (v, k) => !isEqual(value[k as keyof IHandlePost], v)
        );
        updatePost(
            { id: data.postBySlug?._id, ...differentValues },
            {
                onSuccess(data) {
                    const isOk = data.updatePostById.ok;
                    if (!isOk) {
                        toast.error(data.updatePostById.error as string);
                        return;
                    }
                    const { img: titleImg, ...otherValue } = input;
                    setBaseValue({ ...otherValue, titleImg });
                    toast.success('Update post success');
                    Promise.all([
                        queryClient.invalidateQueries(
                            useGetPostBySlugToUpdateQuery.getKey({
                                slug: slug as string,
                            })
                        ),
                        queryClient.invalidateQueries('getMyPosts'),
                    ]);
                },
                onError(error) {
                    if (isGraphQLError(error)) {
                        console.log(error.response.errors);
                    }
                    toast.error('Update post failed');
                },
            }
        );
    };

    useEffect(() => {
        if (!data) return;
        if (!data.postBySlug) {
            router.push('/404');
            return;
        }
        let categories: string[] = [];
        if (
            data.postBySlug?.categories &&
            data.postBySlug.categories.length > 0
        ) {
            categories = [...data.postBySlug.categories].reduce((rs, item) => {
                return [...rs, item['_id']];
            }, [] as string[]);
        }
        const posts: HandlePostType = {
            titleImg: data.postBySlug.img,
            content: data.postBySlug.content,
            title: data.postBySlug.title,
            categories,
        };
        const dataParse = ZHandlePostSchema.safeParse(posts);
        if (!dataParse.success) {
            router.push('/404');
            return;
        }
        setBaseValue(dataParse.data);
    }, [data, router]);

    const onCallbackWhenSuccess = useCallback(() => {
        router.replace('/me/blogs');
        Promise.all([queryClient.invalidateQueries('getMyPosts')]);
    }, [router, queryClient]);

    if (isLoading) {
        return (
            <div className="w-full flex flex-1 justify-center items-center">
                <p className="font-semibold text-4xl text-black/80">Loading!</p>
            </div>
        );
    }

    return (
        <>
            <HandleBlog
                type="UPDATE"
                isHandling={isUpdating}
                onMutate={onMutate}
                baseValue={baseValue}
            >
                <DeleteBtnWrapper
                    postId={data?.postBySlug?._id || ''}
                    onCallback={onCallbackWhenSuccess}
                >
                    <Button
                        variant={'secondary'}
                        className="bg-red-500 hover:bg-red-600 shadow-sm"
                    >
                        Delete
                    </Button>
                </DeleteBtnWrapper>
            </HandleBlog>
        </>
    );
};

UpdatePost.getLayout = (page: ReactElement) => {
    return <RootLayout>{page}</RootLayout>;
};

export default UpdatePost;
