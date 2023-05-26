import { FC, useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useRouter } from 'next/router';
import Button from '@/components_v2/global/Button';

interface InputSearchProps {}

const InputSearch: FC<InputSearchProps> = ({}) => {
    const [value, setValue] = useState('');
    const router = useRouter();

    const onSearch = () => {
        const { query, ...params } = router.query;
        if (value) {
            params.query = value;
        }
        router.push({
            query: params,
        });
    };

    useEffect(() => {
        if (router.query?.query && typeof router.query.query === 'string') {
            setValue(router.query?.query);
        }
    }, [router.query?.query]);

    return (
        <div className="flex w-full mx-auto relative max-w-[600px]">
            <input
                className="w-full p-2 px-3 border border-black/60 rounded-md shadow-sm rounded-r-none outline-none"
                placeholder="Potato..."
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => {
                    e.key === 'Enter' && onSearch();
                }}
            />
            <Button
                variant={'secondary'}
                className=" aspect-square p-2 rounded-l-none border-none"
                onClick={onSearch}
            >
                <AiOutlineSearch size={28} />
            </Button>
        </div>
    );
};

export default InputSearch;
