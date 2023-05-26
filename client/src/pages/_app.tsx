import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import {
    QueryClient,
    QueryClientProvider,
    setLogger,
    Hydrate,
    QueryCache,
} from 'react-query';
import NextNProcess from 'nextjs-progressbar';
import CustomToaster from '@/components/global/CustomToast';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import { HistoryProvider } from '@/lib/Context/History';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export const queryCache = new QueryCache();

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            retry: 1,
            staleTime: 1000 * 60 * 5, // 5 minutes
        },
    },
    queryCache,
});

setLogger({
    error() {},
    log() {},
    warn() {},
});

export default function App({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout || ((page) => page);

    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <HistoryProvider>
                    <NextNProcess options={{ showSpinner: false }} />
                    {getLayout(<Component {...pageProps} />)}
                    <CustomToaster />
                </HistoryProvider>
                <ReactQueryDevtools initialIsOpen={false} />
            </Hydrate>
        </QueryClientProvider>
    );
}
