import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import React from 'react';

type Props = React.ComponentPropsWithoutRef<typeof Button> & {
    className?: string;
    href: string;
    text: string;
};
const ButtonLink = ({ className, href, text, ...props }: Props) => (
    <Button
        variant="default"
        className={cn('w-fit p-6 text-lg', className)}
        asChild
        {...props}
    >
        <Link href={href}>{text}</Link>
    </Button>
);

export default ButtonLink;
