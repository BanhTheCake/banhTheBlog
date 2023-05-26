import { Roles } from '@/lib/Types/User';
import { RiAccountCircleLine } from 'react-icons/ri';
import { SiSecurityscorecard } from 'react-icons/si';

export const menu = [
    {
        name: 'Create blog',
        separator: true,
        href: '/blog/create',
        role: [Roles.ADMIN],
    },
    {
        name: 'Your blogs',
        separator: false,
        href: '/me/blogs',
        role: [Roles.ADMIN, Roles.USER],
    },
    {
        name: 'Your favorites',
        separator: true,
        href: '/me/favorites',
        role: [Roles.ADMIN, Roles.USER],
    },
    {
        name: 'Settings',
        separator: false,
        href: '/settings/account',
        role: [Roles.ADMIN, Roles.USER],
    },
];

export const menuSettings = [
    { name: 'Account', href: '/settings/account', icon: RiAccountCircleLine },
    { name: 'Password', href: '/settings/password', icon: SiSecurityscorecard },
];
