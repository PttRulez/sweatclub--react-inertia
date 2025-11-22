import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn, isSameUrl, resolveUrl } from '@/lib/utils';
import { NavItem, SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import AppLogo from '@/layouts/app/shared/AppLogo';
import { home } from '@/routes';
import { UserMenuContent } from '@/layouts/app/header-layout/components/UserMenuContent';
import { UserInfoTab } from '@/layouts/app/shared/UserInfoTab';

export default function DesktopMenu({
    mainNavItems,
    authLinks,
}: {
    mainNavItems: NavItem[];
    authLinks: NavItem[];
}) {
    const activeItemStyles =
        'text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100';
    const page = usePage<SharedData>();
    const { auth } = page.props;
    return (
        <>
            <Link
                href={home()}
                prefetch
                className="flex items-center space-x-2 max-md:hidden"
            >
                <AppLogo />
            </Link>
            <div className="ml-6 hidden h-full items-center space-x-6 lg:flex">
                <NavigationMenu className="flex h-full items-stretch">
                    <NavigationMenuList className="flex h-full items-stretch space-x-2">
                        {mainNavItems.map((item, index) => (
                            <NavigationMenuItem
                                key={index}
                                className="relative flex h-full items-center"
                            >
                                <Link
                                    href={item.href}
                                    className={cn(
                                        navigationMenuTriggerStyle(),
                                        isSameUrl(page.url, item.href) &&
                                            activeItemStyles,
                                        'h-9 cursor-pointer px-3',
                                    )}
                                >
                                    {item.icon && (
                                        <item.icon className="mr-2 h-4 w-4" />
                                    )}
                                    {item.title}
                                </Link>
                                {isSameUrl(page.url, item.href) && (
                                    <div className="absolute bottom-0 left-0 h-0.5 w-full translate-y-px bg-black dark:bg-white"></div>
                                )}
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
            </div>

            <div className="ml-auto flex items-center space-x-2">
                {auth.user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger >
                            <UserInfoTab user={auth.user} />
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="w-56" align="end">
                            <UserMenuContent user={auth.user} />
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <div className="relative flex items-center space-x-1">
                        <div className="hidden lg:flex">
                            {authLinks.map((item) => (
                                <TooltipProvider
                                    key={item.title}
                                    delayDuration={0}
                                >
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <a
                                                href={resolveUrl(item.href)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group ml-1 inline-flex h-9 w-9 items-center justify-center rounded-md bg-transparent p-0 text-sm font-medium text-accent-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                                            >
                                                <span className="sr-only">
                                                    {item.title}
                                                </span>
                                                {item.icon && (
                                                    <item.icon className="size-5 opacity-80 group-hover:opacity-100" />
                                                )}
                                            </a>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{item.title}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
