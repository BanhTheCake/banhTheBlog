import cn from '@/lib/Utils/cn';
import { FC } from 'react';
import {
    FieldValues,
    FieldPath,
    Control,
    useController,
} from 'react-hook-form';
import z from 'zod';

interface InputProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends React.HTMLAttributes<HTMLDivElement> {
    label?: string;
    labelId: any;
    type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
    inputClassName?: string;
    labelClassName?: string;
    PrefixElement?: React.JSX.Element;
    name: TName;
    control: Control<TFieldValues>;
}

const Input = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
    className,
    label,
    labelId,
    type = 'text',
    inputClassName = '',
    labelClassName = '',
    PrefixElement,
    control,
    name,
    ...props
}: InputProps<TFieldValues, TName>) => {
    const {
        field: { onChange, value },
        fieldState: { error },
    } = useController({ control, name });

    return (
        <div className={cn('flex flex-col space-y-2', className)}>
            {label && (
                <div className="flex justify-between items-center">
                    <label htmlFor={labelId} className={cn(labelClassName)}>
                        {label}
                    </label>
                    {PrefixElement && PrefixElement}
                </div>
            )}
            <input
                id={labelId}
                type={type}
                value={value}
                onChange={onChange}
                className={cn(
                    'p-1.5 px-2 rounded-md border shadow-sm outline-blue-600',
                    inputClassName
                )}
                {...props}
            />
            {error?.message && (
                <p className="text-sm text-red-600">{error.message}</p>
            )}
        </div>
    );
};

export default Input;
