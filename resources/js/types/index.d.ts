import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
    show: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    flash?: {
        success?: string | null;
        error?: string | null;
        warning?: string | null;
        info?: string | null;
        [key: string]: unknown;
    };
    errors?: Record<string, string>;
    [key: string]: unknown;
}

export interface User {
    id: number;
    avatar_path?: string;
    is_admin: boolean;
    name: string;
    email: string;
}

export interface BoardGame {
    id: number;
    name: string;
    has_points: boolean;
    image_path: string;
    thumbnail: string;
}

export interface Game {
    id: number;
    boardgame_id: number;
    date_played: string;
    photo_path: string;
    players: Player[];
    boardgame: BoardGame;
}

export interface Player {
    avatar_path: string;
    id: number;
    name: string;
    points?: number;
    winner: boolean;
}
