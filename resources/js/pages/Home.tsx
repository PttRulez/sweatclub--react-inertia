import { FloatingButton } from '@/components/shared/FAB';
import { Card, CardContent } from '@/components/ui/card';
import { create } from '@/routes/adminka/games';
import { Game, SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import AdminGameController from '@/actions/App/Http/Controllers/Admin/AdminGameController';
import { Pen } from 'lucide-react';

type Props = {
    games: Game[];
};

export default function Home({ games }: Props) {
    const page = usePage<SharedData>();
    const { user } = page.props.auth;

    return (
        <>
            <div>
                {games.map((game) => (
                    <Card className="w-fit relative" key={game.id}>
                        <CardContent>
                            <img src={game.photo_path} className="w-[280px]" />
                        </CardContent>
                        {user?.is_admin && (
                            <Link className="absolute right-0" href={AdminGameController.edit(game.id).url}>
                                <Pen />
                            </Link>
                        )}
                    </Card>
                ))}
            </div>
            {user?.is_admin && (
                <Link href={create()}>
                    <FloatingButton />
                </Link>
            )}
        </>
    );
}
