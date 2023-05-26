import { Editor } from '@tiptap/react';
import {
    AiOutlineBold,
    AiOutlineItalic,
    AiOutlineStrikethrough,
    AiOutlineCode,
    AiOutlineClear,
    AiOutlineOrderedList,
    AiOutlineUndo,
    AiOutlineRedo,
    AiOutlineLink,
} from 'react-icons/ai';
import { RiHeading } from 'react-icons/ri';
import { BiCodeBlock, BiImageAdd } from 'react-icons/bi';
import { MdFormatQuote } from 'react-icons/md';
import Button from '../Button';
import cn from '@/lib/Utils/cn';
import { useContext, useState } from 'react';
import LinkDropdown from './LinkDropdown';
import { EditorContext, EditorContextType } from '@/lib/Context/EditorContext';
import UploadFileWrapper from './UploadFileWrapper';

const generateButton = (editor: Editor) => {
    return [
        {
            onClick: () => editor.chain().focus().toggleBold().run(),
            disable: !editor.can().chain().focus().toggleBold().run(),
            className: editor.isActive('bold') ? 'bg-black/5' : '',
            icon: AiOutlineBold,
            name: 'bold',
        },
        {
            onClick: () => editor.chain().focus().toggleItalic().run(),
            disable: !editor.can().chain().focus().toggleItalic().run(),
            className: editor.isActive('italic') ? 'bg-black/5' : '',
            icon: AiOutlineItalic,
            name: 'italic',
        },
        {
            onClick: () => editor.chain().focus().toggleStrike().run(),
            disable: !editor.can().chain().focus().toggleStrike().run(),
            className: editor.isActive('strike') ? 'bg-black/5' : '',
            icon: AiOutlineStrikethrough,
            name: 'strike',
        },
        {
            onClick: () => editor.chain().focus().toggleCode().run(),
            disable: !editor.can().chain().focus().toggleCode().run(),
            className: editor.isActive('code') ? 'bg-black/5' : '',
            icon: AiOutlineCode,
            name: 'code',
        },
        {
            onClick: () => editor.chain().focus().unsetAllMarks().run(),
            icon: AiOutlineClear,
            name: 'unset',
        },
        {
            onClick: () =>
                editor.chain().focus().toggleHeading({ level: 1 }).run(),
            className: editor.isActive('heading', { level: 1 })
                ? 'bg-black/5'
                : '',
            icon: RiHeading,
            name: 'heading1',
        },
        {
            onClick: () =>
                editor.chain().focus().toggleHeading({ level: 2 }).run(),
            className: editor.isActive('heading', { level: 2 })
                ? 'bg-black/5'
                : '',
            icon: RiHeading,
            name: 'heading2',
        },
        {
            onClick: () => editor.chain().focus().toggleOrderedList().run(),
            className: editor.isActive('orderedList') ? 'bg-black/5' : '',
            icon: AiOutlineOrderedList,
            name: 'orderedList',
        },
        {
            onClick: () => editor.chain().focus().toggleCodeBlock().run(),
            className: editor.isActive('codeBlock') ? 'bg-black/5' : '',
            icon: BiCodeBlock,
            name: 'codeBlock',
        },
        {
            onClick: () => editor.chain().focus().toggleBlockquote().run(),
            className: editor.isActive('blockquote') ? 'bg-black/5' : '',
            icon: MdFormatQuote,
            name: 'blockquote',
        },
        {
            onClick: () => editor.chain().focus().undo().run(),
            disable: !editor.can().chain().focus().undo().run(),
            icon: AiOutlineUndo,
            name: 'undo',
        },
        {
            onClick: () => editor.chain().focus().redo().run(),
            disable: !editor.can().chain().focus().redo().run(),
            icon: AiOutlineRedo,
            name: 'redo',
        },
    ];
};

const MenuBar = () => {
    const { editor } = useContext(EditorContext) as EditorContextType;
    const [isOpenLink, setIsOpenLink] = useState(false);

    const onToggleOpenLink = () => {
        setIsOpenLink(!isOpenLink);
    };

    if (!editor) {
        return null;
    }

    const btns = generateButton(editor);

    return (
        <>
            <div className="flex space-x-1 bg-slate-100 p-2 sticky top-16 z-40 w-full overflow-auto">
                {btns.map(({ icon, className, name, disable, ...props }) => {
                    const Icon = icon;
                    return (
                        <Button
                            key={name}
                            variant={'text'}
                            type="button"
                            className={cn(
                                'border-none aspect-square',
                                className
                            )}
                            disabled={disable || false}
                            {...props}
                        >
                            <Icon size={26} />
                        </Button>
                    );
                })}
                <LinkDropdown open={isOpenLink} toggleOpen={onToggleOpenLink}>
                    <Button
                        variant={'text'}
                        type="button"
                        className={cn(
                            'border-none aspect-square',
                            editor.isActive('link') ? 'bg-black/5' : ''
                        )}
                        onClick={onToggleOpenLink}
                    >
                        <AiOutlineLink size={26} />
                    </Button>
                </LinkDropdown>
                <UploadFileWrapper name="image">
                    <Button
                        variant={'text'}
                        type="button"
                        className={cn(
                            'border-none aspect-square',
                            editor.isActive('link') ? 'bg-black/5' : ''
                        )}
                    >
                        <BiImageAdd size={26} />
                    </Button>
                </UploadFileWrapper>
            </div>
        </>
    );
};

export default MenuBar;
