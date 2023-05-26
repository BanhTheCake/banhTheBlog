import { useEffect, useRef } from 'react';

const usePreviousValue = <T>(value: T) => {
    const ref = useRef<T>(value);

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
};

export default usePreviousValue;
