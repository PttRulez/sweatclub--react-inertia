import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { FloatingButton } from '@/components/shared/FAB';
import { create } from '@/routes/adminka/games';


export default function Home() {
    const page = usePage<SharedData>();
    const { user } = page.props.auth;
    console.log('user', user);

    return <>{user?.is_admin && <Link href={create()}><FloatingButton /></Link>}</>;
}
