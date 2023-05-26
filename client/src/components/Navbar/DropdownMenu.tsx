import Link from 'next/link';
import {
    DropdownItem,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownSeparator,
} from '../global/Dropdown';
import useLogout from '@/lib/Hooks/useLogout';
import { menu } from '@/config/path';
import { Roles, User } from '@/lib/Types/User';

interface DropdownProps {
    children: React.ReactNode;
    user: User;
}

const DropdownNavbar = ({ children, user }: DropdownProps) => {
    const { logout } = useLogout();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
            <DropdownMenuContent>
                {menu?.map((item) => {
                    const isDisplay = item.role.includes(
                        user.role.toLowerCase() as Roles
                    );
                    if (!isDisplay) return null;
                    return (
                        <div key={item.href}>
                            <Link href={item.href}>
                                <DropdownItem>{item.name}</DropdownItem>
                            </Link>
                            {item.separator && <DropdownSeparator />}
                        </div>
                    );
                })}
                <DropdownItem onClick={logout}>Log out</DropdownItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default DropdownNavbar;
