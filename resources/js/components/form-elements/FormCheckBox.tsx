import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type Props = {
  fieldName: string;
  label?: string;
  checked: boolean;
  onChange: (value: boolean) => void;
};

export default function FormCheckbox({ fieldName, label, checked, onChange }: Props) {
  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id={fieldName}
        checked={checked}
        onCheckedChange={(val) => onChange(!!val)}
      />
      {label && (
        <Label htmlFor={fieldName} className="text-sm">
          {label}
        </Label>
      )}
    </div>
  );
}