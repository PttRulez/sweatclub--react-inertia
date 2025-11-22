import FormInput from '@/components/form-elements/FormInput';
import TextLink from '@/components/shared/TextLink';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/AuthLayout';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { Form, Head } from '@inertiajs/react';
import { Fragment, ReactNode } from 'react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}

function Login({ status, canResetPassword, canRegister }: LoginProps) {
    return (
        <Fragment>
            <Head title="Вход на сайт" />

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <FormInput
                                fieldName="email"
                                type="email"
                                placeholder="Ваш email"
                                errorMessage={errors.email}
                                autoComplete="off"
                            />

                            <FormInput
                                fieldName="password"
                                type="password"
                                placeholder="Пароль"
                                errorMessage={errors.password}
                                autoComplete="off"
                            />

                            <div className="flex items-center space-x-3">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    tabIndex={3}
                                />
                                <Label htmlFor="remember">Запомнить меня</Label>

                                {canResetPassword && (
                                    <TextLink
                                        href={request()}
                                        className="mb-2 ml-auto text-sm"
                                        tabIndex={5}
                                    >
                                        Забыли пароль?
                                    </TextLink>
                                )}
                            </div>

                            <Button
                                type="submit"
                                className="mt-4 w-full"
                                tabIndex={4}
                                disabled={processing}
                                data-test="login-button"
                            >
                                {processing && <Spinner />}
                                Войти
                            </Button>
                        </div>

                        {canRegister && (
                            <div className="text-center text-sm text-muted-foreground">
                                Нет аккаунта?{' '}
                                <TextLink href={register()} tabIndex={5}>
                                    Регистрация
                                </TextLink>
                            </div>
                        )}
                    </>
                )}
            </Form>

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
        </Fragment>
    );
}

Login.layout = (page: ReactNode) => (
    <AuthLayout
        title="Вход на сайт"
        description="Введит email и пароль, чтобы войти"
    >
        {page}
    </AuthLayout>
);

export default Login;
