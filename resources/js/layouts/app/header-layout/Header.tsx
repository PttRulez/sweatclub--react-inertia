import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import DesktopMenu from '@/layouts/app/header-layout/components/DesktopMenu';
import { MobileMenu } from '@/layouts/app/header-layout/components/MobileMenu';
import { home, login, register } from '@/routes';
import { type BreadcrumbItem, type NavItem, type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { LogIn, UserRoundPlus } from 'lucide-react';

interface AppHeaderProps {
    breadcrumbs?: BreadcrumbItem[];
}

export function Header({ breadcrumbs = [] }: AppHeaderProps) {
    const page = usePage<SharedData>();
    const { auth } = page.props;

    const mainNavItems: NavItem[] = [
        {
            title: ' Главная',
            href: home(),
            show: true,
        }
    ];

    const authLinks: NavItem[] = [
        {
            title: 'Войти',
            href: login(),
            icon: LogIn,
            show: !auth.user,
        },
        {
            title: 'Регистрация',
            href: register(),
            icon: UserRoundPlus,
            show: !auth.user,
        },
    ];

    return (
        <>
            <div className="fixed w-full border-b border-sidebar-border/80">
                <div className="mx-auto flex h-16 items-center px-4 md:max-w-7xl">
                    <MobileMenu
                        mainNavItems={mainNavItems}
                        authLinks={authLinks}
                    />

                    <DesktopMenu
                        mainNavItems={mainNavItems}
                        authLinks={authLinks}
                    />
                </div>
            </div>
            {breadcrumbs.length > 1 && (
                <div className="flex w-full border-b border-sidebar-border/70">
                    <div className="mx-auto flex h-12 w-full items-center justify-start px-4 text-neutral-500 md:max-w-7xl">
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                </div>
            )}
        </>
    );
}
