import { login } from '@/routes';
import { store } from '@/routes/register';
import { Form, Head } from '@inertiajs/react';

import FormInput from '@/components/form-elements/FormInput';
import TextLink from '@/components/shared/TextLink';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/AuthLayout';
import { ReactNode } from 'react';

function Register() {
    return (
        <>
            <Head title="Регистрация" />
            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}

                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <FormInput
                                fieldName="name"
                                placeholder="Ваше имя"
                                errorMessage={errors.name}
                            />
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
                            <FormInput
                                fieldName="password_confirmation"
                                type="password"
                                placeholder="Подтверждение пароля"
                                errorMessage={errors.password_confirmation}
                                autoComplete="off"
                            />

                            <Button
                                type="submit"
                                className="mt-2 w-full"
                                tabIndex={5}
                                data-test="register-user-button"
                            >
                                {processing && <Spinner />}
                                Зарегистрироваться
                            </Button>
                        </div>

                        <div className="text-center text-sm text-muted-foreground">
                            Уже есть аккаунт?{' '}
                            <TextLink href={login()} tabIndex={6}>
                                Войти
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </>
    );
}

Register.layout = (page: ReactNode) => (
    <AuthLayout title="Регистрация" description="Введите ваши данные">
        {page}
    </AuthLayout>
);

export default Register;
