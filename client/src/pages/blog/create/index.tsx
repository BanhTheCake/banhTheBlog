import RootLayout from '@/layouts/RootLayout';
import { ReactElement, useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import CreateBlog from '@/components_v2/blog/Create';
import cn from '@/lib/Utils/cn';
import Button from '@/components_v2/global/Button';
import Category from '@/components_v2/category';

enum TYPE {
    blog = 'blog',
    categories = 'categories',
}

export default function Home() {
    const [value, setValue] = useState<TYPE>(TYPE.blog);

    const onChange = (value: TYPE) => () => {
        setValue(value);
    };

    return (
        <Tabs.Root defaultValue={TYPE.blog} value={value}>
            <Tabs.List className="flex mb-4" aria-label="Manage your account">
                <Button
                    onClick={onChange(TYPE.blog)}
                    variant={value === TYPE.blog ? 'secondary' : 'text'}
                    className={cn(
                        'rounded-sm rounded-r-none px-6',
                        value === TYPE.blog && 'border-black/80'
                    )}
                >
                    blog
                </Button>
                <Button
                    onClick={onChange(TYPE.categories)}
                    variant={value === TYPE.categories ? 'secondary' : 'text'}
                    className={cn(
                        'rounded-sm rounded-l-none px-6',
                        value === TYPE.categories && 'border-black/80'
                    )}
                >
                    Categories
                </Button>
            </Tabs.List>
            <Tabs.Content value={TYPE.blog}>
                <CreateBlog />
            </Tabs.Content>
            <Tabs.Content value={TYPE.categories}>
                <Category.Create />
            </Tabs.Content>
        </Tabs.Root>
    );
}

Home.getLayout = function getLayout(page: ReactElement) {
    return <RootLayout>{page}</RootLayout>;
};
