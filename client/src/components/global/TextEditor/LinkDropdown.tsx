import { FC, useCallback, useContext, useEffect, useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '../Dropdown';
import Button from '../Button';
import { EditorContext, EditorContextType } from '@/lib/Context/EditorContext';

interface LinkDropdownProps {
    children: React.ReactNode;
    open: boolean;
    toggleOpen: () => void;
}

const LinkDropdown: FC<LinkDropdownProps> = ({
    children,
    open,
    toggleOpen,
}) => {
    const { editor } = useContext(EditorContext) as EditorContextType;
    const [inputValue, setInputValue] = useState('');

    const setLink = useCallback(
        (url: string) => {
            // cancelled
            if (url === null || !editor) {
                return;
            }

            // empty
            if (url === '') {
                editor
                    .chain()
                    .focus()
                    .extendMarkRange('link')
                    .unsetLink()
                    .run();

                return;
            }

            // update link
            editor
                .chain()
                .focus()
                .extendMarkRange('link')
                .setLink({ href: url })
                .run();
        },
        [editor]
    );

    const onClick = () => {
        setLink(inputValue);
        toggleOpen();
    };

    useEffect(() => {
        if (!open || !editor) return;
        // get previous url from text
        const prevUrl = editor.getAttributes('link').href;
        setInputValue(prevUrl || '');
    }, [open, editor]);

    return (
        <DropdownMenu open={open}>
            <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
            <DropdownMenuContent
                className="flex space-x-2"
                onInteractOutside={toggleOpen}
            >
                <input
                    type="text"
                    className="px-2 outline-none border rounded-sm border-slate-500 text-ellipsis"
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value);
                    }}
                    placeholder="https://..."
                    onKeyDown={(e) => {
                        e.key === 'Enter' && onClick();
                    }}
                />
                <Button
                    variant={'secondary'}
                    className="aspect-square p-2"
                    type="button"
                    onClick={onClick}
                >
                    Ok
                </Button>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default LinkDropdown;
