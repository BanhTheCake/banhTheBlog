import Link from 'next/link';
import {
    DropdownItem,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownSeparator,
} from '../global/Dropdown';
import DeleteBtnWrapper from '../global/DeleteBtnWrapper';
import { IPost, IPostDetails } from '@/lib/Types/Post';
import { useHistory } from '@/lib/Context/History';
import { useQueryClient } from 'react-query';

interface OptionsHandlePostProps {
    children: React.ReactNode;
    post: IPostDetails | IPost;
}

const OptionsHandlePost = ({ children, post }: OptionsHandlePostProps) => {
    const { back } = useHistory();
    const queryClient = useQueryClient();

    const onCallBack = () => {
        back();
        Promise.all([queryClient.invalidateQueries('getMyPosts')]);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
            <DropdownMenuContent align="end" alignOffset={-10} sideOffset={10}>
                <DropdownItem asChild>
                    <Link href={`/blog/update/${post.slug}`}>Update</Link>
                </DropdownItem>
                <DropdownSeparator />
                <DropdownItem asChild>
                    <DeleteBtnWrapper postId={post._id} onCallback={onCallBack}>
                        <p>Delete</p>
                    </DeleteBtnWrapper>
                </DropdownItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default OptionsHandlePost;
