import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import { type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import React, { useState } from 'react';

import AvatarCropper from '@/components/shared/AvatarCropper';
import FormInput from '@/components/form-elements/FormInput';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useInitials } from '@/hooks/useInitials';
import HeadingSmall from '@/pages/settings/components/HeadingSmall';
import SettingsWrapper from '@/pages/settings/components/SettingsWrapper';

type FormData = {
    name: string;
    email: string;
    avatar: File | null;
};

export default function Profile() {
    const { auth } = usePage<SharedData>().props;
    const getInitials = useInitials();

    const [cropperOpen, setCropperOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    const form = useForm<FormData>({
        name: auth.user.name,
        email: auth.user.email,
        avatar: null,
    });

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
            setCropperOpen(true);
        }
    };

    const handleCrop = (croppedFile: File) => {
        form.setData('avatar', croppedFile);
        setAvatarPreview(URL.createObjectURL(croppedFile));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        form.post(ProfileController.update.form().action, {
            preserveScroll: true,
        });
    };

    return (
        <SettingsWrapper>
            <div className="space-y-6">
                <HeadingSmall
                    title="Информация о профиле"
                    description="Здесь можно править информацию о вас"
                />

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage
                                src={avatarPreview ?? auth.user.avatar_path}
                                alt={auth.user.name}
                            />
                            <AvatarFallback className="bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                {getInitials(auth.user.name)}
                            </AvatarFallback>
                        </Avatar>

                        <FormInput
                            fieldName="avatar"
                            type="file"
                            accept="image/*"
                            label="Аватар"
                            className="max-w-[200px]"
                            onChange={handleFileSelect}
                            errorMessage={form.errors.avatar}
                        />
                    </div>

                    <FormInput
                        fieldName="name"
                        placeholder="Ваше имя"
                        value={form.data.name}
                        onChange={(e) => form.setData('name', e.target.value)}
                        label="Имя"
                        errorMessage={form.errors.name}
                    />

                    <FormInput
                        fieldName="email"
                        placeholder="Ваш email"
                        type="email"
                        value={form.data.email}
                        onChange={(e) => form.setData('email', e.target.value)}
                        label="Ваш email"
                        errorMessage={form.errors.email}
                    />

                    <div className="flex items-center gap-4">
                        <Button
                            disabled={form.processing}
                            data-test="update-profile-button"
                        >
                            Сохранить
                        </Button>

                        <Transition
                            show={form.recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-neutral-600">
                                Сохранено
                            </p>
                        </Transition>
                    </div>
                </form>
            </div>

            {selectedImage && (
                <AvatarCropper
                    image={selectedImage}
                    open={cropperOpen}
                    onClose={() => setCropperOpen(false)}
                    onCrop={handleCrop}
                />
            )}
        </SettingsWrapper>
    );
}