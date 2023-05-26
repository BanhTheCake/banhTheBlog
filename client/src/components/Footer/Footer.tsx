import { Poppins } from 'next/font/google';
import { FC } from 'react';
import Button from '../global/Button';
import Link from 'next/link';
import { DiAtom } from 'react-icons/di';
import cn from '@/lib/Utils/cn';
import { useRouter } from 'next/router';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    preload: true,
});

const FooterList = ({
    data,
    className,
}: {
    data: { name: string; items: string[] };
    className?: string;
}) => {
    return (
        <div className={cn('', className)}>
            <h4 className="uppercase text-white/80 mb-2">{data.name}</h4>
            <ul className="flex flex-col space-y-1.5">
                {data.items.map((item) => {
                    return (
                        <li key={item} className="capitalize">
                            {item}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

const footerList = [
    {
        name: 'Product',
        items: [
            'Overview',
            'Features',
            'Solutions',
            'Tutorial',
            'Pricing',
            'Releases',
        ],
    },
    {
        name: 'Company',
        items: ['About us', 'Careers', 'Press', 'News', 'Media kit', 'Contact'],
    },
    {
        name: 'Resources',
        items: [
            'Blog',
            'Newsletters',
            'Events',
            'Help center',
            'Tutorial',
            'Support',
        ],
    },
    {
        name: 'Use Cases',
        items: [
            'Startups',
            'Enterprise',
            'Government',
            'SaaS',
            'Marketplaces',
            'Ecommerce',
        ],
    },
    {
        name: 'Social',
        items: [
            'Twitter',
            'LinkedIn',
            'Facebook',
            'Github',
            'AngleList',
            'Dribble',
        ],
    },
    {
        name: 'Legal',
        items: [
            'Terms',
            'Privacy',
            'Cookies',
            'Licenses',
            'Settings',
            'Contact',
        ],
    },
];

const Footer = () => {
    const router = useRouter();

    return (
        <div className={cn('bg-black/90 text-w', poppins.className)}>
            <div className="max-w-[1400px] w-full mx-auto p-4 pt-10 z-0 text-white space-y-16">
                <div className="w-full flex flex-col items-start sm:items-center justify-center space-y-6">
                    <h2 className="text-4xl">
                        Let&apos;s get started on something greate
                    </h2>
                    <p className="text-white/80">
                        Join over 4.000+ startups already growing with HappyTato
                    </p>
                    <Button
                        variant={'text'}
                        className="rounded-full text-white border-2 hover:bg-white hover:text-black border-white"
                        onClick={() => router.push('/register')}
                    >
                        Start your journey
                    </Button>
                </div>
                <div className="grid grid-cols-12 gap-y-8 sm:gap-8">
                    {footerList.map((item) => {
                        return (
                            <FooterList
                                key={item.name}
                                data={item}
                                className="col-span-12 sm:col-span-6 md:col-span-2"
                            />
                        );
                    })}
                </div>
                <div className="flex space-y-2 sm:space-x-6 flex-col md:flex-row justify-between md:items-center">
                    <Link
                        href={'/'}
                        className="flex items-center space-x-2 cursor-pointer"
                    >
                        <DiAtom size={30} className="stroke-1" />
                        <p>Happy Tato</p>
                    </Link>
                    <p>2077 HappyTato. All rights reserved</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
