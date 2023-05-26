import { Editor, EditorContent, useEditor } from '@tiptap/react';
import React, { useEffect, useState } from 'react';
import MenuBar from './Menubar';

import {
    FieldValues,
    FieldPath,
    Control,
    useController,
} from 'react-hook-form';
import extensionsConfig from '@/config/TiptapExtensions';
import EditorProvider from '@/lib/Context/EditorContext';

interface TextContentProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
    name: TName;
    control: Control<TFieldValues>;
}

const TextContent = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
    name,
    control,
}: TextContentProps<TFieldValues, TName>) => {
    const {
        field: { onChange, value },
        fieldState: { error },
    } = useController({ control, name });

    const editor = useEditor({
        extensions: extensionsConfig,
        onUpdate(props) {
            onChange(props.editor.getHTML());
        },
    });

    useEffect(() => {
        if (!editor || editor.getHTML() === value) return;
        editor?.commands.setContent(value);
    }, [editor, value]);

    return (
        <EditorProvider value={editor}>
            <div className="border bg-slate-50 relative flex flex-col">
                <MenuBar />
                <EditorContent
                    className="outline-none p-2"
                    editor={editor}
                    spellCheck={false}
                />
            </div>
            {error?.message && (
                <p className="text-sm text-red-600">{error.message}</p>
            )}
        </EditorProvider>
    );
};

export default TextContent;
