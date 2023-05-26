import SettingsLayout from '@/layouts/SettingsLayout';
import React from 'react';
import Password from '@/components_v2/setting/Password';

const PasswordPage = () => {
    return (
        <div className="w-full flex flex-col space-y-6 mb-6">
            <div className="flex flex-col space-y-2">
                <h2 className="font-semibold text-2xl">
                    Password and Security
                </h2>
                <p className="text-base text-slate-700">
                    Meta uses this information manage your password
                </p>
            </div>
            <Password.Modal>
                <div className="w-full shadow-md rounded-lg md:max-w-[700px]">
                    <div className="first:rounded-t-lg last:rounded-b-lg overflow-hidden p-3 px-4 bg-slate-900 text-white w-full flex flex-col justify-start border-b hover:bg-slate-900/80 transition-all cursor-pointer">
                        Change Password
                    </div>
                </div>
            </Password.Modal>
        </div>
    );
};

PasswordPage.getLayout = (page: React.ReactElement) => {
    return <SettingsLayout>{page}</SettingsLayout>;
};

export default PasswordPage;
