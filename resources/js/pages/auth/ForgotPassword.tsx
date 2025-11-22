// Components
import { login } from '@/routes';
import { email } from '@/routes/password';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import FormInput from '@/components/form-elements/FormInput';
import TextLink from '@/components/shared/TextLink';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/layouts/AuthLayout';
import { ReactNode } from 'react';

function ForgotPassword({ status }: { status?: string }) {
    return (
        <>
            <Head title="Забыли пароль" />

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <div className="space-y-6">
                <Form {...email.form()}>
                    {({ processing, errors }) => (
                        <>
                            <FormInput
                                fieldName="name"
                                placeholder="Введите ваш email"
                                errorMessage={errors.email}
                                type="email"
                            />

                            <div className="my-6 flex items-center justify-start">
                                <Button
                                    className="w-full"
                                    disabled={processing}
                                    data-test="email-password-reset-link-button"
                                >
                                    {processing && (
                                        <LoaderCircle className="h-4 w-4 animate-spin" />
                                    )}
                                    Получить ссылку
                                </Button>
                            </div>
                        </>
                    )}
                </Form>

                <div className="space-x-1 text-center text-sm text-muted-foreground">
                    <span>Вернуться на страницу</span>
                    <TextLink href={login()}>логина</TextLink>
                </div>
            </div>
        </>
    );
}

ForgotPassword.layout = (page: ReactNode) => (
    <AuthLayout
        title="Забыли пароль"
        description="Введите ваш email, чтобы получить ссылку для восстановления"
    >
        {page}
    </AuthLayout>
);

export default ForgotPassword;
