import { index as boardgameIndex } from '@/routes/adminka/boardgames';
import { index as gamesIndex } from '@/routes/adminka/games';
import TextLink from '@/components/shared/TextLink';

export default function Index() {
    return (
        <>
            <TextLink href={boardgameIndex()}>Настольные игры</TextLink>
            <TextLink href={gamesIndex()}>Игры</TextLink>
        </>
    );
}
