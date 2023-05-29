import RootLayout from '@/layouts/RootLayout';
import SettingsLayout from '@/layouts/SettingsLayout';
import React from 'react';
import Account from '@/components_v2/setting/Account';
import HeadTitle from '@/components_v2/global/HeadTitle';

const AccountPage = () => {
    return (
        <>
            <HeadTitle
                title="Settings | Account"
                content="Verify your identity and protect our community."
                keyData="settings-account"
                name="settings-account"
            />
            <div className="w-full flex flex-col space-y-6 mb-6">
                <div className="flex flex-col space-y-2">
                    <h2 className="font-semibold text-2xl">Account</h2>
                    <p className="text-base text-slate-700">
                        Meta uses this information to verify your identity and
                        protect our community. You decide what personal
                        information is visible to others.
                    </p>
                </div>
                <Account.AccordionInfo />
            </div>
        </>
    );
};

AccountPage.getLayout = (page: React.ReactElement) => {
    return <SettingsLayout>{page}</SettingsLayout>;
};

export default AccountPage;
