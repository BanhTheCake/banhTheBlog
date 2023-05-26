import RootLayout from '@/layouts/RootLayout';
import { ReactElement } from 'react';

export default function Custom404() {
    return (
        <h1 className="w-full flex-1 flex justify-center items-center font-semibold text-4xl">
            404 - Page Not Found
        </h1>
    );
}

Custom404.getLayout = (page: ReactElement) => {
    return <RootLayout>{page}</RootLayout>;
};
