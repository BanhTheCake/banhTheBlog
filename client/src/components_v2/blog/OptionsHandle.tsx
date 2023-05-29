import Link from 'next/link';
import {
    DropdownItem,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownSeparator,
} from '@/components_v2/global/Dropdown';
import { IPost, IPostDetails } from '@/lib/Types/Post';
import DeleteBtnWrapper from '@/components_v2/global/DeleteBtnWrapper';

interface OptionsHandlePostProps {
    children: React.ReactNode;
    post: IPostDetails | IPost;
    onSuccessDelete: (...args: any[]) => any;
}

const OptionsHandlePost = ({
    children,
    post,
    onSuccessDelete,
}: OptionsHandlePostProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
            <DropdownMenuContent align="end" alignOffset={-10} sideOffset={10}>
                <DropdownItem asChild>
                    <Link href={`/blog/update/${post.slug}`}>Update</Link>
                </DropdownItem>
                <DropdownSeparator />
                <DropdownItem asChild>
                    <DeleteBtnWrapper
                        postId={post._id}
                        onCallback={onSuccessDelete}
                    >
                        <p>Delete</p>
                    </DeleteBtnWrapper>
                </DropdownItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default OptionsHandlePost;
