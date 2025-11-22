import { Head } from '@inertiajs/react';

import AppearanceTabs from '@/pages/settings/components/AppearanceTabs';
import HeadingSmall from '@/pages/settings/components/HeadingSmall';

import SettingsWrapper from '@/pages/settings/components/SettingsWrapper';

export default function Appearance() {
    return (
        <>
            <Head title="Appearance settings" />

            <SettingsWrapper>
                <div className="space-y-6">
                    <HeadingSmall
                        title="Оформление"
                        description="Настройки внешнего вида сайта"
                    />
                    <AppearanceTabs />
                </div>
            </SettingsWrapper>
        </>
    );
}
