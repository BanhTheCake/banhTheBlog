import { Editor } from '@tiptap/react';
import React, { useMemo, useState } from 'react';

export interface EditorContextType {
    editor: Editor | null;
}

export const EditorContext = React.createContext<EditorContextType | null>(
    null
);

const EditorProvider = ({
    children,
    value,
}: {
    children: React.ReactNode;
    value: Editor | null;
}) => {
    const editor = useMemo(() => ({ editor: value }), [value]);

    return (
        <EditorContext.Provider value={editor}>
            {children}
        </EditorContext.Provider>
    );
};

export default EditorProvider;
