import GameForm from '@/pages/adminka/games/components/GameForm';
import { BoardGame, User } from '@/types';

type Props = {
    boardgames: BoardGame[];
    users: User[];
};

export default function CreateGame({ boardgames, users}: Props){
    return <GameForm boardgames={boardgames} users={users}/>
}