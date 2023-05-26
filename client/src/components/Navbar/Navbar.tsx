import { FC } from 'react';
import { DiAtom } from 'react-icons/di';
import Button from '../global/Button';
import { Poppins } from 'next/font/google';
import cn from '@/lib/Utils/cn';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AuthState from './AuthState';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const menu = [
    { name: 'Home', href: '/' },
    { name: 'Categories', href: '/categories' },
];

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
    return (
        <div
            className={cn(
                'w-full flex items-center fixed top-0 left-0 right-0 h-16 border z-50 bg-white',
                poppins.className
            )}
        >
            <div className="max-w-[1400px] w-full mx-auto px-4 flex justify-between items-center">
                <div className="flex items-center space-x-4 font-semibold">
                    <Link
                        href={'/'}
                        className="flex items-center space-x-2 p-2 cursor-pointer"
                    >
                        <DiAtom size={30} className="stroke-1" />
                        <p>Happy Tato</p>
                    </Link>
                    {menu &&
                        menu.map((item) => {
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="p-2 px-2.5 cursor-pointer hover:bg-black/5 rounded-md transition-all hidden md:flex"
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                </div>
                <AuthState />
            </div>
        </div>
    );
};

export default Navbar;
