import useUpload from '@/lib/Hooks/useUpload';
import { EditorContextType } from '@/lib/Context/EditorContext';
import { EditorContext } from '@/lib/Context/EditorContext';
import React, {
    FC,
    HTMLAttributes,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';
import { toast } from 'react-hot-toast';
import Button, { ButtonProps } from '../Button';

interface UploadFileWrapperProps {
    children: React.ReactElement<ButtonProps>;
    name: string;
}

const UploadFileWrapper: FC<UploadFileWrapperProps> = ({ children, name }) => {
    const { editor } = useContext(EditorContext) as EditorContextType;
    const { onUpload, isUploading } = useUpload();

    const inputRef = useRef<HTMLInputElement>(null);

    const onAddImage = useCallback(
        async (file: File | undefined) => {
            if (!editor || !file) return;
            const url = await onUpload(file);
            console.log('URl: ', url);
            if (url) {
                editor.chain().focus().setImage({ src: url }).run();
            }
        },
        [editor, onUpload]
    );

    if (!editor || !React.isValidElement(children)) {
        return null;
    }

    return (
        <>
            <label htmlFor={name}>
                {React.cloneElement(children, {
                    onClick: () => {
                        if (isUploading) return;
                        inputRef.current?.click();
                    },
                    disabled: isUploading,
                })}
            </label>
            <input
                ref={inputRef}
                type="file"
                hidden
                id={name}
                onChange={(e) =>
                    toast.promise(onAddImage(e.target.files?.[0]), {
                        loading: 'Uploading your image !',
                        success: 'Upload success',
                        error: 'Something wrong...',
                    })
                }
            />
        </>
    );
};

export default UploadFileWrapper;
