import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ChangeForgotPasswordSchema, {
    ChangeForgotPasswordType,
} from '@/lib/Schema/Auth/changePasswordWhenForgot';
import { useChangePasswordMutation } from '@/generated';
import { graphQLClient } from '@/config/graphqlClient';
import isGraphQLError from '@/lib/Guards/isGraphqlError';
import { toast } from 'react-hot-toast';
import Input from '@/components_v2/global/Input';
import Button from '@/components_v2/global/Button';
import HeadTitle from '@/components_v2/global/HeadTitle';

const ForgotPage = () => {
    const router = useRouter();
    const { token } = router.query;

    const defaultTypeValues: ChangeForgotPasswordType = {
        password: '',
        cfPassword: '',
    };
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<ChangeForgotPasswordType>({
        resolver: zodResolver(ChangeForgotPasswordSchema),
        defaultValues: defaultTypeValues,
    });

    const { mutate, isLoading } = useChangePasswordMutation(graphQLClient);

    const onSubmit: SubmitHandler<ChangeForgotPasswordType> = (data) => {
        console.log(data);
        mutate(
            {
                password: data.password,
            },
            {
                onSuccess(data) {
                    console.log(data);
                    const isSuccess = data.changePassword.ok;
                    if (!isSuccess) {
                        toast.error(data.changePassword.error as string);
                        return;
                    }
                    toast.success(data.changePassword.msg as string);
                },
                onError(error) {
                    if (isGraphQLError(error)) {
                        console.log(error.response.errors);
                    }
                    toast.error('Cannot reset password');
                },
            }
        );
    };

    const [isShowPassword, setIsPassword] = useState(false);

    const onShowPassword = () => {
        setIsPassword(!isShowPassword);
    };

    useEffect(() => {
        if (!token || typeof token !== 'string') {
            return;
        }
        graphQLClient.setHeaders({
            token: token,
        });
    }, [token]);

    return (
        <>
            <HeadTitle
                title="Forgot | HappyTato"
                content="Reset your password"
                name="forgot-page"
                key="forgot-page"
            />
            <div className="w-full h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden">
                <div className="absolute inset-0 w-[200%] translate-x-[-25%]">
                    <div className="absolute inset-0 bg-[#040d21]"></div>
                    <Image
                        src={
                            'https://github.githubassets.com/images/modules/site/home/hero-glow.svg'
                        }
                        alt="Icon Github"
                        fill
                        className="object-cover object-center select-none"
                    />
                </div>
                <div className="relative flex flex-col justify-center items-center space-y-12">
                    <h3 className="text-white/70 font-semibold text-5xl text-center">
                        Reset your password
                    </h3>
                    <form
                        className="space-y-6 text-white/80 w-full"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Input
                            labelId={'password'}
                            label="Enter new password"
                            control={control}
                            name="password"
                            type={isShowPassword ? 'text' : 'password'}
                            inputClassName="bg-transparent p-2.5 rounded-sm"
                        />
                        <Input
                            labelId={'cfPassword'}
                            label="Confirm password"
                            control={control}
                            name="cfPassword"
                            type={isShowPassword ? 'text' : 'password'}
                            inputClassName="bg-transparent p-2.5 rounded-sm"
                        />
                        <div className="flex items-center mb-4">
                            <input
                                id="checkbox"
                                type="checkbox"
                                checked={isShowPassword}
                                onChange={onShowPassword}
                                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label
                                htmlFor="checkbox"
                                className="ml-2.5 text-base font-medium select-none cursor-pointer"
                            >
                                Show password
                            </label>
                        </div>
                        <div className="flex space-x-4">
                            <Button
                                variant={'ghost'}
                                className="w-full rounded-sm"
                                onClick={() => router.push('/')}
                                type="button"
                            >
                                Back to home
                            </Button>
                            <Button
                                variant={'ghost'}
                                className="w-full rounded-sm"
                                type="submit"
                                isLoading={isLoading}
                            >
                                Reset password
                            </Button>
                        </div>
                        {Object.keys(errors).length > 0 && (
                            <p className="mt-2 text-white/70 w-full">
                                {Object.values(errors)[0].message}
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </>
    );
};

export default ForgotPage;
