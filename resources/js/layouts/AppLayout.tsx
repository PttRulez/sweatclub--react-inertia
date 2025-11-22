import FlashToaster from '@/components/shared/FlashToaster';
import HeaderLayout from '@/layouts/app/header-layout/HeaderLayout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
    <HeaderLayout breadcrumbs={breadcrumbs} {...props}>
        {children}
        <FlashToaster />
    </HeaderLayout>

);
