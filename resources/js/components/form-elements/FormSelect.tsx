import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import React from 'react';
import InputError from '@/components/form-elements/InputError';

export type SelectOption = {
    value: string;
    label: string;
};

type FormSelectProps = {
    className?: string;
    errorMessage?: string;
    label?: string;
    onChange: (value: any) => void;
    options: SelectOption[];
    placeholder?: string;
    additionToLabel?: React.ReactNode;
} & React.ComponentPropsWithoutRef<typeof Select>;

export default function FormSelect({
    className,
    errorMessage,
    label,
    options,
    onChange,
    placeholder,
    additionToLabel,
    ...selectProps
}: FormSelectProps) {
    return (
        <div className="flex flex-col items-start gap-2">
            {label && (
                <div className="flex items-center justify-between">
                    <Label className="text-lg">
                        {label}
                    </Label>
                    {additionToLabel}
                </div>
            )}

            <Select  {...selectProps} onValueChange={onChange}>
                <SelectTrigger
                    className={cn('w-full p-6 text-xl [&_[data-slot=select-value]]:text-lg', className)}
                >
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <InputError message={errorMessage} />
        </div>
    );
}
