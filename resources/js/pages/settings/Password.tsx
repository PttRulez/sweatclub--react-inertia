import PasswordController from '@/actions/App/Http/Controllers/Settings/PasswordController';
import SettingsWrapper from '@/pages/settings/components/SettingsWrapper';
import { Transition } from '@headlessui/react';
import { Form, Head } from '@inertiajs/react';
import { useRef } from 'react';
import FormInput from '@/components/form-elements/FormInput';
import { Button } from '@/components/ui/button';
import HeadingSmall from '@/pages/settings/components/HeadingSmall';

export default function Password() {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    return (
        <>
            <Head title="Смена пароля" />

            <SettingsWrapper>
                <div className="space-y-6">
                    <HeadingSmall
                        title="Смена пароля"
                        description="Старайтесь использовать длинный случайный пароль для своей безопасности"
                    />

                    <Form
                        {...PasswordController.update.form()}
                        options={{
                            preserveScroll: true,
                        }}
                        resetOnError={[
                            'password',
                            'password_confirmation',
                            'current_password',
                        ]}
                        resetOnSuccess
                        onError={(errors) => {
                            if (errors.password) {
                                passwordInput.current?.focus();
                            }

                            if (errors.current_password) {
                                currentPasswordInput.current?.focus();
                            }
                        }}
                        className="space-y-6"
                    >
                        {({ errors, processing, recentlySuccessful }) => (
                            <>
                                <FormInput
                                    fieldName="current_password"
                                    ref={currentPasswordInput}
                                    label="Текущий пароль"
                                    type="password"
                                    className="mt-1 block w-full"
                                    autoComplete="current-password"
                                    errorMessage={errors.current_password}
                                />

                                <FormInput
                                    fieldName="password"
                                    ref={passwordInput}
                                    label="Новый пароль"
                                    type="password"
                                    className="mt-1 block w-full"
                                    errorMessage={errors.password}
                                />

                                <FormInput
                                    fieldName="password_confirmation"
                                    ref={passwordInput}
                                    label="Повторение нового пароля"
                                    type="password"
                                    className="mt-1 block w-full"
                                    errorMessage={errors.password_confirmation}
                                />

                                <div className="flex items-center gap-4">
                                    <Button
                                        disabled={processing}
                                        data-test="update-password-button"
                                    >
                                        Сохранить пароль
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
            </SettingsWrapper>
        </>
    );
}
