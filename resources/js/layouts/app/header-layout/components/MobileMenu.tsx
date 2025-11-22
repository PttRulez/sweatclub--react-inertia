import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { UserMenuContent } from '@/layouts/app/sidebar-layout/components/UserMenuContent';
import AppLogoIcon from '@/layouts/app/shared/AppLogoIcon';
import { UserInfoTab } from '@/layouts/app/shared/UserInfoTab';
import { resolveUrl } from '@/lib/utils';
import { NavItem, SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Menu } from 'lucide-react';

export function MobileMenu({
    authLinks,
    mainNavItems,
}: {
    mainNavItems: NavItem[];
    authLinks: NavItem[];
}) {
    const { auth } = usePage<SharedData>().props;

    return (
        <div className="lg:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="mr-2 h-[34px] w-[34px]"
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                </SheetTrigger>
                <SheetContent
                    side="left"
                    className="flex h-full w-64 flex-col items-stretch justify-between bg-sidebar"
                >
                    <SheetTitle className="sr-only">
                        Навигационное меню
                    </SheetTitle>
                    <SheetHeader className="flex justify-start text-left">
                        <AppLogoIcon className="h-6 w-6 fill-current text-black dark:text-white" />
                    </SheetHeader>
                    <div className="flex h-full flex-1 flex-col space-y-4 p-4">
                        <div className="flex h-full flex-col justify-between text-sm">
                            <div className="flex flex-col space-y-4">
                                {mainNavItems.map((item) => (
                                    <SheetClose asChild key={item.title}>
                                        <Link
                                            key={item.title}
                                            href={item.href}
                                            className="flex items-center space-x-2 font-medium"
                                        >
                                            {item.icon && (
                                                <item.icon className="h-5 w-5" />
                                            )}
                                            <span>{item.title}</span>
                                        </Link>
                                    </SheetClose>
                                ))}
                            </div>
                        </div>
                    </div>
                    <SheetFooter>
                        {auth.user ? (
                            <div className="flex flex-col space-y-4">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <div className="flex items-center gap-2">
                                            <UserInfoTab user={auth.user} />
                                        </div>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                                        align="end"
                                    >
                                        <UserMenuContent user={auth.user} />
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        ) : (
                            authLinks.map((item) => (
                                <Link
                                    key={item.title}
                                    href={resolveUrl(item.href)}
                                    className="flex items-center space-x-2 font-medium"
                                >
                                    {item.icon && (
                                        <item.icon className="h-5 w-5" />
                                    )}
                                    <span>{item.title}</span>
                                </Link>
                            ))
                        )}
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    );
}
