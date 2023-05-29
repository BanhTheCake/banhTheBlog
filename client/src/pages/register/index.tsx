import Image from 'next/image';
import { DiAtom } from 'react-icons/di';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Register from '@/components_v2/register';
import HeadTitle from '@/components_v2/global/HeadTitle';

const RegisterPage = ({}) => {
    const router = useRouter();

    return (
        <>
            <HeadTitle
                title="Register | HappyTato"
                content="register your account to join the Tato."
                keyData="register"
                name="register"
            />
            <div className="w-full min-h-screen relative overflow-x-hidden p-4 md:px-8 flex flex-col">
                <div className="absolute inset-0 w-[200%] translate-x-[-25%]">
                    <div className="absolute inset-0 bg-[#040d21]"></div>
                    <Image
                        src={
                            'https://github.githubassets.com/images/modules/site/home/hero-glow.svg'
                        }
                        alt="Icon Github"
                        fill
                        className="object-cover object-center"
                    />
                </div>
                <div className="relative max-w-[1250px] mx-auto w-full flex-1 flex flex-col">
                    <div className="flex items-center justify-between space-x-2">
                        <div
                            className="aspect-square w-[50px] p-1 rounded-full bg-white flex items-center justify-center cursor-pointer"
                            onClick={() => router.push('/')}
                        >
                            <DiAtom size={30} className="stroke-1" />
                        </div>
                        <p className="text-white/80">
                            Already have an account?{' '}
                            <Link
                                href={'/login'}
                                className="text-white underline-offset-2 hover:underline transition-all"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                    <div className="flex-1 flex flex-col justify-center items-center pt-12">
                        <Register.Form />
                    </div>
                    <p className="text-white/60 text-[12px] max-w-[700px] mx-auto">
                        By creating an account, you agree to the{' '}
                        <Link
                            href={'/'}
                            className="text-blue-600 underline-offset-2 hover:underline"
                        >
                            Terms of Service
                        </Link>
                        . For more information about{' '}
                        <Link
                            href={'/'}
                            className="text-blue-600 underline-offset-2 hover:underline"
                        >
                            tomato privacy practices
                        </Link>
                        , see the GitHub Privacy Statement. tomato occasionally
                        send you account-related emails.
                    </p>
                </div>
            </div>
        </>
    );
};

export default RegisterPage;
