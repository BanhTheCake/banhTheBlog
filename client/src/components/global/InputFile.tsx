import cn from '@/lib/Utils/cn';
import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import {
    FieldValues,
    FieldPath,
    Control,
    useController,
} from 'react-hook-form';

interface InputFileProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
    className?: string;
    name: TName;
    control: Control<TFieldValues>;
}

const InputFile = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
    className,
    name,
    control,
}: InputFileProps<TFieldValues, TName>) => {
    const {
        field: { onChange, value },
        fieldState: { error },
    } = useController({ control, name });
    const [img, setImg] = useState('');

    const onChangeValue = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;
        onChange(e.target.files[0]);
    };

    useEffect(() => {
        if (!value) {
            setImg('');
            return;
        }
        if (typeof value === 'string') {
            setImg(value);
            return;
        }
        const imgSrc = URL.createObjectURL(value);
        setImg(imgSrc);
    }, [value]);

    return (
        <div className="flex flex-col space-y-2">
            <label
                htmlFor={name}
                className={cn(
                    'w-full h-44 border-2 border-dashed bg-slate-200 border-slate-400 flex justify-center items-center cursor-pointer relative',
                    className
                )}
            >
                <p className="font-semibold text-slate-700">
                    Upload file here !
                </p>
                {img && (
                    <Image
                        fill
                        src={img}
                        alt="TitleImg"
                        className="object-cover absolute inset-0"
                    />
                )}
            </label>
            <input type="file" hidden id={name} onChange={onChangeValue} />
            {error?.message && (
                <p className="text-sm text-red-600">{error.message}</p>
            )}
        </div>
    );
};

export default InputFile;
