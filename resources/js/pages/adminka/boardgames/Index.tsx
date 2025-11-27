import ButtonLink from '@/components/shared/ButtonLink';
import { create } from '@/actions/App/Http/Controllers/Admin/AdminBoardGameController';
import { BoardGame } from '@/types';
import { Card, CardContent, CardTitle } from '@/components/ui/card';

export default function Index({ boardgames }: { boardgames: BoardGame[]}) {

    return (
        <>
            <h1>Настольные игры клуба</h1>
            <ButtonLink className='' href={create.url()} text={"+ Создать"} />

            <div className="grid md:grid-cols-3 gap-4">
            {boardgames.map((b) => (
                <Card key={b.id} className="w-fit">
                    <CardTitle className="text-center text-xl">{ b.name }</CardTitle>
                    <CardContent>
                        <img src={b.image_path} alt={b.name} />
                    </CardContent>
                </Card>
            ))}
            </div>
        </>
)}