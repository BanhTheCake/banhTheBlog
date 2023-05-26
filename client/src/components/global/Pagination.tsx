import { FC, memo, useMemo } from 'react';
import Button from './Button';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import cn from '@/lib/Utils/cn';
import { useRouter } from 'next/router';

interface PaginationProps {
    displayPage: number;
    totalPage: number;
    displayPageSide?: number;
}

const Pagination: FC<PaginationProps> = ({
    totalPage,
    displayPage,
    displayPageSide = 1,
}) => {
    const router = useRouter();
    const { page } = router.query;

    const currentPage = useMemo(() => {
        if (!page || typeof page !== 'string') return 1;
        return parseInt(page);
    }, [page]);

    console.log('Rerender pagination');

    const pageArr = useMemo(() => {
        if (!totalPage) return null;

        // Case 1: TotalPage < displayPage => display all page
        if (totalPage <= displayPage * 2)
            return Array(totalPage)
                .fill(0)
                .map((_, index) => {
                    return index + 1;
                });

        // Case 2: TotalPage > displayPage => display ...

        // pivotFirst: display page from left to ...
        // pivotLast: display page from ... to right
        // example: 1 2 ... 9 10 (pivotFirst: 2, pivotLast: 9)
        // example: 1 ... 6 5 7 ... 10 (pivotFirst: 1, pivotLast: 10, currentPage: 5, displayPageSide: 1)

        let pivotFirst = 1;
        let pivotLast = totalPage + 1;

        // if currentPage in [0 -> displayPageSide + 1] or in [totalPage - displayPageSide, total] => set pivotFist and pivotLast
        if (
            currentPage >= totalPage - displayPageSide ||
            currentPage <= 1 + displayPageSide
        ) {
            pivotFirst = displayPage;
            pivotLast = totalPage - displayPage + 1;
        }

        // Result => [1, 2, null, 9, 10] or [1, null, 5, 6, 7, null, 10] (null stand for ...)
        return (
            Array(totalPage)
                .fill(0)
                .map((_, index) => {
                    // TargetPage start from 1 -> totalPage
                    const targetPage = index + 1;
                    // if targetPage is first page or last page => return targetPage
                    if (targetPage === 1 || targetPage === totalPage)
                        return targetPage;
                    // if targetPage in [1, pivotFist] or in [pivotLast, totalPage] => return targetPage
                    if (targetPage <= pivotFirst || targetPage >= pivotLast)
                        return targetPage;
                    // example: if currentPage is 5 => we want to display 1 (displayPageSide: 1) number on both sides 5 => 4 5 6
                    if (Math.abs(targetPage - currentPage) <= displayPageSide)
                        return targetPage;
                    // return null to stand for ...
                    return null;
                })
                // we want to display one null stand for ... for example: [1, 2, null, null, 5, 6] => [1, 2, null, 5, 6] or [1, null, null, 4, 5, 6, null, null, 9] => [1, null, 4, 5, 6, null, 8]
                .reduce((rs, item) => {
                    // check if the last element in rs is null or not
                    if (item === null && rs[rs.length - 1] === null) {
                        return rs;
                    }
                    return [...rs, item];
                }, [] as (number | null)[])
        );
    }, [currentPage, displayPage, displayPageSide, totalPage]);

    const onChangePage = async (n: number) => {
        await router.push({
            pathname: '',
            query: {
                ...router.query,
                page: n,
            },
        });
    };

    const onNextPage = async () => {
        if (currentPage === totalPage) return;
        await router.push({
            pathname: '',
            query: {
                ...router.query,
                page: currentPage + 1,
            },
        });
    };
    const onPreviousPage = async () => {
        if (currentPage === 1) return;
        await router.push({
            pathname: '',
            query: {
                ...router.query,
                page: currentPage - 1,
            },
        });
    };

    if (!pageArr) return null;

    return (
        <div
            className={cn(
                'w-full flex justify-center md:justify-between md:space-x-4'
            )}
        >
            <Button
                variant={'text'}
                className="border-none hidden md:flex items-center space-x-2"
                disabled={currentPage === 1}
                onClick={onPreviousPage}
            >
                <BiLeftArrowAlt size={26} />
                <p>Previous</p>
            </Button>
            {pageArr.length > 0 && (
                <div className="flex items-center space-x-2">
                    {pageArr.map((item, index) => {
                        if (item) {
                            const isActive = currentPage === item;
                            return (
                                <Button
                                    key={index}
                                    variant={isActive ? 'secondary' : 'text'}
                                    className={cn(
                                        'aspect-square',
                                        !isActive && 'border-none'
                                    )}
                                    onClick={async () => {
                                        await onChangePage(item);
                                    }}
                                >
                                    {item}
                                </Button>
                            );
                        }
                        return (
                            <Button
                                key={index}
                                variant={'text'}
                                className={cn('aspect-square border-none')}
                            >
                                ...
                            </Button>
                        );
                    })}
                </div>
            )}
            <Button
                variant={'text'}
                className="border-none hidden md:flex items-center space-x-2"
                disabled={currentPage === totalPage}
                onClick={onNextPage}
            >
                <p>Next</p>
                <BiRightArrowAlt size={26} />
            </Button>
        </div>
    );
};

export default memo(Pagination);
