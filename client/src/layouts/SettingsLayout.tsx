import { FC } from 'react';
import RootLayout from './RootLayout';
import Settings from '@/components/Settings';

interface SettingsLayoutProps {
    children: React.ReactElement;
}

const SettingsLayout: FC<SettingsLayoutProps> = ({ children }) => {
    return (
        <RootLayout variant={'noPadding'}>
            <div className="flex overflow-x-hidden">
                <Settings.SidebarMobile />
                <Settings.Sidebar />
                <div className="w-[calc(100%-4rem)] md:w-[calc(100%-20rem)] flex-shrink-0 flex flex-col p-4">
                    {children}
                </div>
            </div>
        </RootLayout>
    );
};

export default SettingsLayout;
