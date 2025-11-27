import AdminGameController from '@/actions/App/Http/Controllers/Admin/AdminGameController';
import FormCheckbox from '@/components/form-elements/FormCheckBox';
import FormInput from '@/components/form-elements/FormInput';
import FormSelect from '@/components/form-elements/FormSelect';
import { BoardGame, User } from '@/types';
import { Form, Head, useForm } from '@inertiajs/react';
import { Fragment, useState } from 'react';
import { Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Props = {
    boardgames: BoardGame[];
    users: User[];
};

type Form = {
    boardgame_id: number;
    date_played: string;
    photo: File | null;
    players: {
        id: number;
        points: number | null;
        winner: boolean;
        name: string;
    }[];
};

export default function GameCreateForm({ boardgames, users }: Props) {
    const boardgameOptions: string[] = boardgames.map((b: BoardGame) => b.name);
    const [playerOptions, setPlayerOptions] = useState<string[]>(
        users.map((u: User) => u.name),
    );
    const form = useForm<Form>();

    const handleAddPlayer = (name: string) => {
        const user = users.find((p) => p.name === name);
        if (!user) return;

        if (form.data.players?.some((p) => p.id === user.id)) {
            return;
        }

        form.setData('players', [
            ...(form.data.players ?? []),
            {
                id: user.id,
                name: user.name,
                points: null,
                winner: false,
            },
        ]);

        setPlayerOptions((prev) => prev.filter((option) => option !== name));
    };

    const handleRemovePlayer = (index: number) => {
        const playerToRemove = form.data.players[index];
        const user = users.find((u) => u.id === playerToRemove.id);

        const updatedPlayers = form.data.players.filter((_, i) => i !== index);
        form.setData('players', updatedPlayers);

        if (user && !playerOptions.includes(user.name)) {
            setPlayerOptions((prev) => [...prev, user.name]);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(form.data);
        // form.submit(AdminGameController.store());
    };

    return (
        <>
            <Head title="Создание игры" />
            <form
                onSubmit={handleSubmit}
                className="mx-auto flex w-full max-w-[520px] flex-col gap-6"
            >
                <div className="grid gap-6">
                    <h1>Создание игры</h1>
                    <FormSelect
                        onChange={(id: number) =>
                            form.setData('boardgame_id', id)
                        }
                        options={boardgameOptions}
                        errorMessage={form.errors.boardgame_id}
                    />

                    <FormSelect
                        onChange={handleAddPlayer}
                        options={playerOptions}
                        placeholder="Игроки"
                        errorMessage={form.errors.boardgame_id}
                    />
                    <div className="grid grid-cols-[1fr_100px_50px_50px] md:grid-cols-[200px_100px_50px_50px] items-center gap-4 overflow-hidden">
                        <span>Имя</span>
                        <span>Очки</span>
                        <span>Win</span>
                        <span></span>
                        {form.data.players?.map((p, i) => (
                            <Fragment key={p.id}>
                                <p>{p.name}</p>
                                <FormInput
                                    className="w-[100px]"
                                    fieldName="points"
                                    type="number"
                                    onChange={(e) =>
                                        form.setData(
                                            `players.${i}.points`,
                                            Number(e.target.value),
                                        )
                                    }
                                />
                                <FormCheckbox
                                    fieldName=""
                                    checked={form.data.players[i].winner}
                                    onChange={(e) =>
                                        form.setData(`players.${i}.winner`, e)
                                    }
                                />
                                <Trash className="cursor-pointer" onClick={() => handleRemovePlayer(i)}/>
                            </Fragment>
                        ))}
                    </div>

                    <Button type="submit">Добавить</Button>
                </div>
            </form>
        </>
    );
}
