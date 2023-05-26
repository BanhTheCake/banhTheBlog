import { graphQLClient } from '@/config/graphqlClient';
import { useAllCategoriesQuery } from '@/generated';
import { FC } from 'react';
import Link from 'next/link';
import Button from '@/components_v2/global/Button';

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = ({}) => {
    const { data: categoriesRes, isLoading } =
        useAllCategoriesQuery(graphQLClient);

    const categories = categoriesRes?.categories;

    if (isLoading) return null;
    return (
        <>
            {categories && categories.length > 0 && (
                <div className="flex flex-col w-80 rounded-md shadow-md p-4 bg-white border">
                    <h4 className="font-semibold text-xl pb-4">Categories</h4>
                    <div className="flex flex-wrap">
                        {categories.map((category) => {
                            return (
                                <Link
                                    key={category._id}
                                    href={`/categories?name=${category.slug}`}
                                    className="inline-flex mr-3 mb-3"
                                >
                                    <Button
                                        variant={'text'}
                                        className="bg-white"
                                    >
                                        #{category.label}
                                    </Button>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
};

export default Sidebar;
