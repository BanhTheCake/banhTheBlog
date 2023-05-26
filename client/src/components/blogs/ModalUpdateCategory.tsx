import React, { ChangeEvent, FC, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import Button from '../global/Button';
import { GrFormClose } from 'react-icons/gr';
import { ICategory } from '@/lib/Types/Category';
import usePrivateGraphClient from '@/lib/Hooks/usePrivateGraphClient';
import { useQueryClient } from 'react-query';
import {
    useAllCategoriesQuery,
    useDeleteCategoryMutation,
    useUpdateCategoryMutation,
} from '@/generated';
import ZCreateCategory from '@/lib/Schema/categories.schema';
import slugify from '@/lib/Utils/slugify';
import { toast } from 'react-hot-toast';
import isGraphQLError from '@/lib/Guards/isGraphqlError';
import cn from '@/lib/Utils/cn';

interface ModalUpdateCategoryProps {
    isOpen: boolean;
    onClose: () => void;
    category: ICategory | null;
}

const ModalUpdateCategory: FC<ModalUpdateCategoryProps> = ({
    isOpen,
    onClose,
    category,
}) => {
    const { graphQLClient } = usePrivateGraphClient();
    const queryClient = useQueryClient();
    const { mutate: updateCategory } = useUpdateCategoryMutation(graphQLClient);
    const { mutate: deleteCategory } = useDeleteCategoryMutation(graphQLClient);

    const [value, setValue] = useState(category?.label || '');
    const [isError, setIsError] = useState(false);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value.trim());
        setIsError(false);
    };

    const onUpdate = () => {
        const { success } = ZCreateCategory.safeParse(value);
        if (!success || !category || value === category.label) {
            setIsError(true);
            return;
        }
        updateCategory(
            {
                id: category._id,
                label: value,
                slug: slugify(value),
            },
            {
                onSuccess(data) {
                    const isOk = data.updateCategoryById.ok;
                    if (!isOk) {
                        toast.error(data.updateCategoryById.error as string);
                        return;
                    }
                    queryClient.invalidateQueries(
                        useAllCategoriesQuery.getKey()
                    );
                },
                onError(error) {
                    if (isGraphQLError(error)) {
                        console.log(error.response.errors);
                    }
                    toast.error('Update category failed');
                },
                onSettled() {
                    onClose();
                },
            }
        );
    };

    const onDelete = () => {
        if (!category) return;
        deleteCategory(
            {
                id: category._id,
            },
            {
                onSuccess(data) {
                    const isOk = data.deleteCategoryById.ok;
                    if (!isOk) {
                        toast.error(data.deleteCategoryById.error as string);
                        return;
                    }
                    queryClient.invalidateQueries(
                        useAllCategoriesQuery.getKey()
                    );
                },
                onError(error) {
                    if (isGraphQLError(error)) {
                        console.log(error.response.errors);
                    }
                    toast.error('Delete category failed');
                },
                onSettled() {
                    onClose();
                },
            }
        );
    };

    return (
        <Dialog.Root open={isOpen}>
            <Dialog.Portal>
                <Dialog.Overlay
                    className="fixed inset-0 bg-black/20 z-50"
                    onClick={onClose}
                />
                <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-md animate-fadeIn animate-duration-100 shadow-sm p-4 pt-6 bg-white flex flex-col space-y-4 z-50">
                    <h5 className="font-semibold text-xl">Update category</h5>
                    <input
                        type="text"
                        className={cn(
                            'rounded-sm p-2 w-[300px] max-w-full border-[1.5px]',
                            isError &&
                                'border-red-600 bg-red-300/20 outline-red-600'
                        )}
                        value={value}
                        spellCheck={false}
                        onChange={onChange}
                        onKeyDown={(e) => e.key === 'Enter' && onUpdate()}
                    />
                    <div className="flex space-x-2 justify-end">
                        <Button
                            variant={'secondary'}
                            className="bg-red-500 hover:bg-red-600 px-4"
                            onClick={onDelete}
                        >
                            Delete
                        </Button>
                        <Button
                            variant={'secondary'}
                            className=""
                            onClick={onUpdate}
                        >
                            Update
                        </Button>
                    </div>
                    <Button
                        variant={'text'}
                        className="border-none aspect-square rounded-full p-1 absolute top-2 right-2 !m-0"
                        onClick={onClose}
                    >
                        <GrFormClose size={22} />
                    </Button>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default ModalUpdateCategory;
