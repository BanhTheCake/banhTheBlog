import { menuSettings } from '@/config/path';
import useSetTimeOut from '@/lib/Hooks/useSetTimeOut';
import cn from '@/lib/Utils/cn';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { AiFillSetting } from 'react-icons/ai';

interface SidebarMobileProps {}

const SidebarMobile: FC<SidebarMobileProps> = ({}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [menuClass, setMenuClass] = useSetTimeOut('', 200);
    const [buttonClass, setButtonClass] = useSetTimeOut('', 200);

    const onToggleMenu = () => {
        setIsOpen((prev) => {
            setMenuClass('transition-width');
            if (prev) setButtonClass('animate-fadeOut');
            return !prev;
        });
    };

    const router = useRouter();
    const activePath = router.asPath.split('?')[0];

    return (
        <div
            className={cn(
                'flex-shrink-0 w-16 border-r flex md:hidden flex-col p-2 space-y-2 min-h-screen overflow-y-auto overflow-x-hidden',
                isOpen && 'w-[260px]',
                menuClass
            )}
        >
            <button
                onClick={onToggleMenu}
                className={cn(
                    'flex-shrink-0 w-12 p-1 rounded-md flex space-x-4 items-center bg-transparent hover:bg-black/5 aspect-square justify-center'
                )}
            >
                <AiFillSetting size={26} />
            </button>
            {menuSettings && (
                <>
                    {menuSettings.map((item) => {
                        const IconComponent = item.icon;
                        return (
                            <Link
                                href={item.href}
                                key={item.href}
                                className={cn(
                                    'flex-shrink-0 rounded-md flex bg-transparent hover:bg-black/5 items-center w-12 h-12 relative',
                                    activePath === item.href &&
                                        'bg-slate-800 text-white hover:bg-slate-900',
                                    isOpen && 'w-full aspect-auto h-12',
                                    menuClass
                                )}
                            >
                                <div className="w-12 h-12 flex items-center justify-center absolute top-0 left-0">
                                    <IconComponent size={26} />
                                </div>
                                <p
                                    className={cn(
                                        'hidden animate-duration-200',
                                        isOpen && 'pl-16 flex animate-fadeIn',
                                        buttonClass
                                    )}
                                >
                                    {item.name}
                                </p>
                            </Link>
                        );
                    })}
                </>
            )}
        </div>
    );
};

export default SidebarMobile;
