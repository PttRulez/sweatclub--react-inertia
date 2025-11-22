import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppLayout from './layouts/AppLayout';

const appName = import.meta.env.VITE_APP_NAME || 'Coffee Riders';

createInertiaApp({
    title: (title) => (title ? `${title} | ${appName}` : appName),

    resolve: async (name) => {
        const pages = import.meta.glob('./pages/**/*.tsx');

        const page: any = await resolvePageComponent(
            `./pages/${name}.tsx`,
            pages,
        );

        // ⬇️ Если страница не определила layout → назначаем дефолтный
        page.default.layout =
            page.default.layout ??
            ((page: React.ReactNode) => <AppLayout>{page}</AppLayout>);

        return page;
    },

    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <StrictMode>
                <App {...props} />
            </StrictMode>,
        );
    },

    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
// initializeTheme();
