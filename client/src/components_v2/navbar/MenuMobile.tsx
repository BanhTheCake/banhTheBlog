import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Separator from '@radix-ui/react-separator';
import { IoClose } from 'react-icons/io5';
import Link from 'next/link';
import useLogout from '@/lib/Hooks/useLogout';
import { getDataUser } from '@/lib/States/user.state';
import { menu } from '@/config/path';
import { Roles } from '@/lib/Types/User';
import Button from '@/components_v2/global/Button';

interface MenuMobileProps {
    children: React.ReactNode;
}

const MenuMobile = ({ children }: MenuMobileProps) => {
    const user = getDataUser();
    const { logout } = useLogout();

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>{children}</Dialog.Trigger>
            <Dialog.Portal className="z-50">
                <Dialog.Overlay className="z-50 bg-black/20 fixed inset-0 animate-fadeIn animate-duration-100" />
                <Dialog.Content className="z-50 fixed top-0 right-0 bottom-0 w-[300px] max-w-full bg-white p-4 animate-fadeIn animate-duration-100">
                    <Dialog.Title className="pb-2">
                        <p className="font-semibold text-2xl">Resources</p>
                    </Dialog.Title>
                    <div className="w-full flex flex-col">
                        <Link
                            className="p-2 pl-4 rounded-md hover:bg-violet-400 hover:text-white transition-all font-semibold text-lg"
                            href={'/'}
                        >
                            Home
                        </Link>
                        <Link
                            href={'/categories'}
                            className="p-2 pl-4 rounded-md hover:bg-violet-400 hover:text-white transition-all font-semibold text-lg"
                        >
                            Categories
                        </Link>
                    </div>
                    <Separator.Root className="w-full bg-black/20 data-[orientation=horizontal]:h-px my-3" />
                    {user ? (
                        <>
                            <Dialog.Title className="pb-2">
                                <p className="font-semibold text-2xl capitalize">
                                    {user.username}
                                </p>
                            </Dialog.Title>
                            <div className="w-full flex flex-col">
                                {menu?.map((item) => {
                                    const isDisplay = item.role.includes(
                                        user.role.toLowerCase() as Roles
                                    );
                                    if (!isDisplay) return null;
                                    return (
                                        <React.Fragment key={item.href}>
                                            <Link
                                                href={item.href}
                                                className="p-2 pl-4 rounded-md hover:bg-violet-400 hover:text-white transition-all font-semibold text-lg"
                                            >
                                                {item.name}
                                            </Link>
                                            {item.separator && (
                                                <Separator.Root className="w-full bg-black/20 data-[orientation=horizontal]:h-px my-3" />
                                            )}
                                        </React.Fragment>
                                    );
                                })}
                                <Button
                                    variant={'text'}
                                    className="p-2 pl-4 rounded-md hover:bg-violet-400 hover:text-white transition-all font-semibold text-lg border-none text-left"
                                    onClick={logout}
                                >
                                    logout
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="w-full flex space-x-4">
                                <Link
                                    href={'/login'}
                                    className="w-full font-semibold text-lg"
                                >
                                    <Button
                                        variant={'text'}
                                        className="border-none w-full"
                                    >
                                        Login
                                    </Button>
                                </Link>
                                <Link
                                    href={'/register'}
                                    className="w-full font-semibold text-lg"
                                >
                                    <Button
                                        variant={'secondary'}
                                        className="border-none w-full"
                                    >
                                        Sign up
                                    </Button>
                                </Link>
                            </div>
                        </>
                    )}
                    <Dialog.Description className="absolute bottom-0 right-0 left-0 p-2 bg-white text-sm text-black/80 text-center">
                        M@ke by Tomato
                    </Dialog.Description>
                    <Dialog.Close asChild>
                        <Button
                            variant={'text'}
                            className="absolute top-2 right-2 p-1.5 border-none"
                            aria-label="Close"
                        >
                            <IoClose size={28} />
                        </Button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default MenuMobile;
