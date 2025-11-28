import AdminGameController from '@/actions/App/Http/Controllers/Admin/AdminGameController';
import FormCheckbox from '@/components/form-elements/FormCheckBox';
import FormInput from '@/components/form-elements/FormInput';
import FormSelect, {
    SelectOption,
} from '@/components/form-elements/FormSelect';
import InputError from '@/components/form-elements/InputError';
import { DatePicker } from '@/components/shared/DatePicker';
import { Button } from '@/components/ui/button';
import { todayIso } from '@/helpers';
import { cn } from '@/lib/utils';
import { BoardGame, Game, User } from '@/types';
import { Form, Head, useForm } from '@inertiajs/react';
import { Trash } from 'lucide-react';
import React, { Fragment, useMemo, useState } from 'react';

type Props = {
    boardgames: BoardGame[];
    game?: Game;
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

export default function GameForm({ boardgames, game, users }: Props) {
    const boardgameOptions: SelectOption[] = boardgames.map((b: BoardGame) => {
        return { value: String(b.id), label: b.name };
    });

    const [playerOptions, setPlayerOptions] = useState<SelectOption[]>(() => {
        const usedIds = new Set((game?.players ?? []).map((p: any) => p.id));

        return users
            .filter((u) => !usedIds.has(u.id))
            .map((u) => ({ value: String(u.id), label: u.name }));
    });

    const selectedPlayerName = '';

    const form = useForm<Form>(
        () =>
            (game ?? {
                date_played: todayIso(),
            }) as Form,
    );

    const hasPoints = useMemo(() => {
        const game = boardgames.find(
            (b) => b.id === Number(form.data.boardgame_id),
        );

        return !!game?.has_points;
    }, [boardgames, form.data.boardgame_id]);

    const handleAddPlayer = (id: string) => {
        const user = users.find((p) => p.id === Number(id));
        if (!user) return;

        if (form.data.players?.some((p) => p.id === user.id)) return;

        form.setData('players', [
            ...(form.data.players ?? []),
            {
                id: user.id,
                name: user.name,
                points: null,
                winner: false,
            },
        ]);

        setPlayerOptions((prev) =>
            prev.filter((option) => option.value !== id),
        );
    };

    const handleRemovePlayer = (deletedId: number) => {
        const user = users.find((u) => u.id === deletedId);

        const updatedPlayers = form.data.players.filter(
            (p) => p.id !== deletedId,
        );
        form.setData('players', updatedPlayers);

        setPlayerOptions((prev) => [
            ...prev,
            {
                label: user!.name,
                value: String(user!.id),
            },
        ]);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (game) {
            form.put(AdminGameController.update({ game: game.id }).url);
        } else {
            form.post(AdminGameController.store().url);
        }
    };

    return (
        <>
            <Head title={game ? 'Редактирование игры' : 'Создание игры'} />
            <form
                onSubmit={handleSubmit}
                className="mx-auto flex w-full max-w-[520px] flex-col gap-6"
            >
                <div className="grid gap-6">
                    <h1>Создание игры</h1>
                    <DatePicker
                        value={form.data.date_played}
                        onChange={(val) =>
                            form.setData('date_played', val as string)
                        }
                    />
                    <FormSelect
                        value={String(form.data.boardgame_id)}
                        onChange={(id: string) =>
                            form.setData('boardgame_id', Number(id))
                        }
                        options={boardgameOptions}
                        errorMessage={form.errors.boardgame_id}
                    />
                    <FormInput
                        fieldName="photo"
                        type="file"
                        onChange={(e) =>
                            form.setData('photo', e.target.files?.[0] ?? null)
                        }
                    />

                    <FormSelect
                        value={selectedPlayerName}
                        onChange={handleAddPlayer}
                        options={playerOptions}
                        placeholder="Игроки"
                        errorMessage={form.errors.boardgame_id}
                        className="[&_[data-slot=select-value]]:text-primary!"
                    />
                    <div
                        className={cn(
                            'grid items-center gap-4 overflow-hidden',
                            {
                                'grid-cols-[50px_1fr_70px_50px] md:grid-cols-[50px_200px_70px_50px]':
                                    hasPoints,
                                'grid-cols-[1fr_100px_50px] md:grid-cols-[200px_100px_50px]':
                                    !hasPoints,
                            },
                        )}
                    >
                        <span>Win</span>
                        <span>Имя</span>
                        {hasPoints && <span>Очки</span>}
                        <span></span>
                        {form.data.players?.map((p, i) => (
                            <Fragment key={p.id}>
                                <FormCheckbox
                                    fieldName=""
                                    checked={form.data.players[i].winner}
                                    onChange={(e) =>
                                        form.setData(`players.${i}.winner`, e)
                                    }
                                />
                                <p>{p.name}</p>
                                {hasPoints && (
                                    <FormInput
                                        value={form.data.players[i].points ?? 0}
                                        fieldName={`players.${i}.points`}
                                        type="number"
                                        onChange={(e) =>
                                            form.setData(
                                                `players.${i}.points`,
                                                Number(e.target.value),
                                            )
                                        }
                                    />
                                )}

                                <Trash
                                    className="cursor-pointer"
                                    onClick={() => handleRemovePlayer(p.id)}
                                />
                            </Fragment>
                        ))}
                    </div>
                    <InputError
                        message={form.errors.players}
                        className="mt-2"
                    />
                    <Button type="submit">Сохранить</Button>
                </div>
            </form>
        </>
    );
}
