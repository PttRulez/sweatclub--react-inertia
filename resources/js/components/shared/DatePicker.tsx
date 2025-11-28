import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { isoToDate, dateToIso } from "@/helpers/dates";

type DatePickerProps = {
  value: string | null; // "yyyy-MM-dd"
  onChange: (value: string | null) => void;
  placeholder?: string;
};

export function DatePicker({ value, onChange, placeholder }: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  const selectedDate = React.useMemo<Date | undefined>(() => {
    return value ? isoToDate(value) : undefined;
  }, [value]);

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      onChange(dateToIso(date));
    } else {
      onChange(null);
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="justify-start p-6 text-left font-normal"
        >
          {selectedDate ? (
            <span>
              {selectedDate.toLocaleDateString("ru-RU", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </span>
          ) : (
            <span className="text-muted-foreground">
              {placeholder ?? "Выберите дату"}
            </span>
          )}
          <CalendarIcon className="ms-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleSelect}
          weekStartsOn={1}
        />
      </PopoverContent>
    </Popover>
  );
}