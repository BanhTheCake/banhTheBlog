import { FC, useEffect } from 'react';
import Button from '../global/Button';
import { useRouter } from 'next/router';
import { GetDataUserQuery, useGetDataUserQuery } from '@/generated';
import { graphQLClient } from '@/config/graphqlClient';
import { getDataUser, setDataUser, useDataUser } from '@/lib/States/user.state';
import { getAccessToken } from '@/lib/States/accessToken.state';
import Image from 'next/image';
import useRefreshToken from '@/lib/Hooks/useRefreshToken';
import DropdownNavbar from './DropdownMenu';
import { AiOutlineMenu } from 'react-icons/ai';
import MenuMobile from './MenuMobile';
import { User } from '@/lib/Types/User';
import { setAuthState } from '@/lib/States/Auth.state';
import socket from '@/config/socket';

interface AuthStateProps {}

const AuthState: FC<AuthStateProps> = ({}) => {
    const router = useRouter();
    const [user] = useDataUser();
    const token = getAccessToken();
    const { refreshToken } = useRefreshToken();

    useGetDataUserQuery<User | undefined>(graphQLClient, undefined, {
        queryKey: ['getDataUser'],
        onSuccess(data) {
            if (!data) {
                setAuthState(false);
                return;
            }
            setDataUser(data);
            setAuthState(true);
            data && !token && refreshToken();
        },
        onError(err) {
            setAuthState(false);
        },
        select(data) {
            if (!data) return undefined;
            return data.getDataUser as User | undefined;
        },
    });

    if (user) {
        return (
            <>
                <div className="space-x-4 items-center hidden md:flex">
                    <p className="capitalize">{user.username}</p>
                    <DropdownNavbar user={user}>
                        <div className="relative w-10 h-10 overflow-hidden rounded-full hover:outline-black/30 outline outline-white transition-all cursor-pointer">
                            <Image
                                src={
                                    user.img ||
                                    'https://images.unsplash.com/photo-1683360467368-45591bbccaeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
                                }
                                alt={user.username}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </DropdownNavbar>
                </div>
                <MenuMobile>
                    <div className="relative w-10 h-10 overflow-hidden rounded-full hover:outline-black/30 outline outline-white transition-all cursor-pointer flex md:hidden">
                        <Image
                            src={
                                user.img ||
                                'https://images.unsplash.com/photo-1683360467368-45591bbccaeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
                            }
                            alt={user.username}
                            fill
                            className="object-cover"
                        />
                    </div>
                </MenuMobile>
            </>
        );
    }

    return (
        <>
            <div className="space-x-4 hidden md:flex">
                <Button
                    variant={'text'}
                    className="border-none"
                    onClick={() => router.push('/login')}
                >
                    Log in
                </Button>
                <Button
                    variant={'secondary'}
                    onClick={() => router.push('/register')}
                >
                    Sign up
                </Button>
            </div>
            <MenuMobile>
                <Button variant={'text'} className="border-none flex md:hidden">
                    <AiOutlineMenu size={26} />
                </Button>
            </MenuMobile>
        </>
    );
};

export default AuthState;
