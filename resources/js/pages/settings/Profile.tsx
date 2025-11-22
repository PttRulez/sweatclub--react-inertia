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

                            {mustVerifyEmail &&
                                auth.user.email_verified_at === null && (
                                    <div>
                                        <p className="-mt-4 text-sm text-muted-foreground">
                                            Ваш email не подтвержден.{' '}
                                            <Link
                                                href={send()}
                                                as="button"
                                                className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                            >
                                                Нажмите, что заново получить email для подтверждения
                                            </Link>
                                        </p>

                                        {status ===
                                            'verification-link-sent' && (
                                            <div className="mt-2 text-sm font-medium text-green-600">
                                                Новая ссылка для подтверждения email отправлена вам на почту
                                            </div>
                                        )}
                                    </div>
                                )}

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
