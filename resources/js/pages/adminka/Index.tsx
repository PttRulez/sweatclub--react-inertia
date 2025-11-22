import { index } from '@/routes/adminka/boardgames';
import TextLink from '@/components/shared/TextLink';

export default function Index() {
    return (
        <>
            <TextLink href={index()}>Настольные игры</TextLink>
        </>
    );
}
