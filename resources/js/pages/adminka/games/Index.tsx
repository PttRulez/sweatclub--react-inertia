import GameCard from '@/components/shared/GameCard';
import { Button } from '@/components/ui/button';
import { create } from '@/routes/adminka/games';
import { Game } from '@/types';
import { Link } from '@inertiajs/react';

type Props = {
    games: Game[];
};

export default function Index({ games }: Props) {
    return (
        <>
            <Button className="w-fit">
                <Link href={create()}>Создать</Link>
            </Button>
            <div className="grid gap-4 md:grid-cols-3">
                {games.map((game) => (
                    <GameCard game={game} key={game.id} editable={true}/>
                ))}
            </div>
        </>
    );
}
