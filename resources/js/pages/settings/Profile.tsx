import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import { send } from '@/routes/verification';
import { type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Form, Link, usePage } from '@inertiajs/react';

import FormInput from '@/components/form-elements/FormInput';
import { Button } from '@/components/ui/button';
import DeleteUser from '@/pages/settings/components/DeleteUser';
import HeadingSmall from '@/pages/settings/components/HeadingSmall';
import SettingsWrapper from '@/pages/settings/components/SettingsWrapper';

export default function Profile({
    mustVerifyEmail,
    status,
}: {
    mustVerifyEmail: boolean;
    status?: string;
}) {
    const { auth } = usePage<SharedData>().props;

    return (
        <SettingsWrapper>
            <div className="space-y-6">
                <HeadingSmall
                    title="Информация о профиле"
                    description="Здесь можно править информацию о вас"
                />

                <Form
                    {...ProfileController.update.form()}
                    options={{
                        preserveScroll: true,
                    }}
                    className="space-y-6"
                >
                    {({ processing, recentlySuccessful, errors }) => (
                        <>
                            <FormInput
                                fieldName="name"
                                placeholder="Ваше имя"
                                defaultValue={auth.user.name}
                                label="Имя"
                                errorMessage={errors.name}
                            />

                            <FormInput
                                fieldName="email"
                                placeholder="Ваш email"
                                type="email"
                                defaultValue={auth.user.email}
                                label="Ваш email"
                                errorMessage={errors.email}
                            />


                            <div className="flex items-center gap-4">
                                <Button
                                    disabled={processing}
                                    data-test="update-profile-button"
                                >
                                    Сохранить
                                </Button>

                                <Transition
                                    show={recentlySuccessful}
                                    enter="transition ease-in-out"
                                    enterFrom="opacity-0"
                                    leave="transition ease-in-out"
                                    leaveTo="opacity-0"
                                >
                                    <p className="text-sm text-neutral-600">
                                        Сохранено
                                    </p>
                                </Transition>
                            </div>
                        </>
                    )}
                </Form>
            </div>

            <DeleteUser />
        </SettingsWrapper>
    );
}
