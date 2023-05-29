import { useRouter } from 'next/router';
import React, {
    createContext,
    useState,
    useEffect,
    useContext,
    useMemo,
    useCallback,
} from 'react';

interface HValidation {
    history: string[];
    setHistory(data: string[]): void;
    back(fallback?: string): Promise<void>;
}

const HistoryContext = createContext<HValidation>({} as HValidation);

export const HistoryProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const { asPath, pathname, replace } = useRouter();
    const [history, setHistory] = useState<string[]>([]);

    const back = useCallback(
        async (fallbackRoute: string = '/') => {
            for (let i = history.length - 2; i >= 0; i--) {
                const route = history[i];
                if (!route.includes('#') && route !== pathname) {
                    await replace(route);
                    const newHistory = history.slice(0, i);
                    setHistory(newHistory);
                    return;
                }
            }
            if (fallbackRoute) {
                await replace(fallbackRoute);
            }
        },
        [history, pathname, replace]
    );

    useEffect(() => {
        setHistory((previous) => [previous[previous.length - 1], asPath]);
    }, [asPath]);

    const value = useMemo(() => {
        return {
            back,
            history,
            setHistory,
        };
    }, [back, history]);

    return (
        <HistoryContext.Provider value={value}>
            {children}
        </HistoryContext.Provider>
    );
};

export function useHistory(): HValidation {
    const context = useContext(HistoryContext);
    return context;
}
