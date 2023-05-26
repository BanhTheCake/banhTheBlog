import { menuSettings } from '@/config/path';
import cn from '@/lib/Utils/cn';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = ({}) => {
    const router = useRouter();
    const activePath = router.asPath.split('?')[0];

    return (
        <div className="w-80 border-r shadow-md min-h-screen overflow-y-auto hidden md:flex flex-col p-4 space-y-3">
            <div className="flex flex-col space-y-2">
                <h3 className="font-semibold text-2xl ">Account Center</h3>
                <p className="text-black/80">
                    Manage account settings and connectivity experiences across
                    BanhTheCake & Tomato
                </p>
            </div>
            <h4 className="font-semibold text-xl">Manage settings</h4>
            {menuSettings && (
                <>
                    <div className="flex flex-1 flex-col space-y-2">
                        {menuSettings.map((item) => {
                            const IconComponent = item.icon;
                            return (
                                <Link
                                    href={item.href}
                                    key={item.href}
                                    className={cn(
                                        'p-3 rounded-md flex space-x-4 items-center bg-transparent hover:bg-black/5',
                                        activePath === item.href &&
                                            'bg-slate-800 text-white hover:bg-slate-900'
                                    )}
                                >
                                    <IconComponent size={26} />
                                    <p>{item.name}</p>
                                </Link>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
};

export default Sidebar;
