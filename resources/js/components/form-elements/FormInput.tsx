import InputError from '@/components/form-elements/InputError';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { forwardRef, ReactNode } from 'react';
import './css/input-style.css';
import { cn } from '@/lib/utils';

type Props = {
    additionToLabel?: ReactNode;
    className?: string;
    errorMessage?: string;
    fieldName: string;
    label?: string;
    placeholder?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const FormInput = forwardRef<HTMLInputElement, Props>(
    (
        {
            additionToLabel,
            className,
            errorMessage,
            fieldName,
            label,
            placeholder,
            type = 'text',
            autoComplete = 'off',
            ...restProps
        },
        ref,
    ) => (
        <div className="grid gap-2">
            {label && (
                <div className="flex items-center justify-between">
                    <Label htmlFor={fieldName} className="text-lg">
                        {label}
                    </Label>

                    {additionToLabel}
                </div>
            )}

            <Input
                id={fieldName}
                name={fieldName}
                type={type}
                className={cn('[&[type=file]]:cursor-pointer text-base', className)}
                placeholder={placeholder}
                autoComplete={autoComplete}
                ref={ref}
                {...restProps}
            />

            <InputError message={errorMessage} className="mt-2" />
        </div>
    ),
);

export default FormInput;
