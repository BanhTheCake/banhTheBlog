import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import InputRegister from './InputRegister';
import RegisterSchema, {
    RegisterType,
} from '@/lib/Schema/Auth/register.schema';
import { Poppins } from 'next/font/google';
import cn from '@/lib/Utils/cn';
import { graphQLClient } from '@/config/graphqlClient';
import { useRegisterMutation } from '@/generated';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import Button from '@/components_v2/global/Button';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

enum STEP {
    EMAIL = 1,
    PASSWORD = 2,
    USERNAME = 3,
}

const defaultValue: RegisterType = {
    email: '',
    password: '',
    username: '',
};

const FormRegister = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setError,
        clearErrors,
    } = useForm<RegisterType>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: defaultValue,
    });

    const router = useRouter();
    const { mutate, isLoading } = useRegisterMutation(graphQLClient);

    const [step, setStep] = useState(1);
    const emailWatch = watch('email');
    const passwordWatch = watch('password');

    const onNextStep = (key: keyof RegisterType, value: any) => {
        if (step === STEP.USERNAME) return;
        try {
            // Check value is valid (if not valid zod will throw an error to catch)
            RegisterSchema.pick({ [key]: true }).parse({ [key]: value });
            setStep(step + 1);
            clearErrors();
        } catch (error) {
            if (error instanceof z.ZodError) {
                setError(key, {
                    message: error.errors[0].message,
                });
            }
        }
    };

    const onSubmit = (data: RegisterType) => {
        mutate(data, {
            onSuccess(data) {
                const isSuccess = data.register.ok;
                if (!isSuccess) {
                    toast.error(data.register.error as string);
                    return;
                }
                toast.success(data.register.msg as string);
                router.push('/login');
            },
            onError(error) {
                console.log(error);
                toast.error('Something wrong with server');
            },
        });
    };

    return (
        <>
            <div className=" w-[700px] max-w-full">
                <div
                    className={cn(
                        'p-4 sm:p-8 bg-[#0c162d] border border-[#202637] rounded-md',
                        poppins.className
                    )}
                >
                    <div className={cn('text-white/70 space-y-1')}>
                        <p>Welcome to HappyTato!</p>
                        <p>Let’s begin the adventure</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="pt-6">
                        {step >= STEP.EMAIL && (
                            <InputRegister
                                buttonContent="continue"
                                isShowButton={step === STEP.EMAIL}
                                keyForm="email"
                                label="Enter your email*"
                                onNextBtn={onNextStep}
                                register={{ ...register('email') }}
                                value={emailWatch}
                            />
                        )}
                        {step >= STEP.PASSWORD && (
                            <InputRegister
                                buttonContent="continue"
                                isShowButton={step === STEP.PASSWORD}
                                keyForm="password"
                                label="Enter your password*"
                                onNextBtn={onNextStep}
                                register={{ ...register('password') }}
                                value={passwordWatch}
                                type="password"
                            />
                        )}
                        {step >= STEP.USERNAME && (
                            <InputRegister
                                buttonContent="continue"
                                isShowButton={false}
                                keyForm="username"
                                label="Enter your username*"
                                onNextBtn={onNextStep}
                                register={{ ...register('username') }}
                            />
                        )}
                        {step === STEP.USERNAME && (
                            <Button
                                type="submit"
                                variant={'ghost'}
                                className="w-full mt-4 py-2"
                                isLoading={isLoading}
                            >
                                Submit
                            </Button>
                        )}
                    </form>
                </div>
                {errors && (
                    <p className=" py-4 pb-12 pl-2 text-white/60">
                        {Object.values(errors)[0]?.message}
                    </p>
                )}
            </div>
        </>
    );
};

export default FormRegister;
