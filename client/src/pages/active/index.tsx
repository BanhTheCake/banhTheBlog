import Button from '@/components/global/Button';
import { graphQLClient } from '@/config/graphqlClient';
import { useActiveAccountMutation } from '@/generated';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const ActiveAccountPage = ({}) => {
    const router = useRouter();
    const { mutate } = useActiveAccountMutation(graphQLClient);

    const { token, gmail } = router.query;
    const [isAccept, setIsAccept] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (
            !token ||
            !gmail ||
            typeof token !== 'string' ||
            typeof gmail !== 'string'
        ) {
            setIsLoading(false);
            setIsAccept(false);
            return;
        }
        mutate(
            {
                email: gmail,
                token: token,
            },
            {
                onSuccess(data) {
                    const isSuccess = data.activeAccount.ok;
                    if (!isSuccess) {
                        setIsAccept(false);
                        return;
                    }
                    setIsAccept(true);
                },
                onError(error) {
                    setIsAccept(false);
                },
                onSettled() {
                    setIsLoading(false);
                },
            }
        );
    }, [token, gmail, mutate]);

    return (
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
            <div className="relative flex flex-col justify-center items-center space-y-4">
                {isLoading && (
                    <h3 className="text-white/70 font-semibold text-3xl text-center">
                        Please wait for we active your account
                    </h3>
                )}
                {!isLoading && !isAccept && (
                    <>
                        <h3 className="text-white/70 font-semibold text-3xl text-center">
                            Your account has been active or not exist
                        </h3>
                        <Button
                            variant={'ghost'}
                            className="w-[300px] max-w-full rounded-md"
                            onClick={() => router.push('/')}
                        >
                            Back to home
                        </Button>
                    </>
                )}
                {!isLoading && isAccept && (
                    <>
                        <h3 className="text-white/70 font-semibold text-3xl text-center">
                            Your account has been active successful
                        </h3>
                        <Button
                            variant={'ghost'}
                            className="w-[300px] max-w-full rounded-md"
                            onClick={() => router.push('/login')}
                        >
                            Go to login
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
};

export default ActiveAccountPage;
