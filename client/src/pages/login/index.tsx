import { graphQLClient } from '@/config/graphqlClient';
import { useLoginMutation } from '@/generated';
import { setAccessToken } from '@/lib/States/accessToken.state';
import LoginSchema, { LoginType } from '@/lib/Schema/Auth/login.schema';
import cn from '@/lib/Utils/cn';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { DiAtom } from 'react-icons/di';
import { GrClose } from 'react-icons/gr';
import { useQueryClient } from 'react-query';
import Input from '@/components_v2/global/Input';
import Button from '@/components_v2/global/Button';
import Login from '@/components_v2/login';

const LoginPage = ({}) => {
    const { mutate: handleLogin, isLoading } = useLoginMutation(graphQLClient);
    const router = useRouter();
    const queryClient = useQueryClient();

    const [errorMsg, setErrorMsg] = useState('');
    const [openModal, setOpenModal] = useState(false);

    const onCloseModal = () => {
        setOpenModal(false);
    };

    const defaultLoginValue: LoginType = {
        email: '',
        password: '',
    };
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<LoginType>({
        resolver: zodResolver(LoginSchema),
        defaultValues: defaultLoginValue,
    });

    const onSubmit: SubmitHandler<LoginType> = (data) => {
        handleLogin(data, {
            onSuccess(data) {
                const isFirstLogin = data.login.code === 404;
                if (isFirstLogin) {
                    toast.error(data.login.error as string);
                    setErrorMsg('');
                    return;
                }
                const isLoginSuccess = data.login.code === 200;
                if (!isLoginSuccess) {
                    setErrorMsg(data.login.error as string);
                    return;
                }
                setAccessToken(data.login.token as string);
                handleCloseError();
                queryClient.invalidateQueries({
                    queryKey: ['getDataUser'],
                    // to refetch query that has enable false (because enable false will ignore invalidateQueries)
                    // refetchInactive: true,
                });
                router.push('/');
            },
        });
    };

    const handleCloseError = () => {
        setErrorMsg('');
    };

    useEffect(() => {
        if (Object.keys(errors).length !== 0) {
            setErrorMsg(Object.values(errors)[0].message || '');
            return;
        }
        setErrorMsg('');
    }, [errors]);
    return (
        <div className={cn('min-h-screen flex p-2 w-screen')}>
            <div className="m-auto flex flex-col items-center space-y-4 w-[350px] max-w-full">
                <div>
                    <DiAtom size={80} />
                </div>
                <h2 className="text-2xl font-normal text-center">
                    Sign in to BanhTheBlog
                </h2>
                {errorMsg && (
                    <div className="w-full bg-red-100 border border-red-300 p-4 py-3.5 rounded-md flex items-center justify-between animate-fadeIn animate-duration-150">
                        <p>Incorrect email or password.</p>
                        <GrClose
                            className="p-1 rounded-sm active:opacity-60 transition-all cursor-pointer"
                            size={26}
                            onClick={handleCloseError}
                        />
                    </div>
                )}
                <form
                    className="rounded-md bg-slate-50 shadow-sm border p-4 flex flex-col space-y-4 w-[350px] max-w-full"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Input
                        control={control}
                        name="email"
                        label="Email address"
                        labelId={'Email'}
                    />
                    <Input
                        control={control}
                        name="password"
                        label="Password"
                        labelId={'Password'}
                        type="password"
                        PrefixElement={
                            <p
                                className="text-blue-600 text-sm cursor-pointer"
                                onClick={() => setOpenModal(true)}
                            >
                                Forgot password?
                            </p>
                        }
                    />
                    <Button variant={'primary'}>
                        {isLoading ? 'Signing' : 'Sign in'}
                    </Button>
                </form>
                <div className="border rounded-md w-full p-3 py-5 flex justify-center space-x-1.5 shadow-sm">
                    <p>New Tomato?</p>
                    <Link
                        href={'/register'}
                        className="text-blue-600 underline-offset-4 hover:underline"
                    >
                        create an account
                    </Link>
                </div>
            </div>
            <Login.ModalForgot isOpen={openModal} onClose={onCloseModal} />
        </div>
    );
};

export default LoginPage;
