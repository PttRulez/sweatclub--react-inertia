import InputError from '@/components/form-elements/InputError';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import React, { ReactNode } from 'react';
import './css/input-style.css';

type Props = {
  additionToLabel?: ReactNode;
  className?: string;
  errorMessage?: string;
  fieldName: string;
  label?: string;
  placeholder?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function FormTextarea({
  additionToLabel,
  className,
  errorMessage,
  fieldName,
  label,
  placeholder,
  ...restProps
}: Props) {
  return (
    <div className="grid gap-2">
      {label && (
        <div className="flex items-center justify-between">
          <Label htmlFor={fieldName} className="text-lg">
            {label}
          </Label>

          {additionToLabel}
        </div>
      )}

      <Textarea
        id={fieldName}
        name={fieldName}
        className={className}
        placeholder={placeholder}
        {...restProps}
      />

      <InputError message={errorMessage} className="mt-2" />
    </div>
  );
}