import { EditorContent, useEditor } from '@tiptap/react';
import React, { useEffect, useState } from 'react';
import extensionsConfig from '@/config/TiptapExtensions';

interface DisplayHtmlProps {
    value: string;
}

const DisplayHtml = ({ value }: DisplayHtmlProps) => {
    const editor = useEditor({
        extensions: extensionsConfig,
        editable: false,
        content: value,
    });

    return (
        <div className="border bg-slate-50 relative flex flex-col">
            <EditorContent
                className="outline-none p-2"
                editor={editor}
                spellCheck={false}
            />
        </div>
    );
};

export default DisplayHtml;
