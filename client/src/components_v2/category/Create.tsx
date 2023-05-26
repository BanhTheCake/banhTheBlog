import { graphQLClient } from '@/config/graphqlClient';
import {
    useAllCategoriesQuery,
    useCreateNewCategoryMutation,
} from '@/generated';
import isGraphQLError from '@/lib/Guards/isGraphqlError';
import usePrivateGraphClient from '@/lib/Hooks/usePrivateGraphClient';
import ZCreateCategory from '@/lib/Schema/categories.schema';
import cn from '@/lib/Utils/cn';
import slugify from '@/lib/Utils/slugify';
import { ChangeEvent, FC, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import { ICategory } from '@/lib/Types/Category';
import Button from '@/components_v2/global/Button';
import ModalUpdate from './ModalUpdate';

interface CreateCategoriesProps {}

const CreateCategories: FC<CreateCategoriesProps> = ({}) => {
    const queryClient = useQueryClient();
    const { graphQLClient: graphQLClientPrivate } = usePrivateGraphClient();
    const { mutate } = useCreateNewCategoryMutation(graphQLClientPrivate);

    const { data } = useAllCategoriesQuery(graphQLClient, undefined, {
        staleTime: Infinity,
        cacheTime: Infinity,
    });
    const [value, setValue] = useState('');
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isError, setIsError] = useState(false);
    const [categorySelected, setCategorySelected] = useState<ICategory | null>(
        null
    );

    const onSetCategory = (value: ICategory) => () => {
        setCategorySelected(value);
        setIsOpenModal(true);
    };

    const onToggleModal = () => {
        setCategorySelected(null);
        setIsOpenModal(!isOpenModal);
    };

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setIsError(false);
        setValue(e.target.value.trim());
    };

    const onCreate = () => {
        const { success } = ZCreateCategory.safeParse(value);
        if (!success) {
            setIsError(true);
            return;
        }
        const label = value;
        const slug = slugify(value);
        mutate(
            {
                label,
                slug,
            },
            {
                onSuccess(data) {
                    const isOk = data.createCategory.ok;
                    if (!isOk) {
                        toast.error(data.createCategory.error as string);
                        return;
                    }
                    toast.success('Create new category success');
                    setValue('');
                    queryClient.invalidateQueries({
                        queryKey: useAllCategoriesQuery.getKey(),
                    });
                },
                onError(error) {
                    if (isGraphQLError(error)) {
                        console.log(error.response.errors);
                    }
                    toast.error('Create new category failed');
                },
            }
        );
    };

    return (
        <div className="w-full flex flex-col items-center space-y-4">
            <div className="flex space-x-2 w-[600px] max-w-full">
                <input
                    type="text"
                    className={cn(
                        'w-full border border-black/60 rounded-md p-2',
                        isError &&
                            'border-red-600 bg-red-300/20 outline-red-600'
                    )}
                    placeholder="Tomato..."
                    value={value}
                    onChange={onChange}
                    onKeyDown={(e) => e.key === 'Enter' && onCreate()}
                />
                <Button variant={'secondary'} className="" onClick={onCreate}>
                    Create
                </Button>
            </div>
            <div className="max-w-[800px] flex flex-wrap">
                {data?.categories &&
                    data.categories.map((category) => {
                        return (
                            <Button
                                variant={'text'}
                                key={category._id}
                                className="shadow-sm mr-3 mb-3"
                                onClick={onSetCategory(category as ICategory)}
                            >
                                {category.label}
                            </Button>
                        );
                    })}
            </div>
            <ModalUpdate
                isOpen={isOpenModal}
                onClose={onToggleModal}
                key={categorySelected?._id}
                category={categorySelected}
            />
        </div>
    );
};

export default CreateCategories;
