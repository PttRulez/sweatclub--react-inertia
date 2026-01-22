import { Avatar, AvatarImage } from '@/components/ui/avatar';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { edit } from '@/routes/adminka/games';
import { Game } from '@/types';
import { Pen } from 'lucide-react';
import { Link } from '@inertiajs/react';

type Props = {
    editable?: boolean;
    game: Game;
};

export default function GameCard({ editable, game }: Props) {
    return (
        <Card key={game.id}>
            <CardHeader className="flex-row items-center gap-3 pb-2">
                <img
                    src={game.boardgame.thumbnail}
                    alt={game.boardgame.name}
                    className="h-10 w-10 rounded-lg object-cover"
                />
                <div>
                    <p className="font-medium">{game.boardgame.name}</p>
                    <p className="text-sm text-muted-foreground">
                        {game.date_played}
                    </p>
                </div>
                {editable && (
                    <Link href={edit(game.id)}>
                        <Pen />
                    </Link>
                )}
            </CardHeader>
            {game.photo_path && (
                <CardContent>
                    <div className="overflow-hidden rounded-lg">
                        <img
                            src={game.photo_path}
                            alt={''}
                            className="transition duration-300 hover:scale-120 hover:transform"
                        />
                    </div>
                </CardContent>
            )}
            <CardFooter>
                <ol className="space-y-2">
                    {game.players.map((p) => (
                        <li className="flex items-center gap-2" key={p.id}>
                            <p
                                className={cn(
                                    'flex aspect-square h-8 w-8 items-center justify-center rounded-full p-2',
                                    p.winner && 'bg-amber-300',
                                )}
                            >
                                {p.points ?? ''}
                            </p>
                            {p.name}
                            {p.avatar_path && (
                                <Avatar>
                                    <AvatarImage src={p.avatar_path} />
                                </Avatar>
                            )}
                        </li>
                    ))}
                </ol>
            </CardFooter>
        </Card>
    );
}
