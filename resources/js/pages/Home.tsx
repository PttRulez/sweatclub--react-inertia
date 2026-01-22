import { FloatingButton } from '@/components/shared/FAB';
import GameCard from '@/components/shared/GameCard';
import { create } from '@/routes/adminka/games';
import { Game, SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';

type Props = {
    games: Game[];
};

export default function Home({ games }: Props) {
    const page = usePage<SharedData>();
    const { user } = page.props.auth;

    return (
        <>
            <div className="grid gap-4 md:grid-cols-3">
                {games.map((game) => (
                    <GameCard game={game}  key={game.id} />
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
