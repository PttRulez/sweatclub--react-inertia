import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';

import AppLogo from '@/layouts/app/shared/AppLogo';
import AuthMenu from '@/layouts/app/sidebar-layout/components/AuthMenu';
import { Main } from '@/layouts/app/sidebar-layout/Main';
import { UserMenuTrigger } from '@/layouts/app/sidebar-layout/components/UserMenuTrigger';
import { home } from '@/routes';
import { type NavItem, SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { LayoutGrid } from 'lucide-react';

const mainNavItems: NavItem[] = [
    {
        title: 'Главная',
        href: home(),
        icon: LayoutGrid,
        show: true
    },
];

export default function AppSidebar() {
    const { auth } = usePage<SharedData>().props;

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={home()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <Main items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                {auth?.user ? <UserMenuTrigger /> : <AuthMenu />}
            </SidebarFooter>
        </Sidebar>
    );
}
