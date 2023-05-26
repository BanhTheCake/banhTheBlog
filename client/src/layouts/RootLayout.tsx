import { FC } from 'react';
import { Poppins } from 'next/font/google';
import cn from '@/lib/Utils/cn';
import Footer from '@/components_v2/footer';
import { cva, type VariantProps } from 'class-variance-authority';
import SocketProvider from '@/lib/Context/SocketContext';
import Navbar from '@/components_v2/navbar';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    preload: true,
});

const RootLayoutProps = cva(
    'max-w-[1400px] min-h-screen w-full mx-auto z-0 flex flex-col',
    {
        variants: {
            variant: {
                default: 'p-4 pb-12',
                noPadding: '',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

interface RootLayoutProps extends VariantProps<typeof RootLayoutProps> {
    children: React.ReactNode;
    className?: string;
}

const RootLayout: FC<RootLayoutProps> = ({ children, variant, className }) => {
    return (
        <div className={cn('w-full min-h-screen flex flex-col')}>
            <Navbar.Main />
            <div className="h-16" />
            <div
                className={cn(
                    RootLayoutProps({
                        variant,
                        className,
                    }),
                    poppins.className
                )}
            >
                <SocketProvider>{children}</SocketProvider>
            </div>
            <Footer.Main />
        </div>
    );
};

export default RootLayout;
