import { FC } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { SubmitHandler, useForm } from 'react-hook-form';
import Link from 'next/link';
import ZChangePassword, {
    ChangePasswordType,
} from '@/lib/Schema/Auth/changePassword';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdatePasswordMutation } from '@/generated';
import usePrivateGraphClient from '@/lib/Hooks/usePrivateGraphClient';
import { toast } from 'react-hot-toast';
import isGraphQLError from '@/lib/Guards/isGraphqlError';
import useLogout from '@/lib/Hooks/useLogout';
import Input from '@/components_v2/global/Input';
import Button from '@/components_v2/global/Button';

interface ModalPasswordProps {
    children: React.ReactElement;
}

const defaultValues: ChangePasswordType = {
    cfPassword: '',
    currentPassword: '',
    password: '',
};

const ModalPassword: FC<ModalPasswordProps> = ({ children }) => {
    const { graphQLClient } = usePrivateGraphClient();
    const { softLogout } = useLogout();

    const { handleSubmit, control } = useForm<ChangePasswordType>({
        resolver: zodResolver(ZChangePassword),
        defaultValues: defaultValues,
    });

    const { mutate: updatePassword, isLoading } =
        useUpdatePasswordMutation(graphQLClient);

    const onSubmit: SubmitHandler<ChangePasswordType> = (data) => {
        updatePassword(
            {
                newPassword: data.password,
                password: data.currentPassword,
            },
            {
                onSuccess: async (data) => {
                    const isOk = data.updatePassword.ok;
                    if (!isOk) {
                        toast.error(data.updatePassword.error as string);
                        return;
                    }
                    toast.success('Update password success');
                    await softLogout();
                },
                onError(error) {
                    if (isGraphQLError(error)) {
                        console.log(error.response.errors);
                    }
                    toast.error('Update password failed');
                },
            }
        );
    };

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>{children}</Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/30 z-50 animate-fadeIn animate-duration-100" />
                <Dialog.Content className="fixed top-[50%] left-[50%] w-[450px] max-w-[90%] translate-x-[-50%] translate-y-[-50%] rounded-md shadow-md z-50 bg-white p-6 animate-fadeIn animate-duration-100">
                    <Dialog.Title className="font-medium text-xl">
                        Change Password
                    </Dialog.Title>
                    <Dialog.Description className="mt-1 mb-5 text-[15px] leading-normal text-black/80">
                        Your password must be at least 6 characters, including
                        numbers, letters and special characters (!$@%).
                    </Dialog.Description>
                    <form
                        action=""
                        className="flex flex-col space-y-4"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="flex flex-col space-y-6">
                            <Input
                                control={control}
                                name="currentPassword"
                                inputClassName="w-full p-3 bg-black/5 border"
                                labelId={'currentPassword'}
                                placeholder="Current Password"
                                type="password"
                            />
                            <Input
                                control={control}
                                name="password"
                                inputClassName="w-full p-3 bg-black/5 border"
                                labelId={'password'}
                                placeholder="New Password"
                                type="password"
                            />
                            <Input
                                control={control}
                                name="cfPassword"
                                inputClassName="w-full p-3 bg-black/5 border"
                                labelId={'cfPassword'}
                                placeholder="Confirm Password"
                                type="password"
                            />
                        </div>
                        <Link
                            href={'/'}
                            className="text-blue-600 font-medium underline-offset-1 hover:underline transition-all"
                        >
                            Forgot password?
                        </Link>
                        <Button
                            variant={'secondary'}
                            className="w-full bg-slate-900"
                            isLoading={isLoading}
                        >
                            Saves Change
                        </Button>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default ModalPassword;
