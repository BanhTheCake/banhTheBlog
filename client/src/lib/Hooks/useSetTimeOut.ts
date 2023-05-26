import { Dispatch, SetStateAction, useEffect, useState } from 'react';

// after ... millisecond it will turn value into initial value
const useSetTimeOut = <T>(
    initialValue: T,
    ms: number = 200
): [T, Dispatch<SetStateAction<T>>] => {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        let timeOutMenu: ReturnType<typeof setTimeout> | undefined = undefined;
        if (value) {
            timeOutMenu = setTimeout(() => {
                setValue(initialValue);
            }, ms);
        }
        return () => {
            if (timeOutMenu) clearTimeout(timeOutMenu);
        };
    }, [value, initialValue, ms]);

    return [value, setValue];
};

export default useSetTimeOut;
