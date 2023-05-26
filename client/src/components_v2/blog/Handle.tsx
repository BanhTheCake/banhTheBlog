import { graphQLClient } from '@/config/graphqlClient';
import { useAllCategoriesQuery } from '@/generated';
import useUpload from '@/lib/Hooks/useUpload';
import { zodResolver } from '@hookform/resolvers/zod';
import dynamic from 'next/dynamic';
import { FC, useEffect, useMemo } from 'react';
import { SubmitHandler, UseFormReset, useForm } from 'react-hook-form';
import slugify from '@/lib/Utils/slugify';
import { IHandlePost } from '@/lib/Types/Post';
import { HandlePostType, ZHandlePostSchema } from '@/lib/Schema/posts.schema';
import { optionSelect } from '@/components_v2/global/InputSelect';
import InputFile from '@/components_v2/global/InputFile';
import Input from '@/components_v2/global/Input';
import TextContent from '@/components_v2/global/TextEditor/TextContent';
import Button from '@/components_v2/global/Button';

export const defaultValues: Partial<HandlePostType> = {
    title: '',
    categories: [],
    content: '',
};

interface HandleBlogProps {
    type: 'UPDATE' | 'CREATE';
    onMutate: (data: IHandlePost, reset: UseFormReset<HandlePostType>) => void;
    isHandling: boolean;
    baseValue?: HandlePostType | null;
    children?: React.ReactElement;
}

const HandleBlog: FC<HandleBlogProps> = ({
    type,
    onMutate,
    isHandling,
    baseValue,
    children,
}) => {
    const { data } = useAllCategoriesQuery(graphQLClient);
    const { onUpload, isUploading } = useUpload();

    const InputSelect = dynamic(
        () => import('@/components_v2/global/InputSelect'),
        {
            ssr: false,
        }
    );

    const options = useMemo(() => {
        if (!data) return undefined;
        const obj: optionSelect[] = data.categories.map((item) => ({
            value: item._id,
            label: item.label,
        }));
        return obj;
    }, [data]);

    const { handleSubmit, control, reset } = useForm<HandlePostType>({
        resolver: zodResolver(ZHandlePostSchema),
        defaultValues: defaultValues,
    });

    const onSubmit: SubmitHandler<HandlePostType> = async (data) => {
        if (isLoading) return;
        const { titleImg, ...inputProps } = data;
        let img = titleImg;
        if (img instanceof File) {
            img = await onUpload(img);
        }
        const slug = slugify(inputProps.title);
        onMutate({ img, slug, ...inputProps }, reset);
    };

    const isLoading = isUploading || isHandling;

    useEffect(() => {
        if (!baseValue || type !== 'UPDATE') return;
        const data = ZHandlePostSchema.safeParse(baseValue);
        if (!data.success) return;
        reset(data.data);
    }, [baseValue, reset, type]);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <InputFile
                    className="aspect-video h-auto rounded-md overflow-hidden"
                    control={control}
                    name="titleImg"
                />
                <Input
                    control={control}
                    name="title"
                    className="flex-1"
                    labelId={'title'}
                    inputClassName=" text-3xl p-4 text-ellipsis"
                    placeholder="Title here ... "
                />
                <InputSelect
                    options={options}
                    placeholder="Categories..."
                    name="categories"
                    control={control as any}
                />
                <TextContent control={control} name="content" />
                <div className="flex space-x-4">
                    <Button variant={'secondary'} isLoading={isLoading}>
                        {type === 'CREATE' ? 'Create' : 'Update'}
                    </Button>
                    {/* Place for button (likes delete btn) */}
                    {children}
                </div>
            </form>
        </>
    );
};

export default HandleBlog;
