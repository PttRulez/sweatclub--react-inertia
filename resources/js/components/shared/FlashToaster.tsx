import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"

type FlashMessages = {
    success?: string | null;
    error?: string | null;
    warning?: string | null;
    info?: string | null;
};

type SharedProps = {
    flash?: FlashMessages;
    errors?: Record<string, string>;
};

export default function FlashToaster() {
    const { props } = usePage<SharedProps>();

    useEffect(() => {
        const flash = props.flash;

        if (flash) {
            if (flash.success) {
                toast.success(flash.success);
            }

            if (flash.error) {
                toast.error(flash.error);
            }

            if (flash.warning) {
                toast.warning(flash.warning);
            }

            if (flash.info) {
                toast(flash.info);
            }
        }

        // Валидационные ошибки (withErrors / 422)
        if (props.errors) {
            Object.values(props.errors).forEach((message) => {
                if (message) {
                    toast.error(String(message));
                }
            });
        }
    }, [props.flash, props.errors]);

    return <Toaster richColors position="top-center" />;
}
