import cn from '@/lib/Utils/cn';
import React, { useState } from 'react';
import Select, { MultiValue, StylesConfig } from 'react-select';
import {
    FieldValues,
    FieldPath,
    Control,
    useController,
} from 'react-hook-form';

const colourStyles: StylesConfig<unknown, true> = {
    multiValueRemove: (styles, { data }) => ({
        ...styles,
        ':hover': {
            background: '#b2bec3',
            color: '#2d3436',
        },
    }),
};

export interface optionSelect {
    value: string;
    label: string;
}

interface InputSelectProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
    className?: string;
    options: optionSelect[] | undefined;
    placeholder: string;
    name: TName;
    control: Control<TFieldValues>;
}

const InputSelect = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
    className,
    options,
    placeholder,
    name,
    control,
}: InputSelectProps<FieldValues, TName>) => {
    const {
        field: { onChange, value },
        fieldState: { error },
    } = useController({ control, name });

    const onChangeValue = (value: MultiValue<optionSelect>) => {
        const allValue = value.map((item) => item.value);
        onChange(allValue);
    };

    return (
        <div className={cn('space-y-2', className)}>
            <Select
                id="select"
                className="relative z-50"
                isDisabled={!options}
                options={options}
                placeholder={placeholder}
                isMulti
                value={
                    options?.filter((item) =>
                        (value as string[])?.includes(item.value)
                    ) || []
                }
                onChange={onChangeValue as (value: MultiValue<unknown>) => void}
                styles={colourStyles}
            />
            {error?.message && (
                <p className="text-sm text-red-600">{error.message}</p>
            )}
        </div>
    );
};

export default InputSelect;
