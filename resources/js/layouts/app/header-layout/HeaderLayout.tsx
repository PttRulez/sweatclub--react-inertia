import { Header } from '@/layouts/app/header-layout/Header';
import { type BreadcrumbItem } from '@/types';
import type { PropsWithChildren } from 'react';

export default function HeaderLayout({
    children,
    breadcrumbs,
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <Header breadcrumbs={breadcrumbs} />
            <main className="mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-4 rounded-xl p-5 mt-15">
                {children}
            </main>
        </div>
    );
}
