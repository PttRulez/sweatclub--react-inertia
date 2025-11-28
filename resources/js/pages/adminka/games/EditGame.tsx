import GameForm from '@/pages/adminka/games/components/GameForm';
import { BoardGame, Game, User } from '@/types';

type Props = {
    boardgames: BoardGame[];
    game: Game;
    users: User[];
};

export default function CreateGame({ boardgames, game, users}: Props){
    return <GameForm boardgames={boardgames} game={game} users={users}/>
}