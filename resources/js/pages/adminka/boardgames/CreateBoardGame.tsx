import AdminBoardGameController from '@/actions/App/Http/Controllers/Admin/AdminBoardGameController';
import FormCheckbox from '@/components/form-elements/FormCheckBox';
import FormInput from '@/components/form-elements/FormInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { useForm } from '@inertiajs/react';
import React from 'react';

export default function CreateBoardgame() {
    const { data, setData, post, processing, errors, reset } = useForm<{
        name: string;
        has_points: boolean;
        image: File | null;
    }>({
        name: '',
        has_points: false,
        image: null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(AdminBoardGameController.store.url(), {
            onSuccess: () => reset('image'),
        });
    };

    return (
        <Card className="mx-auto">
            <CardTitle><h1>Создание игры</h1></CardTitle>
            <CardContent>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6"
                    encType="multipart/form-data"
                >
                    <FormInput
                        fieldName="name"
                        placeholder="Название игры"
                        errorMessage={errors.name}
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                    />

                    <FormCheckbox
                        fieldName="has_points"
                        label="Игра на очки"
                        checked={data.has_points}
                        onChange={(val) => setData('has_points', val)}
                    />

                    <FormInput
                        fieldName="image"
                        type="file"
                        errorMessage={errors.image}
                        onChange={(e) =>
                            setData('image', e.currentTarget.files?.[0] ?? null)
                        }
                    />

                    <Button
                        type="submit"
                        className="mt-2"
                        disabled={processing}
                    >
                        {processing && <Spinner />}
                        Создать
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
