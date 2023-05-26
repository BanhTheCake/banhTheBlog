import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ForgotSchema, { ForgotType } from '@/lib/Schema/Auth/forgot.schema';
import { GrFormClose } from 'react-icons/gr';
import { useForgotPasswordMutation } from '@/generated';
import { graphQLClient } from '@/config/graphqlClient';
import { toast } from 'react-hot-toast';
import Portal from '@/components_v2/global/Portal';
import Input from '@/components_v2/global/Input';
import Button from '@/components_v2/global/Button';

interface ModalForgotProps {
    isOpen: boolean;
    onClose: () => void;
}

const defaultValues: ForgotType = {
    email: '',
};

const ModalForgot: FC<ModalForgotProps> = ({ isOpen, onClose }) => {
    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<ForgotType>({
        resolver: zodResolver(ForgotSchema),
        defaultValues: defaultValues,
    });

    const { mutate, isLoading } = useForgotPasswordMutation(graphQLClient);

    const onSubmit: SubmitHandler<ForgotType> = (data) => {
        mutate(
            {
                email: data.email,
            },
            {
                onSuccess(data) {
                    const isSuccess = data.forgotPassword.ok;
                    if (!isSuccess) {
                        toast.error(data.forgotPassword.error as string);
                    }
                    toast.success(data.forgotPassword.msg as string);
                    reset({});
                },
                onError(error) {
                    toast.error('Something wrong with server');
                },
                onSettled() {
                    onClose();
                },
            }
        );
    };

    return (
        <>
            {isOpen && (
                <Portal>
                    <div className="fixed inset-0 animate-fadeIn animate-duration-100">
                        <div
                            className="absolute inset-0 bg-black/70 cursor-pointer animate-fadeIn animate-duration-75"
                            onClick={onClose}
                        />
                        <div className="absolute bottom-0 right-0 p-6 animate-fadeInRight animate-duration-500 max-w-full flex justify-end">
                            <div className="relative rounded-md bg-white border border-slate-400 p-6 w-[350px] max-w-full">
                                <GrFormClose
                                    size={30}
                                    className="absolute top-3 right-3 cursor-pointer fill-red"
                                    onClick={onClose}
                                />
                                <h4 className="text-xl font-semibold">
                                    Forgot password
                                </h4>
                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="pt-2 space-y-4"
                                >
                                    <Input
                                        control={control}
                                        labelId={'emailForgot'}
                                        name="email"
                                        label="Enter your email*"
                                        inputClassName={
                                            errors?.email &&
                                            'border-red-500 bg-red-400/20'
                                        }
                                    />
                                    <Button
                                        type="submit"
                                        variant={'primary'}
                                        className="w-full"
                                        isLoading={isLoading}
                                    >
                                        Send Email
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </Portal>
            )}
        </>
    );
};

export default ModalForgot;
