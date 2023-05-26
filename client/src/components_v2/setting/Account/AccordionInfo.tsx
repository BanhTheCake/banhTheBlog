import { FC, useEffect, useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { SubmitHandler, useForm } from 'react-hook-form';
import Image from 'next/image';
import { useDataUser } from '@/lib/States/user.state';
import { useAuthState } from '@/lib/States/Auth.state';
import { useRouter } from 'next/router';
import {
    UpdateInfoUserType,
    ZUpdateInfoUser,
} from '@/lib/Schema/infoUser.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateUserMutation } from '@/generated';
import usePrivateGraphClient from '@/lib/Hooks/usePrivateGraphClient';
import useUpload from '@/lib/Hooks/useUpload';
import { toast } from 'react-hot-toast';
import { User } from '@/lib/Types/User';
import isGraphQLError from '@/lib/Guards/isGraphqlError';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { useQueryClient } from 'react-query';
import Input from '@/components_v2/global/Input';
import InputFile from '@/components_v2/global/InputFile';
import Button from '@/components_v2/global/Button';

interface AccordionInfoProps {}

enum ACCORDION {
    USER_ID = 'USER_ID',
    GMAIL = 'GMAIL',
    CREATED_AT = 'CREATED_AT',
    INFO = 'INFO',
}

const defaultValue: UpdateInfoUserType = {
    img: '',
    username: '',
};

const AccordionInfo: FC<AccordionInfoProps> = ({}) => {
    const [user, setDataUser] = useDataUser();
    const [isAuth] = useAuthState();
    const router = useRouter();
    const { graphQLClient } = usePrivateGraphClient();
    const { onUpload, isUploading } = useUpload();
    const queryClient = useQueryClient();

    const { handleSubmit, control, reset } = useForm<UpdateInfoUserType>({
        resolver: zodResolver(ZUpdateInfoUser),
        defaultValues: defaultValue,
    });

    const { mutate: update, isLoading } = useUpdateUserMutation(graphQLClient);

    const [selected, setSelected] = useState<ACCORDION | undefined>(undefined);

    const onSubmit: SubmitHandler<UpdateInfoUserType> = async (data) => {
        const { img, ...other } = data;
        const input: Partial<
            Omit<UpdateInfoUserType, 'img'> & { img?: string }
        > = { ...other };

        if (img && img instanceof File) {
            const url = await onUpload(img);
            input['img'] = url;
        }
        update(input, {
            onSuccess(data) {
                const isOk = data.updateDataUser.ok;
                if (!isOk) {
                    toast.error(data.updateDataUser.error as string);
                    return;
                }
                const newUser = { ...user, ...input } as User;
                setDataUser({ ...newUser });
                queryClient.invalidateQueries({
                    predicate(query) {
                        const queryKey = query.queryKey[0];
                        if (typeof queryKey === 'string') {
                            return queryKey.toLowerCase().includes('post');
                        }
                        return false;
                    },
                });
            },
            onError(error) {
                if (isGraphQLError(error)) {
                    console.log(error.response.errors);
                }
                toast.error('Something wrong with server !');
            },
        });
    };

    useEffect(() => {
        if (!user) return;
        reset({
            img: user.img ?? undefined,
            username: user.username,
        });
    }, [user, reset]);

    useEffect(() => {
        if (isAuth !== null && !isAuth) {
            router.replace('/404');
        }
    }, [isAuth, router]);

    if (!user) return null;

    return (
        <Accordion.Root
            className="w-full shadow-md rounded-lg md:max-w-[700px]"
            type="single"
            value={selected}
            collapsible
            onValueChange={(value) => setSelected(value as ACCORDION)}
        >
            <Accordion.Item
                value={ACCORDION.USER_ID}
                // className="first:rounded-t-lg last:rounded-b-lg overflow-hidden"
                asChild
            >
                <div className="first:rounded-t-lg last:rounded-b-lg overflow-hidden">
                    <Accordion.Trigger className="p-2 px-4 bg-slate-900 text-white w-full flex flex-col justify-start border-b hover:bg-slate-900/80 transition-all">
                        <h5 className="text-xl">User Id</h5>
                        <p className="text-slate-200">{user._id}</p>
                    </Accordion.Trigger>
                    <Accordion.Content className="data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden">
                        <div className="bg-slate-100 p-2 px-4">
                            <p className="text-xl mb-1">Manage your user Id </p>
                            <p className="text-red-600 text-sm">
                                Cannot be change*
                            </p>
                        </div>
                    </Accordion.Content>
                </div>
            </Accordion.Item>
            <Accordion.Item
                value={ACCORDION.GMAIL}
                className="first:rounded-t-lg last:rounded-b-lg overflow-hidden"
            >
                <Accordion.Trigger className="p-2 px-4 bg-slate-900 text-white w-full flex flex-col justify-start border-b hover:bg-slate-900/80 transition-all">
                    <h5 className="text-xl">Gmail</h5>
                    <p className="text-slate-200">{user.email}</p>
                </Accordion.Trigger>
                <Accordion.Content className="data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden">
                    <div className="bg-slate-100 p-2 px-4">
                        <p className="text-xl mb-1">
                            Manage emails to ensure your contact information is
                            accurate and up to date.
                        </p>
                        <p className="text-red-600 text-sm">
                            Cannot be change*
                        </p>
                    </div>
                </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item
                value={ACCORDION.CREATED_AT}
                className="first:rounded-t-lg last:rounded-b-lg overflow-hidden"
            >
                <Accordion.Trigger className="p-2 px-4 bg-slate-900 text-white w-full flex flex-col justify-start border-b hover:bg-slate-900/80 transition-all">
                    <h5 className="text-xl">Participate in</h5>
                    <p className="text-slate-200">
                        {format(new Date(user.createdAt), 'dd MMM yyyy', {
                            locale: enUS,
                        })}
                    </p>
                </Accordion.Trigger>
                <Accordion.Content className="data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden">
                    <div className="bg-slate-100 p-2 px-4">
                        <p className="text-xl mb-1">
                            Day you joined our Tomato & Potato
                        </p>
                        <p className="text-red-600 text-sm">
                            Cannot be change*
                        </p>
                    </div>
                </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item
                value={ACCORDION.INFO}
                className="first:rounded-t-lg last:rounded-b-lg overflow-hidden"
            >
                <Accordion.Trigger className="p-2 px-4 bg-slate-900 text-white w-full flex items-center justify-between border-b hover:bg-slate-900/80 transition-all">
                    <div className="w-full flex flex-col text-left">
                        <h5 className="text-xl">Information</h5>
                        <p className="text-slate-200">{user.username}</p>
                    </div>
                    <div className="relative w-12 aspect-square rounded-full overflow-hidden border-2">
                        <Image
                            src={
                                user.img ||
                                'https://images.unsplash.com/photo-1683360467368-45591bbccaeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
                            }
                            alt={'banhTheCake'}
                            fill
                            priority
                            className="object-cover"
                        />
                    </div>
                </Accordion.Trigger>
                <Accordion.Content className="data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden !animate-duration-500">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="bg-slate-100 p-3 px-4 flex flex-col space-y-3"
                    >
                        <p className="text-xl">Manage your information</p>
                        <Input
                            control={control}
                            name="username"
                            labelId={'banh'}
                            placeholder="banhTheCake"
                            className="w-full"
                        />
                        <InputFile
                            control={control}
                            name="img"
                            className="aspect-video h-auto"
                        />
                        <Button
                            variant={'secondary'}
                            className="w-fit"
                            isLoading={isLoading || isUploading}
                        >
                            Change
                        </Button>
                    </form>
                </Accordion.Content>
            </Accordion.Item>
        </Accordion.Root>
    );
};

export default AccordionInfo;
